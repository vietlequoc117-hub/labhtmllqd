import React from 'react';
import { LessonMission } from '../types';
import { resolveVirtualPaths } from '../data/mockAssets';
import { X, Target, CheckCircle2, Info, Play, ExternalLink } from 'lucide-react';

interface TargetPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: LessonMission | null;
  onApplyCode?: (html: string, css?: string) => void;
}

export const TargetPreviewModal: React.FC<TargetPreviewModalProps> = ({
  isOpen,
  onClose,
  mission,
  onApplyCode,
}) => {
  if (!isOpen || !mission) return null;

  const targetHtml = mission.targetResult.html;
  const targetCss = mission.targetResult.css || '';
  const processedHtml = resolveVirtualPaths(targetHtml);

  const previewDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    ${targetCss}
  </style>
</head>
<body>
  ${processedHtml}
</body>
</html>`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-800">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shadow-xs">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  {mission.title}
                </h3>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                  {mission.level}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {mission.targetResult.title} &bull; Kết quả mục tiêu học sinh cần lập trình để đạt được
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          {/* Mission Requirement Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs shadow-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Yêu cầu lập trình để đạt kết quả này:</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {mission.description}
            </p>
            <div className="space-y-1.5 pt-1">
              {mission.requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-bold uppercase tracking-wider text-[11px] text-amber-700 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                Giao diện kết quả mục tiêu mẫu:
              </span>
              <span className="text-[10px] text-slate-400">
                Khung hiển thị thực tế (Live Render)
              </span>
            </div>

            <div className="w-full h-72 rounded-xl bg-white overflow-hidden border-2 border-amber-400 shadow-sm">
              <iframe
                title="Target Preview"
                srcDoc={previewDoc}
                sandbox="allow-scripts"
                className="w-full h-full border-none bg-white"
              />
            </div>
          </div>

          {/* Hint */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950">Gợi ý cách code: </span>
              <span className="text-amber-800">{mission.hint}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Học sinh tự gõ code vào Editor để đạt đúng kết quả trên.
          </span>
          <div className="flex items-center gap-2">
            {onApplyCode && (
              <button
                onClick={() => {
                  onApplyCode(targetHtml, targetCss);
                  onClose();
                }}
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition shadow-xs cursor-pointer active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Nạp mã kết quả này</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
