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

  const handleLoadSnippet = (q: QuizQuestion) => {
    if (!q.snippet || !onLoadSnippetCode) return;
    onLoadSnippetCode(q.snippet.html || '', q.snippet.css || '', q.id);
    setJustLoadedId(q.id);
    setTimeout(() => {
      setJustLoadedId(null);
    }, 2500);
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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Hiểu':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Vận dụng':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-3.5 pb-6">
      {/* Quiz Header & Live Score Card */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs border border-blue-200">
              <HelpCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>10 Câu Trắc Nghiệm: {lessonNumber}</span>
              </h3>
              <p className="text-[11px] text-slate-600">
                4 câu mức <b className="text-blue-700">Biết</b>, 3 câu mức <b className="text-amber-700">Hiểu</b>, 3 câu mức <b className="text-emerald-700">Vận dụng</b>
              </p>
            </div>
          </div>

          {/* Real-time score counter */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-2.5 py-1 rounded-lg">
                {correctCount}/{questions.length} đúng ({score10}/10đ)
              </div>
            </div>
          </div>
        </div>

        {/* Level Filter Tabs & View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-blue-200/80">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Tất cả (10)
            </button>
            <button
              onClick={() => setActiveFilter('Biết')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'Biết'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-blue-700 hover:bg-slate-50'
              }`}
            >
              Biết (4)
            </button>
            <button
              onClick={() => setActiveFilter('Hiểu')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'Hiểu'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-amber-700 hover:bg-slate-50'
              }`}
            >
              Hiểu (3)
            </button>
            <button
              onClick={() => setActiveFilter('Vận dụng')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                activeFilter === 'Vận dụng'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-emerald-700 hover:bg-slate-50'
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
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
                className="flex items-center gap-1 text-[11px] bg-white hover:bg-slate-50 text-slate-700 px-2 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
                title="Làm lại tất cả câu trắc nghiệm"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Làm lại</span>
              </button>
            )}
          </div>
        </div>
      </div>

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
              className={`rounded-xl border transition p-3.5 space-y-3 shadow-xs ${
                isRevealed
                  ? isAnswered
                    ? isCorrect
                      ? 'bg-white border-emerald-300'
                      : 'bg-white border-rose-300'
                    : 'bg-white border-blue-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 font-mono">
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
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-300 px-1.5 py-0.5 rounded font-bold animate-pulse">
                      <Zap className="w-2.5 h-2.5 fill-current text-emerald-600" /> Đang chạy thử
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isAnswered ? (
                    isCorrect ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đúng
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded-md">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Sai
                      </span>
                    )
                  ) : showAllAnswers ? (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-md">
                      Đáp án: {String.fromCharCode(65 + q.correctIndex)}
                    </span>
                  ) : null}

                  {isAnswered && (
                    <button
                      onClick={() => handleResetQuestion(q.id)}
                      className="text-[10px] text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded border border-slate-200 transition cursor-pointer"
                      title="Chọn lại câu này"
                    >
                      Chọn lại
                    </button>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="text-xs text-slate-900 font-medium leading-relaxed">
                {q.question}
              </p>

              {/* Code Snippet Table (Code CSS & Code HTML) with Test Run & Preview */}
              {q.snippet && (
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-xs my-2.5 shadow-sm">
                  {/* Action Bar on top of Code Box */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-slate-900 border-b border-slate-800">
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
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold'
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
                    </div>
                  </div>

                  {/* 2-column Table Header: Code CSS & Code HTML */}
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-800 bg-slate-900/90 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-center font-bold italic py-1 text-slate-300 text-[11px]">
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
                    <div className="p-2.5 bg-slate-950 text-amber-300 whitespace-pre overflow-x-auto leading-relaxed max-h-48">
                      {q.snippet.css || '/* Không có định dạng CSS */'}
                    </div>
                    <div className="p-2.5 bg-slate-950 text-blue-300 whitespace-pre overflow-x-auto leading-relaxed max-h-48">
                      {q.snippet.html || '<!-- Không có mã HTML -->'}
                    </div>
                  </div>
                </div>
              )}

              {/* Multiple Choice Options (A, B, C, D) */}
              <div className="space-y-1.5 pt-1">
                {q.options.map((option, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                  const isSelected = userAnswer === optIdx;
                  const isThisCorrect = q.correctIndex === optIdx;

                  let optionStyle = 'bg-slate-50 hover:bg-blue-50/40 border-slate-200 text-slate-700';
                  let badgeStyle = 'bg-white text-slate-600 border border-slate-300';

                  if (isRevealed) {
                    if (isThisCorrect) {
                      // Correct option is always highlighted green once answered or revealed
                      optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold shadow-xs ring-1 ring-emerald-400/30';
                      badgeStyle = 'bg-emerald-600 text-white border border-emerald-500 font-bold';
                    } else if (isSelected && !isThisCorrect) {
                      // Selected wrong option highlighted in red
                      optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-medium';
                      badgeStyle = 'bg-rose-600 text-white border border-rose-500 font-bold';
                    } else {
                      // Other unselected options dimmed
                      optionStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-75';
                      badgeStyle = 'bg-slate-100 text-slate-400 border border-slate-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold shadow-xs';
                    badgeStyle = 'bg-blue-600 text-white';
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
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Đáp án đúng</span>
                        </span>
                      )}
                      {isRevealed && isSelected && !isThisCorrect && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 shrink-0 mt-0.5">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
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
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-rose-50 border-rose-300'
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 text-blue-700">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      Giải thích chi tiết (Đáp án đúng:{' '}
                      <strong className="text-emerald-700 underline underline-offset-2">
                        {String.fromCharCode(65 + q.correctIndex)}
                      </strong>
                      ):
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed pl-5">
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
