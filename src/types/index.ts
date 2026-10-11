export interface MockAsset {
  id: string;
  name: string;
  path: string;
  type: 'image' | 'video' | 'audio' | 'html';
  description: string;
  previewUrl: string;
  size?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  hint: string;
}

export interface DomTestResult {
  id: string;
  title: string;
  passed: boolean;
  message: string;
  details?: string;
}

export interface CodeSample {
  id: number;
  title: string;
  description: string;
  html: string;
  css?: string;
}

export interface LessonMission {
  id: number;
  title: string;
  level?: 'Cơ bản' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao' | 'Thử thách' | string;
  description: string;
  requirements: string[];
  targetResult: {
    title: string;
    description: string;
    html: string;
    css?: string;
  };
  starterHtml?: string;
  starterCss?: string;
  hint: string;
  checkCriteria: (doc: Document, htmlString: string, cssString?: string) => { passed: boolean; message: string; details?: string };
}

export interface QuickReference {
  tag: string;
  name: string;
  syntax: string;
  example: string;
  description: string;
}

export interface Lesson {
  id: number;
  lessonNumber: string; // e.g., "Bài 7"
  title: string;
  subtitle: string;
  sgkSection: string;
  objective: string;
  theorySummary: string[];
  quickReferences: QuickReference[];
  checklists: ChecklistItem[];
  mockAssets: MockAsset[];
  initialHtml: string;
  initialCss: string;
  solutionHtml: string;
  solutionCss?: string;
  evaluate: (doc: Document, htmlString: string, cssString?: string) => DomTestResult[];
}

export type QuizLevel = 'Biết' | 'Hiểu' | 'Vận dụng';

export interface QuizSnippet {
  css?: string;
  html?: string;
}

export interface QuizQuestion {
  id: number;
  level: QuizLevel;
  question: string;
  snippet?: QuizSnippet; // Comparison box with Code CSS and Code HTML as requested in image
  options: [string, string, string, string]; // A, B, C, D
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}
