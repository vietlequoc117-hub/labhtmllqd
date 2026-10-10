import { QuizQuestion } from '../types';
import { LESSON_7_QUIZ } from './quizzes/lesson7';
import { LESSON_8_QUIZ } from './quizzes/lesson8';
import { LESSON_9_QUIZ } from './quizzes/lesson9';
import { LESSON_10_QUIZ } from './quizzes/lesson10';
import { LESSON_11_QUIZ } from './quizzes/lesson11';
import { LESSON_12_QUIZ } from './quizzes/lesson12';
import { LESSON_13_QUIZ } from './quizzes/lesson13';
import { LESSON_14_QUIZ } from './quizzes/lesson14';
import { LESSON_15_QUIZ } from './quizzes/lesson15';
import { LESSON_16_QUIZ } from './quizzes/lesson16';
import { LESSON_17_QUIZ } from './quizzes/lesson17';
import { LESSON_18_QUIZ } from './quizzes/lesson18';

export const ALL_LESSON_QUIZZES: Record<number, QuizQuestion[]> = {
  7: LESSON_7_QUIZ,
  8: LESSON_8_QUIZ,
  9: LESSON_9_QUIZ,
  10: LESSON_10_QUIZ,
  11: LESSON_11_QUIZ,
  12: LESSON_12_QUIZ,
  13: LESSON_13_QUIZ,
  14: LESSON_14_QUIZ,
  15: LESSON_15_QUIZ,
  16: LESSON_16_QUIZ,
  17: LESSON_17_QUIZ,
  18: LESSON_18_QUIZ,
};

export function getLessonQuiz(lessonId: number): QuizQuestion[] {
  return ALL_LESSON_QUIZZES[lessonId] || [];
}
