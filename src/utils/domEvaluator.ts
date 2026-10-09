import { DomTestResult, Lesson } from '../types';

export function evaluateStudentCode(
  lesson: Lesson,
  html: string,
  _css: string,
  iframeDoc?: Document | null
): DomTestResult[] {
  try {
    let doc: Document;

    if (iframeDoc && iframeDoc.body) {
      doc = iframeDoc;
    } else {
      const parser = new DOMParser();
      doc = parser.parseFromString(html, 'text/html');
    }

    return lesson.evaluate(doc, html, _css);
  } catch (error: any) {
    console.error('DOM Evaluation Error:', error);
    return [
      {
        id: 'error_eval',
        title: 'Lỗi kiểm tra cú pháp',
        passed: false,
        message: 'Mã HTML có lỗi cấu trúc nghiêm trọng khiến trình phân tích DOM không thể đọc được.',
        details: error?.message,
      },
    ];
  }
}
