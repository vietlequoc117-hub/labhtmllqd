import React, { useState } from 'react';
import { QuizQuestion, QuizLevel } from '../types';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ChevronRight,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Play,
  Code
} from 'lucide-react';

interface QuizTabProps {
  questions: QuizQuestion[];
  lessonNumber: string;
  onLoadSnippetCode?: (html: string, css: string, questionId: number) => void;
  onRestoreLessonCode?: () => void;
  loadedQuestionId?: number | null;
}

export const QuizTab: React.FC<QuizTabProps> = ({
  questions,
  lessonNumber,
  onLoadSnippetCode,
  onRestoreLessonCode,
  loadedQuestionId,
}) => {
  // Store selected answers: questionId -> optionIndex
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  // Toggle to show all answers and explanations immediately
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | QuizLevel>('all');
  // State for toggling inline live preview sandbox per question
  const [inlinePreviewOpen, setInlinePreviewOpen] = useState<Record<number, boolean>>({});
  // Feedback state when clicking "Nạp vào Chạy thử"
  const [justLoadedId, setJustLoadedId] = useState<number | null>(null);

  const filteredQuestions = questions.filter((q) => {
    if (activeFilter === 'all') return true;
    return q.level === activeFilter;
  });

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuestion = (questionId: number) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowAllAnswers(false);
  };

  const toggleInlinePreview = (questionId: number) => {
    setInlinePreviewOpen((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleLoadSnippet = (q: QuizQuestion) => {
    if (!q.snippet || !onLoadSnippetCode) return;
    onLoadSnippetCode(q.snippet.html || '', q.snippet.css || '', q.id);
    setJustLoadedId(q.id);
    setTimeout(() => {
      setJustLoadedId(null);
    }, 2500);
  };

  // Helper to build sandbox preview html for inline iframe
  const getInlinePreviewDoc = (html?: string, css?: string) => {
    const cleanCss = (css || '').replace(/<\/?style>/gi, '').trim();
    const cleanHtml = html || '<p>Không có mã HTML</p>';
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 12px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.5;
    }
    ${cleanCss}
  </style>
</head>
<body>
  ${cleanHtml}
</body>
</html>`;
  };

  // Calculate score in real time
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] === q.correctIndex
  ).length;

  const score10 = questions.length > 0 ? ((correctCount / questions.length) * 10).toFixed(1) : '0.0';

  const getLevelBadgeClass = (level: QuizLevel) => {
    switch (level) {
      case 'Biết':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Hiểu':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Vận dụng':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="space-y-3.5 pb-6">
      {/* Quiz Header & Live Score Card */}
      <div className="bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900 border border-blue-500/30 rounded-xl p-3.5 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center font-bold text-xs border border-blue-500/30">
              <HelpCircle className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>10 Câu Trắc Nghiệm: {lessonNumber}</span>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <Zap className="w-2.5 h-2.5 fill-current" /> Hiện đáp án luôn
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                4 câu mức <b className="text-blue-300">Biết</b>, 3 câu mức <b className="text-amber-300">Hiểu</b>, 3 câu mức <b className="text-emerald-300">Vận dụng</b>
              </p>
            </div>
          </div>

          {/* Real-time score counter */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                {correctCount}/{questions.length} đúng ({score10}/10đ)
              </div>
            </div>
          </div>
        </div>

        {/* Level Filter Tabs & View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Tất cả (10)
            </button>
            <button
              onClick={() => setActiveFilter('Biết')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'Biết'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-blue-300 hover:text-white'
              }`}
            >
              Biết (4)
            </button>
            <button
              onClick={() => setActiveFilter('Hiểu')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'Hiểu'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-800 text-amber-300 hover:text-white'
              }`}
            >
              Hiểu (3)
            </button>
            <button
              onClick={() => setActiveFilter('Vận dụng')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'Vận dụng'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-emerald-300 hover:text-white'
              }`}
            >
              Vận dụng (3)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                showAllAnswers
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
              }`}
              title="Xem nhanh tất cả đáp án đúng và lời giải"
            >
              {showAllAnswers ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Ẩn đáp án chung</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hiện tất cả đáp án</span>
                </>
              )}
            </button>

            {totalAnswered > 0 && (
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
                title="Làm lại tất cả câu trắc nghiệm"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Làm lại</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Banner if a quiz snippet is loaded into the main editor */}
      {loadedQuestionId && (
        <div className="flex items-center justify-between gap-2 p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>
              Đang chạy thử mã nguồn <strong>Câu {loadedQuestionId}</strong> trong Phòng thực hành ảo (cột giữa & cột phải).
            </span>
          </div>
          {onRestoreLessonCode && (
            <button
              onClick={onRestoreLessonCode}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-2.5 py-1 rounded-md transition font-medium cursor-pointer shrink-0"
            >
              Khôi phục bài làm
            </button>
          )}
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isRevealed = isAnswered || showAllAnswers;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition p-3.5 space-y-3 ${
                isRevealed
                  ? isAnswered
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-blue-950/20 border-blue-500/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-white bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700 font-mono">
                    Câu {q.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getLevelBadgeClass(
                      q.level
                    )}`}
                  >
                    Mức {q.level}
                  </span>
                  {(loadedQuestionId === q.id || justLoadedId === q.id) && (
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold animate-pulse">
                      <Zap className="w-2.5 h-2.5 fill-current text-emerald-400" /> Đang chạy thử
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isAnswered ? (
                    isCorrect ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2 py-0.5 rounded-md">
                        <XCircle className="w-3.5 h-3.5" /> Sai
                      </span>
                    )
                  ) : showAllAnswers ? (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      Đáp án: {String.fromCharCode(65 + q.correctIndex)}
                    </span>
                  ) : null}

                  {isAnswered && (
                    <button
                      onClick={() => handleResetQuestion(q.id)}
                      className="text-[10px] text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-700 transition cursor-pointer"
                      title="Chọn lại câu này"
                    >
                      Chọn lại
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {q.question}
              </p>

              {/* Code Snippet Table (Code CSS & Code HTML) with Test Run & Preview */}
              {q.snippet && (
                <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950/90 text-xs my-2.5 shadow-md">
                  {/* Action Bar on top of Code Box */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-slate-800/95 border-b border-slate-700">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                      <Code className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mã nguồn minh họa (Code CSS & Code HTML)</span>
                      {(loadedQuestionId === q.id || justLoadedId === q.id) && (
                        <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                          <Check className="w-3 h-3 text-emerald-400" /> Đang chạy thử
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Button: Nạp vào Chạy thử (Virtual HTML Lab) */}
                      {onLoadSnippetCode && (
                        <button
                          type="button"
                          onClick={() => handleLoadSnippet(q)}
                          className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md transition shadow-xs cursor-pointer active:scale-95 ${
                            loadedQuestionId === q.id || justLoadedId === q.id
                              ? 'bg-emerald-600 text-white ring-1 ring-emerald-400'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold hover:shadow-amber-500/20'
                          }`}
                          title="Nạp mã này vào Phòng thực hành ảo HTML để chỉnh sửa và chạy thử"
                        >
                          {loadedQuestionId === q.id || justLoadedId === q.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Đã nạp vào Chạy thử</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current text-slate-950" />
                              <span>⚡ Nạp vào Chạy thử</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Button: Toggle Inline Preview */}
                      <button
                        type="button"
                        onClick={() => toggleInlinePreview(q.id)}
                        className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md border transition cursor-pointer ${
                          inlinePreviewOpen[q.id]
                            ? 'bg-sky-600/30 text-sky-300 border-sky-500/50'
                            : 'bg-slate-700/70 hover:bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                        title="Xem trực tiếp kết quả hiển thị trên trình duyệt ngay tại đây"
                      >
                        {inlinePreviewOpen[q.id] ? (
                          <>
                            <EyeOff className="w-3 h-3 text-sky-400" />
                            <span>Đóng xem thử</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 text-sky-400" />
                            <span>Xem kết quả</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 2-column Table Header: Code CSS & Code HTML */}
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-700/80 bg-slate-900/90 divide-y md:divide-y-0 md:divide-x divide-slate-700/80 text-center font-bold italic py-1 text-slate-300 text-[11px]">
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>Code CSS</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>Code HTML</span>
                    </div>
                  </div>

                  {/* Code columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 font-mono text-[11px] p-0">
                    <div className="p-2.5 bg-slate-950 text-amber-300/90 whitespace-pre overflow-x-auto leading-relaxed max-h-48">
                      {q.snippet.css || '/* Không có định dạng CSS */'}
                    </div>
                    <div className="p-2.5 bg-slate-950 text-blue-300/90 whitespace-pre overflow-x-auto leading-relaxed max-h-48">
                      {q.snippet.html || '<!-- Không có mã HTML -->'}
                    </div>
                  </div>

                  {/* INLINE LIVE PREVIEW SANDBOX IFRAME */}
                  {inlinePreviewOpen[q.id] && (
                    <div className="border-t border-slate-700 bg-slate-900 p-2.5 space-y-1.5 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Kết quả hiển thị trên trình duyệt (Live Browser Preview):</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Môi trường thử nghiệm HTML5</span>
                      </div>
                      <div className="rounded-md border border-slate-600 bg-white shadow-inner overflow-hidden">
                        <iframe
                          srcDoc={getInlinePreviewDoc(q.snippet.html, q.snippet.css)}
                          title={`Preview câu ${q.id}`}
                          className="w-full h-36 border-0 bg-white"
                          sandbox="allow-same-origin allow-scripts"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Multiple Choice Options (A, B, C, D) */}
              <div className="space-y-1.5 pt-1">
                {q.options.map((option, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                  const isSelected = userAnswer === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optionStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300';
                  let badgeStyle = 'bg-slate-800 text-slate-400 border border-slate-700';

                  if (isRevealed) {
                    if (isThisCorrect) {
                      // Correct option is always highlighted green once answered or revealed
                      optionStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-semibold shadow-xs ring-1 ring-emerald-500/20';
                      badgeStyle = 'bg-emerald-500 text-white border border-emerald-400 font-bold';
                    } else if (isSelected && !isThisCorrect) {
                      // Selected wrong option highlighted in red
                      optionStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-300 font-medium';
                      badgeStyle = 'bg-rose-500 text-white border border-rose-400 font-bold';
                    } else {
                      // Other unselected options dimmed
                      optionStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-400 opacity-80';
                      badgeStyle = 'bg-slate-800/60 text-slate-500 border border-slate-800';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-blue-600/20 border-blue-500 text-blue-200 font-semibold shadow-xs';
                    badgeStyle = 'bg-blue-500 text-white';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-2.5 rounded-lg border transition flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed ${optionStyle}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 font-mono transition ${badgeStyle}`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 pt-0.5">{option}</span>
                      {isRevealed && isThisCorrect && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Đáp án đúng</span>
                        </span>
                      )}
                      {isRevealed && isSelected && !isThisCorrect && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 shrink-0 mt-0.5">
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Bạn chọn</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown immediately when answered or when showAllAnswers is active) */}
              {isRevealed && (
                <div className={`mt-2.5 p-3 rounded-lg border text-[11px] space-y-1.5 animate-fadeIn ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/30'
                      : 'bg-rose-950/20 border-rose-500/30'
                    : 'bg-blue-950/40 border-blue-500/25'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 text-blue-300">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                    <span>
                      Giải thích chi tiết (Đáp án đúng:{' '}
                      <strong className="text-emerald-300 underline underline-offset-2">
                        {String.fromCharCode(65 + q.correctIndex)}
                      </strong>
                      ):
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed pl-5">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
