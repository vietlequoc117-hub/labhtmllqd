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
  RotateCcw,
  Maximize2,
  Minimize2,
  Lightbulb,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Target,
  Layers,
  BookOpen,
  Filter
} from 'lucide-react';
import { Lesson } from '../types';
import { LESSONS } from '../data/lessons';
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
  allLessons?: Lesson[];
  onSelectLesson?: (lesson: Lesson) => void;
  currentHtml: string;
  currentCss: string;
  onInsertCodeSnippet?: (snippet: string) => void;
}

interface QuickQuestion {
  category: 'all' | 'html' | 'css' | 'review';
  icon: string;
  title: string;
  query: string;
  requiresCode?: boolean;
}

const CATEGORIZED_QUESTIONS: QuickQuestion[] = [
  // 1. Toàn bộ chương trình (Bài 7 -> Bài 18)
  {
    category: 'all',
    icon: '🗺️',
    title: 'Lộ trình 12 bài Tin 12',
    query: 'Thầy tóm tắt giúp em lộ trình toàn bộ 12 bài học HTML và CSS trong chương trình Tin học 12 gồm những bài nào và mục tiêu chính là gì?',
  },
  {
    category: 'all',
    icon: '🏛️',
    title: 'Cấu trúc Website hoàn chỉnh',
    query: 'Một trang web chuẩn hoàn chỉnh theo chuẩn HTML5 gồm những phần chính nào (<header>, <nav>, <main>, <footer>)? Cho em code mẫu chuẩn nhé!',
  },
  {
    category: 'all',
    icon: '⚖️',
    title: 'So sánh HTML và CSS',
    query: 'HTML và CSS khác nhau như thế nào? Tại sao người ta nói HTML là bộ khung xương còn CSS là trang trí nội thất của trang web?',
  },
  {
    category: 'all',
    icon: '🎯',
    title: '5 Bẫy thi hay mất điểm',
    query: 'Trong các đề thi trắc nghiệm và thực hành Tin học 12, những lỗi sai nào học sinh hay mắc phải và dễ bị trừ điểm nhất?',
  },

  // 2. Chuyên đề HTML (Bài 7 -> Bài 12)
  {
    category: 'html',
    icon: '💡',
    title: 'Block vs Inline',
    query: 'Thẻ block (<div>, <p>, <h1>) khác gì thẻ inline (<span>, <a>)? Cho em ví dụ đời thực dễ nhớ để làm bài thi nhé!',
  },
  {
    category: 'html',
    icon: '📐',
    title: 'Bảng: Rowspan & Colspan',
    query: 'Làm sao để nhớ và sử dụng thuộc tính rowspan (gộp dòng) và colspan (gộp cột) trong thẻ <table> mà không bị lệch ô?',
  },
  {
    category: 'html',
    icon: '📝',
    title: 'Biểu mẫu Form & Input',
    query: 'Các loại input thông dụng nhất trong thẻ <form> thi Tin học 12 hay hỏi (text, radio, checkbox, submit, date, select) cách dùng ra sao?',
  },
  {
    category: 'html',
    icon: '🖼️',
    title: 'Thẻ <img>, Video & Iframe',
    query: 'Cách nhúng ảnh <img> có thuộc tính alt, video có controls và nhúng trang con bằng thẻ <iframe> chuẩn W3C như thế nào?',
  },
  {
    category: 'html',
    icon: '🔗',
    title: 'Liên kết & Thẻ <a>',
    query: 'Phân biệt liên kết tuyệt đối, liên kết tương đối cùng thư mục và liên kết neo nội bộ (#id) trong thẻ <a>?',
  },

  // 3. Chuyên đề CSS (Bài 13 -> Bài 18)
  {
    category: 'css',
    icon: '🎨',
    title: '3 Cách viết CSS',
    query: 'Phân biệt 3 cách nhúng CSS vào trang web (Inline, Internal, External). Khi nào thì nên dùng cách nào?',
  },
  {
    category: 'css',
    icon: '📦',
    title: 'Mô hình hộp Box Model',
    query: 'Bản chất của mô hình hộp (Box Model) trong CSS là gì? Phân biệt margin (lề ngoài) và padding (đệm trong)?',
  },
  {
    category: 'css',
    icon: '🏷️',
    title: 'Bộ chọn Class (.) vs ID (#)',
    query: 'Khi nào dùng bộ chọn Class (.ten-lop) và khi nào dùng bộ chọn ID (#ten-id)? Mức độ ưu tiên của chúng ra sao?',
  },
  {
    category: 'css',
    icon: '↔️',
    title: 'Căn giữa margin: auto',
    query: 'Làm thế nào để căn giữa một khối <div> ra giữa màn hình bằng margin: auto và width?',
  },
  {
    category: 'css',
    icon: '🌈',
    title: 'Màu sắc HEX & RGBA',
    query: 'Cách sử dụng mã màu HEX (ví dụ #2563eb) và màu có độ trong suốt RGBA (rgba(0,0,0,0.5)) trong CSS?',
  },

  // 4. Soi lỗi bài làm
  {
    category: 'review',
    icon: '🔍',
    title: 'Soi lỗi mã bài làm',
    query: 'Chuyên gia xem giúp em đoạn mã HTML/CSS em đang viết trong bài này có lỗi sai cú pháp hay chỗ nào chưa chuẩn không?',
    requiresCode: true,
  },
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLesson,
  allLessons = LESSONS,
  onSelectLesson,
  currentHtml,
  currentCss,
  onInsertCodeSnippet,
}) => {
  // Question Scope: 'all' = Toàn bộ chương trình (Bài 7 -> 18), 'specific' = Theo bài học cụ thể
  const [questionScope, setQuestionScope] = useState<'all' | 'specific'>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(currentLesson.id);
  const [activeChipCategory, setActiveChipCategory] = useState<'all' | 'html' | 'css' | 'review'>('all');

  const activeLesson = allLessons.find((l) => l.id === selectedLessonId) || currentLesson;

  // Sync selectedLessonId when currentLesson changes externally
  useEffect(() => {
    setSelectedLessonId(currentLesson.id);
  }, [currentLesson.id]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `👋 **Chào em! Thầy là Trợ Lý AI - Chuyên gia cấp cao về HTML, CSS & Sư phạm Tin học 12.**

🌟 **CHẾ ĐỘ GIẢI ĐÁP TOÀN DIỆN TỔNG THỂ TẤT CẢ CÁC BÀI HỌC:**
Thầy được thiết lập để đồng hành cùng em trong **toàn bộ chương trình Tin học 12 (từ Bài 7 đến Bài 18)**:
- 📘 **Nhóm bài HTML cơ bản & nâng cao (Bài 7 → 12):** Cấu trúc tài liệu, định dạng chữ, bảng (Table), danh sách, liên kết, đa phương tiện (ảnh, video, audio, iframe), biểu mẫu Form.
- 🎨 **Nhóm bài CSS & Giao diện (Bài 13 → 18):** Bộ chọn (Class, ID), định dạng chữ, màu sắc, đường viền, mô hình hộp (Box Model: margin, padding), mức ưu tiên bộ chọn và xây dựng trang web hoàn chỉnh.
- 🏆 **Tổng hợp liên bài & Ôn thi:** So sánh giữa các bài, cấu trúc website chuẩn W3C, giải đề thi trắc nghiệm và thực hành.

💡 *Em có thể đặt bất kỳ câu hỏi nào về toàn bộ chương trình hoặc bấm vào các câu hỏi gợi ý bên dưới để thử ngay nhé!*`,
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

      const targetTitle = questionScope === 'all'
        ? 'Toàn bộ chương trình Tin học 12 (HTML5 & CSS3 - Bài 7 đến Bài 18)'
        : `${activeLesson.lessonNumber}: ${activeLesson.title}`;

      const targetObjective = questionScope === 'all'
        ? 'Giải đáp toàn diện, liên hệ kiến thức tổng thể giữa các bài học trong toàn bộ chương trình Tin học 12.'
        : activeLesson.objective;

      try {
        const response = await fetch('/api/gemini/html-expert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: questionText,
            history: historyPayload,
            scope: questionScope,
            lessonTitle: targetTitle,
            lessonObjective: targetObjective,
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
          lesson: questionScope === 'all'
            ? {
                lessonNumber: 'Toàn khóa',
                title: 'Toàn bộ chương trình Tin học 12 (HTML & CSS)',
                objective: 'Kiến thức tổng hợp toàn diện các bài từ Bài 7 đến Bài 18',
              }
            : activeLesson,
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
        lesson: questionScope === 'all'
          ? {
              lessonNumber: 'Toàn khóa',
              title: 'Toàn bộ chương trình Tin học 12 (HTML & CSS)',
              objective: 'Kiến thức tổng hợp toàn diện các bài từ Bài 7 đến Bài 18',
            }
          : activeLesson,
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
        text: `🔄 **Cuộc trò chuyện đã được làm mới.**\n\n${
          questionScope === 'all'
            ? '🌐 **Chế độ hiện tại:** Đặt câu hỏi tổng thể toàn bộ chương trình (Bài 7 đến Bài 18).'
            : `🎯 **Chế độ hiện tại:** Đang tập trung vào **${activeLesson.lessonNumber}: ${activeLesson.title}**.`
        }\n\nHãy đặt bất kỳ câu hỏi nào em thắc mắc nhé! Thầy luôn sẵn sàng giải đáp.`,
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
                <h3 key={pIdx} className="font-bold text-sm md:text-base text-slate-900 mt-3 mb-1.5 pb-1 border-b border-slate-200">
                  {paragraph.replace('## ', '')}
                </h3>
              );
            }

            // Bullet list
            if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
              const listItems = paragraph.split('\n').filter((l) => l.trim().startsWith('- '));
              return (
                <ul key={pIdx} className="space-y-1 my-1.5 pl-1">
                  {listItems.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5 shrink-0">•</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item
                            .replace(/^- /, '')
                            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                            .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 text-blue-600 font-mono text-[11px]">$1</code>'),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );
            }

            // Numbered list
            if (/^\d+\.\s/.test(paragraph)) {
              const listItems = paragraph.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()));
              return (
                <ol key={pIdx} className="space-y-1 my-1.5 pl-1">
                  {listItems.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold shrink-0">{lIdx + 1}.</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item
                            .replace(/^\d+\.\s/, '')
                            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                            .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 text-blue-600 font-mono text-[11px]">$1</code>'),
                        }}
                      />
                    </li>
                  ))}
                </ol>
              );
            }

            // Standard paragraph with inline formatting
            return (
              <p
                key={pIdx}
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-100 text-blue-600 font-mono text-[11px]">$1</code>')
                    .replace(/---/g, '<hr class="my-2 border-slate-200" />'),
                }}
              />
            );
          })}
        </div>
      );
    });
  };

  if (!isOpen) return null;

  // Filtered quick questions according to active tab
  const filteredQuestions = activeChipCategory === 'all'
    ? CATEGORIZED_QUESTIONS
    : CATEGORIZED_QUESTIONS.filter((q) => q.category === activeChipCategory);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-200">
      <div
        className={`bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 text-slate-800 ${
          isMaximized
            ? 'w-full h-full max-w-[98vw] max-h-[96vh]'
            : 'w-full max-w-3xl h-[88vh] max-h-[760px]'
        }`}
      >
        {/* HEADER */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Trợ Lý AI
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    Chuyên gia cấp cao HTML & CSS
                  </span>
                </h3>
                {questionScope === 'all' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    Chế độ: Toàn bộ chương trình (Bài 7 - 18)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-300 shadow-2xs">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    Chế độ: {activeLesson.lessonNumber}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <span>Giải thích chuẩn W3C & SGK Tin học 12</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-600 font-medium">
                  {questionScope === 'all' ? 'Hỏi đáp mọi bài học & câu hỏi tổng hợp' : `${activeLesson.lessonNumber}: ${activeLesson.title}`}
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

        {/* SCOPE SELECTOR: TOÀN BỘ CHƯƠNG TRÌNH VS THEO BÀI CỤ THỂ */}
        <div className="px-4 py-2 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 border-b border-blue-200/80 flex items-center justify-between gap-3 flex-wrap shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Phạm vi:
            </span>
            <div className="inline-flex p-0.5 bg-white border border-slate-300 rounded-lg shadow-2xs">
              <button
                onClick={() => setQuestionScope('all')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  questionScope === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-slate-100'
                }`}
                title="Học sinh có thể hỏi tổng quát mọi bài từ Bài 7 đến Bài 18, so sánh và liên hệ kiến thức"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Toàn bộ chương trình (Tất cả các bài)</span>
              </button>
              <button
                onClick={() => setQuestionScope('specific')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  questionScope === 'specific'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-slate-100'
                }`}
                title="Tập trung hỏi sâu và soi lỗi cho một bài học cụ thể"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Theo bài cụ thể</span>
              </button>
            </div>
          </div>

          {questionScope === 'specific' ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-600 font-medium">Chọn bài:</span>
              <select
                value={selectedLessonId}
                onChange={(e) => {
                  const newId = Number(e.target.value);
                  setSelectedLessonId(newId);
                  const found = allLessons.find((l) => l.id === newId);
                  if (found && onSelectLesson) {
                    onSelectLesson(found);
                  }
                }}
                className="text-xs font-semibold bg-white border border-blue-300 text-blue-900 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs cursor-pointer max-w-[240px]"
              >
                {allLessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.lessonNumber}: {l.title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Thầy giải đáp toàn bộ kiến thức Bài 7 - 18, không giới hạn!</span>
            </div>
          )}
        </div>

        {/* QUICK QUESTIONS CHIP CAROUSEL WITH CATEGORY FILTERS */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 shrink-0 space-y-1.5">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Gợi ý hỏi nhanh:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveChipCategory('all')}
                className={`px-2 py-0.5 rounded-md font-semibold text-[10px] transition cursor-pointer ${
                  activeChipCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200/70 hover:bg-slate-200 text-slate-700'
                }`}
              >
                🌐 Toàn khóa
              </button>
              <button
                onClick={() => setActiveChipCategory('html')}
                className={`px-2 py-0.5 rounded-md font-semibold text-[10px] transition cursor-pointer ${
                  activeChipCategory === 'html'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200/70 hover:bg-slate-200 text-slate-700'
                }`}
              >
                📘 HTML (B7-12)
              </button>
              <button
                onClick={() => setActiveChipCategory('css')}
                className={`px-2 py-0.5 rounded-md font-semibold text-[10px] transition cursor-pointer ${
                  activeChipCategory === 'css'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200/70 hover:bg-slate-200 text-slate-700'
                }`}
              >
                🎨 CSS (B13-18)
              </button>
              <button
                onClick={() => setActiveChipCategory('review')}
                className={`px-2 py-0.5 rounded-md font-semibold text-[10px] transition cursor-pointer ${
                  activeChipCategory === 'review'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200/70 hover:bg-slate-200 text-slate-700'
                }`}
              >
                🔍 Soi lỗi bài làm
              </button>
            </div>
          </div>

          {/* Chips list */}
          <div className="overflow-x-auto scrollbar-none flex items-center gap-2 pt-0.5">
            {filteredQuestions.map((q, idx) => (
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
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
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
                      {isAi ? 'Chuyên Gia HTML & CSS' : 'Học sinh'}
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
                  Chuyên gia đang giải đáp toàn diện và dễ hiểu nhất cho em...
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
                Gửi kèm mã HTML/CSS bài học hiện tại ({currentLesson.lessonNumber}) để thầy soi lỗi
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
              placeholder={
                questionScope === 'all'
                  ? 'Hỏi bất kỳ kiến thức nào trong toàn bộ chương trình Tin học 12 (Bài 7 đến 18, so sánh, ôn thi, cấu trúc web...)'
                  : `Hỏi về kiến thức hoặc soi lỗi trong ${activeLesson.lessonNumber}: ${activeLesson.title}...`
              }
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
