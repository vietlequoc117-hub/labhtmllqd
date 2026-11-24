import { LessonMission } from '../types';
import { CodeDiagnostic, lintHtmlCode, lintCssCode } from './htmlLintValidator';

export interface GradeBreakdownItem {
  title: string;
  earned: number;
  max: number;
  status: 'pass' | 'partial' | 'fail';
  detail: string;
}

export interface GradeIssue {
  type: 'error' | 'warning' | 'missing';
  line?: number;
  source?: 'html' | 'css';
  message: string;
  suggestion?: string;
}

export interface ExerciseGradeResult {
  score: number;
  scoreText: string;
  passed: boolean;
  hasStarted: boolean;
  gradeTier: 'excellent' | 'good' | 'average' | 'low' | 'not-started';
  summary: string;
  breakdown: GradeBreakdownItem[];
  issues: GradeIssue[];
}

const STRUCTURAL_IGNORE_TAGS = new Set([
  '!doctype',
  'html',
  'head',
  'meta',
  'title',
  'body',
  'style',
  'link',
]);

const DECORATIVE_WRAPPER_TAGS = new Set(['div', 'span']);

function roundHalf(val: number): number {
  return Math.max(0, Math.min(10, Math.round(val * 2) / 2));
}

export function formatScore(score: number): string {
  return Number.isInteger(score) ? `${score}` : score.toFixed(1);
}

function extractTagsFromText(text: string, includeStructural = false): string[] {
  const tags: string[] = [];
  const regex = /<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const tag = match[1].toLowerCase();
    if (!includeStructural && STRUCTURAL_IGNORE_TAGS.has(tag)) continue;
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  return tags;
}

function extractCssPropsFromText(cssText: string): string[] {
  const props: string[] = [];
  const regex = /\b([a-z]+(?:-[a-z]+)*)\s*:/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(cssText)) !== null) {
    const prop = match[1].toLowerCase();
    if (!props.includes(prop)) {
      props.push(prop);
    }
  }
  return props;
}

function extractExplicitCssPropsFromRequirements(reqText: string): string[] {
  const knownCssProps = [
    'color',
    'background-color',
    'background',
    'font-size',
    'font-family',
    'font-weight',
    'font-style',
    'text-align',
    'text-decoration',
    'line-height',
    'border',
    'border-radius',
    'border-collapse',
    'margin',
    'padding',
    'width',
    'height',
    'display',
    'flex',
    'grid',
    'position',
    'box-shadow',
    'opacity',
  ];
  const lower = reqText.toLowerCase();
  return knownCssProps.filter((p) => {
    const escaped = p.replace(/-/g, '\\-');
    return new RegExp(`(?<![a-z-])${escaped}(?![a-z-])`, 'i').test(lower);
  });
}

export function gradeExercise(params: {
  mission: LessonMission;
  parsedDoc: Document | null;
  htmlCode: string;
  cssCode: string;
  hasStudentTypedCode: boolean;
  editingLine?: number | null;
}): ExerciseGradeResult {
  const {
    mission,
    parsedDoc,
    htmlCode,
    cssCode,
    hasStudentTypedCode,
    editingLine = null,
  } = params;

  if (!hasStudentTypedCode) {
    return {
      score: 0,
      scoreText: '0/10đ',
      passed: false,
      hasStarted: false,
      gradeTier: 'not-started',
      summary:
        'Chưa chấm điểm (0/10đ): Em hãy tự gõ mã lập trình vào khung soạn thảo để hệ thống chấm điểm và giải thích chi tiết.',
      breakdown: [],
      issues: [],
    };
  }

  // Run full strict diagnostics (to prevent passing with unfixed errors) & deferred diagnostics (for UI messages while typing)
  const strictHtmlDiagnostics = lintHtmlCode(htmlCode || '');
  const strictCssDiagnostics = lintCssCode(cssCode || '');
  const deferredHtmlDiagnostics = lintHtmlCode(htmlCode || '', editingLine);
  const deferredCssDiagnostics = lintCssCode(cssCode || '', editingLine);

  const strictErrors: CodeDiagnostic[] = [
    ...strictHtmlDiagnostics.filter((d) => d.severity === 'error'),
    ...strictCssDiagnostics.filter((d) => d.severity === 'error'),
  ];

  const visibleErrors: CodeDiagnostic[] = [
    ...deferredHtmlDiagnostics.filter((d) => d.severity === 'error'),
    ...deferredCssDiagnostics.filter((d) => d.severity === 'error'),
  ];

  const warnings: CodeDiagnostic[] = [
    ...strictHtmlDiagnostics.filter((d) => d.severity === 'warning'),
    ...strictCssDiagnostics.filter((d) => d.severity === 'warning'),
  ];

  const issues: GradeIssue[] = [];
  const breakdown: GradeBreakdownItem[] = [];

  // =========================================================================
  // PHẦN 1: KHUNG HTML CHUẨN & CÚ PHÁP W3C (Tối đa 2.0 điểm)
  // =========================================================================
  const hasDoctype = /<!doctype\s+html>/i.test(htmlCode);
  const hasHtmlTag = /<html\b/i.test(htmlCode) && /<\/html>/i.test(htmlCode);
  const hasHeadTag = /<head\b/i.test(htmlCode) && /<\/head>/i.test(htmlCode);
  const hasBodyTag = /<body\b/i.test(htmlCode) && /<\/body>/i.test(htmlCode);
  const hasTitleTag = /<title\b[^>]*>[\s\S]*?<\/title>/i.test(htmlCode);

  const missingFrameParts: string[] = [];
  if (!hasDoctype) missingFrameParts.push('<!DOCTYPE html>');
  if (!hasHtmlTag) missingFrameParts.push('<html>...</html>');
  if (!hasHeadTag) missingFrameParts.push('<head>...</head>');
  if (!hasTitleTag) missingFrameParts.push('<title>...</title>');
  if (!hasBodyTag) missingFrameParts.push('<body>...</body>');

  let frameScore = 1.0;
  if (missingFrameParts.length === 1) {
    frameScore = 0.5;
  } else if (missingFrameParts.length >= 2) {
    frameScore = 0;
  }

  let syntaxScore = 1.0;
  if (strictErrors.length > 0) {
    syntaxScore = 0;
  } else if (warnings.length === 1) {
    syntaxScore = 0.5;
  } else if (warnings.length >= 2) {
    syntaxScore = 0;
  }

  const part1Earned = roundHalf(frameScore + syntaxScore);
  const part1DetailParts: string[] = [];
  if (missingFrameParts.length === 0) {
    part1DetailParts.push('Đủ khung tài liệu HTML chuẩn');
  } else {
    part1DetailParts.push(`Thiếu khung: ${missingFrameParts.join(', ')}`);
    issues.push({
      type: 'missing',
      source: 'html',
      message: `Thiếu thành phần khung HTML chuẩn: ${missingFrameParts.join(', ')}`,
      suggestion: 'Hãy khai báo đầy đủ <!DOCTYPE html>, <html>, <head>, <title> và <body>.',
    });
  }

  if (visibleErrors.length > 0) {
    part1DetailParts.push(`có ${visibleErrors.length} lỗi cú pháp chưa sửa (-1đ)`);
    visibleErrors.slice(0, 4).forEach((err) => {
      issues.push({
        type: 'error',
        line: err.line,
        source: err.source || (err.id.startsWith('css-') ? 'css' : 'html'),
        message: err.message,
        suggestion: err.suggestion,
      });
    });
  } else if (strictErrors.length > 0) {
    part1DetailParts.push('dòng đang gõ chưa hoàn chỉnh cú pháp (-1đ)');
    issues.push({
      type: 'warning',
      source: 'html',
      message: 'Dòng em đang gõ chưa hoàn chỉnh thẻ HTML/CSS.',
      suggestion: 'Hãy gõ hết dòng và nhấn Enter để hệ thống chấm điểm chính xác.',
    });
  } else if (warnings.length > 0) {
    part1DetailParts.push(`có ${warnings.length} cảnh báo chuẩn W3C (-${formatScore(1 - syntaxScore)}đ)`);
    warnings.slice(0, 3).forEach((warn) => {
      issues.push({
        type: 'warning',
        line: warn.line,
        source: warn.source || (warn.id.startsWith('css-') ? 'css' : 'html'),
        message: warn.message,
        suggestion: warn.suggestion,
      });
    });
  } else {
    part1DetailParts.push('cú pháp sạch lỗi chuẩn W3C');
  }

  breakdown.push({
    title: 'Khung HTML & Cú pháp chuẩn',
    earned: part1Earned,
    max: 2,
    status: part1Earned >= 2 ? 'pass' : part1Earned > 0 ? 'partial' : 'fail',
    detail: part1DetailParts.join('; ') + '.',
  });

  // =========================================================================
  // PHẦN 3 (evaluated early so Part 2 knows if core criteria passed):
  // ĐẠT TIÊU CHÍ MỤC TIÊU BÀI TẬP (Tối đa 4.0 điểm)
  // =========================================================================
  const rawCriteria = parsedDoc
    ? mission.checkCriteria(parsedDoc, htmlCode || '', cssCode || '')
    : { passed: false, message: 'Không thể phân tích cú pháp DOM hiện tại.' };

  // =========================================================================
  // PHẦN 2: THẺ HTML & THUỘC TÍNH CSS THEO YÊU CẦU (Tối đa 4.0 điểm)
  // =========================================================================
  const reqCombined = `${mission.title} ${mission.description} ${mission.requirements.join(' ')}`;
  const explicitTags = extractTagsFromText(reqCombined, false);
  const targetHtmlTags = extractTagsFromText(mission.targetResult.html || '', false).filter(
    (t) => !DECORATIVE_WRAPPER_TAGS.has(t) || explicitTags.includes(t)
  );

  // Use explicit requirement tags if present, otherwise core tags from targetResult.html
  const expectedTags =
    explicitTags.length > 0
      ? explicitTags
      : targetHtmlTags.slice(0, 5);

  // Also detect if link/style is explicitly required
  const requiresCssLink =
    /<link\b/i.test(reqCombined) ||
    /style\.css/i.test(reqCombined) ||
    Boolean(mission.targetResult.css && mission.targetResult.css.trim().length > 0);

  const explicitCssProps = extractExplicitCssPropsFromRequirements(mission.requirements.join(' '));
  const targetCssProps = mission.targetResult.css
    ? extractCssPropsFromText(mission.targetResult.css)
    : [];

  const expectedCssProps =
    explicitCssProps.length > 0
      ? explicitCssProps
      : requiresCssLink
      ? targetCssProps.slice(0, 3)
      : [];

  const foundTags: string[] = [];
  const missingTags: string[] = [];
  if (parsedDoc) {
    for (const tag of expectedTags) {
      if (parsedDoc.querySelector(tag)) {
        foundTags.push(tag);
      } else {
        missingTags.push(tag);
      }
    }
  }

  const combinedCssLower = `${cssCode || ''}\n${htmlCode || ''}`.toLowerCase();
  const foundCssProps: string[] = [];
  const missingCssProps: string[] = [];
  for (const prop of expectedCssProps) {
    const escaped = prop.replace(/-/g, '\\-');
    if (new RegExp(`(?<![a-z-])${escaped}\\s*:`, 'i').test(combinedCssLower)) {
      foundCssProps.push(prop);
    } else {
      missingCssProps.push(prop);
    }
  }

  const totalItems = expectedTags.length + expectedCssProps.length;
  const matchedItems = foundTags.length + foundCssProps.length;

  let part2Earned = 0;
  if (rawCriteria.passed && strictErrors.length === 0 && missingTags.length === 0 && missingCssProps.length === 0) {
    part2Earned = 4.0;
  } else if (rawCriteria.passed && strictErrors.length === 0 && explicitTags.length === 0 && explicitCssProps.length === 0) {
    // Student passed mission checkCriteria cleanly and requirements didn't mandate extra sample tags
    part2Earned = 4.0;
  } else if (totalItems > 0) {
    const ratio = matchedItems / totalItems;
    part2Earned = roundHalf(ratio * 4.0);
    // If criteria passed cleanly and only optional non-explicit tags were missed, grant full 4.0 unless explicit items are missing
    if (rawCriteria.passed && strictErrors.length === 0) {
      const explicitMissingTags = explicitTags.filter((t) => missingTags.includes(t));
      const explicitMissingCss = explicitCssProps.filter((p) => missingCssProps.includes(p));
      if (explicitMissingTags.length === 0 && explicitMissingCss.length === 0) {
        part2Earned = 4.0;
      } else {
        part2Earned = Math.max(part2Earned, 3.0);
      }
    }
  } else {
    part2Earned = rawCriteria.passed ? 4.0 : 1.0;
  }

  // Build transparent Part 2 detail message
  const part2DetailSegments: string[] = [];
  if (foundTags.length > 0) {
    part2DetailSegments.push(`Đã có thẻ ${foundTags.map((t) => `<${t}>`).join(', ')}`);
  }
  if (foundCssProps.length > 0) {
    part2DetailSegments.push(`đã dùng CSS ${foundCssProps.join(', ')}`);
  }

  const effectiveMissingTags =
    rawCriteria.passed && strictErrors.length === 0
      ? explicitTags.filter((t) => missingTags.includes(t))
      : missingTags;
  const effectiveMissingCss =
    rawCriteria.passed && strictErrors.length === 0
      ? explicitCssProps.filter((p) => missingCssProps.includes(p))
      : missingCssProps;

  if (effectiveMissingTags.length > 0) {
    part2DetailSegments.push(`còn thiếu thẻ ${effectiveMissingTags.map((t) => `<${t}>`).join(', ')}`);
    issues.push({
      type: 'missing',
      source: 'html',
      message: `Còn thiếu thẻ HTML yêu cầu: ${effectiveMissingTags.map((t) => `<${t}>`).join(', ')}`,
      suggestion: `Hãy bổ sung các thẻ ${effectiveMissingTags.map((t) => `<${t}>`).join(', ')} vào phần nội dung.`,
    });
  }
  if (effectiveMissingCss.length > 0) {
    part2DetailSegments.push(`còn thiếu CSS ${effectiveMissingCss.join(', ')}`);
    issues.push({
      type: 'missing',
      source: 'css',
      message: `Còn thiếu thuộc tính CSS: ${effectiveMissingCss.join(', ')}`,
      suggestion: `Hãy bổ sung quy tắc CSS sử dụng ${effectiveMissingCss.join(', ')} trong tab style.css.`,
    });
  }

  if (part2DetailSegments.length === 0) {
    part2DetailSegments.push('Đáp ứng đầy đủ thẻ và định dạng theo yêu cầu bài tập');
  }

  breakdown.push({
    title: 'Thẻ HTML & Thuộc tính CSS yêu cầu',
    earned: part2Earned,
    max: 4,
    status: part2Earned >= 4 ? 'pass' : part2Earned > 0 ? 'partial' : 'fail',
    detail: part2DetailSegments.join('; ') + '.',
  });

  // =========================================================================
  // PHẦN 3 SCORE CALCULATION
  // =========================================================================
  let part3Earned = 0;
  let part3Detail = '';
  let part3Status: 'pass' | 'partial' | 'fail' = 'fail';

  if (rawCriteria.passed && strictErrors.length === 0) {
    part3Earned = 4.0;
    part3Status = 'pass';
    part3Detail = rawCriteria.message;
  } else if (rawCriteria.passed && strictErrors.length > 0) {
    part3Earned = 1.5;
    part3Status = 'partial';
    part3Detail = `Đã có phần nội dung yêu cầu nhưng bị trừ 2.5đ do mã vẫn còn ${strictErrors.length} lỗi cú pháp chưa sửa xong.`;
  } else {
    part3Earned = 0;
    part3Status = 'fail';
    part3Detail = rawCriteria.message;
    issues.push({
      type: 'missing',
      message: rawCriteria.message,
      suggestion: mission.hint,
    });
  }

  breakdown.push({
    title: 'Kết quả & Tiêu chí cốt lõi bài tập',
    earned: part3Earned,
    max: 4,
    status: part3Status,
    detail: part3Detail,
  });

  // =========================================================================
  // TỔNG ĐIỂM & XẾP LOẠI
  // =========================================================================
  let totalScore = roundHalf(part1Earned + part2Earned + part3Earned);
  const passed = rawCriteria.passed && strictErrors.length === 0;

  // Enforce strict pedagogical caps so students with syntax errors never get a passing high score
  if (strictErrors.length > 0 && totalScore > 5.0) {
    const deduction = roundHalf(totalScore - 5.0);
    totalScore = 5.0;
    // Reflect cap cleanly in part3Earned so sum always equals totalScore
    if (breakdown[2]) {
      breakdown[2].earned = Math.max(0, roundHalf(breakdown[2].earned - deduction));
      totalScore = roundHalf(breakdown[0].earned + breakdown[1].earned + breakdown[2].earned);
    }
  }

  const scoreText = `${formatScore(totalScore)}/10đ`;

  let gradeTier: ExerciseGradeResult['gradeTier'] = 'low';
  if (totalScore >= 8.5 && passed) {
    gradeTier = 'excellent';
  } else if (totalScore >= 7.0 && passed) {
    gradeTier = 'good';
  } else if (totalScore >= 5.0) {
    gradeTier = 'average';
  } else {
    gradeTier = 'low';
  }

  let summary = '';
  if (passed && totalScore === 10) {
    summary = `Xuất sắc! Em đạt trọn ${scoreText} — mã nguồn chuẩn cú pháp W3C và hoàn thành đầy đủ mọi tiêu chí của bài tập.`;
  } else if (passed) {
    summary = `Hoàn thành tốt (${scoreText})! Em đã đạt tiêu chí chính của bài tập, nhưng còn bị trừ ${formatScore(roundHalf(10 - totalScore))}đ do thiếu chi tiết nhỏ hoặc cảnh báo chuẩn W3C bên dưới.`;
  } else if (strictErrors.length > 0) {
    summary = `Đạt ${scoreText} (Chưa đạt yêu cầu): Mã nguồn đang còn ${strictErrors.length} lỗi cú pháp nên bị trừ điểm và chưa thể kết xuất chuẩn. Hãy sửa các lỗi bên dưới để lên điểm nhé!`;
  } else {
    summary = `Đạt ${scoreText} (Chưa đủ tiêu chí): Em mới hoàn thành một phần yêu cầu. Xem chi tiết phần còn thiếu bên dưới để hoàn thiện bài tập lên 10/10đ nhé!`;
  }

  return {
    score: totalScore,
    scoreText,
    passed,
    hasStarted: true,
    gradeTier,
    summary,
    breakdown,
    issues,
  };
}
