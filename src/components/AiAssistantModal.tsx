import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Copy,
  Check,
  Code2,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Maximize2,
  Minimize2,
  Lightbulb,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { Lesson } from '../types';
import { generateLocalPedagogicalAnswer } from '../services/aiPedagogicalEngine';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  hasCodeAttached?: boolean;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLesson: Lesson;
  currentHtml: string;
  currentCss: string;
  onInsertCodeSnippet?: (snippet: string) => void;
}

const QUICK_QUESTIONS = [
  {
    icon: '💡',
    title: 'Block vs Inline',
    query: 'Thầy ơi, thẻ block (như <div>, <p>) khác gì thẻ inline (như <span>, <a>)? Cho em ví dụ đời thực dễ hiểu nhé!',
  },
  {
    icon: '🔍',
    title: 'Soi lỗi mã của em',
    query: 'Chuyên gia xem giúp em đoạn mã HTML/CSS em đang viết trong bài này có lỗi sai cú pháp hay chỗ nào chưa chuẩn không?',
    requiresCode: true,
  },
  {
    icon: '📐',
    title: 'Rowspan & Colspan',
    query: 'Làm sao để nhớ và sử dụng thuộc tính rowspan và colspan trong thẻ <table> mà không bị lệch ô hả thầy?',
  },
  {
    icon: '📝',
    title: 'Form & Input',
    query: 'Các loại input thông dụng nhất trong thẻ <form> thi Tin học 12 hay hỏi là gì và cách dùng ra sao?',
  },
  {
    icon: '🖼️',
    title: 'Thẻ <img> & Thuộc tính',
    query: 'Tại sao ảnh trong thẻ <img> đôi khi không hiển thị và thuộc tính alt có tác dụng gì quan trọng?',
  },
  {
    icon: '🎨',
    title: '3 Cách viết CSS',
    query: 'Phân biệt 3 cách nhúng CSS vào trang HTML (Inline, Internal, External). Khi nào nên dùng cách nào?',
  },
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLesson,
  currentHtml,
  currentCss,
  onInsertCodeSnippet,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `👋 **Chào em! Thầy là Trợ lý AI Chuyên gia HTML & Cố vấn Tin học 12.**

⚡ **Hệ thống đã tích hợp sẵn 100% — Em KHÔNG CẦN thiết lập hay nhập bất kỳ API key nào!**

Thầy ở đây để đồng hành và giải đáp mọi thắc mắc về **HTML, CSS và lập trình web** theo chuẩn Sách giáo khoa Tin học 12 (Bộ Kết nối tri thức với cuộc sống) một cách trực quan, dễ hiểu nhất dành riêng cho học sinh cấp THPT.

✨ Em có thể:
- ❓ Đặt bất kỳ câu hỏi lý thuyết hoặc thực hành nào.
- 🔍 Nhờ thầy **soi lỗi và nhận xét mã code** em đang làm ở bài: **${currentLesson.lessonNumber}: ${currentLesson.title}**.
- 💡 Bấm vào các câu hỏi nhanh gợi ý bên dưới để thử ngay!`,
      timestamp: 'Vừa xong',
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [includeCode, setIncludeCode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string, forceIncludeCode?: boolean) => {
    const questionText = (textToSend || inputValue).trim();
    if (!questionText || isLoading) return;

    const shouldAttachCode = forceIncludeCode !== undefined ? forceIncludeCode : includeCode;

    const userMessageId = 'msg-' + Date.now();
    const newUserMessage: Message = {
      id: userMessageId,
      sender: 'user',
      text: questionText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      hasCodeAttached: shouldAttachCode,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Build history pairs
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome-1')
        .slice(-6)
        .map((m) => ({
          question: m.sender === 'user' ? m.text : '',
          answer: m.sender === 'assistant' ? m.text : '',
        }));

      let answerText = '';

      try {
        const response = await fetch('/api/gemini/html-expert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: questionText,
            history: historyPayload,
            lessonTitle: `${currentLesson.lessonNumber}: ${currentLesson.title}`,
            lessonObjective: currentLesson.objective,
            codeHtml: shouldAttachCode ? currentHtml : '',
            codeCss: shouldAttachCode ? currentCss : '',
            includeCode: shouldAttachCode,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.answer) {
            answerText = data.answer;
          }
        }
      } catch (networkErr) {
        console.warn('Network call to AI server unavailable, using built-in Pedagogical Engine:', networkErr);
      }

      // If remote API is unavailable, rate-limited, or failed, use local Pedagogical Engine (100% Zero-API)
      if (!answerText) {
        answerText = generateLocalPedagogicalAnswer({
          question: questionText,
          lesson: currentLesson,
          codeHtml: shouldAttachCode ? currentHtml : '',
          codeCss: shouldAttachCode ? currentCss : '',
          includeCode: shouldAttachCode,
        });
      }

      const assistantMessage: Message = {
        id: 'msg-ai-' + Date.now(),
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error fallback:', err);
      const fallbackText = generateLocalPedagogicalAnswer({
        question: questionText,
        lesson: currentLesson,
        codeHtml: shouldAttachCode ? currentHtml : '',
        codeCss: shouldAttachCode ? currentCss : '',
        includeCode: shouldAttachCode,
      });

      const assistantMessage: Message = {
        id: 'msg-local-' + Date.now(),
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset-' + Date.now(),
        sender: 'assistant',
        text: `🔄 **Cuộc trò chuyện đã được làm mới.**\n\nEm đang học: **${currentLesson.lessonNumber}: ${currentLesson.title}**.\n\nHãy đặt câu hỏi cho thầy bất cứ khi nào em cần nhé!`,
        timestamp: 'Vừa xong',
      },
    ]);
  };

  // Safe and rich markdown renderer for assistant responses
  const renderMessageContent = (text: string, msgId: string) => {
    // Split into code blocks and normal paragraphs
    const parts = text.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const firstLine = lines[0].trim();
        const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
        const language = hasLang ? firstLine : 'html';
        const codeContent = hasLang ? lines.slice(1).join('\n') : lines.join('\n');
        const codeBlockId = `${msgId}-code-${index}`;

        return (
          <div key={index} className="my-3 rounded-xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-lg">
            <div className="bg-slate-900/90 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px]">
              <span className="font-mono uppercase font-bold text-blue-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                {language}
              </span>
              <div className="flex items-center gap-1.5">
                {onInsertCodeSnippet && (
                  <button
                    onClick={() => onInsertCodeSnippet(codeContent)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium transition cursor-pointer text-[10px]"
                    title="Chèn đoạn mã này vào trình soạn thảo"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Chèn vào bài</span>
                  </button>
                )}
                <button
                  onClick={() => handleCopyText(codeContent, codeBlockId)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition cursor-pointer text-[10px]"
                >
                  {copiedId === codeBlockId ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed selection:bg-blue-600 selection:text-white">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      }

      // Render regular markdown paragraph
      return (
        <div key={index} className="space-y-2 text-xs md:text-[13px] leading-relaxed">
          {part.split('\n\n').map((paragraph, pIdx) => {
            if (!paragraph.trim()) return null;

            // Header 1-3
            if (paragraph.startsWith('### ')) {
              return (
                <h4 key={pIdx} className="font-bold text-sm text-blue-700 mt-2.5 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block"></span>
                  {paragraph.replace('### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h3 key={pIdx} className="font-bold text-base text-slate-900 mt-2.5 mb-1">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('# ')) {
              return (
                <h2 key={pIdx} className="font-extrabold text-lg text-slate-900 mt-2.5 mb-1">
                  {paragraph.replace('# ', '')}
                </h2>
              );
            }

            // Bullet lists
            const lines = paragraph.split('\n');
            const isBulletList = lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* ') || !line.trim());

            if (isBulletList) {
              return (
                <ul key={pIdx} className="space-y-1 pl-1">
                  {lines.map((line, lIdx) => {
                    const clean = line.replace(/^[-*]\s+/, '').trim();
                    if (!clean) return null;
                    return (
                      <li key={lIdx} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{formatInlineMarkdown(clean)}</span>
                      </li>
                    );
                  })}
                </ul>
              );
            }

            // Regular paragraph
            return (
              <p key={pIdx} className="text-slate-700">
                {lines.map((l, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {formatInlineMarkdown(l)}
                    {lIdx < lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            );
          })}
        </div>
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    // Process bold, italics, inline code
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((token, i) => {
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 text-blue-700 font-mono text-[11px] border border-slate-200">
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('**') && token.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith('*') && token.endsWith('*')) {
        return (
          <em key={i} className="italic text-slate-600">
            {token.slice(1, -1)}
          </em>
        );
      }
      return token;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-200">
      <div
        className={`bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 text-slate-800 ${
          isMaximized
            ? 'w-full h-full max-w-[98vw] max-h-[96vh]'
            : 'w-full max-w-3xl h-[88vh] max-h-[750px]'
        }`}
      >
        {/* HEADER */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Trợ Lý AI Chuyên Gia HTML
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    Cấp cao THPT
                  </span>
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Tự động 100% • Không cần API
                </span>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <span>Giải thích dễ hiểu, trực quan theo chuẩn Tin học 12</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-600 font-medium truncate max-w-[200px] md:max-w-[320px]">
                  {currentLesson.lessonNumber}: {currentLesson.title}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Làm mới cuộc trò chuyện"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer hidden sm:block"
              title={isMaximized ? 'Thu nhỏ' : 'Phóng to'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ZERO-SETUP REASSURANCE BANNER FOR STUDENTS */}
        <div className="px-4 py-1.5 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between text-[11px] text-blue-900 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              <b>Dành riêng cho học sinh THPT:</b> Đã tích hợp sẵn Trí tuệ Sư phạm Tin học 12, không cần đăng ký tài khoản hay thiết lập API!
            </span>
          </div>
          <span className="text-emerald-700 font-bold shrink-0 hidden md:inline">● Sẵn sàng 100%</span>
        </div>

        {/* QUICK QUESTIONS CHIP CAROUSEL */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 shrink-0 overflow-x-auto scrollbar-none flex items-center gap-2">
          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Hỏi nhanh:</span>
          </div>
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.query, q.requiresCode)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-blue-50/70 hover:border-blue-300 border border-slate-200 text-slate-700 hover:text-blue-700 text-[11px] font-medium transition cursor-pointer shrink-0 flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
            >
              <span>{q.icon}</span>
              <span>{q.title}</span>
            </button>
          ))}
        </div>

        {/* MESSAGES SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
          {messages.map((message) => {
            const isAi = message.sender === 'assistant';
            return (
              <div
                key={message.id}
                className={`flex items-start gap-2.5 md:gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-[78%] rounded-2xl p-3.5 shadow-xs ${
                    isAi
                      ? 'bg-white border border-slate-200 text-slate-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <div className={`flex items-center justify-between gap-2 mb-1.5 pb-1 border-b text-[10px] ${isAi ? 'border-slate-100 text-slate-400' : 'border-white/20 text-blue-100'}`}>
                    <span className="font-bold flex items-center gap-1">
                      {isAi ? 'Chuyên Gia HTML' : 'Học sinh'}
                      {message.hasCodeAttached && (
                        <span className={`px-1 py-0.2 rounded text-[9px] ${isAi ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-blue-700 text-white'}`}>
                          + Kèm mã hiện tại
                        </span>
                      )}
                    </span>
                    <span>{message.timestamp}</span>
                  </div>

                  {renderMessageContent(message.text, message.id)}
                </div>

                {!isAi && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs flex items-center gap-2 text-xs text-blue-700">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-slate-600 italic">
                  Chuyên gia đang suy nghĩ câu trả lời dễ hiểu nhất cho em...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT FORM & OPTIONS */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-2">
          {/* Include code toggle */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeCode}
                onChange={(e) => setIncludeCode(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
              />
              <span className="hover:text-slate-800">
                Gửi kèm mã HTML/CSS hiện tại của bài để thầy phân tích lỗi
              </span>
            </label>
            <span className="text-slate-400 hidden sm:inline">Nhấn <b>Enter</b> để gửi, <b>Shift+Enter</b> để xuống dòng</span>
          </div>

          <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi chuyên gia về thẻ HTML, cú pháp, bài tập Tin học 12, cách sửa lỗi..."
              rows={2}
              className="flex-1 bg-transparent text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0 active:scale-95"
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
