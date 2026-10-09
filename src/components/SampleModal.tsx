import React, { useState } from 'react';
import { Lesson, CodeSample } from '../types';
import { getLessonSamples } from '../data/samples';
import { X, Play, Code2, Check, Sparkles, BookOpen } from 'lucide-react';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  onLoadSample: (sample: CodeSample) => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onLoadSample,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<number>(1);
  const samples = getLessonSamples(lesson.id);
  const selectedSample = samples.find((s) => s.id === selectedSampleId) || samples[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 md:p-6">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm">
                Kho 10 Mã Mẫu Có Sẵn: {lesson.lessonNumber}
              </h3>
              <p className="text-[11px] text-slate-400">
                {lesson.title} &bull; Bấm &quot;Nạp mã &amp; Chạy ngay&quot; để quan sát kết quả
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: List of 10 samples */}
          <div className="w-full md:w-80 border-r border-slate-800 bg-slate-950/60 overflow-y-auto p-2.5 space-y-1.5 shrink-0">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span>Danh sách 10 ví dụ:</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">
                {samples.length}/10
              </span>
            </div>

            {samples.map((s) => {
              const isSelected = s.id === selectedSample?.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSampleId(s.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition cursor-pointer flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500/60 text-white shadow-sm'
                      : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold leading-tight line-clamp-1">
                      {s.title}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 ml-1" />}
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {s.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Preview Selected Sample Code */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            {selectedSample ? (
              <>
                <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between shrink-0">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{selectedSample.title}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {selectedSample.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onLoadSample(selectedSample);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer shrink-0"
                  >
                    <Play className="w-3 h-3 fill-current text-emerald-100" />
                    <span>Nạp mã &amp; Chạy ngay</span>
                  </button>
                </div>

                {/* Code preview area */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-400 block mb-1">
                      Mã HTML (index.html):
                    </span>
                    <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-200 overflow-x-auto leading-relaxed">
                      <code>{selectedSample.html}</code>
                    </pre>
                  </div>

                  {selectedSample.css && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-400 block mb-1">
                        Mã CSS (style.css):
                      </span>
                      <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto leading-relaxed">
                        <code>{selectedSample.css}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                Chưa có mã mẫu cho bài học này.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
