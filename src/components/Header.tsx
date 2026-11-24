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
  isCompactHeight?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lessons,
  currentLesson,
  onSelectLesson,
  onResetCode,
  onOpenSettings,
  onOpenAiAssistant,
  isCompactHeight = false,
}) => {
  return (
    <header
      className={`${
        isCompactHeight ? 'h-11' : 'h-12 sm:h-14'
      } bg-white border-b border-slate-200/90 flex items-center justify-between gap-2 sm:gap-3 px-2.5 sm:px-4 shrink-0 shadow-xs select-none overflow-hidden`}
    >
      {/* Brand & Title */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <div
          className={`${
            isCompactHeight ? 'w-7 h-7 rounded-lg' : 'w-8 h-8 sm:w-9 sm:h-9 rounded-xl'
          } bg-blue-600 flex items-center justify-center text-white shadow-sm ring-1 ring-blue-500/20 shrink-0`}
        >
          <Code2 className={isCompactHeight ? 'w-4 h-4 text-white' : 'w-4 h-4 sm:w-5 sm:h-5 text-white'} />
        </div>
        <div className="hidden md:block leading-tight">
          <span className="font-extrabold tracking-tight text-slate-900 text-sm lg:text-base whitespace-nowrap block">
            LQD_HTML_LAB
          </span>
          {!isCompactHeight && (
            <p className="hidden lg:block text-[10px] text-slate-500 font-medium whitespace-nowrap">
              Phòng thực hành ảo HTML · Tin học 12
            </p>
          )}
        </div>
      </div>

      {/* Lesson Selector Dropdown (Fluid & Truncated on small screens) */}
      <div className="flex-1 min-w-0 max-w-md flex justify-center">
        <div className="relative w-full max-w-[340px]">
          <select
            value={currentLesson.id}
            onChange={(e) => {
              const selected = lessons.find((l) => l.id === Number(e.target.value));
              if (selected) onSelectLesson(selected);
            }}
            aria-label="Chọn bài học Tin học 12"
            className={`w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold ${
              isCompactHeight ? 'text-xs py-1 pl-2.5 pr-7' : 'text-xs sm:text-sm py-1.5 pl-2.5 sm:pl-3 pr-7 sm:pr-8'
            } rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs transition appearance-none cursor-pointer truncate`}
          >
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id} className="bg-white text-slate-800">
                {lesson.lessonNumber}: {lesson.title}
              </option>
            ))}
          </select>
          <BookOpen className="w-3.5 h-3.5 text-blue-600 absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
        {/* Dedicated Senior AI Assistant Button */}
        {onOpenAiAssistant && (
          <button
            onClick={onOpenAiAssistant}
            className={`flex items-center gap-1.5 ${
              isCompactHeight ? 'px-2.5 py-1 text-[11px]' : 'px-2.5 sm:px-3 py-1.5 text-xs'
            } rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition cursor-pointer active:scale-95 group shrink-0 whitespace-nowrap`}
            title="Mở Trợ Lý AI - Giải đáp tổng thể toàn bộ 12 bài Tin học 12"
            aria-label="Mở Trợ Lý AI"
          >
            <Bot className="w-4 h-4 text-blue-100 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="hidden min-[420px]:inline whitespace-nowrap">Trợ Lý AI</span>
            <span className="inline min-[420px]:hidden whitespace-nowrap">AI</span>
          </button>
        )}

        {/* Reset Code Button */}
        <button
          onClick={onResetCode}
          className={`${
            isCompactHeight ? 'p-1' : 'p-1.5 sm:p-2'
          } text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer shrink-0`}
          title="Khôi phục mã ban đầu"
          aria-label="Khôi phục mã ban đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className={`${
            isCompactHeight ? 'p-1' : 'p-1.5 sm:p-2'
          } text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer shrink-0`}
          title="Cài đặt"
          aria-label="Cài đặt"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
