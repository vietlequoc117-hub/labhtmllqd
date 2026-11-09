import { LessonMission, CodeSample } from '../types';
import { ALL_LESSON_SAMPLES } from './samples';
import { LESSON_7_MISSIONS } from './missions/lesson7';
import { LESSON_8_MISSIONS } from './missions/lesson8';
import { LESSON_9_MISSIONS } from './missions/lesson9';
import { LESSON_10_MISSIONS } from './missions/lesson10';
import { LESSON_11_MISSIONS } from './missions/lesson11';
import { LESSON_12_MISSIONS } from './missions/lesson12';
import { LESSON_13_MISSIONS } from './missions/lesson13';
import { LESSON_14_MISSIONS } from './missions/lesson14';
import { LESSON_15_MISSIONS } from './missions/lesson15';
import { LESSON_16_MISSIONS, LESSON_17_MISSIONS, LESSON_18_MISSIONS } from './missions/otherLessons';

export const BASE_LESSON_MISSIONS: Record<number, LessonMission[]> = {
  7: LESSON_7_MISSIONS,
  8: LESSON_8_MISSIONS,
  9: LESSON_9_MISSIONS,
  10: LESSON_10_MISSIONS,
  11: LESSON_11_MISSIONS,
  12: LESSON_12_MISSIONS,
  13: LESSON_13_MISSIONS,
  14: LESSON_14_MISSIONS,
  15: LESSON_15_MISSIONS,
  16: LESSON_16_MISSIONS,
  17: LESSON_17_MISSIONS,
  18: LESSON_18_MISSIONS,
};

function buildExerciseFromSample(sample: CodeSample, index: number): LessonMission {
  const cleanSampleTitle = sample.title.replace(/^\d+\.\s*/, '');
  const levelMap: Record<number, LessonMission['level']> = {
    6: 'Thông hiểu',
    7: 'Thông hiểu',
    8: 'Vận dụng',
    9: 'Vận dụng',
    10: 'Sáng tạo',
  };

  // Detect key HTML content tags used in sample
  const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  const ignoreTags = new Set(['!doctype', 'html', 'head', 'meta', 'title', 'body', 'style', 'link']);
  const foundTags: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(sample.html)) !== null) {
    const t = match[1].toLowerCase();
    if (!ignoreTags.has(t) && !foundTags.includes(t)) {
      foundTags.push(t);
    }
  }

  // Detect key CSS properties if sample has CSS
  const cssProps: string[] = [];
  if (sample.css) {
    const propRegex = /\b([a-z-]+)\s*:/gi;
    let cMatch: RegExpExecArray | null;
    while ((cMatch = propRegex.exec(sample.css)) !== null) {
      const p = cMatch[1].toLowerCase();
      if (!cssProps.includes(p)) {
        cssProps.push(p);
      }
    }
  }

  const requirements: string[] = [
    'Khai báo khung tài liệu HTML chuẩn (<!DOCTYPE html>, <html>, <head>, <body>)',
  ];
  if (foundTags.length > 0) {
    requirements.push(
      `Sử dụng đầy đủ các thẻ HTML chính: ${foundTags
        .slice(0, 5)
        .map((t) => `<${t}>`)
        .join(', ')}`
    );
  }
  if (cssProps.length > 0) {
    requirements.push(
      `Định kiểu CSS với các thuộc tính: ${cssProps.slice(0, 4).join(', ')}`
    );
  } else {
    requirements.push(`Trình bày nội dung đúng bố cục mục tiêu: "${cleanSampleTitle}"`);
  }

  const requiredTagsToCheck = foundTags.slice(0, 3);
  const requiredCssToCheck = cssProps.slice(0, 2);

  return {
    id: index,
    title: `Bài tập ${index}: ${cleanSampleTitle}`,
    level: levelMap[index] || 'Vận dụng',
    description: `${sample.description} Hãy lập trình mã HTML${sample.css ? ' và CSS' : ''} để tạo ra giao diện tương đương kết quả mẫu.`,
    requirements,
    targetResult: {
      title: cleanSampleTitle,
      description: sample.description,
      html: sample.html,
      css: sample.css,
    },
    hint:
      foundTags.length > 0
        ? `Kết hợp các thẻ ${foundTags
            .slice(0, 4)
            .map((t) => `<${t}>`)
            .join(', ')}${
            cssProps.length > 0 ? ` cùng thuộc tính CSS (${cssProps.slice(0, 3).join(', ')})` : ''
          } như trong mẫu kết quả.`
        : 'Quan sát kỹ kết quả mục tiêu mẫu hoặc bấm "Nạp mã mẫu" để tham khảo cách viết.',
    checkCriteria: (doc, _html, css) => {
      const missingTags = requiredTagsToCheck.filter((t) => !doc.querySelector(t));
      const lowerCss = (css || '').toLowerCase();
      const missingCss = requiredCssToCheck.filter((p) => !lowerCss.includes(p));

      if (missingTags.length === 0 && missingCss.length === 0) {
        return {
          passed: true,
          message: `Đạt kết quả mục tiêu Bài tập ${index}: Đã lập trình đầy đủ cấu trúc thẻ và định dạng yêu cầu!`,
        };
      }

      const reasons: string[] = [];
      if (missingTags.length > 0) {
        reasons.push(`Thiếu thẻ ${missingTags.map((t) => `<${t}>`).join(', ')}`);
      }
      if (missingCss.length > 0) {
        reasons.push(`Thiếu thuộc tính CSS ${missingCss.join(', ')}`);
      }
      return {
        passed: false,
        message: `Chưa đạt: ${reasons.join('; ')}.`,
      };
    },
  };
}

export const ALL_LESSON_MISSIONS: Record<number, LessonMission[]> = Object.fromEntries(
  Object.entries(BASE_LESSON_MISSIONS).map(([lessonIdStr, baseMissions]) => {
    const lessonId = Number(lessonIdStr);
    const normalizedFirstFive: LessonMission[] = baseMissions.map((m) => ({
      ...m,
      title: m.title.replace(/^Nhiệm vụ\s+/i, 'Bài tập '),
      checkCriteria: (doc, html, css) => {
        const res = m.checkCriteria(doc, html, css);
        return {
          ...res,
          message: res.message.replace(/Nhiệm vụ\s+/gi, 'Bài tập '),
        };
      },
    }));

    const extraSamples = (ALL_LESSON_SAMPLES[lessonId] || []).slice(5, 10);
    const extraExercises = extraSamples.map((sample, idx) =>
      buildExerciseFromSample(sample, idx + 6)
    );

    return [lessonId, [...normalizedFirstFive, ...extraExercises]];
  })
);

export function getLessonMissions(lessonId: number): LessonMission[] {
  return ALL_LESSON_MISSIONS[lessonId] || [];
}
