import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  FileCode2,
  Paintbrush,
  Copy,
  Check,
  WrapText,
  Sparkles,
  Palette,
  Sun,
  Moon,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
  Info,
  PenTool,
  Play,
  Zap
} from 'lucide-react';
import {
  highlightHtmlCode,
  highlightCssCode,
  THEME_COLORS,
  EditorTheme
} from '../utils/syntaxHighlighter';
import {
  lintHtmlCode,
  lintCssCode,
  CodeDiagnostic
} from '../utils/htmlLintValidator';

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
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  // Default to Monokai dark theme to match user's image exactly (pink tags, lime attributes, yellow strings)
  const [editorTheme, setEditorTheme] = useState<EditorTheme>('monokai');
  // Diagnostics drawer state
  const [showDiagnostics, setShowDiagnostics] = useState(true);

  const currentCode = activeTab === 'html' ? htmlCode : cssCode;
  const setCode = activeTab === 'html' ? onChangeHtml : onChangeCss;

  // Real-time linting diagnostics
  const diagnostics = useMemo(() => {
    if (activeTab === 'html') {
      return lintHtmlCode(htmlCode);
    } else {
      return lintCssCode(cssCode);
    }
  }, [htmlCode, cssCode, activeTab]);

  const errorCount = diagnostics.filter((d) => d.severity === 'error').length;
  const warningCount = diagnostics.filter((d) => d.severity === 'warning').length;

  // Map diagnostics by line number for line-gutter markers
  const diagnosticsByLine = useMemo(() => {
    const map = new Map<number, CodeDiagnostic[]>();
    for (const d of diagnostics) {
      const list = map.get(d.line) || [];
      list.push(d);
      map.set(d.line, list);
    }
    return map;
  }, [diagnostics]);

  // Calculate lines for synchronized line numbers
  const lines = currentCode.split('\n');
  const lineCount = lines.length;

  // Real-time syntax highlight token generation
  const highlightedHtml = useMemo(() => {
    if (activeTab === 'html') {
      return highlightHtmlCode(currentCode, editorTheme);
    } else {
      return highlightCssCode(currentCode, editorTheme);
    }
  }, [currentCode, activeTab, editorTheme]);

  // Synchronize scroll between textarea, pre highlight layer, and line numbers
  const handleScroll = () => {
    if (textareaRef.current) {
      const { scrollTop, scrollLeft } = textareaRef.current;
      if (preRef.current) {
        preRef.current.scrollTop = scrollTop;
        preRef.current.scrollLeft = scrollLeft;
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop;
      }
    }
  };

  useEffect(() => {
    handleScroll();
  }, [currentCode, fontSize]);

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

      if (indentation) {
        e.preventDefault();
        const value = textarea.value;
        const insertText = '\n' + indentation;
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

  // Jump cursor to specific line in editor
  const handleJumpToLine = (lineNumber: number) => {
    if (!textareaRef.current) return;
    const lineTexts = currentCode.split('\n');
    let charPos = 0;
    for (let i = 0; i < Math.min(lineNumber - 1, lineTexts.length); i++) {
      charPos += lineTexts[i].length + 1;
    }
    textareaRef.current.focus();
    const lineLength = lineTexts[lineNumber - 1]?.length || 0;
    textareaRef.current.setSelectionRange(charPos, charPos + lineLength);
    const approxScroll = (lineNumber - 3) * (fontSize * 1.6);
    textareaRef.current.scrollTop = Math.max(0, approxScroll);
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
    <section className="h-full flex flex-col bg-white border-r border-slate-200 select-none overflow-hidden">
      {/* Editor Header & Tabs */}
      <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t-md transition cursor-pointer ${
              activeTab === 'html'
                ? 'text-slate-900 bg-white border-t-2 border-orange-500 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-orange-500" />
            <span>index.html</span>
          </button>

          <button
            onClick={() => onChangeTab('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t-md transition cursor-pointer ${
              activeTab === 'css'
                ? 'text-slate-900 bg-white border-t-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5 text-blue-500" />
            <span>style.css</span>
          </button>

          <span className="hidden md:flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium ml-1">
            <Zap className="w-3 h-3 text-emerald-600" />
            <span>Đồng bộ</span>
          </span>
        </div>

        {/* Real-time Diagnostics Indicator Badge & Actions */}
        <div className="flex items-center gap-1.5 text-slate-500">
          {/* Run Code Button */}
          <button
            onClick={onRunCode}
            className="flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded border border-emerald-700 shadow-xs transition active:scale-95 cursor-pointer"
            title="Chạy đồng bộ HTML & CSS (Phím tắt: Ctrl + Enter)"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Chạy mã</span>
          </button>
          {/* Linter Status Pill */}
          <button
            onClick={() => setShowDiagnostics((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-md border transition cursor-pointer shadow-xs ${
              errorCount > 0
                ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100 animate-pulse'
                : warningCount > 0
                ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
            }`}
            title="Bấm để xem danh sách lỗi và hướng dẫn sửa từ chuyên gia"
          >
            {errorCount > 0 ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>{errorCount} lỗi cú pháp</span>
              </>
            ) : warningCount > 0 ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{warningCount} lưu ý</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cú pháp chuẩn ✓</span>
              </>
            )}
            {diagnostics.length > 0 && (
              <span className="text-[10px] text-slate-500">
                {showDiagnostics ? '▼' : '▲'}
              </span>
            )}
          </button>

          {/* Switch Editor Theme button */}
          <button
            onClick={() => setEditorTheme((prev) => (prev === 'monokai' ? 'light' : 'monokai'))}
            className={`flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded border transition cursor-pointer shadow-xs ${
              editorTheme === 'monokai'
                ? 'bg-slate-900 text-amber-300 border-slate-700 hover:bg-slate-800'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Đổi màu nền trình soạn thảo (Monokai chuẩn màu như hình hoặc Nền sáng)"
          >
            {editorTheme === 'monokai' ? (
              <>
                <Moon className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">Monokai</span>
              </>
            ) : (
              <>
                <Sun className="w-3 h-3 text-amber-500" />
                <span className="hidden sm:inline">Sáng</span>
              </>
            )}
          </button>

          {activeTab === 'html' && (
            <button
              onClick={handleFormat}
              className="p-1.5 hover:text-slate-800 hover:bg-slate-200/60 rounded transition cursor-pointer"
              title="Định dạng thụt lề mã (Format Code)"
            >
              <WrapText className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 hover:text-slate-800 hover:bg-slate-200/60 rounded transition cursor-pointer"
            title="Sao chép toàn bộ mã"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* SYNTAX HIGHLIGHTING LEGEND BAR (Dành cho học sinh nhận biết màu từ khóa như hình) */}
      <div
        className={`px-3 py-1.5 text-[11px] font-mono flex items-center justify-between border-b shrink-0 overflow-x-auto ${
          editorTheme === 'monokai'
            ? 'bg-[#181820] border-slate-800 text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Palette className="w-3 h-3" />
            {activeTab === 'html' ? 'Màu cú pháp HTML:' : 'Màu cú pháp CSS:'}
          </span>

          {activeTab === 'html' ? (
            <>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].tag }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].tag }}
                  className="font-bold"
                >
                  &lt;Thẻ HTML&gt;
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].attribute }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].attribute }}
                  className="font-bold"
                >
                  thuộc_tính=
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].value }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].value }}
                  className="font-bold"
                >
                  &apos;giá_trị&apos;
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].text }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].text }}
                  className="font-medium"
                >
                  Nội dung chữ
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].cssSelector }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].cssSelector }}
                  className="font-bold"
                >
                  bộ_chọn (body, h1, .class)
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].bracket }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].bracket }}
                  className="font-bold"
                >
                  &#123; &#125;
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].cssProperty }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].cssProperty }}
                  className="font-bold"
                >
                  thuộc_tính:
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: THEME_COLORS[editorTheme].cssValue }}
                ></span>
                <span
                  style={{ color: THEME_COLORS[editorTheme].cssValue }}
                  className="font-bold"
                >
                  &apos;giá_trị&apos;;
                </span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Editor Body with Line Numbers, Error Badges & Dual-Layer Syntax Highlighting */}
      <div
        className={`flex-1 flex overflow-hidden relative ${
          editorTheme === 'monokai' ? 'bg-[#272822]' : 'bg-white'
        }`}
      >
        {/* Line Numbers Column with Real-time Error Markers */}
        <div
          ref={lineNumbersRef}
          className={`w-14 py-3.5 font-mono select-none overflow-hidden shrink-0 border-r leading-relaxed ${
            editorTheme === 'monokai'
              ? 'bg-[#1e1f1c] text-[#75715e] border-[#3e3d32]'
              : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            lineHeight: '1.6',
          }}
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const lineNum = i + 1;
            const lineErrors = diagnosticsByLine.get(lineNum);
            const hasError = lineErrors && lineErrors.some((e) => e.severity === 'error');
            const hasWarning = lineErrors && lineErrors.some((e) => e.severity === 'warning');

            return (
              <div
                key={i}
                onClick={() => lineErrors && handleJumpToLine(lineNum)}
                className={`leading-relaxed flex items-center justify-end pr-2.5 gap-1.5 transition ${
                  lineErrors ? 'cursor-pointer font-bold' : ''
                } ${
                  hasError
                    ? 'text-rose-500 bg-rose-500/10'
                    : hasWarning
                    ? 'text-amber-500 bg-amber-500/10'
                    : ''
                }`}
                style={{ lineHeight: '1.6' }}
                title={
                  lineErrors
                    ? `Dòng ${lineNum}: ${lineErrors.map((e) => e.message).join(' | ')}`
                    : undefined
                }
              >
                {/* Warning / Error Indicator Icon */}
                {hasError ? (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block shrink-0"></span>
                ) : hasWarning ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block shrink-0"></span>
                ) : null}
                <span>{lineNum}</span>
              </div>
            );
          })}
        </div>

        {/* Code Canvas Container: Pre (syntax highlight) + Textarea (interactive input) */}
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Syntax Highlighted Layer (rendered HTML) */}
          <pre
            ref={preRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full m-0 p-3.5 font-mono overflow-hidden pointer-events-none whitespace-pre select-none border-0 box-border"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              lineHeight: '1.6',
              tabSize: 2,
            }}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />

          {/* Transparent Input Textarea */}
          <textarea
            ref={textareaRef}
            value={currentCode}
            onChange={(e) => setCode(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            className="absolute inset-0 w-full h-full m-0 p-3.5 font-mono resize-none focus:outline-none focus:ring-0 bg-transparent text-transparent selection:bg-blue-500/30 selection:text-transparent select-text overflow-auto whitespace-pre border-0 box-border"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              lineHeight: '1.6',
              tabSize: 2,
              caretColor: editorTheme === 'monokai' ? '#38bdf8' : '#2563eb',
            }}
            placeholder={
              activeTab === 'html'
                ? '<!-- Nhập mã HTML tại đây... -->'
                : '/* Nhập quy tắc CSS tại đây... */'
            }
          />
        </div>
      </div>

      {/* EXPERT ERROR DIAGNOSTICS & GUIDANCE DRAWER (Chuyên gia phát hiện lỗi & hướng dẫn học sinh tự sửa) */}
      {diagnostics.length > 0 && showDiagnostics && (
        <div className="border-t border-rose-200/90 bg-rose-50/80 max-h-52 flex flex-col shrink-0 animate-in slide-in-from-bottom-2 duration-150">
          {/* Diagnostics Header Bar */}
          <div className="px-3 py-1.5 bg-rose-100/90 border-b border-rose-200 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-bold text-slate-900 text-xs">
                Chuyên gia phát hiện {diagnostics.length} điểm cần sửa:
              </span>
              <span className="text-[10px] bg-rose-200 text-rose-800 px-1.5 py-0.5 rounded font-mono font-bold">
                {errorCount} lỗi • {warningCount} lưu ý
              </span>
              <span className="text-[11px] text-rose-700/90 italic hidden md:inline">
                (Đọc kỹ hướng dẫn dưới đây và tự tay gõ sửa để rèn luyện kỹ năng)
              </span>
            </div>
            <button
              onClick={() => setShowDiagnostics(false)}
              className="text-slate-500 hover:text-slate-800 p-0.5 rounded cursor-pointer"
              title="Thu gọn bảng báo lỗi"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Diagnostics Error List */}
          <div className="p-2.5 overflow-y-auto space-y-2 text-xs">
            {diagnostics.map((diag) => (
              <div
                key={diag.id}
                className={`p-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 transition shadow-2xs ${
                  diag.severity === 'error'
                    ? 'bg-white border-rose-200 text-slate-800'
                    : 'bg-white border-amber-200 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 mt-0.5 ${
                      diag.severity === 'error'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    Dòng {diag.line}
                  </span>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 leading-snug">
                      {diag.message}
                    </p>
                    {diag.suggestion && (
                      <div className="text-[11px] bg-amber-50/70 border border-amber-200/80 rounded-md p-1.5 text-slate-700 flex items-start gap-1.5">
                        <span className="text-amber-800 font-bold shrink-0">💡 Hướng dẫn em tự sửa:</span>
                        <span className="leading-relaxed font-medium">{diag.suggestion}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 sm:self-center">
                  <button
                    onClick={() => handleJumpToLine(diag.line)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1.5 rounded-md transition cursor-pointer shadow-2xs"
                    title="Đưa con trỏ soạn thảo đến đúng dòng này để em tự gõ sửa"
                  >
                    <PenTool className="w-3.5 h-3.5 text-blue-600" />
                    <span>Đến dòng {diag.line} tự sửa</span>
                    <ArrowRight className="w-3 h-3 text-blue-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Footer Status */}
      <div
        className={`h-7 px-3 flex items-center justify-between text-[11px] shrink-0 border-t ${
          editorTheme === 'monokai'
            ? 'bg-[#1e1f1c] text-slate-400 border-[#3e3d32]'
            : 'bg-slate-50 text-slate-500 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                errorCount > 0
                  ? 'bg-rose-500'
                  : warningCount > 0
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
            ></span>
            <span>{activeTab === 'html' ? 'HTML5 Document' : 'CSS Stylesheet'}</span>
          </span>
          <span>{lineCount} dòng</span>
          <span>{currentCode.length} ký tự</span>

          {diagnostics.length > 0 && (
            <button
              onClick={() => setShowDiagnostics((prev) => !prev)}
              className="text-rose-600 font-bold hover:underline cursor-pointer"
            >
              {errorCount > 0
                ? `🔴 Có ${errorCount} lỗi cần sửa (bấm để xem)`
                : `🟡 Có ${warningCount} lưu ý`}
            </button>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <span>Tab: 2 spaces</span>
          <span>UTF-8</span>
          <span className="font-medium text-blue-500">Ctrl + Enter: Chạy</span>
        </div>
      </div>
    </section>
  );
};


