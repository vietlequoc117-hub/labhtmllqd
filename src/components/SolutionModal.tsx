import React, { useState } from 'react';
import { Lesson } from '../types';
import { X, Lightbulb, Copy, Check, ArrowDownToLine } from 'lucide-react';

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  onApplySolution: (html: string, css?: string) => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onApplySolution,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(lesson.solutionHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (confirm('Em có chắc muốn thay thế mã hiện tại bằng mã mẫu giải không?')) {
      onApplySolution(lesson.solutionHtml, lesson.solutionCss);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">
                Mã giải mẫu tham khảo: {lesson.lessonNumber}
              </h3>
              <p className="text-[11px] text-slate-400">{lesson.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950">
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-300">
            💡 <b>Lời khuyên từ giáo viên:</b> Em hãy cố gắng tự đọc gợi ý và thử viết thẻ trước. Chỉ nên xem mã mẫu khi đã thử nhiều lần mà chưa đạt nhé!
          </div>

          <div className="relative">
            <pre className="bg-slate-900 p-4 rounded-xl text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
              <code>{lesson.solutionHtml}</code>
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép mã</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer shadow-sm"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Chèn vào bài làm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
