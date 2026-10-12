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
      let fullHtml = html;
      const cleanCss = _css.replace(/<\/?style>/gi, '').trim();
      if (cleanCss) {
        const styleTag = `<style data-source="style.css">${cleanCss}</style>`;
        const linkRegex = /<link[^>]+(?:href=["'](?:\.\/)?style\.css["'][^>]*|rel=["']stylesheet["'][^>]*href=["'](?:\.\/)?style\.css["'][^>]*)[^>]*>/gi;
        if (linkRegex.test(fullHtml)) {
          fullHtml = fullHtml.replace(linkRegex, styleTag);
        } else if (fullHtml.includes('</head>')) {
          fullHtml = fullHtml.replace('</head>', `${styleTag}</head>`);
        } else {
          fullHtml = `${styleTag}${fullHtml}`;
        }
      }
      doc = parser.parseFromString(fullHtml, 'text/html');
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
