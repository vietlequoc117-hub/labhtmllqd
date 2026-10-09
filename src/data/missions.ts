import { LessonMission } from '../types';
import { LESSON_7_MISSIONS } from './missions/lesson7';
import { LESSON_8_MISSIONS } from './missions/lesson8';
import { LESSON_9_MISSIONS } from './missions/lesson9';
import { LESSON_10_MISSIONS } from './missions/lesson10';
import { LESSON_11_MISSIONS } from './missions/lesson11';
import { LESSON_12_MISSIONS } from './missions/lesson12';
import { LESSON_13_MISSIONS } from './missions/lesson13';
import { LESSON_14_MISSIONS } from './missions/lesson14';
import { LESSON_15_MISSIONS } from './missions/lesson15';
import { LESSON_16_MISSIONS, LESSON_17_MISSIONS, LESSON_18_MISSIONS } from './missions/otherLessons';

export const ALL_LESSON_MISSIONS: Record<number, LessonMission[]> = {
  7: LESSON_7_MISSIONS,
  8: LESSON_8_MISSIONS,
  9: LESSON_9_MISSIONS,
  10: LESSON_10_MISSIONS,
  11: LESSON_11_MISSIONS,
  12: LESSON_12_MISSIONS,
  13: LESSON_13_MISSIONS,
  14: LESSON_14_MISSIONS,
  15: LESSON_15_MISSIONS,
  16: LESSON_16_MISSIONS,
  17: LESSON_17_MISSIONS,
  18: LESSON_18_MISSIONS,
};

export function getLessonMissions(lessonId: number): LessonMission[] {
  return ALL_LESSON_MISSIONS[lessonId] || [];
}
