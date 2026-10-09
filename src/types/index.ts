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

export interface TutorMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}
