import { CodeSample } from '../types';
import { LESSON_7_SAMPLES } from './samples/lesson7';
import { LESSON_8_SAMPLES } from './samples/lesson8';
import { LESSON_9_SAMPLES } from './samples/lesson9';
import { LESSON_10_SAMPLES } from './samples/lesson10';
import { LESSON_11_SAMPLES } from './samples/lesson11';
import { LESSON_12_SAMPLES } from './samples/lesson12';
import { LESSON_13_SAMPLES } from './samples/lesson13';
import { LESSON_14_SAMPLES } from './samples/lesson14';
import { LESSON_15_SAMPLES } from './samples/lesson15';
import { LESSON_16_SAMPLES } from './samples/lesson16';
import { LESSON_17_SAMPLES } from './samples/lesson17';
import { LESSON_18_SAMPLES } from './samples/lesson18';

export const ALL_LESSON_SAMPLES: Record<number, CodeSample[]> = {
  7: LESSON_7_SAMPLES,
  8: LESSON_8_SAMPLES,
  9: LESSON_9_SAMPLES,
  10: LESSON_10_SAMPLES,
  11: LESSON_11_SAMPLES,
  12: LESSON_12_SAMPLES,
  13: LESSON_13_SAMPLES,
  14: LESSON_14_SAMPLES,
  15: LESSON_15_SAMPLES,
  16: LESSON_16_SAMPLES,
  17: LESSON_17_SAMPLES,
  18: LESSON_18_SAMPLES,
};

export function getLessonSamples(lessonId: number): CodeSample[] {
  return ALL_LESSON_SAMPLES[lessonId] || [];
}
