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
    onApplySolution(lesson.solutionHtml, lesson.solutionCss);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-800">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Mã giải mẫu tham khảo: {lesson.lessonNumber}
              </h3>
              <p className="text-[11px] text-slate-500">{lesson.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800">
            💡 <b>Lời khuyên từ giáo viên:</b> Em hãy cố gắng tự đọc gợi ý và thử viết thẻ trước. Chỉ nên xem mã mẫu khi đã thử nhiều lần mà chưa đạt nhé!
          </div>

          <div className="relative">
            <pre className="bg-slate-950 p-4 rounded-xl text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed shadow-xs">
              <code>{lesson.solutionHtml}</code>
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
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
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-medium transition cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={handleApply}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
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
