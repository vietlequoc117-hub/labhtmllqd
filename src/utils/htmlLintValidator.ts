// Senior HTML & CSS Pedagogical Linter & Error Diagnostic Engine
// Analyzes student HTML code in real-time and reports precise, friendly,
// actionable errors and warnings for high school students.

export type DiagnosticSeverity = 'error' | 'warning' | 'info';

export interface CodeDiagnostic {
  id: string;
  line: number;
  column?: number;
  severity: DiagnosticSeverity;
  source?: 'html' | 'css';
  message: string;
  suggestion?: string;
  fixable?: boolean;
  quickFixCode?: string;
}

// Void (self-closing) elements in HTML5 - they NEVER have a closing tag
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

// Valid standard HTML5 tags
const VALID_HTML_TAGS = new Set([
  '!doctype', 'html', 'head', 'title', 'base', 'link', 'meta', 'style',
  'body', 'article', 'section', 'nav', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'footer', 'address', 'p', 'hr', 'pre', 'blockquote', 'ol', 'ul',
  'menu', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'main', 'div',
  'a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'ruby',
  'rt', 'rp', 'data', 'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup',
  'i', 'b', 'u', 'mark', 'bdi', 'bdo', 'span', 'br', 'wbr', 'ins', 'del',
  'picture', 'source', 'img', 'iframe', 'embed', 'object', 'video', 'audio',
  'track', 'map', 'area', 'table', 'caption', 'colgroup', 'col', 'tbody',
  'thead', 'tfoot', 'tr', 'td', 'th', 'form', 'label', 'input', 'button',
  'select', 'datalist', 'optgroup', 'option', 'textarea', 'output', 'progress',
  'meter', 'fieldset', 'legend', 'details', 'summary', 'dialog', 'script', 'noscript'
]);

// Common spelling mistakes high school students make
const COMMON_TAG_TYPOS: Record<string, string> = {
  'paragrap': 'p',
  'paragraph': 'p',
  'par': 'p',
  'hed': 'head',
  'headder': 'header',
  'boby': 'body',
  'bodey': 'body',
  'imge': 'img',
  'image': 'img',
  'picturee': 'picture',
  'anhor': 'a',
  'anch': 'a',
  'linkk': 'link',
  'tabel': 'table',
  'tabl': 'table',
  'row': 'tr',
  'colum': 'td',
  'column': 'td',
  'fom': 'form',
  'frm': 'form',
  'inpt': 'input',
  'btn': 'button',
  'tilte': 'title',
  'titl': 'title',
  'metta': 'meta'
};

export function lintHtmlCode(html: string): CodeDiagnostic[] {
  const diagnostics: CodeDiagnostic[] = [];
  if (!html.trim()) return diagnostics;

  const lines = html.split('\n');

  // 1. Check for unclosed HTML comments: <!-- without -->
  let insideComment = false;
  let commentStartLine = -1;

  for (let idx = 0; idx < lines.length; idx++) {
    const lineText = lines[idx];
    const lineNum = idx + 1;

    if (!insideComment) {
      const commentOpenIdx = lineText.indexOf('<!--');
      if (commentOpenIdx !== -1) {
        const commentCloseIdx = lineText.indexOf('-->', commentOpenIdx + 4);
        if (commentCloseIdx === -1) {
          insideComment = true;
          commentStartLine = lineNum;
        }
      }
    } else {
      if (lineText.includes('-->')) {
        insideComment = false;
      }
    }
  }

  if (insideComment && commentStartLine !== -1) {
    diagnostics.push({
      id: `unclosed-comment-${commentStartLine}`,
      line: commentStartLine,
      severity: 'error',
      message: `Chú thích HTML mở bằng '<!--' chưa được đóng lại bằng '-->'.`,
      suggestion: `Hãy thêm '-->' vào cuối chú thích để không làm vô hiệu hóa các dòng mã bên dưới.`,
      fixable: true,
      quickFixCode: '-->'
    });
  }

  // 2. Tokenize tags and check tag balance, nesting, and typos
  interface OpenTagInfo {
    name: string;
    line: number;
    raw: string;
  }
  const tagStack: OpenTagInfo[] = [];

  // Regex to scan tags - prevent swallowing subsequent tags by not allowing '<' inside attrsStr
  const tagRegex = /<(\/)?([a-zA-Z0-9!-]+)([^<>]*)>/g;
  let match: RegExpExecArray | null;

  // Track lines
  const lineStartIndices: number[] = [0];
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '\n') {
      lineStartIndices.push(i + 1);
    }
  }

  const getLineFromIndex = (index: number): number => {
    let low = 0;
    let high = lineStartIndices.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lineStartIndices[mid] <= index) {
        if (mid === lineStartIndices.length - 1 || lineStartIndices[mid + 1] > index) {
          return mid + 1;
        }
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return 1;
  };

  // Scan all tags
  while ((match = tagRegex.exec(html)) !== null) {
    const isClosing = !!match[1];
    const rawTagName = match[2];
    const tagName = rawTagName.toLowerCase();
    const attrsStr = match[3] || '';
    const matchIndex = match.index;
    const lineNum = getLineFromIndex(matchIndex);

    // Skip DOCTYPE and Comments
    if (tagName.startsWith('!') || tagName.startsWith('--')) {
      continue;
    }

    // Check for tag typos & unknown tags (avoid duplicate reporting for closing tag if already reported on open)
    if (!VALID_HTML_TAGS.has(tagName)) {
      const alreadyReported = diagnostics.some((d) => d.id.includes(`tag-typo-`) && d.id.endsWith(`-${tagName}`));
      if (!alreadyReported) {
        const suggestion = COMMON_TAG_TYPOS[tagName]
          ? `Có thể em muốn gõ thẻ '<${COMMON_TAG_TYPOS[tagName]}>'? Hãy kiểm tra lại chính tả nhé.`
          : `Thẻ '<${rawTagName}>' không thuộc chuẩn HTML5. Hãy kiểm tra lại tên thẻ (ví dụ: h1, h2, p, a, div, img, table,...).`;

        diagnostics.push({
          id: `tag-typo-${lineNum}-${tagName}`,
          line: lineNum,
          severity: 'error',
          source: 'html',
          message: `Thẻ '<${rawTagName}>' không tồn tại trong chuẩn HTML5.`,
          suggestion,
        });
      }
    }

    // Check if student wrote Vietnamese text inside the tag itself, e.g. <p Xin chào các bạn>
    if (attrsStr.trim()) {
      // Strip all quoted attribute values first (e.g. alt="Biểu trưng Thể thao", title="...", placeholder="...")
      // and unquoted attribute assignments (e.g. width=200)
      const unquotedAttrs = attrsStr
        .replace(/="[^"]*"/g, ' ')
        .replace(/='[^']*'/g, ' ')
        .replace(/=[^\s>]+/g, ' ');

      const hasVietnameseText = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(unquotedAttrs);
      if (hasVietnameseText) {
        diagnostics.push({
          id: `text-inside-tag-${lineNum}`,
          line: lineNum,
          severity: 'error',
          source: 'html',
          message: `Dòng ${lineNum}: Có vẻ em đã viết nội dung văn bản bên trong dấu ngoặc nhọn của thẻ '<${rawTagName} ...>'.`,
          suggestion: `Hãy đóng thẻ bằng dấu '>' trước, rồi mới viết văn bản ra bên ngoài. Ví dụ: <${rawTagName}>Nội dung</${rawTagName}>.`,
        });
      }
    }

    // Check attribute quotes: e.g. class="test or href='link
    const quoteCountDouble = (attrsStr.match(/"/g) || []).length;
    if (quoteCountDouble % 2 !== 0) {
      diagnostics.push({
        id: `unclosed-quote-${lineNum}`,
        line: lineNum,
        severity: 'error',
        source: 'html',
        message: `Dòng ${lineNum}: Trong thẻ '<${rawTagName}>' có giá trị thuộc tính chưa đóng dấu ngoặc kép '"'.`,
        suggestion: `Hãy kiểm tra và đóng đủ cặp ngoặc kép cho thuộc tính, ví dụ: class="..." hoặc href="..."`,
      });
    } else {
      // Check single quotes only if single quotes are used for attribute values
      if (attrsStr.includes("='") || attrsStr.includes("= '")) {
        const quoteCountSingle = (attrsStr.match(/'/g) || []).length;
        if (quoteCountSingle % 2 !== 0) {
          diagnostics.push({
            id: `unclosed-quote-${lineNum}`,
            line: lineNum,
            severity: 'error',
            source: 'html',
            message: `Dòng ${lineNum}: Trong thẻ '<${rawTagName}>' có giá trị thuộc tính chưa đóng dấu ngoặc đơn "'".`,
            suggestion: `Hãy kiểm tra và đóng đủ cặp ngoặc đơn cho thuộc tính.`,
          });
        }
      }
    }

    // Check table semantics: <td> or <th> without <tr>
    if ((tagName === 'td' || tagName === 'th') && !isClosing) {
      const parentTag = tagStack.length > 0 ? tagStack[tagStack.length - 1].name : null;
      if (parentTag !== 'tr') {
        diagnostics.push({
          id: `table-cell-without-row-${lineNum}`,
          line: lineNum,
          severity: 'warning',
          message: `Thẻ '<${tagName}>' (ô dữ liệu) phải nằm bên trong thẻ hàng '<tr>'.`,
          suggestion: `Hãy bọc ô này trong cặp thẻ <tr> ... </tr> để bảng không bị vỡ bố cục.`
        });
      }
    }

    // Check list semantics: <li> without <ul> or <ol>
    if (tagName === 'li' && !isClosing) {
      const insideList = tagStack.some((t) => t.name === 'ul' || t.name === 'ol');
      if (!insideList) {
        diagnostics.push({
          id: `li-outside-list-${lineNum}`,
          line: lineNum,
          severity: 'warning',
          message: `Thẻ '<li>' (mục danh sách) nên được đặt bên trong thẻ '<ul>' (danh sách không thứ tự) hoặc '<ol>' (danh sách có thứ tự).`,
          suggestion: `Bọc danh sách bằng thẻ <ul> hoặc <ol> chuẩn SGK.`
        });
      }
    }

    // Void element check
    if (VOID_ELEMENTS.has(tagName)) {
      if (isClosing) {
        diagnostics.push({
          id: `void-closing-${lineNum}-${tagName}`,
          line: lineNum,
          severity: 'info',
          message: `Thẻ '<${tagName}>' là thẻ rỗng (Void Element), không cần thẻ đóng '</${tagName}>'.`,
          suggestion: `Em chỉ cần viết '<${tagName}>' hoặc '<${tagName} />' là đủ.`
        });
      }
      continue;
    }

    // Tag opening / closing logic
    if (!isClosing) {
      // Self-closing slash on non-void element (e.g. <div />)
      if (attrsStr.trim().endsWith('/')) {
        continue;
      }
      tagStack.push({ name: tagName, line: lineNum, raw: rawTagName });
    } else {
      // Closing tag </tag>
      if (tagStack.length === 0) {
        // Do not flag closing body/html at end of document if there are other errors
        if ((tagName === 'body' || tagName === 'html') && (diagnostics.length > 0 || lineNum >= lines.length - 2)) {
          continue;
        }
        diagnostics.push({
          id: `unexpected-closing-${lineNum}-${tagName}`,
          line: lineNum,
          severity: 'error',
          source: 'html',
          message: `Thẻ đóng '</${rawTagName}>' xuất hiện nhưng không có thẻ mở '<${rawTagName}>' tương ứng phía trước.`,
          suggestion: `Hãy kiểm tra lại xem em có gõ thừa thẻ đóng này không.`
        });
        continue;
      }

      const lastOpen = tagStack[tagStack.length - 1];

      // Exact match (e.g. <h2>...</h2>, <p>...</p>)
      if (lastOpen.name === tagName) {
        tagStack.pop();
        continue;
      }

      // 1. Same-line mismatch: e.g. `<h>...</h2>` or `<b>...</i>` on the same line
      if (lastOpen.line === lineNum) {
        // Tag opened and closed on the exact same line, but names don't match
        const isLastOpenInvalid = !VALID_HTML_TAGS.has(lastOpen.name);

        // Remove redundant tag-typo diagnostic recorded on this line for lastOpen so only 1 clear error appears on this line
        const typoIdx = diagnostics.findIndex((d) => d.line === lineNum && d.id.startsWith(`tag-typo-${lineNum}-`));
        if (typoIdx !== -1) {
          diagnostics.splice(typoIdx, 1);
        }

        const suggestion = isLastOpenInvalid
          ? `Hãy sửa thẻ mở '<${lastOpen.raw}>' thành '<${rawTagName}>' để tạo cặp thẻ '<${rawTagName}>...</${rawTagName}>' hoàn chỉnh.`
          : `Em hãy chỉnh sửa để cả thẻ mở và thẻ đóng có cùng tên: '<${rawTagName}>...</${rawTagName}>' hoặc '<${lastOpen.raw}>...</${lastOpen.raw}>'.`;

        diagnostics.push({
          id: `mismatched-pair-${lineNum}-${tagName}`,
          line: lineNum,
          severity: 'error',
          source: 'html',
          message: isLastOpenInvalid
            ? `Dòng ${lineNum}: Thẻ mở '<${lastOpen.raw}>' sai chính tả và không khớp với thẻ đóng '</${rawTagName}>'.`
            : `Dòng ${lineNum}: Cặp thẻ không đồng bộ giữa thẻ mở '<${lastOpen.raw}>' và thẻ đóng '</${rawTagName}>'.`,
          suggestion
        });

        // Crucial fix: pop lastOpen so this typo doesn't cascade into </body>, </html> or later tags!
        tagStack.pop();
        continue;
      }

      // 2. Structural boundary tags: </body> or </html>
      // When closing </body> or </html>, ANY unclosed inner tags belong to those inner lines, NOT to </body> or </html>!
      if (tagName === 'body' || tagName === 'html') {
        const targetIdx = [...tagStack].reverse().findIndex((t) => t.name === tagName);
        if (targetIdx !== -1) {
          const actualIndex = tagStack.length - 1 - targetIdx;
          // Extract all inner tags between target and top of stack
          const unclosedInner = tagStack.splice(actualIndex + 1);

          for (const u of unclosedInner) {
            // Check if this inner tag already has an error reported on its line
            const alreadyHasError = diagnostics.some((d) => d.line === u.line);
            if (!alreadyHasError) {
              diagnostics.push({
                id: `unclosed-tag-${u.line}-${u.name}`,
                line: u.line,
                severity: 'error',
                source: 'html',
                message: `Dòng ${u.line}: Thẻ '<${u.raw}>' chưa được đóng lại bằng '</${u.raw}>'.`,
                suggestion: `Hãy thêm '</${u.raw}>' vào cuối khối để nội dung được đóng đúng quy chuẩn HTML.`,
                fixable: true,
                quickFixCode: `</${u.raw}>`
              });
            }
          }

          // Pop the structural tag itself (body or html) cleanly with ZERO errors on </body> or </html>!
          tagStack.pop();
          continue;
        } else {
          // If body or html wasn't matched in tagStack, DO NOT report false errors on lines 11/12 if there are other errors in the document or if it is at document end
          const isAtDocEnd = lineNum >= lines.length - 2;
          const hasPriorErrors = diagnostics.length > 0;
          if (!hasPriorErrors && !isAtDocEnd) {
            diagnostics.push({
              id: `unexpected-closing-${lineNum}-${tagName}`,
              line: lineNum,
              severity: 'error',
              source: 'html',
              message: `Thẻ đóng '</${rawTagName}>' xuất hiện nhưng chưa có thẻ mở tương ứng phía trước.`,
              suggestion: `Hãy kiểm tra lại cấu trúc chuẩn <!DOCTYPE html>, <html>, <head> và <body>.`
            });
          }
          continue;
        }
      }

      // 3. General nesting mismatch: check if tagName exists deeper in the stack
      const matchingIndex = [...tagStack].reverse().findIndex((t) => t.name === tagName);
      if (matchingIndex !== -1) {
        // Found matching tag deeper in stack
        diagnostics.push({
          id: `nesting-mismatch-${lineNum}-${tagName}`,
          line: lineNum,
          severity: 'error',
          source: 'html',
          message: `Thẻ '</${rawTagName}>' đóng sai thứ tự lồng nhau. Thẻ '<${lastOpen.raw}>' ở dòng ${lastOpen.line} mở sau thì phải được đóng trước!`,
          suggestion: `Quy tắc HTML: Thẻ nào mở sau cùng thì phải đóng trước cùng.`
        });
        // Pop from top down to and including matching tag, but preserve html and body
        const actualIndex = tagStack.length - 1 - matchingIndex;
        tagStack.splice(actualIndex);
      } else {
        // No match found in stack
        diagnostics.push({
          id: `unmatched-closing-${lineNum}-${tagName}`,
          line: lineNum,
          severity: 'error',
          source: 'html',
          message: `Thẻ đóng '</${rawTagName}>' không khớp với thẻ mở gần nhất là '<${lastOpen.raw}>' ở dòng ${lastOpen.line}.`,
          suggestion: `Em hãy kiểm tra lại cặp thẻ '<${lastOpen.raw}>' và '</${rawTagName}>'.`
        });
        // Pop lastOpen to prevent infinite cascading errors ONLY if lastOpen is not structural body/html!
        if (lastOpen.name !== 'body' && lastOpen.name !== 'html') {
          tagStack.pop();
        }
      }
    }
  }

  // 3. Any unclosed tags remaining in the stack
  for (const unclosed of tagStack) {
    // If unclosed tag is html or body, don't report if there are already other errors in document
    if ((unclosed.name === 'html' || unclosed.name === 'body') && diagnostics.length > 0) {
      continue;
    }
    const alreadyHasError = diagnostics.some((d) => d.line === unclosed.line);
    if (!alreadyHasError) {
      diagnostics.push({
        id: `unclosed-tag-${unclosed.line}-${unclosed.name}`,
        line: unclosed.line,
        severity: 'error',
        source: 'html',
        message: `Thẻ '<${unclosed.raw}>' ở dòng ${unclosed.line} chưa được đóng lại bằng '</${unclosed.raw}>'.`,
        suggestion: `Hãy thêm '</${unclosed.raw}>' vào cuối khối để trình duyệt hiển thị chính xác.`,
        fixable: true,
        quickFixCode: `</${unclosed.raw}>`
      });
    }
  }

  // 4. Check for unclosed opening bracket: e.g. `<p text` at end of line without `>`
  for (let l = 0; l < lines.length; l++) {
    const lineText = lines[l];
    const lineNum = l + 1;
    // Check if line has a '<' that doesn't have a matching '>' on this line
    const openBracketIdx = lineText.lastIndexOf('<');
    if (openBracketIdx !== -1) {
      const remaining = lineText.slice(openBracketIdx);
      // Only flag if it actually looks like an HTML tag e.g. <div or </p or <h1, not a math comparison like 'x < 0'
      const looksLikeTag = /^<\/?([a-zA-Z0-9!-]+)/.test(remaining);
      if (looksLikeTag && !remaining.includes('>') && !remaining.includes('<!--')) {
        const nextLine = l < lines.length - 1 ? lines[l + 1] : '';
        const isNextLineNewTag = /^\s*</.test(nextLine);
        if (l === lines.length - 1 || isNextLineNewTag || !nextLine.includes('>')) {
          diagnostics.push({
            id: `unclosed-bracket-${lineNum}`,
            line: lineNum,
            severity: 'error',
            source: 'html',
            message: `Dòng ${lineNum}: Thẻ HTML '${remaining.trim()}' bị thiếu dấu đóng ngoặc nhọn '>'.`,
            suggestion: `Hãy thêm dấu '>' vào cuối thẻ.`
          });
        }
      }
    }
  }

  // 5. Final sanitation:
  // If the document has specific errors on content lines (such as line 7),
  // NEVER report false cascaded errors on lines 11/12 (the closing </body> and </html> lines).
  const sanitizedDiagnostics = diagnostics.filter((diag) => {
    const lineContent = lines[diag.line - 1]?.trim().toLowerCase() || '';
    const isClosingStructuralLine =
      lineContent === '</body>' ||
      lineContent === '</html>' ||
      lineContent === '</body></html>';
    // If this is a clean closing </body> or </html> line and other errors exist elsewhere, suppress it
    if (isClosingStructuralLine && diagnostics.some((d) => d.line !== diag.line)) {
      return false;
    }
    return true;
  });

  // Sort by line number ascending
  sanitizedDiagnostics.sort((a, b) => a.line - b.line);

  return sanitizedDiagnostics;
}

export function lintCssCode(css: string): CodeDiagnostic[] {
  const diagnostics: CodeDiagnostic[] = [];
  if (!css.trim()) return diagnostics;

  const lines = css.split('\n');

  // Check unclosed CSS comments /*
  let insideComment = false;
  let commentStartLine = -1;
  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const lineNum = idx + 1;
    if (!insideComment) {
      const openIdx = line.indexOf('/*');
      if (openIdx !== -1 && line.indexOf('*/', openIdx + 2) === -1) {
        insideComment = true;
        commentStartLine = lineNum;
      }
    } else {
      if (line.includes('*/')) {
        insideComment = false;
      }
    }
  }

  if (insideComment && commentStartLine !== -1) {
    diagnostics.push({
      id: `css-unclosed-comment-${commentStartLine}`,
      line: commentStartLine,
      severity: 'error',
      source: 'css',
      message: `Khối chú thích CSS mở ở dòng ${commentStartLine} bằng '/*' chưa được đóng lại bằng '*/'.`,
      suggestion: `Hãy thêm '*/' vào cuối chú thích để không làm vô hiệu hóa các quy tắc CSS bên dưới.`
    });
  }

  // Check brace balance
  let openBraces = 0;
  let lastOpenLine = -1;

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const lineNum = idx + 1;

    for (let c of line) {
      if (c === '{') {
        openBraces++;
        lastOpenLine = lineNum;
      } else if (c === '}') {
        if (openBraces > 0) {
          openBraces--;
        } else {
          diagnostics.push({
            id: `css-extra-brace-${lineNum}`,
            line: lineNum,
            severity: 'error',
            source: 'css',
            message: `Dòng ${lineNum}: Dấu ngoặc nhọn đóng '}' dư thừa (chưa có dấu mở '{').`,
            suggestion: `Xóa dấu '}' thừa hoặc kiểm tra lại bộ chọn CSS.`
          });
        }
      }
    }

    // Check missing semicolon inside declarations: e.g. "color: red font-size: 16px"
    if (line.includes(':') && !line.includes(';') && !line.includes('{') && !line.includes('}')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('/*')) {
        diagnostics.push({
          id: `css-missing-semicolon-${lineNum}`,
          line: lineNum,
          severity: 'warning',
          source: 'css',
          message: `Dòng ${lineNum}: Thuộc tính CSS '${trimmed}' có thể bị thiếu dấu chấm phẩy ';' ở cuối dòng.`,
          suggestion: `Thêm ';' vào cuối mỗi dòng thuộc tính CSS.`
        });
      }
    }
  }

  if (openBraces > 0 && lastOpenLine !== -1) {
    diagnostics.push({
      id: `css-unclosed-brace-${lastOpenLine}`,
      line: lastOpenLine,
      severity: 'error',
      source: 'css',
      message: `Khối CSS mở ở dòng ${lastOpenLine} bằng '{' chưa được đóng bằng '}'.`,
      suggestion: `Hãy thêm '}' ở cuối khối quy tắc CSS.`
    });
  }

  return diagnostics;
}
