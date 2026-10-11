import React from 'react';
import { Lesson } from '../types';
import {
  Code2,
  RotateCcw,
  Settings as SettingsIcon,
  BookOpen,
  Bot,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  lessons: Lesson[];
  currentLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  onRunCode?: () => void;
  onResetCode: () => void;
  onCheckCode?: () => void;
  onOpenSettings: () => void;
  onOpenAiAssistant?: () => void;
  isEvaluating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lessons,
  currentLesson,
  onSelectLesson,
  onRunCode,
  onResetCode,
  onCheckCode,
  onOpenSettings,
  onOpenAiAssistant,
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
        {/* Dedicated Senior AI Assistant Button */}
        {onOpenAiAssistant && (
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-purple-900/40 ring-1 ring-white/20 transition cursor-pointer active:scale-95 group"
            title="Mở Trợ lý AI Chuyên gia HTML"
          >
            <Bot className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="hidden xs:inline">Trợ lý AI</span>
            <span className="xs:hidden">AI</span>
          </button>
        )}

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
