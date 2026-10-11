import React, { useState, useEffect, useRef } from 'react';
import { Lesson } from '../types';
import { resolveVirtualPaths } from '../data/mockAssets';
import {
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface ResultPaneProps {
  lesson: Lesson;
  htmlCode: string;
  cssCode: string;
}

export const ResultPane: React.FC<ResultPaneProps> = ({
  lesson,
  htmlCode,
  cssCode,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Update iframe preview content
  const updateIframe = () => {
    if (!iframeRef.current) return;
    const processedHtml = resolveVirtualPaths(htmlCode);
    const cleanCss = cssCode.replace(/<\/?style>/gi, '').trim();

    let fullDocument = '';
    if (processedHtml.includes('<html') || processedHtml.includes('<!DOCTYPE')) {
      const styleBlock = `<style>\n${cleanCss}\n</style>`;
      if (processedHtml.includes('</head>')) {
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
  <style>
    body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
    ${cleanCss}
  </style>
</head>
<body>
  ${processedHtml}
</body>
</html>`;
    }

    iframeRef.current.srcdoc = fullDocument;
  };

  useEffect(() => {
    updateIframe();
  }, [htmlCode, cssCode, lesson.id]);

  const openInNewWindow = () => {
    const processedHtml = resolveVirtualPaths(htmlCode);
    const blob = new Blob(
      [
        `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><style>${cssCode}</style></head><body>${processedHtml}</body></html>`,
      ],
      { type: 'text/html' }
    );
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
    <div className="h-full flex flex-col bg-slate-900 border-l border-slate-800 select-none overflow-hidden">
      {/* Top Bar: Preview Label & Viewport Controls */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 shrink-0">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-bold text-slate-200">Xem trước</span>
        </div>

        {/* Viewport size toggles */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded transition cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
            }`}
            title="Máy tính để bàn (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded transition cursor-pointer ${
              deviceMode === 'tablet' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
            }`}
            title="Máy tính bảng (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded transition cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-slate-800 text-blue-400' : 'hover:text-white'
            }`}
            title="Điện thoại di động (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={updateIframe}
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="Tải lại iframe"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={openInNewWindow}
            className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
            title="Mở tab mới"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VIEWPORT BODY */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-950">
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/60">
          {/* Simulated Browser URL bar */}
          <div className="h-8 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="truncate">virtual://lqd-html-lab/{lesson.lessonNumber.toLowerCase().replace(' ', '')}/index.html</span>
              </div>
            </div>
          </div>

          {/* Iframe container with responsive device sizing */}
          <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 overflow-auto">
            <div
              className={`h-full bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 border border-slate-700/60 ${
                deviceMode === 'desktop'
                  ? 'w-full'
                  : deviceMode === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
            >
              <iframe
                ref={iframeRef}
                title="Kết quả trang web học sinh"
                sandbox="allow-scripts"
                className="w-full h-full border-0 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
