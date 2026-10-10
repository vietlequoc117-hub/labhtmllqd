import React, { useState } from 'react';
import { QuizQuestion, QuizLevel } from '../types';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, ChevronRight, Check } from 'lucide-react';

interface QuizTabProps {
  questions: QuizQuestion[];
  lessonNumber: string;
}

export const QuizTab: React.FC<QuizTabProps> = ({ questions, lessonNumber }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | QuizLevel>('all');

  const filteredQuestions = questions.filter((q) => {
    if (activeFilter === 'all') return true;
    return q.level === activeFilter;
  });

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Calculate score
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] === q.correctIndex
  ).length;

  const score10 = ((correctCount / questions.length) * 10).toFixed(1);

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
      {/* Quiz Header & Summary Card */}
      <div className="bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-slate-900 border border-blue-500/25 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center font-bold text-xs border border-blue-500/30">
              <HelpCircle className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">
                10 Câu Trắc Nghiệm: {lessonNumber}
              </h3>
              <p className="text-[11px] text-slate-400">
                4 câu mức <b className="text-blue-300">Biết</b>, 3 câu mức <b className="text-amber-300">Hiểu</b>, 3 câu mức <b className="text-emerald-300">Vận dụng</b>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
              {totalAnswered}/{questions.length} Đã chọn
            </span>
          </div>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-1 text-xs">
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

        {/* Result Action Bar */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={totalAnswered === 0}
              className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-xs py-2 px-3 rounded-lg transition shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Nộp bài &amp; Xem kết quả chấm</span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Kết quả:</span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {correctCount}/{questions.length} câu đúng ({score10}/10 điểm)
                </span>
              </div>
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition cursor-pointer"
                title="Làm lại trắc nghiệm"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Làm lại</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition p-3.5 space-y-3 ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-rose-950/20 border-rose-500/40'
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
                </div>

                {showResults && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400">
                        <XCircle className="w-3.5 h-3.5" /> Sai
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Text */}
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {q.question}
              </p>

              {/* Code Snippet Table (Code CSS & Code HTML) as shown in user image */}
              {q.snippet && (
                <div className="rounded-lg overflow-hidden border border-slate-700 bg-black/40 text-xs my-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-700 bg-slate-800/90 divide-y md:divide-y-0 md:divide-x divide-slate-700 text-center font-bold italic py-1 text-slate-300">
                    <div>Code CSS</div>
                    <div>Code HTML</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 font-mono text-[11px] p-0">
                    <div className="p-2.5 bg-slate-950/80 text-amber-300/90 whitespace-pre overflow-x-auto leading-relaxed">
                      {q.snippet.css || '/* Không có định dạng CSS */'}
                    </div>
                    <div className="p-2.5 bg-slate-950/80 text-blue-300/90 whitespace-pre overflow-x-auto leading-relaxed">
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

                  let optionStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300';
                  if (showResults) {
                    if (isThisCorrect) {
                      optionStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected && !isThisCorrect) {
                      optionStyle = 'bg-rose-950/50 border-rose-500 text-rose-300';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-blue-600/20 border-blue-500 text-blue-200 font-semibold shadow-xs';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-2.5 rounded-lg border transition flex items-start gap-2.5 cursor-pointer disabled:cursor-default text-xs leading-relaxed ${optionStyle}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 font-mono ${
                          showResults && isThisCorrect
                            ? 'bg-emerald-500 text-white'
                            : showResults && isSelected && !isThisCorrect
                            ? 'bg-rose-500 text-white'
                            : isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 pt-0.5">{option}</span>
                      {showResults && isThisCorrect && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown when results are displayed) */}
              {showResults && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/25 text-[11px] space-y-1">
                  <div className="font-bold text-blue-300 flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    <span>Giải thích đáp án:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-4">
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
