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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 md:p-6">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-800">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Kho 10 Mã Mẫu Có Sẵn: {lesson.lessonNumber}
              </h3>
              <p className="text-[11px] text-slate-500">
                {lesson.title} &bull; Bấm &quot;Nạp mã &amp; Chạy ngay&quot; để quan sát kết quả
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: List of 10 samples */}
          <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/60 overflow-y-auto p-2.5 space-y-1.5 shrink-0">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span>Danh sách 10 ví dụ:</span>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono border border-blue-200">
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
                      ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-xs'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold leading-tight line-clamp-1">
                      {s.title}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />}
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1">
                    {s.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Preview Selected Sample Code */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {selectedSample ? (
              <>
                <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{selectedSample.title}</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {selectedSample.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onLoadSample(selectedSample);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition active:scale-95 cursor-pointer shrink-0"
                  >
                    <Play className="w-3 h-3 fill-current text-white" />
                    <span>Nạp mã &amp; Chạy ngay</span>
                  </button>
                </div>

                {/* Code preview area */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-mono text-xs bg-slate-50/40">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-600 block mb-1">
                      Mã HTML (index.html):
                    </span>
                    <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-100 overflow-x-auto leading-relaxed shadow-xs">
                      <code>{selectedSample.html}</code>
                    </pre>
                  </div>

                  {selectedSample.css && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">
                        Mã CSS (style.css):
                      </span>
                      <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-100 overflow-x-auto leading-relaxed shadow-xs">
                        <code>{selectedSample.css}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Chưa có mã mẫu cho bài học này.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
