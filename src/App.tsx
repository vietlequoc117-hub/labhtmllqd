import React, { useState, useEffect, useCallback } from 'react';
import { LESSONS } from './data/lessons';
import { Lesson, DomTestResult } from './types';
import { evaluateStudentCode } from './utils/domEvaluator';
import { Header } from './components/Header';
import { LessonGuide } from './components/LessonGuide';
import { CodeEditor } from './components/CodeEditor';
import { ResultPane } from './components/ResultPane';
import { SettingsModal } from './components/SettingsModal';
import { SolutionModal } from './components/SolutionModal';
import { SampleModal } from './components/SampleModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { CodeSample } from './types';

export default function App() {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(LESSONS[0]);

  // Code state per lesson
  const [htmlCodes, setHtmlCodes] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    LESSONS.forEach((l) => {
      initial[l.id] = l.initialHtml;
    });
    return initial;
  });

  const [cssCodes, setCssCodes] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    LESSONS.forEach((l) => {
      initial[l.id] = l.initialCss;
    });
    return initial;
  });

  // Editor states
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css'>('html');

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

  // Initial evaluation on lesson change
  useEffect(() => {
    const results = evaluateStudentCode(currentLesson, currentHtml, currentCss);
    setTestResults(results);
  }, [currentLesson.id]);

  // Save font size
  const handleSaveFontSize = (size: number) => {
    setFontSize(size);
    localStorage.setItem('html12_fontSize', String(size));
  };

  // Handlers
  const handleRunCode = () => {
    runEvaluation();
  };

  const handleCheckCode = () => {
    runEvaluation();
  };

  const handleResetCode = () => {
    setIsResetConfirmOpen(true);
  };

  const executeResetCode = () => {
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
  };

  const handleLoadSample = (sample: CodeSample) => {
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
  };

  // Load snippet from Quiz Question into Lab Editor & Run live
  const handleLoadSnippetCode = (rawHtml: string, rawCss: string, questionId: number) => {
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
  };

  const handleRestoreLessonCode = () => {
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

  const handleNextLesson = () => {
    const currentIndex = LESSONS.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex >= 0 && currentIndex < LESSONS.length - 1) {
      setCurrentLesson(LESSONS[currentIndex + 1]);
    }
  };

  const handleInsertSnippet = (snippet: string) => {
    if (activeEditorTab === 'html') {
      setHtmlCodes((prev) => {
        const code = prev[currentLesson.id] ?? currentLesson.initialHtml;
        // Insert snippet before </body> if present, or at the end
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
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-800">
      {/* HEADER COMPONENT */}
      <Header
        lessons={LESSONS}
        currentLesson={currentLesson}
        onSelectLesson={(lesson) => {
          setCurrentLesson(lesson);
        }}
        onRunCode={handleRunCode}
        onResetCode={handleResetCode}
        onCheckCode={handleCheckCode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        isEvaluating={isEvaluating}
      />

      {/* 3-COLUMN MAIN WORKSPACE */}
      <main className="flex-1 flex overflow-hidden">
        {/* COLUMN 1: Lesson Guide & Tasks (28%) */}
        <div className="w-[28%] min-w-[280px] max-w-[380px] h-full overflow-hidden border-r border-slate-200 bg-white">
          <LessonGuide
            lesson={currentLesson}
            testResults={testResults}
            onInsertSnippet={handleInsertSnippet}
            onLoadSample={handleLoadSample}
            currentHtml={currentHtml}
            currentCss={currentCss}
            onLoadSnippetCode={handleLoadSnippetCode}
            onRestoreLessonCode={handleRestoreLessonCode}
            loadedSnippetQuestionId={loadedQuizSnippet?.lessonId === currentLesson.id ? loadedQuizSnippet.questionId : null}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            onLoadTargetCode={(html, css) => {
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
            }}
          />
        </div>

        {/* COLUMN 2: Code Editor (38%) */}
        <div className="w-[38%] min-w-[340px] flex-1 h-full overflow-hidden flex flex-col border-r border-slate-200 bg-white">
          <div className="flex-1 overflow-hidden">
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
            />
          </div>
        </div>

        {/* COLUMN 3: Result Pane - Live Preview (34%) */}
        <div className="w-[34%] min-w-[320px] max-w-[500px] h-full overflow-hidden bg-slate-50">
          <ResultPane
            lesson={currentLesson}
            htmlCode={currentHtml}
            cssCode={currentCss}
          />
        </div>
      </main>

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
        currentHtml={currentHtml}
        currentCss={currentCss}
        onInsertCodeSnippet={handleInsertSnippet}
      />

      {/* Reset Confirmation Dialog (Replaces window.confirm) */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse"></span>
              Xác nhận khôi phục mã nguồn?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Bạn có chắc chắn muốn đặt lại mã nguồn ban đầu của <b className="text-blue-600">{currentLesson.lessonNumber}: {currentLesson.title}</b>? Các chỉnh sửa hiện tại của bạn trong bài này sẽ được thay thế bằng mã khởi tạo chuẩn SGK.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={executeResetCode}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition cursor-pointer active:scale-95"
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
