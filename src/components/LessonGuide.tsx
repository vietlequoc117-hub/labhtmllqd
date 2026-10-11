import React, { useState, useMemo } from 'react';
import { Lesson, DomTestResult, CodeSample, LessonMission } from '../types';
import { getLessonSamples } from '../data/samples';
import { getLessonMissions } from '../data/missions';
import { getLessonQuiz } from '../data/quizzes';
import { resolveVirtualPaths } from '../data/mockAssets';
import { TargetPreviewModal } from './TargetPreviewModal';
import { QuizTab } from './QuizTab';
import {
  ListChecks,
  BookOpen,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Code,
  Info,
  ChevronRight,
  Sparkles,
  Play,
  Target,
  Eye,
  EyeOff,
  Maximize2,
  CheckCheck,
  HelpCircle,
  Bot
} from 'lucide-react';

interface LessonGuideProps {
  lesson: Lesson;
  testResults: DomTestResult[];
  onInsertSnippet: (snippet: string) => void;
  onLoadSample?: (sample: CodeSample) => void;
  currentHtml?: string;
  currentCss?: string;
  onLoadTargetCode?: (html: string, css?: string) => void;
  onLoadSnippetCode?: (html: string, css: string, questionId: number) => void;
  onRestoreLessonCode?: () => void;
  loadedSnippetQuestionId?: number | null;
  onOpenAiAssistant?: () => void;
}

export const LessonGuide: React.FC<LessonGuideProps> = ({
  lesson,
  testResults,
  onInsertSnippet,
  onLoadSample,
  currentHtml = '',
  currentCss = '',
  onLoadTargetCode,
  onLoadSnippetCode,
  onRestoreLessonCode,
  loadedSnippetQuestionId,
  onOpenAiAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'theory' | 'samples' | 'quiz'>('tasks');
  const [selectedMissionFilter, setSelectedMissionFilter] = useState<number | 'all'>('all');
  const [expandedPreviewMissionId, setExpandedPreviewMissionId] = useState<number | null>(null);
  const [modalMission, setModalMission] = useState<LessonMission | null>(null);
  const [showOriginalChecklist, setShowOriginalChecklist] = useState<boolean>(false);

  const samples = getLessonSamples(lesson.id);
  const missions = getLessonMissions(lesson.id);
  const quizQuestions = getLessonQuiz(lesson.id);

  // Parse current HTML for real-time mission evaluation
  const parsedDoc = useMemo(() => {
    try {
      const parser = new DOMParser();
      return parser.parseFromString(currentHtml || '', 'text/html');
    } catch {
      return null;
    }
  }, [currentHtml]);

  // Evaluate missions against current student code
  const missionEvaluations = useMemo(() => {
    return missions.map((m) => {
      if (!parsedDoc) return { passed: false, message: 'Đang kiểm tra...' };
      return m.checkCriteria(parsedDoc, currentHtml || '', currentCss || '');
    });
  }, [missions, parsedDoc, currentHtml, currentCss]);

  const passedMissionsCount = missionEvaluations.filter((e) => e.passed).length;

  const getTaskStatus = (taskId: string) => {
    const res = testResults.find((t) => t.id === taskId);
    if (!res) return null;
    return res.passed;
  };

  return (
    <aside className="h-full flex flex-col bg-slate-900 border-r border-slate-800 select-none overflow-hidden">
      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs shrink-0">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 py-2 px-2.5 font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'tasks'
              ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-900/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ListChecks className="w-3.5 h-3.5" />
          <span>Nhiệm vụ</span>
        </button>

        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 py-2 px-2.5 font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'theory'
              ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-900/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Kiến thức</span>
        </button>

        <button
          onClick={() => setActiveTab('samples')}
          className={`flex-1 py-2 px-1 font-semibold transition flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'samples'
              ? 'text-amber-400 border-b-2 border-amber-500 bg-slate-900/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold">10 Mẫu</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 px-1 font-semibold transition flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'quiz'
              ? 'text-purple-400 border-b-2 border-purple-500 bg-slate-900/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-bold">10 Quiz</span>
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 text-slate-300">
        {/* TAB 1: 5 NHIỆM VỤ THỬ THÁCH (CÓ SẴN KẾT QUẢ MỤC TIÊU) */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {/* Mission Progress Header */}
            <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/25 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>5 Nhiệm Vụ Mục Tiêu (Lập trình để đạt kết quả)</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                  {passedMissionsCount}/5 Đạt
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mỗi nhiệm vụ có sẵn <b>kết quả mẫu mục tiêu</b> để em đối chiếu. Hãy gõ code HTML/CSS để tạo ra đúng kết quả đó!
              </p>
              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(passedMissionsCount / 5) * 100}%` }}
                />
              </div>

              {/* Sub-filter tabs for 5 missions */}
              <div className="flex gap-1 pt-1 overflow-x-auto pb-0.5 scrollbar-none">
                <button
                  onClick={() => setSelectedMissionFilter('all')}
                  className={`text-[10px] font-bold px-2 py-1 rounded-md transition shrink-0 cursor-pointer ${
                    selectedMissionFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-850 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  Tất cả (5)
                </button>
                {missions.map((m, idx) => {
                  const isPassed = missionEvaluations[idx]?.passed;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMissionFilter(m.id)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-md transition shrink-0 flex items-center gap-1 cursor-pointer ${
                        selectedMissionFilter === m.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : isPassed
                          ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-850 hover:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <span>NV {m.id}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List of Missions */}
            <div className="space-y-3">
              {missions
                .filter(
                  (m) =>
                    selectedMissionFilter === 'all' ||
                    selectedMissionFilter === m.id
                )
                .map((m) => {
                  const evalRes = missionEvaluations[m.id - 1] || {
                    passed: false,
                    message: 'Đang kiểm tra...',
                  };
                  const isPreviewOpen = expandedPreviewMissionId === m.id;

                  const targetDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${
                    m.targetResult.css || ''
                  }</style></head><body>${resolveVirtualPaths(
                    m.targetResult.html
                  )}</body></html>`;

                  return (
                    <div
                      key={m.id}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden shadow-sm ${
                        evalRes.passed
                          ? 'bg-slate-900 border-emerald-500/40'
                          : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      {/* Mission Card Header */}
                      <div className="p-3 bg-slate-850/60 border-b border-slate-800/80 flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {m.level}
                            </span>
                            <h4 className="text-xs font-bold text-white leading-snug">
                              {m.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {m.description}
                          </p>
                        </div>

                        {/* Status badge */}
                        <div className="shrink-0">
                          {evalRes.passed ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Đã đạt ✓</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-300 text-[10px] font-medium px-2 py-0.5 rounded-full border border-amber-500/25">
                              <Circle className="w-2.5 h-2.5 text-amber-400" />
                              <span>Chưa đạt</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-3 space-y-2.5">
                        {/* Requirements */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Tiêu chí học sinh cần lập trình:
                          </span>
                          <div className="space-y-1">
                            {m.requirements.map((req, rIdx) => (
                              <div
                                key={rIdx}
                                className="flex items-start gap-1.5 text-[11px] text-slate-300"
                              >
                                <span className="text-blue-400 mt-0.5 font-mono text-[10px]">
                                  •
                                </span>
                                <span>{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Target Result Action Bar */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-1.5 flex-wrap">
                          <button
                            onClick={() =>
                              setExpandedPreviewMissionId(
                                isPreviewOpen ? null : m.id
                              )
                            }
                            className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition cursor-pointer active:scale-95 ${
                              isPreviewOpen
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                            }`}
                          >
                            {isPreviewOpen ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                                <span>Ẩn kết quả mẫu</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5 text-amber-400" />
                                <span>Xem kết quả mục tiêu mẫu</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setModalMission(m)}
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
                              title="Phóng to kết quả mẫu trong cửa sổ riêng"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>

                            {onLoadTargetCode && (
                              <button
                                onClick={() =>
                                  onLoadTargetCode(
                                    m.targetResult.html,
                                    m.targetResult.css
                                  )
                                }
                                className="flex items-center gap-1 text-[11px] font-semibold bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 px-2.5 py-1.5 rounded-lg transition cursor-pointer active:scale-95"
                                title="Nạp mã kết quả mẫu này vào Editor"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>Nạp mã mẫu</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Inline Target Preview Container */}
                        {isPreviewOpen && (
                          <div className="space-y-1.5 pt-1 animate-in fade-in zoom-in-95 duration-150">
                            <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
                              <span>MẪU KẾT QUẢ CẦN ĐẠT ĐƯỢC:</span>
                              <span className="text-slate-400 font-normal">
                                {m.targetResult.title}
                              </span>
                            </div>
                            <div className="h-48 w-full rounded-lg bg-white overflow-hidden border-2 border-amber-500/40 shadow-inner">
                              <iframe
                                title={`Mission ${m.id} Target Preview`}
                                srcDoc={targetDoc}
                                sandbox="allow-scripts"
                                className="w-full h-full border-none bg-white"
                              />
                            </div>
                          </div>
                        )}

                        {/* Live Criteria Feedback */}
                        <div
                          className={`p-2 rounded-lg text-[11px] flex items-start gap-1.5 ${
                            evalRes.passed
                              ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-800/60 border border-slate-700/60 text-slate-300'
                          }`}
                        >
                          {evalRes.passed ? (
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-semibold">Đánh giá mã của em: </span>
                            <span>{evalRes.message}</span>
                          </div>
                        </div>

                        {/* Hint box */}
                        <div className="text-[10px] text-amber-300/90 bg-amber-950/20 border border-amber-500/20 rounded-lg p-2 flex items-start gap-1.5">
                          <Info className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span>
                            <b>Gợi ý:</b> {m.hint}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Toggle original SGK Checklist */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => setShowOriginalChecklist(!showOriginalChecklist)}
                className="w-full text-left text-[11px] text-slate-400 hover:text-slate-200 py-1.5 flex items-center justify-between cursor-pointer"
              >
                <span>Xem thêm Checklist tiêu chuẩn SGK:</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    showOriginalChecklist ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {showOriginalChecklist && (
                <div className="mt-2 space-y-2">
                  {lesson.checklists.map((item, idx) => {
                    const status = getTaskStatus(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-2.5 rounded-lg border text-xs ${
                          status === true
                            ? 'bg-emerald-950/20 border-emerald-500/30'
                            : 'bg-slate-800/40 border-slate-700/50'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-bold text-slate-400">
                            {idx + 1}.
                          </span>
                          <div>
                            <div className="font-semibold text-slate-200 text-[11px]">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: KIẾN THỨC NHANH VÀ CÚ PHÁP THẺ */}
        {activeTab === 'theory' && (
          <div className="space-y-3.5">
            {/* Objective summary */}
            <div className="bg-gradient-to-br from-blue-950/30 to-indigo-950/30 border border-blue-500/20 rounded-lg p-3">
              <h4 className="text-[11px] font-bold text-blue-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Mục tiêu bài học
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lesson.objective}
              </p>
            </div>

            {/* Quick Summary points */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Điểm lý thuyết cốt lõi
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {lesson.theorySummary.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick reference tags */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Thẻ quan trọng trong bài</span>
                <span className="text-[10px] font-normal text-slate-500 lowercase">(Bấm để chèn)</span>
              </div>

              <div className="space-y-2">
                {lesson.quickReferences.map((ref, idx) => (
                  <div
                    key={idx}
                    onClick={() => onInsertSnippet(ref.example)}
                    className="p-2.5 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 hover:border-blue-500/50 rounded-lg text-xs transition cursor-pointer group"
                    title="Nhấn để chèn vào vị trí con trỏ code"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <code className="text-blue-300 font-mono font-bold group-hover:text-blue-200">
                        {ref.tag}
                      </code>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {ref.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-1.5">
                      {ref.description}
                    </p>
                    <div className="flex items-center justify-between bg-slate-950/80 px-2 py-1 rounded text-[11px] font-mono text-emerald-300 border border-slate-800">
                      <span className="truncate">{ref.example}</span>
                      <Code className="w-3 h-3 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 10 MÃ MẪU CÓ SẴN (CHẠY NGAY) */}
        {activeTab === 'samples' && (
          <div className="space-y-3">
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-300 leading-relaxed flex items-center justify-between">
              <span>Bấm &quot;Chạy ngay&quot; để nạp mã và quan sát kết quả:</span>
              <span className="font-mono font-bold text-amber-400">{samples.length}/10</span>
            </div>

            <div className="space-y-2.5">
              {samples.map((sample) => (
                <div
                  key={sample.id}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/40 rounded-xl p-3 text-xs space-y-2 transition shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-xs leading-snug">
                        {sample.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                        {sample.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {sample.css ? 'HTML + CSS' : 'HTML chuẩn'}
                    </span>
                    <button
                      onClick={() => onLoadSample && onLoadSample(sample)}
                      className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-md transition shadow cursor-pointer active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-current text-amber-100" />
                      <span>Chạy ngay</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: 10 CÂU TRẮC NGHIỆM ĐÁNH GIÁ (4 BIẾT - 3 HIỂU - 3 VẬN DỤNG) */}
        {activeTab === 'quiz' && (
          <QuizTab
            questions={quizQuestions}
            lessonNumber={lesson.lessonNumber}
            onLoadSnippetCode={onLoadSnippetCode}
            onRestoreLessonCode={onRestoreLessonCode}
            loadedQuestionId={loadedSnippetQuestionId}
          />
        )}
      </div>

      {/* Quick AI Advisor trigger button at bottom of panel */}
      {onOpenAiAssistant && (
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800/90 shrink-0">
          <button
            onClick={onOpenAiAssistant}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-900 hover:from-indigo-900/80 hover:to-purple-900/60 border border-indigo-500/30 text-indigo-200 text-xs font-semibold transition cursor-pointer shadow-sm group active:scale-98"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center text-amber-300">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">Cần gợi ý? Hỏi Trợ lý AI</p>
                <p className="text-[9px] text-slate-400">Chuyên gia giải thích siêu dễ hiểu cho THPT</p>
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Target Preview Fullscreen Modal */}
      <TargetPreviewModal
        isOpen={!!modalMission}
        onClose={() => setModalMission(null)}
        mission={modalMission}
        onApplyCode={onLoadTargetCode}
      />
    </aside>
  );
};
