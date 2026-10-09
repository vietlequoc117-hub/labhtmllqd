import React, { useState, useEffect, useRef } from 'react';
import { Lesson, DomTestResult, TutorMessage } from '../types';
import { resolveVirtualPaths } from '../data/mockAssets';
import {
  Eye,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  RotateCcw,
  ExternalLink,
  Send,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
  Trophy,
  ArrowRight,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResultPaneProps {
  lesson: Lesson;
  htmlCode: string;
  cssCode: string;
  testResults: DomTestResult[];
  activeTab: 'preview' | 'grader' | 'tutor';
  onChangeTab: (tab: 'preview' | 'grader' | 'tutor') => void;
  onNextLesson?: () => void;
  onOpenSettings: () => void;
  customApiKey?: string;
}

export const ResultPane: React.FC<ResultPaneProps> = ({
  lesson,
  htmlCode,
  cssCode,
  testResults,
  activeTab,
  onChangeTab,
  onNextLesson,
  onOpenSettings,
  customApiKey,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [tutorMessages, setTutorMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Xin chào em! Thầy/cô là Trợ lý Sư phạm Tin học 12. Khi em gặp khó khăn về thẻ HTML, bảng table hay biểu mẫu form, hãy hỏi thầy/cô nhé! Thầy/cô sẽ phân tích mã nguồn và gợi ý phương hướng để em tự sửa code thành công.`,
      timestamp: Date.now(),
    },
  ]);
  const [userQuestion, setUserQuestion] = useState('');
  const [isAskingAI, setIsAskingAI] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Compute test stats
  const totalTests = testResults.length;
  const passedTests = testResults.filter((t) => t.passed).length;
  const scorePercent = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  const isAllPassed = totalTests > 0 && passedTests === totalTests;

  // Trigger confetti when 100% achieved
  useEffect(() => {
    if (isAllPassed) {
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [isAllPassed]);

  // Update iframe preview content
  const updateIframe = () => {
    if (!iframeRef.current) return;
    const processedHtml = resolveVirtualPaths(htmlCode);
    const fullDocument = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${cssCode}
  </style>
</head>
<body>
  ${processedHtml}
</body>
</html>`;
    iframeRef.current.srcdoc = fullDocument;
  };

  useEffect(() => {
    updateIframe();
  }, [htmlCode, cssCode, lesson.id]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tutorMessages, isAskingAI]);

  // Ask Gemini AI Tutor
  const handleAskTutor = async (questionText?: string) => {
    const question = (questionText || userQuestion).trim();
    if (!question && !questionText) return;

    const userMsg: TutorMessage = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: question,
      timestamp: Date.now(),
    };

    setTutorMessages((prev) => [...prev, userMsg]);
    setUserQuestion('');
    setIsAskingAI(true);

    const failedTitles = testResults.filter((t) => !t.passed).map((t) => `${t.title}: ${t.message}`);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle: `${lesson.lessonNumber}: ${lesson.title}`,
          lessonObjective: lesson.objective,
          codeHtml: htmlCode,
          codeCss: cssCode,
          failedTests: failedTitles,
          userQuestion: question,
          customApiKey: customApiKey || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Lỗi kết nối Trợ lý AI.');
      }

      const aiMsg: TutorMessage = {
        id: 'ai_' + Date.now(),
        role: 'assistant',
        content: data.advice,
        timestamp: Date.now(),
      };
      setTutorMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      // Local fallback pedagogical feedback if offline or no key
      let fallbackText = `Thầy/cô đang kiểm tra mã của em cho ${lesson.lessonNumber}:`;
      if (failedTitles.length > 0) {
        fallbackText += `\n• Em đang chưa đạt: ${failedTitles[0]}\n• Em hãy kiểm tra xem thẻ đã đóng đúng cặp chưa (ví dụ: <table>...</table>, <form>...</form>).\n• Hãy xem lại phần "Kiến thức nhanh" ở cột bên trái nhé!`;
      } else {
        fallbackText += `\n• Mã HTML của em đã cơ bản đầy đủ các tiêu chí!\n• Em có thể chỉnh thêm CSS trong tab style.css để giao diện trông đẹp mắt hơn nhé.`;
      }

      const aiMsg: TutorMessage = {
        id: 'ai_' + Date.now(),
        role: 'assistant',
        content: fallbackText,
        timestamp: Date.now(),
      };
      setTutorMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsAskingAI(false);
    }
  };

  const openInNewWindow = () => {
    const processedHtml = resolveVirtualPaths(htmlCode);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${lesson.title} - Xem trước</title>
          <style>${cssCode}</style>
        </head>
        <body>${processedHtml}</body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <section className="h-full flex flex-col bg-slate-900 select-none overflow-hidden">
      {/* Result Tabs Navigation */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-1.5">
          {/* Tab 1: Live Preview */}
          <button
            onClick={() => onChangeTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t transition cursor-pointer ${
              activeTab === 'preview'
                ? 'text-white bg-slate-950 border-t-2 border-blue-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Xem trước</span>
          </button>

          {/* Tab 2: DOM Grader */}
          <button
            onClick={() => onChangeTab('grader')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t transition cursor-pointer ${
              activeTab === 'grader'
                ? 'text-white bg-slate-950 border-t-2 border-emerald-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chấm điểm</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                isAllPassed
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {passedTests}/{totalTests}
            </span>
          </button>

          {/* Tab 3: Gemini AI Tutor */}
          <button
            onClick={() => onChangeTab('tutor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t transition cursor-pointer ${
              activeTab === 'tutor'
                ? 'text-white bg-slate-950 border-t-2 border-purple-500 shadow-sm'
                : 'text-purple-400 hover:text-purple-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Tutor</span>
          </button>
        </div>

        {/* Viewport size toggles (only when preview tab is active) */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded transition cursor-pointer ${
                deviceMode === 'desktop' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
              }`}
              title="Máy tính để bàn (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded transition cursor-pointer ${
                deviceMode === 'tablet' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
              }`}
              title="Máy tính bảng (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded transition cursor-pointer ${
                deviceMode === 'mobile' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
              }`}
              title="Điện thoại di động (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={updateIframe}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
              title="Tải lại iframe"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={openInNewWindow}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
              title="Mở tab mới"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* VIEWPORT BODY */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-950">
        {/* =========================================
            TAB 1: LIVE PREVIEW
        ========================================= */}
        {activeTab === 'preview' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/60">
            {/* Simulated Browser URL bar */}
            <div className="h-8 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="bg-slate-950/70 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="truncate">virtual://lab-tinhoc12/{lesson.lessonNumber.toLowerCase().replace(' ', '')}/index.html</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                Sandbox Mode
              </span>
            </div>

            {/* Iframe container with responsive device sizing */}
            <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 overflow-auto">
              <div
                className={`h-full bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 border border-slate-700/60 ${
                  deviceMode === 'desktop'
                    ? 'w-full'
                    : deviceMode === 'tablet'
                    ? 'w-[768px]'
                    : 'w-[375px]'
                }`}
              >
                <iframe
                  ref={iframeRef}
                  title="Kết quả trang web học sinh"
                  sandbox="allow-scripts"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: DOM INSPECTOR & GRADER
        ========================================= */}
        {activeTab === 'grader' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 text-slate-200">
            {/* Score card banner */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-800 p-4 rounded-xl border border-slate-700 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Đánh giá tự động theo SGK
                  </h3>
                  <p className="text-sm font-extrabold text-white mt-0.5">
                    {lesson.lessonNumber}: {lesson.title}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-400">
                    {scorePercent}%
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {passedTests}/{totalTests} Tiêu chí Đạt
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${scorePercent}%` }}
                />
              </div>

              {/* Congratulatory or Encouragement message */}
              {isAllPassed ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-3 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-300">
                        Xuất sắc! Em đã hoàn thành 100% yêu cầu bài học.
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        Cấu trúc thẻ DOM và thuộc tính hoàn toàn chính xác theo chuẩn SGK Tin học 12.
                      </p>
                    </div>
                  </div>
                  {onNextLesson && (
                    <button
                      onClick={onNextLesson}
                      className="shrink-0 flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition active:scale-95 shadow cursor-pointer"
                    >
                      <span>Bài kế tiếp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hãy kiểm tra danh sách tiêu chí bên dưới. Các mục màu vàng/đỏ cần được bổ sung thêm thẻ hoặc thuộc tính tương ứng vào mã HTML.
                </p>
              )}
            </div>

            {/* Detailed DOM test items */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Chi tiết từng tiêu chí kiểm tra DOM:
              </h4>

              {testResults.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all ${
                    item.passed
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-amber-950/20 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs font-bold text-slate-100">
                          {item.title}
                        </h5>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.passed
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {item.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {item.message}
                      </p>
                      {item.details && (
                        <div className="mt-1.5 text-[10px] font-mono text-slate-400 bg-slate-950/70 p-1.5 rounded border border-slate-800">
                          {item.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 3: GEMINI AI TUTOR
        ========================================= */}
        {activeTab === 'tutor' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-900 text-slate-200">
            {/* AI Tutor Info Header */}
            <div className="p-3 border-b border-slate-800 bg-purple-950/25 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-purple-200">
                    Trợ lý Sư phạm Tin học 12 (Gemini AI)
                  </h4>
                  <p className="text-[10px] text-purple-300/80">
                    Định hướng tư duy, giải thích lỗi sai & gợi ý sửa code
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenSettings}
                className="text-[11px] flex items-center gap-1 text-purple-300 hover:text-purple-100 bg-purple-900/30 border border-purple-700/40 px-2 py-1 rounded transition cursor-pointer"
                title="Cấu hình API Key cá nhân"
              >
                <KeyRound className="w-3 h-3" />
                <span>API Key</span>
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
              {tutorMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 shadow-sm'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isAskingAI && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-6 h-6 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-3 text-xs text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                    <span>Thầy/cô đang xem xét mã nguồn của em...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-925/50 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
              <button
                onClick={() => handleAskTutor('Hãy kiểm tra xem code của em đang bị lỗi gì và hướng dẫn em cách sửa.')}
                disabled={isAskingAI}
                className="shrink-0 text-[11px] bg-slate-800 hover:bg-slate-750 text-purple-300 hover:text-purple-200 border border-purple-500/20 px-2.5 py-1 rounded-full transition cursor-pointer disabled:opacity-50"
              >
                💡 Kiểm tra lỗi code của em
              </button>
              <button
                onClick={() => handleAskTutor('Tại sao bài của em chưa đạt đủ các tiêu chí chấm tự động?')}
                disabled={isAskingAI}
                className="shrink-0 text-[11px] bg-slate-800 hover:bg-slate-750 text-purple-300 hover:text-purple-200 border border-purple-500/20 px-2.5 py-1 rounded-full transition cursor-pointer disabled:opacity-50"
              >
                ❓ Vì sao chưa đạt tiêu chí?
              </button>
              <button
                onClick={() => handleAskTutor(`Gợi ý cho em các thẻ quan trọng cần dùng trong ${lesson.lessonNumber}.`)}
                disabled={isAskingAI}
                className="shrink-0 text-[11px] bg-slate-800 hover:bg-slate-750 text-purple-300 hover:text-purple-200 border border-purple-500/20 px-2.5 py-1 rounded-full transition cursor-pointer disabled:opacity-50"
              >
                📖 Thẻ quan trọng của bài
              </button>
            </div>

            {/* Question Input Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskTutor();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Đặt câu hỏi cho Trợ lý Sư phạm..."
                  disabled={isAskingAI}
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isAskingAI || !userQuestion.trim()}
                  className="bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition active:scale-95 flex items-center gap-1 shadow cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hỏi</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
