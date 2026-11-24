import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BookOpen, Code2, Eye, Columns2 } from 'lucide-react';
import { LESSONS } from './data/lessons';
import { Lesson, DomTestResult, CodeSample } from './types';
import { evaluateStudentCode } from './utils/domEvaluator';
import { lintHtmlCode, lintCssCode } from './utils/htmlLintValidator';
import { useViewportLayout } from './hooks/useViewportLayout';
import { Header } from './components/Header';
import { LessonGuide } from './components/LessonGuide';
import { CodeEditor } from './components/CodeEditor';
import { ResultPane } from './components/ResultPane';
import { SettingsModal } from './components/SettingsModal';
import { SolutionModal } from './components/SolutionModal';
import { SampleModal } from './components/SampleModal';
import { AiAssistantModal } from './components/AiAssistantModal';

type MobilePane = 'guide' | 'editor' | 'preview' | 'split';
type TabletSplit = 'guide-code' | 'code-preview' | 'guide-preview';

export default function App() {
  const viewport = useViewportLayout();
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);

  // Responsive active view state
  const [mobilePane, setMobilePane] = useState<MobilePane>('guide');
  const [tabletSplit, setTabletSplit] = useState<TabletSplit>('guide-code');

  // If user rotates from landscape split to portrait, fall back cleanly from 'split' to 'editor'
  useEffect(() => {
    if (viewport.isMobilePortrait && mobilePane === 'split') {
      setMobilePane('editor');
    }
  }, [viewport.isMobilePortrait, mobilePane]);

  // Code state per lesson with local storage persistence
  const [htmlCodes, setHtmlCodes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('html12_user_html_codes');
      if (saved) return JSON.parse(saved);
    } catch {}
    const initial: Record<number, string> = {};
    LESSONS.forEach((l) => {
      initial[l.id] = l.initialHtml;
    });
    return initial;
  });

  const [cssCodes, setCssCodes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('html12_user_css_codes');
      if (saved) return JSON.parse(saved);
    } catch {}
    const initial: Record<number, string> = {};
    LESSONS.forEach((l) => {
      initial[l.id] = l.initialCss;
    });
    return initial;
  });

  // Save student code to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('html12_user_html_codes', JSON.stringify(htmlCodes));
    } catch {}
  }, [htmlCodes]);

  useEffect(() => {
    try {
      localStorage.setItem('html12_user_css_codes', JSON.stringify(cssCodes));
    } catch {}
  }, [cssCodes]);

  // Editor states
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css'>('html');
  const [editingLine, setEditingLine] = useState<number | null>(null);

  // Test evaluations
  const [testResults, setTestResults] = useState<DomTestResult[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Settings
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('html12_fontSize');
    return saved ? Number(saved) : 14;
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [isSamplesOpen, setIsSamplesOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Track if a quiz question snippet is loaded into the lab
  const [loadedQuizSnippet, setLoadedQuizSnippet] = useState<{
    questionId: number;
    lessonId: number;
    lessonNumber: string;
  } | null>(null);

  // Backup student work when loading quiz snippet so student can restore
  const [backupCodes, setBackupCodes] = useState<Record<number, { html: string; css: string }>>({});

  // Current code values
  const currentHtml = htmlCodes[currentLesson.id] ?? currentLesson.initialHtml;
  const currentCss = cssCodes[currentLesson.id] ?? currentLesson.initialCss;

  // Live syntax error count for mobile/tablet navigation indicator
  const syntaxErrorCount = useMemo(() => {
    const htmlErrs = lintHtmlCode(currentHtml, editingLine).filter((d) => d.severity === 'error').length;
    const cssErrs = lintCssCode(currentCss, editingLine).filter((d) => d.severity === 'error').length;
    return htmlErrs + cssErrs;
  }, [currentHtml, currentCss, editingLine]);

  // Helper to reveal editor or preview automatically on mobile/tablet after loading code from LessonGuide
  const revealCodeAfterAction = useCallback(
    (preferPreview = false) => {
      if (viewport.isMobilePortrait) {
        setMobilePane(preferPreview ? 'preview' : 'editor');
      } else if (viewport.isMobileLandscape) {
        setMobilePane('split');
      } else if (viewport.isTablet) {
        setTabletSplit(preferPreview ? 'code-preview' : 'guide-code');
      }
    },
    [viewport.isMobilePortrait, viewport.isMobileLandscape, viewport.isTablet]
  );

  // Run DOM evaluation
  const runEvaluation = useCallback(() => {
    setIsEvaluating(true);
    try {
      const results = evaluateStudentCode(currentLesson, currentHtml, currentCss);
      setTestResults(results);
    } finally {
      setIsEvaluating(false);
    }
  }, [currentLesson, currentHtml, currentCss]);

  // Real-time debounced evaluation when HTML or CSS changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const results = evaluateStudentCode(currentLesson, currentHtml, currentCss);
      setTestResults(results);
    }, 250);
    return () => clearTimeout(timer);
  }, [currentLesson.id, currentHtml, currentCss]);

  // Save font size
  const handleSaveFontSize = (size: number) => {
    setFontSize(size);
    localStorage.setItem('html12_fontSize', String(size));
  };

  // Handlers
  const handleRunCode = () => {
    setEditingLine(null);
    runEvaluation();
    if (viewport.isMobilePortrait) {
      setMobilePane('preview');
    } else if (viewport.isMobileLandscape) {
      setMobilePane('split');
    } else if (viewport.isTablet && tabletSplit === 'guide-code') {
      setTabletSplit('code-preview');
    }
  };

  const handleCheckCode = () => {
    setEditingLine(null);
    runEvaluation();
  };

  const handleResetCode = () => {
    setIsResetConfirmOpen(true);
  };

  const executeResetCode = () => {
    setEditingLine(null);
    setHtmlCodes((prev) => ({
      ...prev,
      [currentLesson.id]: currentLesson.initialHtml,
    }));
    setCssCodes((prev) => ({
      ...prev,
      [currentLesson.id]: currentLesson.initialCss,
    }));
    setIsResetConfirmOpen(false);
    setTimeout(() => {
      const results = evaluateStudentCode(currentLesson, currentLesson.initialHtml, currentLesson.initialCss);
      setTestResults(results);
    }, 50);
  };

  const handleApplySolution = (html: string, css?: string) => {
    setEditingLine(null);
    setHtmlCodes((prev) => ({
      ...prev,
      [currentLesson.id]: html,
    }));
    if (css) {
      setCssCodes((prev) => ({
        ...prev,
        [currentLesson.id]: css,
      }));
    }
    setTimeout(() => {
      const results = evaluateStudentCode(currentLesson, html, css || currentCss);
      setTestResults(results);
    }, 50);
    revealCodeAfterAction(false);
  };

  const handleLoadSample = (sample: CodeSample) => {
    setEditingLine(null);
    setHtmlCodes((prev) => ({
      ...prev,
      [currentLesson.id]: sample.html,
    }));
    if (sample.css !== undefined) {
      setCssCodes((prev) => ({
        ...prev,
        [currentLesson.id]: sample.css || '',
      }));
    }
    setTimeout(() => {
      const results = evaluateStudentCode(currentLesson, sample.html, sample.css || currentCss);
      setTestResults(results);
    }, 60);
    revealCodeAfterAction(true);
  };

  // Load snippet from Quiz Question into Lab Editor & Run live
  const handleLoadSnippetCode = (rawHtml: string, rawCss: string, questionId: number) => {
    setEditingLine(null);
    // Backup current work before loading snippet if not backed up yet
    setBackupCodes((prev) => {
      if (!prev[currentLesson.id]) {
        return {
          ...prev,
          [currentLesson.id]: {
            html: htmlCodes[currentLesson.id] ?? currentLesson.initialHtml,
            css: cssCodes[currentLesson.id] ?? currentLesson.initialCss,
          },
        };
      }
      return prev;
    });

    const cleanCss = rawCss.replace(/<\/?style>/gi, '').trim();

    let fullHtml = rawHtml;
    if (!rawHtml.includes('<!DOCTYPE') && !rawHtml.includes('<html')) {
      fullHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Chạy thử Câu ${questionId} - ${currentLesson.lessonNumber}</title>
</head>
<body>
  <!-- Mã ví dụ trắc nghiệm Câu ${questionId} -->
  ${rawHtml}
</body>
</html>`;
    }

    setHtmlCodes((prev) => ({
      ...prev,
      [currentLesson.id]: fullHtml,
    }));
    setCssCodes((prev) => ({
      ...prev,
      [currentLesson.id]: cleanCss,
    }));

    setLoadedQuizSnippet({
      questionId,
      lessonId: currentLesson.id,
      lessonNumber: currentLesson.lessonNumber,
    });

    if (cleanCss && (!rawHtml || rawHtml.trim().length === 0)) {
      setActiveEditorTab('css');
    } else {
      setActiveEditorTab('html');
    }

    setTimeout(() => {
      const results = evaluateStudentCode(currentLesson, fullHtml, cleanCss);
      setTestResults(results);
    }, 60);
    revealCodeAfterAction(true);
  };

  const handleRestoreLessonCode = () => {
    setEditingLine(null);
    const backup = backupCodes[currentLesson.id];
    if (backup) {
      setHtmlCodes((prev) => ({
        ...prev,
        [currentLesson.id]: backup.html,
      }));
      setCssCodes((prev) => ({
        ...prev,
        [currentLesson.id]: backup.css,
      }));
      setTimeout(() => {
        const results = evaluateStudentCode(currentLesson, backup.html, backup.css);
        setTestResults(results);
      }, 60);
    } else {
      setHtmlCodes((prev) => ({
        ...prev,
        [currentLesson.id]: currentLesson.initialHtml,
      }));
      setCssCodes((prev) => ({
        ...prev,
        [currentLesson.id]: currentLesson.initialCss,
      }));
    }
    setLoadedQuizSnippet(null);
  };

  const handleInsertSnippet = (snippet: string) => {
    setEditingLine(null);
    if (activeEditorTab === 'html') {
      setHtmlCodes((prev) => {
        const code = prev[currentLesson.id] ?? currentLesson.initialHtml;
        if (code.includes('</body>')) {
          return {
            ...prev,
            [currentLesson.id]: code.replace('</body>', `  ${snippet}\n</body>`),
          };
        }
        return {
          ...prev,
          [currentLesson.id]: code + '\n' + snippet,
        };
      });
    }
    revealCodeAfterAction(false);
  };

  // Visibility calculation per pane across Desktop, Laptop, Tablet, Mobile Landscape, Mobile Portrait
  const showGuide =
    viewport.isDesktopOrLaptop ||
    (viewport.isTablet && (tabletSplit === 'guide-code' || tabletSplit === 'guide-preview')) ||
    (viewport.isMobile && mobilePane === 'guide');

  const showEditor =
    viewport.isDesktopOrLaptop ||
    (viewport.isTablet && (tabletSplit === 'guide-code' || tabletSplit === 'code-preview')) ||
    (viewport.isMobilePortrait && mobilePane === 'editor') ||
    (viewport.isMobileLandscape && (mobilePane === 'editor' || mobilePane === 'split'));

  const showPreview =
    viewport.isDesktopOrLaptop ||
    (viewport.isTablet && (tabletSplit === 'code-preview' || tabletSplit === 'guide-preview')) ||
    (viewport.isMobilePortrait && mobilePane === 'preview') ||
    (viewport.isMobileLandscape && (mobilePane === 'preview' || mobilePane === 'split'));

  // Width classes per pane matching the active viewport mode
  const guideWidthClass = viewport.isDesktopOrLaptop
    ? 'w-[28%] min-w-[260px] max-w-[380px] border-r border-slate-200'
    : viewport.isTablet
    ? 'w-[44%] min-w-0 border-r border-slate-200'
    : 'w-full min-w-0';

  const editorWidthClass = viewport.isDesktopOrLaptop
    ? 'flex-1 min-w-0 border-r border-slate-200'
    : viewport.isTablet
    ? tabletSplit === 'guide-code'
      ? 'w-[56%] min-w-0'
      : 'w-[52%] min-w-0 border-r border-slate-200'
    : viewport.isMobileLandscape && mobilePane === 'split'
    ? 'w-1/2 min-w-0 border-r border-slate-200'
    : 'w-full min-w-0';

  const previewWidthClass = viewport.isDesktopOrLaptop
    ? 'w-[33%] min-w-[280px] max-w-[520px]'
    : viewport.isTablet
    ? tabletSplit === 'code-preview'
      ? 'w-[48%] min-w-0'
      : 'w-[56%] min-w-0'
    : viewport.isMobileLandscape && mobilePane === 'split'
    ? 'w-1/2 min-w-0'
    : 'w-full min-w-0';

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden bg-slate-100 font-sans text-slate-800">
      {/* HEADER COMPONENT */}
      <Header
        lessons={LESSONS}
        currentLesson={currentLesson}
        onSelectLesson={(lesson) => {
          setEditingLine(null);
          setCurrentLesson(lesson);
        }}
        onRunCode={handleRunCode}
        onResetCode={handleResetCode}
        onCheckCode={handleCheckCode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        isEvaluating={isEvaluating}
        isCompactHeight={viewport.isCompactHeight}
      />

      {/* TABLET 2-COLUMN SPLIT MODE BAR (768px–1023px) */}
      {viewport.isTablet && (
        <div className="h-9 bg-slate-100 border-b border-slate-200 px-3 flex items-center justify-between gap-2 shrink-0 select-none">
          <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg">
            <button
              onClick={() => setTabletSplit('guide-code')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                tabletSplit === 'guide-code'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Bài học + Soạn thảo</span>
            </button>
            <button
              onClick={() => setTabletSplit('code-preview')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                tabletSplit === 'code-preview'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5 shrink-0" />
              <span>Soạn thảo + Xem trước</span>
            </button>
            <button
              onClick={() => setTabletSplit('guide-preview')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                tabletSplit === 'guide-preview'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>Bài học + Xem trước</span>
            </button>
          </div>

          <div className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
            {syntaxErrorCount > 0 ? (
              <span className="text-rose-600 font-semibold">{syntaxErrorCount} lỗi cú pháp</span>
            ) : (
              <span>Chế độ 2 cột · Máy tính bảng</span>
            )}
          </div>
        </div>
      )}

      {/* MOBILE LANDSCAPE COMPACT WORKSPACE SWITCHER (phone rotated horizontally, e.g. 844x390) */}
      {viewport.isMobileLandscape && (
        <div className="h-8 bg-slate-100 border-b border-slate-200 px-2 flex items-center justify-between gap-2 shrink-0 select-none overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 bg-slate-200/75 p-0.5 rounded-md shrink-0">
            <button
              onClick={() => setMobilePane('guide')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                mobilePane === 'guide'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3 h-3 shrink-0" />
              <span>Bài học</span>
            </button>
            <button
              onClick={() => setMobilePane('editor')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                mobilePane === 'editor'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3 h-3 shrink-0" />
              <span>Soạn thảo</span>
              {syntaxErrorCount > 0 && (
                <span className="text-[10px] font-bold text-rose-600 tabular-nums">({syntaxErrorCount})</span>
              )}
            </button>
            <button
              onClick={() => setMobilePane('preview')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                mobilePane === 'preview'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3 h-3 shrink-0" />
              <span>Xem trước</span>
            </button>
            <button
              onClick={() => setMobilePane('split')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                mobilePane === 'split'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns2 className="w-3 h-3 shrink-0" />
              <span>Mã + KQ</span>
            </button>
          </div>
          <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap shrink-0">
            Chế độ ngang
          </span>
        </div>
      )}

      {/* ADAPTIVE WORKSPACE: 3-column (Desktop/Laptop), 2-column (Tablet / Mobile Landscape Split), 1-column (Mobile) */}
      <main className="flex-1 flex min-h-0 overflow-hidden w-full">
        {/* COLUMN 1: Lesson Guide & Tasks */}
        {showGuide && (
          <div className={`${guideWidthClass} h-full overflow-hidden bg-white`}>
            <LessonGuide
              lesson={currentLesson}
              testResults={testResults}
              onInsertSnippet={handleInsertSnippet}
              onLoadSample={handleLoadSample}
              currentHtml={currentHtml}
              currentCss={currentCss}
              editingLine={editingLine}
              onLoadSnippetCode={handleLoadSnippetCode}
              onRestoreLessonCode={handleRestoreLessonCode}
              loadedSnippetQuestionId={loadedQuizSnippet?.lessonId === currentLesson.id ? loadedQuizSnippet.questionId : null}
              onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
              isCompactHeight={viewport.isCompactHeight}
              onLoadTargetCode={(html, css) => {
                setEditingLine(null);
                setHtmlCodes((prev) => ({
                  ...prev,
                  [currentLesson.id]: html,
                }));
                if (css !== undefined) {
                  setCssCodes((prev) => ({
                    ...prev,
                    [currentLesson.id]: css,
                  }));
                }
                setTimeout(() => {
                  const results = evaluateStudentCode(currentLesson, html, css || currentCss);
                  setTestResults(results);
                }, 60);
                revealCodeAfterAction(true);
              }}
            />
          </div>
        )}

        {/* COLUMN 2: Code Editor */}
        {showEditor && (
          <div className={`${editorWidthClass} h-full overflow-hidden flex flex-col bg-white`}>
            <div className="flex-1 min-h-0 overflow-hidden">
              <CodeEditor
                htmlCode={currentHtml}
                cssCode={currentCss}
                activeTab={activeEditorTab}
                onChangeTab={setActiveEditorTab}
                onChangeHtml={(val) => {
                  setHtmlCodes((prev) => ({
                    ...prev,
                    [currentLesson.id]: val,
                  }));
                }}
                onChangeCss={(val) => {
                  setCssCodes((prev) => ({
                    ...prev,
                    [currentLesson.id]: val,
                  }));
                }}
                fontSize={fontSize}
                onRunCode={handleRunCode}
                editingLine={editingLine}
                onChangeEditingLine={setEditingLine}
                isMobile={viewport.isMobile}
                isCompactHeight={viewport.isCompactHeight}
              />
            </div>
          </div>
        )}

        {/* COLUMN 3: Result Pane - Live Preview */}
        {showPreview && (
          <div className={`${previewWidthClass} h-full overflow-hidden bg-slate-50`}>
            <ResultPane
              lesson={currentLesson}
              htmlCode={currentHtml}
              cssCode={currentCss}
              editingLine={editingLine}
              isMobile={viewport.isMobile}
              isCompactHeight={viewport.isCompactHeight}
              onNavigateToError={(_line, source) => {
                setActiveEditorTab(source);
                if (viewport.isMobilePortrait) {
                  setMobilePane('editor');
                } else if (viewport.isMobileLandscape && mobilePane === 'preview') {
                  setMobilePane('split');
                } else if (viewport.isTablet && tabletSplit === 'guide-preview') {
                  setTabletSplit('code-preview');
                }
              }}
            />
          </div>
        )}
      </main>

      {/* MOBILE PORTRAIT THUMB-ZONE BOTTOM NAVIGATION BAR (< 768px portrait) */}
      {viewport.isMobilePortrait && (
        <nav
          aria-label="Điều hướng khu vực làm việc"
          className="bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-3 shrink-0 pb-safe select-none shadow-[0_-2px_10px_rgba(15,23,42,0.04)]"
        >
          <button
            onClick={() => setMobilePane('guide')}
            className={`min-h-[52px] py-1.5 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer relative ${
              mobilePane === 'guide'
                ? 'text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            {mobilePane === 'guide' && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-blue-600 rounded-full" />
            )}
            <BookOpen className="w-5 h-5" />
            <span className="text-[11px] leading-tight whitespace-nowrap">Bài học</span>
          </button>

          <button
            onClick={() => setMobilePane('editor')}
            className={`min-h-[52px] py-1.5 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer relative ${
              mobilePane === 'editor'
                ? 'text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            {mobilePane === 'editor' && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-blue-600 rounded-full" />
            )}
            <div className="relative">
              <Code2 className="w-5 h-5" />
              {syntaxErrorCount > 0 && (
                <span className="absolute -top-1 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {syntaxErrorCount}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-tight whitespace-nowrap">Soạn thảo</span>
          </button>

          <button
            onClick={() => setMobilePane('preview')}
            className={`min-h-[52px] py-1.5 flex flex-col items-center justify-center gap-0.5 transition cursor-pointer relative ${
              mobilePane === 'preview'
                ? 'text-blue-600 font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            {mobilePane === 'preview' && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-blue-600 rounded-full" />
            )}
            <Eye className="w-5 h-5" />
            <span className="text-[11px] leading-tight whitespace-nowrap">Xem trước</span>
          </button>
        </nav>
      )}

      {/* MODALS */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        fontSize={fontSize}
        onChangeFontSize={handleSaveFontSize}
      />

      <SolutionModal
        isOpen={isSolutionOpen}
        onClose={() => setIsSolutionOpen(false)}
        lesson={currentLesson}
        onApplySolution={handleApplySolution}
      />

      <SampleModal
        isOpen={isSamplesOpen}
        onClose={() => setIsSamplesOpen(false)}
        lesson={currentLesson}
        onLoadSample={handleLoadSample}
      />

      {/* DEDICATED SENIOR HTML AI ASSISTANT MODAL */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        currentLesson={currentLesson}
        allLessons={LESSONS}
        onSelectLesson={(lesson) => setCurrentLesson(lesson)}
        currentHtml={currentHtml}
        currentCss={currentCss}
        onInsertCodeSnippet={handleInsertSnippet}
      />

      {/* Reset Confirmation Dialog (Replaces window.confirm) */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Xác nhận khôi phục mã nguồn?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              Bạn có chắc chắn muốn đặt lại mã nguồn ban đầu của <b className="text-blue-600">{currentLesson.lessonNumber}: {currentLesson.title}</b>? Các chỉnh sửa hiện tại của bạn trong bài này sẽ được thay thế bằng mã khởi tạo chuẩn SGK.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={executeResetCode}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition cursor-pointer active:scale-95"
              >
                Đồng ý làm mới
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
