import React, { useRef, useEffect } from 'react';
import {
  FileCode2,
  Paintbrush,
  Copy,
  Check,
  WrapText,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  activeTab: 'html' | 'css';
  onChangeTab: (tab: 'html' | 'css') => void;
  onChangeHtml: (value: string) => void;
  onChangeCss: (value: string) => void;
  fontSize?: number;
  onRunCode: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  htmlCode,
  cssCode,
  activeTab,
  onChangeTab,
  onChangeHtml,
  onChangeCss,
  fontSize = 14,
  onRunCode,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const currentCode = activeTab === 'html' ? htmlCode : cssCode;
  const setCode = activeTab === 'html' ? onChangeHtml : onChangeCss;

  // Calculate lines for synchronized line numbers
  const lines = currentCode.split('\n');
  const lineCount = lines.length;

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRunCode();
      return;
    }

    // Tab key indent (2 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      textarea.value = value.substring(0, start) + '  ' + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      setCode(textarea.value);
      return;
    }

    // Auto-indent on Enter
    if (e.key === 'Enter') {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const currentLine = textBeforeCursor.split('\n').pop() || '';
      const match = currentLine.match(/^\s+/);
      const indentation = match ? match[0] : '';

      // If opening a block tag, extra indent
      let extraIndent = '';
      if (currentLine.trim().endsWith('>') && !currentLine.trim().startsWith('</')) {
        // could add indent if desired
      }

      if (indentation || extraIndent) {
        e.preventDefault();
        const value = textarea.value;
        const insertText = '\n' + indentation + extraIndent;
        textarea.value =
          value.substring(0, cursorPosition) +
          insertText +
          value.substring(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd =
          cursorPosition + insertText.length;
        setCode(textarea.value);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple auto format HTML indent
  const handleFormat = () => {
    if (activeTab !== 'html') return;
    try {
      let formatted = '';
      let indent = 0;
      const rawLines = htmlCode.split('\n');

      for (let rawLine of rawLines) {
        let line = rawLine.trim();
        if (!line) {
          formatted += '\n';
          continue;
        }

        // Decrease indent for closing tags
        if (line.match(/^<\/(?!html|head|body)/i) || line.startsWith('</html>') || line.startsWith('</body>') || line.startsWith('</head>')) {
          indent = Math.max(0, indent - 1);
        }

        formatted += '  '.repeat(indent) + line + '\n';

        // Increase indent for opening tags that are not self-closing and do not close on same line
        const isSelfClosing = line.endsWith('/>') || line.startsWith('<!') || line.startsWith('<hr') || line.startsWith('<br') || line.startsWith('<img') || line.startsWith('<input');
        const hasClosingTagSameLine = /<([a-z0-9]+)[^>]*>.*<\/\1>/i.test(line);

        if (!isSelfClosing && !hasClosingTagSameLine && /^<[a-z0-9]+/i.test(line) && !line.startsWith('</')) {
          indent++;
        }
      }
      onChangeHtml(formatted.trimEnd());
    } catch {
      // ignore
    }
  };

  return (
    <section className="h-full flex flex-col bg-slate-950 border-r border-slate-800 select-none overflow-hidden">
      {/* Editor Header & Tabs */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onChangeTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t transition cursor-pointer ${
              activeTab === 'html'
                ? 'text-white bg-slate-950 border-t-2 border-orange-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-orange-500" />
            <span>index.html</span>
          </button>

          <button
            onClick={() => onChangeTab('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t transition cursor-pointer ${
              activeTab === 'css'
                ? 'text-white bg-slate-950 border-t-2 border-blue-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5 text-blue-400" />
            <span>style.css</span>
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 text-slate-400">
          {activeTab === 'html' && (
            <button
              onClick={handleFormat}
              className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
              title="Định dạng thụt lề mã (Format Code)"
            >
              <WrapText className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="Sao chép toàn bộ mã"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="flex-1 flex overflow-hidden relative bg-slate-950">
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          className="w-12 py-3.5 bg-slate-925 text-slate-600 font-mono text-right pr-3 select-none overflow-hidden shrink-0 border-r border-slate-900 leading-relaxed"
          style={{ fontSize: `${fontSize}px` }}
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-relaxed">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={currentCode}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-1 h-full bg-slate-950 text-slate-200 p-3.5 font-mono leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-blue-600/40 select-text overflow-y-auto"
          style={{ fontSize: `${fontSize}px` }}
          placeholder={activeTab === 'html' ? '<!-- Nhập mã HTML tại đây... -->' : '/* Nhập quy tắc CSS tại đây... */'}
        />
      </div>

      {/* Editor Footer Status */}
      <div className="h-7 bg-slate-900 border-t border-slate-800 px-3 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{activeTab === 'html' ? 'HTML5 Document' : 'CSS Stylesheet'}</span>
          </span>
          <span>{lineCount} dòng</span>
          <span>{currentCode.length} ký tự</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-500">
          <span>Tab: 2 spaces</span>
          <span>UTF-8</span>
          <span className="text-slate-400">Ctrl + Enter: Chạy</span>
        </div>
      </div>
    </section>
  );
};
