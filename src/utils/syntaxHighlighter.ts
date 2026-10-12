// High-performance HTML & CSS syntax highlighter for high school students
// Provides visual distinction for:
// - HTML Tags: Pink/Rose (#f43f5e)
// - Attributes: Lime Green (#a6e22e / #84cc16)
// - Attribute Values & Strings: Golden Yellow (#facc15 / #e6db74)
// - Brackets & Operators: Silver/Gray (#cbd5e1)
// - Plain Text Content: Crisp White (#f8fafc)
// - Comments: Muted Slate (#94a3b8)

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export type EditorTheme = 'monokai' | 'light';

export interface HighlightColors {
  tag: string;
  attribute: string;
  value: string;
  bracket: string;
  operator: string;
  text: string;
  comment: string;
  cssSelector: string;
  cssProperty: string;
  cssValue: string;
}

export const THEME_COLORS: Record<EditorTheme, HighlightColors> = {
  monokai: {
    tag: '#f43f5e', // Vibrant Pink / Rose (as in user screenshot)
    attribute: '#a3e635', // Vibrant Lime / Green (as in user screenshot)
    value: '#facc15', // Warm Golden Yellow (as in user screenshot)
    bracket: '#cbd5e1', // Light Silver / White
    operator: '#e2e8f0', // Muted Silver
    text: '#f8fafc', // Crisp White
    comment: '#94a3b8', // Gray Italic
    cssSelector: '#f43f5e',
    cssProperty: '#38bdf8', // Sky Cyan
    cssValue: '#facc15',
  },
  light: {
    tag: '#e11d48', // Deep Rose / Crimson
    attribute: '#16a34a', // Emerald Green
    value: '#b45309', // Amber Brown
    bracket: '#475569', // Slate
    operator: '#64748b',
    text: '#0f172a', // Deep Slate
    comment: '#64748b',
    cssSelector: '#e11d48',
    cssProperty: '#0284c7', // Ocean Blue
    cssValue: '#d97706',
  },
};

export function highlightHtmlCode(code: string, theme: EditorTheme = 'monokai'): string {
  const colors = THEME_COLORS[theme];
  let result = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    // 1. HTML Comment <!-- ... -->
    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i);
      if (end !== -1) {
        const comment = code.slice(i, end + 3);
        result += `<span style="color: ${colors.comment}; font-style: italic;">${escapeHtml(comment)}</span>`;
        i = end + 3;
        continue;
      } else {
        const comment = code.slice(i);
        result += `<span style="color: ${colors.comment}; font-style: italic;">${escapeHtml(comment)}</span>`;
        break;
      }
    }

    // 2. Check for <style> tag content for CSS embedding
    if (/^<style\b[^>]*>/i.test(code.slice(i))) {
      const match = code.slice(i).match(/^<style\b[^>]*>/i);
      if (match) {
        const openTag = match[0];
        result += highlightTagBlock(openTag, colors);
        i += openTag.length;

        const closeIndex = code.slice(i).search(/<\/style>/i);
        if (closeIndex !== -1) {
          const cssCode = code.slice(i, i + closeIndex);
          result += highlightCssCode(cssCode, theme);
          i += closeIndex;
        }
        continue;
      }
    }

    // 3. Closing tag </tag>
    if (code.startsWith('</', i)) {
      const end = code.indexOf('>', i);
      const tagContent = end !== -1 ? code.slice(i, end + 1) : code.slice(i);
      result += highlightTagBlock(tagContent, colors);
      i += tagContent.length;
      continue;
    }

    // 4. Opening or self-closing tag <tag ...>
    if (code[i] === '<') {
      const end = code.indexOf('>', i);
      const tagContent = end !== -1 ? code.slice(i, end + 1) : code.slice(i);
      result += highlightTagBlock(tagContent, colors);
      i += tagContent.length;
      continue;
    }

    // 5. Plain text content between tags
    let nextTagIndex = code.indexOf('<', i);
    if (nextTagIndex === -1) {
      nextTagIndex = len;
    }
    const textChunk = code.slice(i, nextTagIndex);
    result += `<span style="color: ${colors.text};">${escapeHtml(textChunk)}</span>`;
    i = nextTagIndex;
  }

  // Ensure trailing newline is visible in <pre>
  if (code.endsWith('\n')) {
    result += ' ';
  }

  return result;
}

// Tokenize a single tag block like <form action='login.php' method='post'> or </form>
function highlightTagBlock(tagBlock: string, colors: HighlightColors): string {
  let out = '';
  let j = 0;
  const len = tagBlock.length;

  // Opening bracket
  if (tagBlock.startsWith('</', j)) {
    out += `<span style="color: ${colors.bracket}; font-weight: 500;">&lt;/</span>`;
    j += 2;
  } else if (tagBlock.startsWith('<', j)) {
    out += `<span style="color: ${colors.bracket}; font-weight: 500;">&lt;</span>`;
    j += 1;
  }

  // Check for !DOCTYPE
  if (tagBlock.slice(j).match(/^!DOCTYPE\s+html/i)) {
    const docMatch = tagBlock.slice(j).match(/^!DOCTYPE\s+html/i)![0];
    out += `<span style="color: ${colors.tag}; font-weight: 700;">${escapeHtml(docMatch)}</span>`;
    j += docMatch.length;
  } else {
    // Tag name (letters, digits, hyphen)
    const tagNameMatch = tagBlock.slice(j).match(/^([a-zA-Z0-9-]+)/);
    if (tagNameMatch) {
      const tagName = tagNameMatch[1];
      out += `<span style="color: ${colors.tag}; font-weight: 700;">${escapeHtml(tagName)}</span>`;
      j += tagName.length;
    }
  }

  // Attributes until > or />
  while (j < len) {
    // Check for self closing /> or closing >
    if (tagBlock.startsWith('/>', j)) {
      out += `<span style="color: ${colors.bracket}; font-weight: 500;">/&gt;</span>`;
      j += 2;
      break;
    }
    if (tagBlock[j] === '>') {
      out += `<span style="color: ${colors.bracket}; font-weight: 500;">&gt;</span>`;
      j += 1;
      break;
    }

    // Whitespace
    if (/\s/.test(tagBlock[j])) {
      out += tagBlock[j];
      j++;
      continue;
    }

    // Attribute name
    const attrMatch = tagBlock.slice(j).match(/^([a-zA-Z0-9_:@.-]+)/);
    if (attrMatch) {
      const attrName = attrMatch[1];
      out += `<span style="color: ${colors.attribute}; font-weight: 600;">${escapeHtml(attrName)}</span>`;
      j += attrName.length;

      // Consume whitespace between attr and =
      while (j < len && /\s/.test(tagBlock[j])) {
        out += tagBlock[j];
        j++;
      }

      // Check for =
      if (tagBlock[j] === '=') {
        out += `<span style="color: ${colors.operator}; font-weight: bold;">=</span>`;
        j++;

        // Consume whitespace between = and value
        while (j < len && /\s/.test(tagBlock[j])) {
          out += tagBlock[j];
          j++;
        }

        // Value: either quoted '...', "...", or unquoted like size=4
        if (tagBlock[j] === '"' || tagBlock[j] === "'") {
          const quote = tagBlock[j];
          let endQuote = tagBlock.indexOf(quote, j + 1);
          if (endQuote === -1) endQuote = len - 1;
          const quotedVal = tagBlock.slice(j, endQuote + 1);
          out += `<span style="color: ${colors.value}; font-weight: 500;">${escapeHtml(quotedVal)}</span>`;
          j = endQuote + 1;
        } else {
          // Unquoted value (e.g. size=4 or border=1)
          const unquotedMatch = tagBlock.slice(j).match(/^([^>\s/]+)/);
          if (unquotedMatch) {
            const val = unquotedMatch[1];
            out += `<span style="color: ${colors.value}; font-weight: 500;">${escapeHtml(val)}</span>`;
            j += val.length;
          }
        }
      }
      continue;
    }

    // Fallback char
    out += escapeHtml(tagBlock[j]);
    j++;
  }

  return out;
}

export function highlightCssCode(code: string, theme: EditorTheme = 'monokai'): string {
  const colors = THEME_COLORS[theme];
  let result = '';
  let i = 0;
  const len = code.length;
  let inBlock = false;

  while (i < len) {
    // 1. CSS Comment /* ... */
    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i);
      if (end !== -1) {
        const comment = code.slice(i, end + 2);
        result += `<span style="color: ${colors.comment}; font-style: italic;">${escapeHtml(comment)}</span>`;
        i = end + 2;
        continue;
      } else {
        const comment = code.slice(i);
        result += `<span style="color: ${colors.comment}; font-style: italic;">${escapeHtml(comment)}</span>`;
        break;
      }
    }

    // 2. Block open {
    if (code[i] === '{') {
      result += `<span style="color: ${colors.bracket}; font-weight: bold;">{</span>`;
      inBlock = true;
      i++;
      continue;
    }

    // 3. Block close }
    if (code[i] === '}') {
      result += `<span style="color: ${colors.bracket}; font-weight: bold;">}</span>`;
      inBlock = false;
      i++;
      continue;
    }

    // 4. Inside declaration block { ... }
    if (inBlock) {
      // Whitespace
      if (/\s/.test(code[i])) {
        result += code[i];
        i++;
        continue;
      }

      // Semicolon
      if (code[i] === ';') {
        result += `<span style="color: ${colors.operator};">;</span>`;
        i++;
        continue;
      }

      // Property name before :
      const colonIdx = code.indexOf(':', i);
      const semiIdx = code.indexOf(';', i);
      const braceIdx = code.indexOf('}', i);

      if (colonIdx !== -1 && (semiIdx === -1 || colonIdx < semiIdx) && (braceIdx === -1 || colonIdx < braceIdx)) {
        const propName = code.slice(i, colonIdx).trim();
        result += `<span style="color: ${colors.cssProperty}; font-weight: 600;">${escapeHtml(propName)}</span>`;
        i += code.slice(i, colonIdx).length;

        // Add colon
        result += `<span style="color: ${colors.operator}; font-weight: bold;">:</span>`;
        i++; // skip :

        // Consume until ; or }
        let valEnd = len;
        if (semiIdx !== -1) valEnd = Math.min(valEnd, semiIdx);
        if (braceIdx !== -1) valEnd = Math.min(valEnd, braceIdx);

        const val = code.slice(i, valEnd);
        result += `<span style="color: ${colors.cssValue}; font-weight: 500;">${escapeHtml(val)}</span>`;
        i = valEnd;
        continue;
      }
    }

    // 5. Outside declaration block: Selector
    if (!inBlock) {
      let nextBrace = code.indexOf('{', i);
      if (nextBrace === -1) nextBrace = len;
      const selector = code.slice(i, nextBrace);
      result += `<span style="color: ${colors.cssSelector}; font-weight: 700;">${escapeHtml(selector)}</span>`;
      i = nextBrace;
      continue;
    }

    // Fallback char
    result += escapeHtml(code[i]);
    i++;
  }

  if (code.endsWith('\n')) {
    result += ' ';
  }

  return result;
}
