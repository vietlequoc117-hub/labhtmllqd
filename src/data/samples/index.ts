import { CodeSample } from '../../types';
import { HTML_LESSON_SAMPLES } from './htmlLessons';
import { CSS_LESSON_SAMPLES } from './cssLessons';

export const ALL_LESSON_SAMPLES: Record<number, CodeSample[]> = {
  ...HTML_LESSON_SAMPLES,
  ...CSS_LESSON_SAMPLES,
};

export function getLessonSamples(lessonId: number): CodeSample[] {
  return ALL_LESSON_SAMPLES[lessonId] || [];
}
