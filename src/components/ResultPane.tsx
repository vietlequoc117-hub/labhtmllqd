import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Lesson } from '../types';
import { resolveVirtualPaths, MOCK_THONG_TIN_HTML, MOCK_CLB_HTML } from '../data/mockAssets';
import { lintHtmlCode, lintCssCode, CodeDiagnostic } from '../utils/htmlLintValidator';
import {
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  FileCode2,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

interface ResultPaneProps {
  lesson: Lesson;
  htmlCode: string;
  cssCode: string;
  onNavigateToError?: (line: number, source: 'html' | 'css') => void;
}

export const ResultPane: React.FC<ResultPaneProps> = ({
  lesson,
  htmlCode,
  cssCode,
  onNavigateToError,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentVirtualPath, setCurrentVirtualPath] = useState('index.html');
  const [externalToast, setExternalToast] = useState<string | null>(null);

  // Linter diagnostics for HTML and CSS
  const htmlDiagnostics = useMemo(() => lintHtmlCode(htmlCode), [htmlCode]);
  const cssDiagnostics = useMemo(() => lintCssCode(cssCode), [cssCode]);

  // Fatal / blocker errors that prevent correct rendering
  const fatalErrors = useMemo(() => {
    return [...htmlDiagnostics, ...cssDiagnostics].filter((d) => d.severity === 'error');
  }, [htmlDiagnostics, cssDiagnostics]);

  const hasFatalErrors = fatalErrors.length > 0;

  // Update iframe preview content
  const updateIframe = (overridePath?: string) => {
    if (!iframeRef.current) return;
    if (hasFatalErrors) return; // Do not render normal preview if code has syntax errors

    const rawPath = overridePath !== undefined ? overridePath : currentVirtualPath;
    const cleanPath = rawPath.toLowerCase().trim().split('#')[0].split('?')[0].replace(/^(\.\/|\/)/, '');

    if (cleanPath === 'thong_tin.html' || cleanPath === 'thongtin.html' || cleanPath === 'thong-tin.html') {
      iframeRef.current.srcdoc = resolveVirtualPaths(MOCK_THONG_TIN_HTML);
      return;
    }
    if (cleanPath === 'clb.html') {
      iframeRef.current.srcdoc = resolveVirtualPaths(MOCK_CLB_HTML);
      return;
    }

    const processedHtml = resolveVirtualPaths(htmlCode);
    const cleanCss = cssCode.replace(/<\/?style>/gi, '').trim();

    // Style block containing student's CSS + base canvas reset
    const styleBlock = `
    <style id="base-canvas-reset">
      html { min-height: 100%; }
      body { min-height: 100%; box-sizing: border-box; }
    </style>
    <style id="synced-style-css" data-source="style.css">
      ${cleanCss}
    </style>`;

    let fullDocument = '';

    // Regex to detect link tags pointing to style.css (e.g., <link rel="stylesheet" href="style.css">)
    const linkRegex = /<link[^>]+(?:href=["'](?:\.\/)?style\.css["'][^>]*|rel=["']stylesheet["'][^>]*href=["'](?:\.\/)?style\.css["'][^>]*)[^>]*>/gi;

    if (processedHtml.includes('<html') || processedHtml.includes('<!DOCTYPE')) {
      if (linkRegex.test(processedHtml)) {
        // If student explicitly wrote <link href="style.css">, replace it with the actual synchronized stylesheet
        fullDocument = processedHtml.replace(linkRegex, styleBlock);
      } else if (processedHtml.includes('</head>')) {
        fullDocument = processedHtml.replace('</head>', `${styleBlock}\n</head>`);
      } else if (processedHtml.includes('<body')) {
        fullDocument = processedHtml.replace('<body', `${styleBlock}\n<body`);
      } else {
        fullDocument = `${styleBlock}\n${processedHtml}`;
      }
    } else {
      fullDocument = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${styleBlock}
</head>
<body>
  ${processedHtml}
</body>
</html>`;
    }

    iframeRef.current.srcdoc = fullDocument;
  };

  // Listen for navigation messages from the sandboxed iframe
  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (!e.data) return;
      if (e.data.type === 'OPEN_EXTERNAL_URL' && e.data.url) {
        setExternalToast(e.data.url);
        setTimeout(() => setExternalToast(null), 6000);
      } else if (e.data.type === 'NAVIGATE_VIRTUAL_PAGE' && e.data.page) {
        setCurrentVirtualPath(e.data.page);
        updateIframe(e.data.page);
      } else if (e.data.type === 'RESTORE_MAIN_PAGE') {
        setCurrentVirtualPath('index.html');
        updateIframe('index.html');
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, [htmlCode, cssCode, hasFatalErrors]);

  useEffect(() => {
    setCurrentVirtualPath('index.html');
    updateIframe('index.html');
  }, [htmlCode, cssCode, lesson.id, hasFatalErrors]);

  const openInNewWindow = () => {
    const processedHtml = resolveVirtualPaths(htmlCode);
    const cleanCss = cssCode.replace(/<\/?style>/gi, '').trim();
    const styleBlock = `
    <style id="base-canvas-reset">
      html, body { min-height: 100%; margin: 0; }
    </style>
    <style id="synced-style-css">
      ${cleanCss}
    </style>`;

    const linkRegex = /<link[^>]+(?:href=["'](?:\.\/)?style\.css["'][^>]*|rel=["']stylesheet["'][^>]*href=["'](?:\.\/)?style\.css["'][^>]*)[^>]*>/gi;
    let fullDocument = '';

    if (processedHtml.includes('<html') || processedHtml.includes('<!DOCTYPE')) {
      if (linkRegex.test(processedHtml)) {
        fullDocument = processedHtml.replace(linkRegex, styleBlock);
      } else if (processedHtml.includes('</head>')) {
        fullDocument = processedHtml.replace('</head>', `${styleBlock}\n</head>`);
      } else {
        fullDocument = `${styleBlock}\n${processedHtml}`;
      }
    } else {
      fullDocument = `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8">${styleBlock}</head><body>${processedHtml}</body></html>`;
    }

    const blob = new Blob([fullDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newTab = window.open(url, '_blank');
    if (!newTab) {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.click();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 select-none overflow-hidden">
      {/* Top Bar: Preview Label & Viewport Controls */}
      <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-bold text-slate-800">Xem trước trực tiếp</span>
          <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-medium hidden sm:inline">
            HTML &amp; CSS đồng bộ
          </span>
        </div>

        {/* Viewport size toggles */}
        <div className="flex items-center gap-1 text-slate-500">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded transition cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-white text-blue-600 shadow-xs border border-slate-200' : 'hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            title="Máy tính để bàn (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded transition cursor-pointer ${
              deviceMode === 'tablet' ? 'bg-white text-blue-600 shadow-xs border border-slate-200' : 'hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            title="Máy tính bảng (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded transition cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-white text-blue-600 shadow-xs border border-slate-200' : 'hover:text-slate-900 hover:bg-slate-200/50'
            }`}
            title="Điện thoại di động (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VIEWPORT BODY */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-100">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Simulated Browser URL bar */}
          <div className="h-8 bg-slate-100 border-b border-slate-200 px-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              </div>
              <div className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-600 font-mono flex items-center gap-1.5 shadow-xs truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">virtual://lqd-html-lab/{lesson.lessonNumber.toLowerCase().replace(' ', '')}/{currentVirtualPath}</span>
              </div>
              {currentVirtualPath !== 'index.html' && (
                <button
                  onClick={() => {
                    setCurrentVirtualPath('index.html');
                    updateIframe('index.html');
                  }}
                  className="text-[10px] text-blue-600 hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100 border border-blue-200 px-1.5 py-0.5 rounded transition cursor-pointer shrink-0"
                  title="Quay lại trang chính index.html"
                >
                  ← Về index.html
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Đồng bộ HTML + CSS</span>
            </div>
          </div>

          {/* Iframe container with responsive device sizing or Error Screen */}
          <div className="flex-1 bg-slate-100 flex items-center justify-center p-2.5 overflow-auto">
            <div
              className={`h-full bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-slate-200/90 relative ${
                deviceMode === 'desktop'
                  ? 'w-full'
                  : deviceMode === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
            >
              {hasFatalErrors ? (
                /* PEDAGOGICAL ERROR SCREEN (Khi có lỗi cú pháp, không hiển thị trang như bình thường để học sinh hiểu & sửa) */
                <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-6 text-center select-text overflow-y-auto">
                  <div className="max-w-md w-full bg-white rounded-2xl border border-rose-200 shadow-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
                      <AlertTriangle className="w-6 h-6 animate-bounce" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1.5">
                        <span>Chưa thể hiển thị Xem trước trực tiếp</span>
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Mã nguồn đang có <b>{fatalErrors.length} lỗi cú pháp chưa hợp lệ</b>. Trình duyệt không thể kết xuất chính xác trang web nếu chưa sửa hết các lỗi này.
                      </p>
                    </div>

                    {/* Danh sách các lỗi cần sửa */}
                    <div className="text-left space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {fatalErrors.map((err, idx) => {
                        const errSource: 'html' | 'css' = err.source || (err.id.startsWith('css-') ? 'css' : 'html');
                        return (
                          <div
                            key={err.id || idx}
                            className="p-3 rounded-xl bg-rose-50/80 border border-rose-200/90 space-y-1 text-xs"
                          >
                            <div className="flex items-center justify-between font-bold text-rose-800">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-200/70 text-rose-900 border border-rose-300">
                                  {errSource === 'html' ? 'index.html' : 'style.css'}
                                </span>
                                <span>Lỗi tại dòng {err.line}</span>
                              </span>
                              {onNavigateToError && (
                                <button
                                  onClick={() => onNavigateToError(err.line, errSource)}
                                  className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 cursor-pointer underline"
                                >
                                  Đến sửa dòng {err.line} <ArrowRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <div className="text-slate-700 font-medium">
                              {err.message}
                            </div>
                            {err.suggestion && (
                              <div className="text-[11px] text-emerald-800 bg-emerald-50/80 border border-emerald-200/60 rounded px-2 py-1 mt-1 flex items-start gap-1">
                                <HelpCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{err.suggestion}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-center text-[11px] text-slate-500 gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Hãy sửa lỗi ở cột giữa, kết quả sẽ tự động hiển thị ngay!</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {externalToast && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-3.5 py-2 rounded-xl text-xs shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 max-w-[94%] select-none backdrop-blur-xs">
                      <ExternalLink className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
                      <div className="flex-1 min-w-0">
                        <span className="text-slate-300 text-[11px] block">Đang kết nối đến trang web:</span>
                        <span className="text-blue-300 font-bold truncate block max-w-[200px] sm:max-w-xs">{externalToast}</span>
                      </div>
                      <a
                        href={externalToast}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-2.5 py-1 rounded-lg text-[11px] shrink-0 flex items-center gap-1 transition shadow-xs cursor-pointer"
                      >
                        <span>Mở tab mới</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    title="Kết quả trang web học sinh"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals"
                    className="w-full h-full border-0 bg-white"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
