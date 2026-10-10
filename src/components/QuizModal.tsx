import React, { useState } from 'react';
import { Lesson } from '../types';
import { getLessonQuiz } from '../data/quizzes';
import { QuizTab } from './QuizTab';
import { X, HelpCircle, BookOpen } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  lesson,
}) => {
  const questions = getLessonQuiz(lesson.id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/95">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <HelpCircle className="w-4.5 h-4.5 text-blue-100" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                <span>10 Câu Trắc Nghiệm {lesson.lessonNumber}:</span>
                <span className="text-blue-300 font-bold">{lesson.title}</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Gồm 4 câu Biết, 3 câu Hiểu, 3 câu Vận dụng &bull; Có kèm bảng so sánh Code CSS &amp; Code HTML
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition hover:bg-slate-800 cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Quiz Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950/40">
          <QuizTab questions={questions} lessonNumber={lesson.lessonNumber} />
        </div>
      </div>
    </div>
  );
};
