import React from 'react';
import { Lesson } from '../types';
import {
  Code2,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Settings as SettingsIcon,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  lessons: Lesson[];
  currentLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  onRunCode: () => void;
  onResetCode: () => void;
  onCheckCode: () => void;
  onOpenSamples: () => void;
  onOpenSettings: () => void;
  isEvaluating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lessons,
  currentLesson,
  onSelectLesson,
  onRunCode,
  onResetCode,
  onCheckCode,
  onOpenSamples,
  onOpenSettings,
  isEvaluating = false,
}) => {
  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 md:px-4 shrink-0 shadow-md select-none">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10">
          <Code2 className="w-5 h-5 text-blue-100" />
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-white text-base">LQD_HTML_LAB</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Phòng thực hành ảo HTML</p>
        </div>
      </div>

      {/* Lesson Selector Dropdown */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={currentLesson.id}
            onChange={(e) => {
              const selected = lessons.find((l) => l.id === Number(e.target.value));
              if (selected) onSelectLesson(selected);
            }}
            className="bg-slate-800 hover:bg-slate-750 text-slate-100 font-semibold text-xs md:text-sm py-1.5 pl-3 pr-8 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition appearance-none cursor-pointer"
          >
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id} className="bg-slate-900 text-slate-100">
                {lesson.lessonNumber}: {lesson.title}
              </option>
            ))}
          </select>
          <BookOpen className="w-3.5 h-3.5 text-blue-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Run Code Button */}
        <button
          onClick={onRunCode}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer ring-1 ring-blue-400/30"
          title="Chạy mã (Ctrl + Enter)"
        >
          <Play className="w-3.5 h-3.5 fill-current text-blue-100" />
          <span className="hidden md:inline">Chạy mã</span>
        </button>

        {/* Check Progress / DOM Inspector */}
        <button
          onClick={onCheckCode}
          disabled={isEvaluating}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer ring-1 ring-emerald-400/30 disabled:opacity-50"
          title="Chấm bài tự động kiểm tra DOM"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-100" />
          <span className="hidden md:inline">Chấm tự động</span>
        </button>

        {/* 10 Samples Button */}
        <button
          onClick={onOpenSamples}
          className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs px-2.5 py-1.5 rounded-lg transition active:scale-95 cursor-pointer shadow-sm"
          title="Kho 10 mã mẫu thực hành sẵn có cho bài này (chạy ngay)"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold">10 Mã Mẫu</span>
        </button>

        {/* Reset Code Button */}
        <button
          onClick={onResetCode}
          className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition cursor-pointer"
          title="Khôi phục mã ban đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition cursor-pointer"
          title="Cài đặt"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
