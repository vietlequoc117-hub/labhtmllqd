// Senior HTML5 & CSS3 IntelliSense Autocomplete Engine
// Provides VS Code / Sublime style tag, #id, .class, attribute, and CSS property suggestions

export type CompletionItemKind = 'tag' | 'snippet' | 'id-snippet' | 'class-snippet' | 'attr' | 'css';

export interface CompletionItem {
  id: string;
  label: string;          // e.g. "h1", "h1#", "h1."
  tagName: string;        // e.g. "h1"
  kind: CompletionItemKind;
  detail: string;         // Short Vietnamese description / preview
  insertText: string;     // Full text to insert replacing the trigger token (including '<' if HTML tag)
  cursorOffset: number;   // Cursor offset relative to start of insertText
}

export interface AutocompleteContext {
  items: CompletionItem[];
  replaceStart: number;   // Selection index where replacement starts
  replaceEnd: number;     // Selection index where replacement ends
  query: string;          // Current typed prefix (e.g. "h", "h1", "h1#")
  triggerType: 'html-tag' | 'html-close-tag' | 'html-attr' | 'css-prop';
}

interface TagSpec {
  name: string;
  description: string;
  isVoid?: boolean;
  noIdClass?: boolean;
  snippetInsert?: string;       // Optional custom snippet for the 2nd 'snippet' item (with '$' as cursor marker)
  defaultTagInsert?: string;    // Optional custom insert for the 1st 'tag' item (with '$' as cursor marker)
}

const HTML_TAG_SPECS: TagSpec[] = [
  // Headings & Text (Bài 7, Bài 8)
  { name: 'h1', description: 'Tiêu đề cấp 1' },
  { name: 'h2', description: 'Tiêu đề cấp 2' },
  { name: 'h3', description: 'Tiêu đề cấp 3' },
  { name: 'h4', description: 'Tiêu đề cấp 4' },
  { name: 'h5', description: 'Tiêu đề cấp 5' },
  { name: 'h6', description: 'Tiêu đề cấp 6' },
  { name: 'p', description: 'Đoạn văn bản' },
  { name: 'div', description: 'Khối chứa phân vùng (Block)' },
  { name: 'span', description: 'Vùng văn bản nội dòng (Inline)' },
  { name: 'br', description: 'Ngắt xuống dòng (Thẻ đơn)', isVoid: true, noIdClass: true },
  { name: 'hr', description: 'Đường kẻ ngang phân cách', isVoid: true, noIdClass: true },

  // Inline formatting (Bài 8)
  { name: 'b', description: 'In đậm văn bản' },
  { name: 'strong', description: 'In đậm nhấn mạnh quan trọng' },
  { name: 'i', description: 'In nghiêng văn bản' },
  { name: 'em', description: 'In nghiêng nhấn mạnh' },
  { name: 'u', description: 'Gạch chân văn bản' },
  { name: 'mark', description: 'Tô sáng nổi bật (Dạ quang)' },
  { name: 'del', description: 'Gạch ngang chữ (Đã xóa)' },
  { name: 'ins', description: 'Văn bản chèn thêm' },
  { name: 'small', description: 'Chữ cỡ nhỏ' },
  { name: 'sub', description: 'Chỉ số dưới (H₂O)' },
  { name: 'sup', description: 'Chỉ số trên (x²)' },
  { name: 'blockquote', description: 'Khối trích dẫn dài' },
  { name: 'pre', description: 'Văn bản giữ nguyên định dạng' },
  { name: 'code', description: 'Đoạn mã lệnh' },

  // Links & Media (Bài 10, Bài 11)
  {
    name: 'a',
    description: 'Siêu liên kết (Hyperlink)',
    snippetInsert: '<a href="$"></a>',
  },
  {
    name: 'img',
    description: 'Chèn hình ảnh',
    isVoid: true,
    defaultTagInsert: '<img src="$" alt="">',
    snippetInsert: '<img src="$" alt="" width="200">',
  },
  {
    name: 'video',
    description: 'Chèn tệp video',
    snippetInsert: '<video src="$" controls width="320"></video>',
  },
  {
    name: 'audio',
    description: 'Chèn tệp âm thanh',
    snippetInsert: '<audio src="$" controls></audio>',
  },
  {
    name: 'iframe',
    description: 'Khung nhúng trang web con',
    snippetInsert: '<iframe src="$" width="100%" height="250"></iframe>',
  },
  {
    name: 'source',
    description: 'Nguồn đa phương tiện',
    isVoid: true,
    noIdClass: true,
    defaultTagInsert: '<source src="$" type="video/mp4">',
  },

  // Lists & Tables (Bài 9)
  { name: 'ul', description: 'Danh sách không thứ tự (Dấu chấm)' },
  { name: 'ol', description: 'Danh sách có thứ tự (1, 2, 3...)' },
  { name: 'li', description: 'Mục trong danh sách' },
  { name: 'dl', description: 'Danh sách mô tả' },
  { name: 'dt', description: 'Thuật ngữ mô tả' },
  { name: 'dd', description: 'Nội dung giải thích thuật ngữ' },
  {
    name: 'table',
    description: 'Bảng dữ liệu HTML',
    snippetInsert: '<table border="1">\n  <tr>\n    <th>$</th>\n  </tr>\n</table>',
  },
  { name: 'caption', description: 'Tiêu đề của bảng' },
  { name: 'tr', description: 'Hàng trong bảng (Table Row)' },
  { name: 'th', description: 'Ô tiêu đề bảng (In đậm, căn giữa)' },
  { name: 'td', description: 'Ô dữ liệu bảng (Table Data)' },
  { name: 'thead', description: 'Phần đầu bảng' },
  { name: 'tbody', description: 'Phần thân bảng' },
  { name: 'tfoot', description: 'Phần chân bảng' },

  // Forms (Bài 12)
  {
    name: 'form',
    description: 'Biểu mẫu thu thập thông tin',
    snippetInsert: '<form action="#" method="post">\n  $\n</form>',
  },
  { name: 'label', description: 'Nhãn mô tả cho ô nhập liệu', snippetInsert: '<label for="$"></label>' },
  {
    name: 'input',
    description: 'Ô nhập dữ liệu (Thẻ đơn)',
    isVoid: true,
    defaultTagInsert: '<input type="$">',
    snippetInsert: '<input type="text" name="$" placeholder="">',
  },
  { name: 'textarea', description: 'Khung nhập văn bản nhiều dòng', snippetInsert: '<textarea rows="4" cols="30">$</textarea>' },
  { name: 'button', description: 'Nút bấm tương tác', snippetInsert: '<button type="submit">$</button>' },
  { name: 'select', description: 'Danh sách thả xuống (Dropdown)' },
  { name: 'option', description: 'Lựa chọn trong <select>', snippetInsert: '<option value="$"></option>' },
  { name: 'fieldset', description: 'Khung nhóm các trường biểu mẫu' },
  { name: 'legend', description: 'Tiêu đề cho khung <fieldset>' },

  // Semantic & Document Structure (Bài 7, Bài 13, Bài 18)
  { name: 'header', description: 'Phần đầu trang / đầu bài viết' },
  { name: 'nav', description: 'Thanh điều hướng liên kết' },
  { name: 'main', description: 'Nội dung chính của trang' },
  { name: 'section', description: 'Chuyên mục nội dung' },
  { name: 'article', description: 'Bài viết độc lập' },
  { name: 'aside', description: 'Cột nội dung phụ bên cạnh' },
  { name: 'footer', description: 'Chân trang web' },
  { name: 'figure', description: 'Khối hình ảnh minh họa' },
  { name: 'figcaption', description: 'Chú thích cho <figure>' },
  { name: 'head', description: 'Phần thông tin khai báo đầu tài liệu', noIdClass: true },
  { name: 'body', description: 'Phần thân chứa nội dung hiển thị', noIdClass: true },
  { name: 'title', description: 'Tiêu đề trang trên thanh trình duyệt', noIdClass: true },
  {
    name: 'meta',
    description: 'Thẻ siêu dữ liệu (UTF-8, viewport)',
    isVoid: true,
    noIdClass: true,
    defaultTagInsert: '<meta charset="UTF-8">',
  },
  {
    name: 'link',
    description: 'Liên kết tệp CSS ngoài (style.css)',
    isVoid: true,
    noIdClass: true,
    defaultTagInsert: '<link rel="stylesheet" href="style.css">',
  },
  { name: 'style', description: 'Khối quy tắc CSS nội tuyến (Internal CSS)', noIdClass: true },
  { name: 'html', description: 'Thẻ gốc của tài liệu HTML', noIdClass: true },
];

function buildCompletionFromTemplate(
  id: string,
  label: string,
  tagName: string,
  kind: CompletionItemKind,
  detail: string,
  templateWithDollar: string
): CompletionItem {
  const dollarIdx = templateWithDollar.indexOf('$');
  if (dollarIdx === -1) {
    return {
      id,
      label,
      tagName,
      kind,
      detail,
      insertText: templateWithDollar,
      cursorOffset: templateWithDollar.length,
    };
  }
  const cleanInsert =
    templateWithDollar.slice(0, dollarIdx) + templateWithDollar.slice(dollarIdx + 1);
  return {
    id,
    label,
    tagName,
    kind,
    detail,
    insertText: cleanInsert,
    cursorOffset: dollarIdx,
  };
}

// Pre-build all HTML tag completion items (4 items per standard tag: wrench tag, box tag, box tag#, box tag.)
const ALL_HTML_TAG_ITEMS: CompletionItem[] = [];

for (const spec of HTML_TAG_SPECS) {
  const t = spec.name;

  // 1. Wrench icon item: 🔧 tag
  const defaultTemplate = spec.defaultTagInsert
    ? spec.defaultTagInsert
    : spec.isVoid
    ? `<${t}>`
    : `<${t}>$</${t}>`;

  ALL_HTML_TAG_ITEMS.push(
    buildCompletionFromTemplate(
      `tag-${t}`,
      t,
      t,
      'tag',
      spec.isVoid ? `<${t}> — ${spec.description}` : `<${t}>...</${t}> — ${spec.description}`,
      defaultTemplate
    )
  );

  // 2. Snippet box icon item: ▢ tag
  const snippetTemplate = spec.snippetInsert
    ? spec.snippetInsert
    : spec.isVoid
    ? defaultTemplate
    : `<${t}>$</${t}>`;

  ALL_HTML_TAG_ITEMS.push(
    buildCompletionFromTemplate(
      `snippet-${t}`,
      t,
      t,
      'snippet',
      spec.snippetInsert
        ? `Mẫu nhanh <${t}> có thuộc tính`
        : `<${t}>...</${t}>`,
      snippetTemplate
    )
  );

  // 3 & 4. ▢ tag# and ▢ tag.
  if (!spec.noIdClass) {
    const idTemplate = spec.isVoid
      ? `<${t} id="$">`
      : `<${t} id="$"></${t}>`;

    ALL_HTML_TAG_ITEMS.push(
      buildCompletionFromTemplate(
        `id-${t}`,
        `${t}#`,
        t,
        'id-snippet',
        `<${t} id="...">`,
        idTemplate
      )
    );

    const classTemplate = spec.isVoid
      ? `<${t} class="$">`
      : `<${t} class="$"></${t}>`;

    ALL_HTML_TAG_ITEMS.push(
      buildCompletionFromTemplate(
        `class-${t}`,
        `${t}.`,
        t,
        'class-snippet',
        `<${t} class="...">`,
        classTemplate
      )
    );
  }
}

// Common HTML attributes for attribute completion inside an open tag `<tag attr`
const HTML_ATTRIBUTES: Array<{ name: string; detail: string; template: string }> = [
  { name: 'class', detail: 'Tên lớp CSS', template: 'class="$"' },
  { name: 'id', detail: 'Định danh duy nhất', template: 'id="$"' },
  { name: 'style', detail: 'CSS nội tuyến (Inline)', template: 'style="$"' },
  { name: 'href', detail: 'Địa chỉ liên kết (URL)', template: 'href="$"' },
  { name: 'src', detail: 'Đường dẫn ảnh/video/trang', template: 'src="$"' },
  { name: 'alt', detail: 'Văn bản mô tả ảnh', template: 'alt="$"' },
  { name: 'target', detail: 'Cách mở liên kết (_blank)', template: 'target="_blank"' },
  { name: 'type', detail: 'Loại ô input / nút bấm', template: 'type="$"' },
  { name: 'name', detail: 'Tên trường dữ liệu form', template: 'name="$"' },
  { name: 'value', detail: 'Giá trị mặc định', template: 'value="$"' },
  { name: 'placeholder', detail: 'Chữ gợi ý mờ trong ô nhập', template: 'placeholder="$"' },
  { name: 'rowspan', detail: 'Gộp ô theo hàng dọc', template: 'rowspan="$"' },
  { name: 'colspan', detail: 'Gộp ô theo cột ngang', template: 'colspan="$"' },
  { name: 'border', detail: 'Độ dày đường viền bảng', template: 'border="1"' },
  { name: 'width', detail: 'Chiều rộng (px hoặc %)', template: 'width="$"' },
  { name: 'height', detail: 'Chiều cao (px)', template: 'height="$"' },
  { name: 'controls', detail: 'Thanh điều khiển video/audio', template: 'controls' },
  { name: 'required', detail: 'Bắt buộc nhập dữ liệu', template: 'required' },
  { name: 'checked', detail: 'Chọn sẵn radio/checkbox', template: 'checked' },
  { name: 'for', detail: 'Gắn nhãn <label> với id ô input', template: 'for="$"' },
];

// Common CSS properties for CSS tab
const CSS_PROPERTIES: Array<{ name: string; detail: string; template: string }> = [
  { name: 'color', detail: 'Màu chữ', template: 'color: $;' },
  { name: 'background-color', detail: 'Màu nền', template: 'background-color: $;' },
  { name: 'font-size', detail: 'Cỡ chữ (px, rem)', template: 'font-size: $px;' },
  { name: 'font-family', detail: 'Phông chữ', template: 'font-family: Arial, sans-serif;' },
  { name: 'font-weight', detail: 'Độ đậm chữ (bold)', template: 'font-weight: bold;' },
  { name: 'font-style', detail: 'Kiểu chữ nghiêng (italic)', template: 'font-style: italic;' },
  { name: 'text-align', detail: 'Căn lề văn bản (center, left, right)', template: 'text-align: center;' },
  { name: 'text-decoration', detail: 'Gạch chân / bỏ gạch chân (none, underline)', template: 'text-decoration: none;' },
  { name: 'line-height', detail: 'Chiều cao dòng', template: 'line-height: 1.6;' },
  { name: 'border', detail: 'Đường viền khung', template: 'border: 1px solid $;' },
  { name: 'border-radius', detail: 'Bo tròn góc viền', template: 'border-radius: $px;' },
  { name: 'border-collapse', detail: 'Gộp đường viền bảng', template: 'border-collapse: collapse;' },
  { name: 'margin', detail: 'Khoảng cách lề ngoài', template: 'margin: $px;' },
  { name: 'padding', detail: 'Khoảng đệm bên trong', template: 'padding: $px;' },
  { name: 'width', detail: 'Chiều rộng phần tử', template: 'width: $px;' },
  { name: 'height', detail: 'Chiều cao phần tử', template: 'height: $px;' },
  { name: 'max-width', detail: 'Chiều rộng tối đa', template: 'max-width: $px;' },
  { name: 'display', detail: 'Chế độ hiển thị (block, inline-block, flex)', template: 'display: $;' },
  { name: 'box-sizing', detail: 'Cách tính kích thước hộp (border-box)', template: 'box-sizing: border-box;' },
  { name: 'box-shadow', detail: 'Đổ bóng khối hộp', template: 'box-shadow: 0 4px 10px rgba(0,0,0,0.1);' },
  { name: 'list-style-type', detail: 'Kiểu dấu đầu dòng danh sách', template: 'list-style-type: $;' },
];

export function getAutocompleteSuggestions(
  code: string,
  cursorPos: number,
  activeTab: 'html' | 'css'
): AutocompleteContext | null {
  const textBefore = code.slice(0, cursorPos);
  const textAfter = code.slice(cursorPos);

  if (activeTab === 'html') {
    // 1. Check if typing an opening HTML tag: e.g. `<h`, `<h1`, `<h1#`, `<h1.`, or just `<`
    const openTagMatch = textBefore.match(/<([a-zA-Z0-9]*[.#]?)$/);
    if (openTagMatch) {
      const rawQuery = openTagMatch[1].toLowerCase();
      const replaceStart = cursorPos - openTagMatch[0].length;

      // If textAfter already starts with `</tagName>`, adjust or strip duplicate closing tag during insertion
      let matchedItems: CompletionItem[];

      if (!rawQuery) {
        // User just typed `<` -> show top tags in curriculum order
        matchedItems = ALL_HTML_TAG_ITEMS.slice(0, 40);
      } else if (rawQuery.endsWith('#') || rawQuery.endsWith('.')) {
        const tagPrefix = rawQuery.slice(0, -1);
        const targetKind = rawQuery.endsWith('#') ? 'id-snippet' : 'class-snippet';
        matchedItems = ALL_HTML_TAG_ITEMS.filter(
          (item) => item.kind === targetKind && item.tagName.startsWith(tagPrefix)
        );
      } else {
        // Filter tags whose tagName starts with rawQuery, sorted so exact/numeric matches (h1, h2, h3...) come first
        const startsWithMatches = ALL_HTML_TAG_ITEMS.filter((item) =>
          item.tagName.startsWith(rawQuery)
        );
        startsWithMatches.sort((a, b) => {
          if (a.tagName !== b.tagName) {
            return a.tagName.localeCompare(b.tagName, 'en', { numeric: true });
          }
          return 0; // preserve wrench -> snippet -> # -> . order
        });
        matchedItems = startsWithMatches;
      }

      if (matchedItems.length === 0) return null;

      // If textAfter already begins with `>` (e.g. user is editing inside `<h|>`), adjust replaceEnd to include `>`
      const replaceEnd = textAfter.startsWith('>') ? cursorPos + 1 : cursorPos;

      return {
        items: matchedItems.slice(0, 32),
        replaceStart,
        replaceEnd,
        query: rawQuery,
        triggerType: 'html-tag',
      };
    }

    // 2. Check if typing a bare tag prefix at the start of an indented line without `<` (e.g. `  h1` or `  h1#` or `  h1.`)
    const currentLineBefore = textBefore.split('\n').pop() || '';
    const currentLineAfter = textAfter.split('\n')[0] || '';
    const bareTagLineMatch = currentLineBefore.match(/^\s*([a-zA-Z][a-zA-Z0-9]*[.#]?)$/);
    if (bareTagLineMatch && currentLineAfter.trim() === '') {
      const rawQuery = bareTagLineMatch[1].toLowerCase();
      const replaceStart = cursorPos - bareTagLineMatch[1].length;

      let matchedItems: CompletionItem[];
      if (rawQuery.endsWith('#') || rawQuery.endsWith('.')) {
        const tagPrefix = rawQuery.slice(0, -1);
        const targetKind = rawQuery.endsWith('#') ? 'id-snippet' : 'class-snippet';
        matchedItems = ALL_HTML_TAG_ITEMS.filter(
          (item) => item.kind === targetKind && item.tagName.startsWith(tagPrefix)
        );
      } else {
        matchedItems = ALL_HTML_TAG_ITEMS.filter((item) =>
          item.tagName.startsWith(rawQuery)
        ).sort((a, b) => {
          if (a.tagName !== b.tagName) {
            return a.tagName.localeCompare(b.tagName, 'en', { numeric: true });
          }
          return 0;
        });
      }

      if (matchedItems.length > 0) {
        return {
          items: matchedItems.slice(0, 24),
          replaceStart,
          replaceEnd: cursorPos,
          query: rawQuery,
          triggerType: 'html-tag',
        };
      }
    }

    // 3. Check if typing an HTML attribute inside an opening tag: e.g. `<a h` or `<img s`
    const attrMatch = textBefore.match(/<([a-zA-Z][a-zA-Z0-9-]*)\s+([^<>]*?\s+)?([a-zA-Z-]+)$/);
    if (attrMatch) {
      const attrQuery = attrMatch[3].toLowerCase();
      // Make sure we are not inside quotes
      const insideTagPart = attrMatch[0];
      const doubleQuotes = (insideTagPart.match(/"/g) || []).length;
      const singleQuotes = (insideTagPart.match(/'/g) || []).length;
      if (doubleQuotes % 2 === 0 && singleQuotes % 2 === 0) {
        const matchedAttrs = HTML_ATTRIBUTES.filter(
          (a) => a.name.startsWith(attrQuery) && a.name !== attrQuery
        ).map((a) =>
          buildCompletionFromTemplate(
            `attr-${a.name}`,
            a.name,
            a.name,
            'attr',
            a.detail,
            a.template
          )
        );

        if (matchedAttrs.length > 0) {
          return {
            items: matchedAttrs.slice(0, 12),
            replaceStart: cursorPos - attrQuery.length,
            replaceEnd: cursorPos,
            query: attrQuery,
            triggerType: 'html-attr',
          };
        }
      }
    }

    return null;
  }

  // CSS Tab: Check if typing a CSS property inside `{ ... }`
  if (activeTab === 'css') {
    const lastOpenBrace = textBefore.lastIndexOf('{');
    const lastCloseBrace = textBefore.lastIndexOf('}');
    if (lastOpenBrace > lastCloseBrace) {
      const currentLineBefore = textBefore.split('\n').pop() || '';
      const cssPropMatch = currentLineBefore.match(/^\s*([a-zA-Z-]+)$/);
      if (cssPropMatch) {
        const propQuery = cssPropMatch[1].toLowerCase();
        const matchedProps = CSS_PROPERTIES.filter((p) =>
          p.name.startsWith(propQuery)
        ).map((p) =>
          buildCompletionFromTemplate(
            `css-${p.name}`,
            p.name,
            p.name,
            'css',
            p.detail,
            p.template
          )
        );

        if (matchedProps.length > 0) {
          return {
            items: matchedProps.slice(0, 12),
            replaceStart: cursorPos - propQuery.length,
            replaceEnd: cursorPos,
            query: propQuery,
            triggerType: 'css-prop',
          };
        }
      }
    }
  }

  return null;
}
