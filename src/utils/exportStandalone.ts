import { LESSONS } from '../data/lessons';
import { ALL_LESSON_SAMPLES } from '../data/samples';
import { ALL_LESSON_MISSIONS } from '../data/missions';
import { SPORTS_IMAGE_DATA_URI, SUN_IMAGE_DATA_URI, GROUP_IMAGE_DATA_URI, MOCK_THONG_TIN_HTML, MOCK_CLB_HTML, SAMPLE_VIDEO_URL, SAMPLE_AUDIO_URL } from '../data/mockAssets';

export function generateStandaloneHtml(): string {
  const lessonsJson = JSON.stringify(
    LESSONS.map((l) => ({
      id: l.id,
      lessonNumber: l.lessonNumber,
      title: l.title,
      subtitle: l.subtitle,
      sgkSection: l.sgkSection,
      objective: l.objective,
      theorySummary: l.theorySummary,
      quickReferences: l.quickReferences,
      checklists: l.checklists,
      initialHtml: l.initialHtml,
      initialCss: l.initialCss,
      solutionHtml: l.solutionHtml,
    }))
  );
  const samplesJson = JSON.stringify(ALL_LESSON_SAMPLES);
  const missionsJson = JSON.stringify(
    Object.fromEntries(
      Object.entries(ALL_LESSON_MISSIONS).map(([lessonId, missions]) => [
        lessonId,
        missions.map((m) => ({
          id: m.id,
          title: m.title,
          level: m.level,
          description: m.description,
          requirements: m.requirements,
          targetResult: m.targetResult,
          hint: m.hint,
        })),
      ])
    )
  );

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LQD_HTML_LAB - PHÒNG THỰC HÀNH ẢO HTML (BẢN ĐỘC LẬP)</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-mono-code { font-family: 'Fira Code', monospace; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #475569; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 flex flex-col h-screen overflow-hidden">

  <!-- TOP HEADER -->
  <header class="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0 shadow-md">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
        <i class="fa-solid fa-code text-lg"></i>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold tracking-tight text-white text-base">LQD_HTML_LAB</span>
          <span class="text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold px-1.5 py-0.5 rounded">Standalone Offline</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- Lesson selector -->
      <select id="lessonSelect" class="bg-slate-800 border border-slate-700 text-sm font-semibold rounded-lg px-3 py-1.5 text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
      </select>

      <button id="runBtn" class="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg transition shadow-sm cursor-pointer">
        <i class="fa-solid fa-play text-xs text-blue-200"></i>
        <span>Chạy mã (Run)</span>
      </button>

      <button id="checkBtn" class="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg transition shadow-sm cursor-pointer">
        <i class="fa-solid fa-circle-check text-xs text-emerald-200"></i>
        <span>Chấm tự động</span>
      </button>

      <button id="resetBtn" class="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg transition border border-slate-700 cursor-pointer" title="Khôi phục mã ban đầu">
        <i class="fa-solid fa-arrow-rotate-left text-xs"></i>
        <span>Làm mới</span>
      </button>

      <button id="samplesHeaderBtn" class="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs px-2.5 py-1.5 rounded-lg transition cursor-pointer" title="Kho 10 mã mẫu có sẵn (chạy ngay)">
        <i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
        <span>10 Mã Mẫu</span>
      </button>
    </div>
  </header>

  <!-- MAIN 3-COLUMN WORKSPACE -->
  <main class="flex-1 flex overflow-hidden">
    
    <!-- COLUMN 1: GUIDE & TASKS (26%) -->
    <section class="w-[28%] bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden">
      <!-- Scrollable Tabs: Nhiệm vụ, Kiến thức, 10 Mẫu -->
      <div class="flex border-b border-slate-800 bg-slate-950/60 text-xs shrink-0">
        <button id="guideTabTasks" class="flex-1 py-2 px-2 font-semibold text-blue-400 border-b-2 border-blue-500 transition">
          <i class="fa-solid fa-list-check mr-1"></i>Nhiệm vụ
        </button>
        <button id="guideTabTheory" class="flex-1 py-2 px-2 font-semibold text-slate-400 hover:text-slate-200 transition">
          <i class="fa-solid fa-book-open mr-1"></i>Kiến thức
        </button>
        <button id="guideTabSamples" class="flex-1 py-2 px-2 font-semibold text-amber-400 hover:text-amber-200 transition">
          <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>10 Mẫu
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <!-- Panel 1: Checklists -->
        <div id="panelTasks" class="space-y-3">
          <div class="text-xs text-slate-400">Hoàn thành các tiêu chí sau và bấm <b>Chấm tự động</b>:</div>
          <div id="checklistsContainer" class="space-y-2.5"></div>
        </div>

        <!-- Panel 2: Theory & Quick References -->
        <div id="panelTheory" class="hidden space-y-4">
          <div class="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3">
            <h4 class="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Mục tiêu bài học</h4>
            <p id="lessonObjective" class="text-xs text-slate-300 leading-relaxed"></p>
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Thẻ quan trọng (Bấm để chèn)</h4>
            <div id="quickRefsContainer" class="space-y-2"></div>
          </div>
        </div>

        <!-- Panel 3: 10 Mã Mẫu -->
        <div id="panelSamples" class="hidden space-y-3">
          <div class="text-xs text-amber-300 font-semibold flex items-center justify-between">
            <span>Kho 10 mã mẫu có sẵn (chạy ngay):</span>
            <span class="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono">10/10</span>
          </div>
          <div id="samplesListContainer" class="space-y-2.5"></div>
        </div>
      </div>
    </section>

    <!-- COLUMN 2: CODE EDITOR (38%) -->
    <section class="w-[38%] bg-slate-950 border-r border-slate-800 flex flex-col h-full overflow-hidden">
      <!-- Editor Tabs -->
      <div class="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 shrink-0">
        <div class="flex items-center gap-1">
          <button id="tabHtml" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 border-t-2 border-blue-500 rounded-t">
            <i class="fa-brands fa-html5 text-orange-500"></i>
            <span>index.html</span>
          </button>
          <button id="tabCss" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200">
            <i class="fa-brands fa-css3-alt text-blue-400"></i>
            <span>style.css</span>
          </button>
        </div>
        <div class="text-[11px] text-slate-500 flex items-center gap-2">
          <span>Tab: 2 spaces</span>
          <span id="charCount">0 ký tự</span>
        </div>
      </div>

      <!-- Editor Textarea Area -->
      <div class="flex-1 relative overflow-hidden flex">
        <textarea id="codeEditor" spellcheck="false" class="w-full h-full bg-slate-950 text-slate-200 p-4 font-mono-code text-sm leading-relaxed resize-none focus:outline-none"></textarea>
      </div>

      <!-- Editor Footer Status -->
      <div class="h-7 bg-slate-900 border-t border-slate-800 px-3 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span id="editorStatus">Sẵn sàng thực hành</span>
        </div>
        <div>
          <span>Phím tắt: <b>Ctrl + Enter</b> để chạy</span>
        </div>
      </div>
    </section>

    <!-- COLUMN 3: RESULT & GRADING (34%) -->
    <section class="w-[34%] bg-slate-900 flex flex-col h-full overflow-hidden">
      <!-- Result Tabs -->
      <div class="h-10 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 shrink-0">
        <div class="flex items-center gap-2">
          <button id="tabPreview" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 border-t-2 border-blue-500 rounded-t">
            <i class="fa-solid fa-eye text-blue-400"></i>
            <span>Xem trước</span>
          </button>
          <button id="tabGrader" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200">
            <i class="fa-solid fa-clipboard-check text-emerald-400"></i>
            <span>Chấm điểm</span>
            <span id="scoreBadge" class="bg-slate-800 text-[10px] px-1.5 py-0.2 rounded font-bold">0/4</span>
          </button>
          <button id="tabAITutor" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>Hỏi AI Tutor</span>
          </button>
        </div>
      </div>

      <!-- Preview Viewport -->
      <div id="viewPreview" class="flex-1 flex flex-col overflow-hidden bg-slate-950">
        <div class="h-8 bg-slate-900/80 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span class="flex items-center gap-1.5">
            <i class="fa-solid fa-globe text-slate-500"></i>
            <span class="text-[11px] text-slate-300 truncate">virtual-browser://khu-thuc-hanh-12</span>
          </span>
          <button id="reloadIframe" class="hover:text-white transition" title="Tải lại iframe">
            <i class="fa-solid fa-rotate-right text-xs"></i>
          </button>
        </div>
        <div class="flex-1 bg-white relative">
          <iframe id="previewFrame" sandbox="allow-scripts" class="w-full h-full border-0"></iframe>
        </div>
      </div>

      <!-- Grader Viewport -->
      <div id="viewGrader" class="hidden flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
        <!-- Grade Summary Card -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-850 p-4 rounded-xl border border-slate-700 shadow-md">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Kết quả đánh giá DOM</span>
            <span id="gradePercent" class="text-2xl font-black text-blue-400">0%</span>
          </div>
          <div class="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mb-3">
            <div id="gradeBar" class="bg-gradient-to-r from-blue-500 to-emerald-500 h-full transition-all duration-500" style="width: 0%"></div>
          </div>
          <p id="gradeComment" class="text-xs text-slate-300">Hãy nhấn "Chấm tự động" để kiểm tra các tiêu chí theo SGK Tin học 12.</p>
        </div>

        <div>
          <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Chi tiết tiêu chí</h4>
          <div id="gradeResultsList" class="space-y-2"></div>
        </div>
      </div>

      <!-- AI Tutor Viewport -->
      <div id="viewAITutor" class="hidden flex-1 flex flex-col overflow-hidden bg-slate-900">
        <div class="p-3 border-b border-slate-800 bg-purple-950/20 text-xs text-purple-300 flex items-center justify-between">
          <span class="flex items-center gap-1.5 font-semibold">
            <i class="fa-solid fa-graduation-cap"></i> Trợ lý Sư phạm Tin học 12
          </span>
          <button id="btnSetKey" class="text-[11px] underline text-purple-400 hover:text-purple-200">
            Cài đặt API Key
          </button>
        </div>
        <div id="aiChatHistory" class="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 text-slate-300 leading-relaxed">
            Xin chào em! Thầy/cô là Trợ lý Sư phạm Tin học 12. Khi em gặp khó khăn về thẻ HTML, bảng table hay biểu mẫu form, hãy hỏi thầy/cô nhé. Thầy/cô sẽ gợi ý phương hướng để em tự sửa code thành công!
          </div>
        </div>
        <div class="p-3 border-t border-slate-800 bg-slate-950 shrink-0">
          <div class="flex gap-2">
            <input id="aiQuestionInput" type="text" placeholder="Hỏi AI cách sửa lỗi..." class="flex-1 bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <button id="aiAskBtn" class="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition">
              Gửi
            </button>
          </div>
        </div>
      </div>

    </section>
  </main>

  <script>
    // Embedded Data
    const LESSONS_DATA = ${lessonsJson};
    const SAMPLES_DATA = ${samplesJson};
    const MISSIONS_DATA = ${missionsJson};
    const MOCK_ASSETS_MAP = {
      thethao: "${SPORTS_IMAGE_DATA_URI}",
      sun: "${SUN_IMAGE_DATA_URI}",
      lop12a1: "${GROUP_IMAGE_DATA_URI}",
      video: "${SAMPLE_VIDEO_URL}",
      audio: "${SAMPLE_AUDIO_URL}",
      thongtin: ${JSON.stringify(MOCK_THONG_TIN_HTML)},
      clb: ${JSON.stringify(MOCK_CLB_HTML)}
    };

    let currentLessonIndex = 0;
    let activeEditorTab = 'html'; // 'html' or 'css'
    let lessonCodes = {};

    // Initialize states
    LESSONS_DATA.forEach(l => {
      lessonCodes[l.id] = {
        html: l.initialHtml,
        css: l.initialCss
      };
    });

    // Populate dropdown
    const select = document.getElementById('lessonSelect');
    LESSONS_DATA.forEach((l, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = l.lessonNumber + ': ' + l.title;
      select.appendChild(opt);
    });

    function loadLesson(index) {
      currentLessonIndex = index;
      const lesson = LESSONS_DATA[index];
      select.value = index;
      if (document.getElementById('lessonObjective')) {
        document.getElementById('lessonObjective').textContent = lesson.objective;
      }

      // Render Checklists
      const checkContainer = document.getElementById('checklistsContainer');
      checkContainer.innerHTML = '';
      lesson.checklists.forEach(c => {
        const item = document.createElement('div');
        item.className = 'bg-slate-800/60 border border-slate-700/60 rounded-lg p-3';
        item.innerHTML = \`
          <div class="flex items-start gap-2">
            <i class="fa-regular fa-square text-slate-400 mt-0.5"></i>
            <div>
              <h5 class="text-xs font-semibold text-slate-200">\${c.title}</h5>
              <p class="text-[11px] text-slate-400 mt-0.5">\${c.description}</p>
            </div>
          </div>
        \`;
        checkContainer.appendChild(item);
      });

      // Render Quick References
      const refContainer = document.getElementById('quickRefsContainer');
      refContainer.innerHTML = '';
      (lesson.quickReferences || []).forEach(r => {
        const refItem = document.createElement('div');
        refItem.className = 'bg-slate-800/80 border border-slate-700/60 rounded-lg p-2.5 text-xs cursor-pointer hover:border-blue-500/60 transition';
        refItem.innerHTML = \`
          <div class="flex items-center justify-between mb-1">
            <code class="text-blue-300 font-bold">\${r.tag}</code>
            <span class="text-[10px] text-slate-400">\${r.name}</span>
          </div>
          <p class="text-[11px] text-slate-400">\${r.description}</p>
        \`;
        refItem.onclick = () => insertSnippet(r.example);
        refContainer.appendChild(refItem);
      });

      // Render 10 Samples
      const sampleCont = document.getElementById('samplesListContainer');
      if (sampleCont) {
        sampleCont.innerHTML = '';
        const curSamples = SAMPLES_DATA[lesson.id] || [];
        curSamples.forEach(s => {
          const item = document.createElement('div');
          item.className = 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/40 rounded-xl p-3 text-xs space-y-2 transition shadow-sm';
          item.innerHTML = \`
            <div class="flex items-start justify-between gap-2">
              <h5 class="font-bold text-white text-xs leading-snug">\${s.title}</h5>
            </div>
            <p class="text-[11px] text-slate-400">\${s.description}</p>
            <div class="flex items-center justify-between pt-1 border-t border-slate-700/60">
              <span class="text-[10px] text-slate-500 font-mono">\${s.css ? 'HTML + CSS' : 'HTML'}</span>
              <button class="bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1 active:scale-95">
                <i class="fa-solid fa-play text-[10px]"></i> Nạp &amp; Chạy ngay
              </button>
            </div>
          \`;
          item.querySelector('button').onclick = () => {
            lessonCodes[lesson.id].html = s.html;
            if (s.css !== undefined) {
              lessonCodes[lesson.id].css = s.css;
            }
            document.getElementById('codeEditor').value = activeEditorTab === 'html' ? lessonCodes[lesson.id].html : lessonCodes[lesson.id].css;
            runCode();
            switchResultTab('preview');
          };
          sampleCont.appendChild(item);
        });
      }

      // Update Editor text
      const currentCode = lessonCodes[lesson.id];
      document.getElementById('codeEditor').value = activeEditorTab === 'html' ? currentCode.html : currentCode.css;
      updateCharCount();
      runCode();
    }

    function insertSnippet(snippet) {
      const editor = document.getElementById('codeEditor');
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const val = editor.value;
      editor.value = val.substring(0, start) + snippet + val.substring(end);
      editor.focus();
      editor.selectionStart = editor.selectionEnd = start + snippet.length;
      saveCurrentCode();
      runCode();
    }

    function saveCurrentCode() {
      const lesson = LESSONS_DATA[currentLessonIndex];
      const val = document.getElementById('codeEditor').value;
      if (activeEditorTab === 'html') {
        lessonCodes[lesson.id].html = val;
      } else {
        lessonCodes[lesson.id].css = val;
      }
      updateCharCount();
    }

    function updateCharCount() {
      const len = document.getElementById('codeEditor').value.length;
      document.getElementById('charCount').textContent = len + ' ký tự';
    }

    function resolveVirtualPaths(html) {
      let res = html;
      res = res.replace(/src=["'](?:images\\/)?thethao\\.png["']/gi, 'src="' + MOCK_ASSETS_MAP.thethao + '"');
      res = res.replace(/src=["'](?:images\\/)?sun\\.png["']/gi, 'src="' + MOCK_ASSETS_MAP.sun + '"');
      res = res.replace(/src=["'](?:images\\/)?lop12a1\\.png["']/gi, 'src="' + MOCK_ASSETS_MAP.lop12a1 + '"');
      res = res.replace(/src=["'](?:videos\\/)?war_is_over\\.mp4["']/gi, 'src="' + MOCK_ASSETS_MAP.video + '"');
      res = res.replace(/src=["'](?:audio\\/)?Quoc_ca\\.mp3["']/gi, 'src="' + MOCK_ASSETS_MAP.audio + '"');
      return res;
    }

    function runCode() {
      const lesson = LESSONS_DATA[currentLessonIndex];
      const html = lessonCodes[lesson.id].html;
      const css = lessonCodes[lesson.id].css;

      let processed = resolveVirtualPaths(html);
      const fullDoc = \`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>\${css}</style>
        </head>
        <body>
          \${processed}
        </body>
        </html>
      \`;

      const iframe = document.getElementById('previewFrame');
      iframe.srcdoc = fullDoc;
    }

    function checkCode() {
      const lesson = LESSONS_DATA[currentLessonIndex];
      const html = lessonCodes[lesson.id].html;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Switch to Grader view
      switchResultTab('grader');

      let tests = [];
      const lower = html.toLowerCase();

      if (lesson.id === 7) {
        tests.push({ title: 'Khai báo <!DOCTYPE html>', passed: lower.includes('<!doctype html>'), msg: 'Cần có <!DOCTYPE html>' });
        tests.push({ title: 'Thẻ tiêu đề <h1>', passed: doc.querySelectorAll('h1').length >= 1, msg: 'Cần có ít nhất một thẻ <h1>' });
        tests.push({ title: 'Đoạn văn <p> và ngắt dòng <br>', passed: doc.querySelectorAll('p').length >= 2 && doc.querySelectorAll('br').length >= 1, msg: 'Cần ít nhất 2 thẻ <p> và 1 thẻ <br>' });
        tests.push({ title: 'Đường kẻ ngang <hr>', passed: doc.querySelectorAll('hr').length >= 1, msg: 'Cần có thẻ <hr>' });
      } else if (lesson.id === 8) {
        tests.push({ title: 'Chỉ số trên <sup> (ax²)', passed: doc.querySelectorAll('sup').length >= 1, msg: 'Cần có thẻ <sup> cho số mũ 2' });
        tests.push({ title: 'In đậm (b/strong) & In nghiêng (i/em)', passed: doc.querySelectorAll('b, strong').length >= 1 && doc.querySelectorAll('i, em').length >= 1, msg: 'Cần phối hợp chữ in đậm và in nghiêng' });
        tests.push({ title: 'Thuộc tính style="color:..."', passed: lower.includes('color:'), msg: 'Cần có style="color:..."' });
        tests.push({ title: 'Chỉ số dưới <sub> hoặc Đánh dấu <mark>', passed: doc.querySelectorAll('sub, mark').length >= 1, msg: 'Cần thẻ <sub> hoặc <mark>' });
      } else if (lesson.id === 9) {
        tests.push({ title: 'Thẻ <table> & <caption>', passed: !!doc.querySelector('table caption'), msg: 'Cần có thẻ <table> chứa <caption>' });
        tests.push({ title: 'Gộp dòng rowspan="2"', passed: doc.querySelectorAll('[rowspan="2"]').length >= 2, msg: 'Cần có ít nhất 2 ô có rowspan="2"' });
        tests.push({ title: 'Gộp cột colspan="5"', passed: doc.querySelectorAll('[colspan="5"]').length >= 1, msg: 'Cần có ô tiêu đề ngày có colspan="5"' });
        tests.push({ title: 'Danh sách <ul>/<ol>', passed: doc.querySelectorAll('ul li, ol li').length >= 2, msg: 'Cần danh sách ít nhất 2 thẻ <li>' });
      } else if (lesson.id === 10) {
        tests.push({ title: 'Liên kết neo href="#CLBTT"', passed: !!doc.querySelector('a[href="#CLBTT"]'), msg: 'Cần có <a href="#CLBTT">' });
        tests.push({ title: 'Phần tử đích id="CLBTT"', passed: !!doc.getElementById('CLBTT'), msg: 'Cần có phần tử có id="CLBTT"' });
        tests.push({ title: 'Liên kết thong_tin.html', passed: !!doc.querySelector('a[href="thong_tin.html"]'), msg: 'Cần <a href="thong_tin.html">' });
        tests.push({ title: 'Liên kết bằng hình ảnh (a > img)', passed: !!doc.querySelector('a img'), msg: 'Cần có thẻ <img> bên trong thẻ <a>' });
      } else if (lesson.id === 11) {
        tests.push({ title: 'Hình ảnh (<img>) có alt', passed: doc.querySelectorAll('img[alt]').length >= 1, msg: 'Cần thẻ <img> có alt' });
        tests.push({ title: 'Video có controls', passed: doc.querySelectorAll('video[controls]').length >= 1, msg: 'Cần thẻ <video controls>' });
        tests.push({ title: 'Âm thanh có controls', passed: doc.querySelectorAll('audio[controls]').length >= 1, msg: 'Cần thẻ <audio controls>' });
        tests.push({ title: 'Iframe 600x400', passed: doc.querySelectorAll('iframe').length >= 1, msg: 'Cần thẻ <iframe> 600x400' });
      } else if (lesson.id === 12) {
        tests.push({ title: 'Thẻ <form> & text/date', passed: !!doc.querySelector('form') && !!doc.querySelector('input[type="text"]') && !!doc.querySelector('input[type="date"]'), msg: 'Cần form có text và date' });
        tests.push({ title: 'Giới tính (input radio)', passed: doc.querySelectorAll('input[type="radio"]').length >= 2, msg: 'Cần ít nhất 2 nút radio' });
        tests.push({ title: 'Checkbox & Select option', passed: doc.querySelectorAll('input[type="checkbox"]').length >= 2 && doc.querySelectorAll('select option').length >= 2, msg: 'Cần checkbox và select' });
        tests.push({ title: 'Nút submit', passed: !!doc.querySelector('input[type="submit"], button[type="submit"]'), msg: 'Cần nút gửi form' });
      } else if (lesson.id === 13) {
        const css = (lessonCodes[lesson.id].css + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();
        tests.push({ title: 'Liên kết CSS (<link> hoặc <style>)', passed: !!doc.querySelector('link[rel*="stylesheet"]') || lower.includes('href="style.css"') || !!doc.querySelector('style'), msg: 'Cần thẻ <link rel="stylesheet" href="style.css">' });
        tests.push({ title: 'Bộ chọn phần tử (Element)', passed: /(^|\s|})(h1|p|body|div|section)\s*\{/i.test(css), msg: 'Cần quy tắc bộ chọn phần tử (h1, p...)' });
        tests.push({ title: 'Bộ chọn lớp (.class)', passed: doc.querySelectorAll('[class]').length >= 1 && /\.[a-z0-9_-]+\s*\{/i.test(css), msg: 'Cần class trong HTML và .class { ... } trong CSS' });
        tests.push({ title: 'Bộ chọn định danh (#id)', passed: doc.querySelectorAll('[id]').length >= 1 && /#[a-z0-9_-]+\s*\{/i.test(css), msg: 'Cần id trong HTML và #id { ... } trong CSS' });
      } else if (lesson.id === 14) {
        const css = (lessonCodes[lesson.id].css + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();
        tests.push({ title: 'font-family & font-size', passed: css.includes('font-family:') && css.includes('font-size:'), msg: 'Cần font-family và font-size' });
        tests.push({ title: 'text-align: center & uppercase', passed: (css.includes('text-align: center') || css.includes('text-align:center')) && (css.includes('uppercase') || css.includes('bold')), msg: 'Cần text-align: center và uppercase' });
        tests.push({ title: 'text-align: justify & line-height', passed: (css.includes('text-align: justify') || css.includes('text-align:justify')) && css.includes('line-height:'), msg: 'Cần text-align: justify và line-height' });
        tests.push({ title: 'font-style: italic / underline', passed: css.includes('italic') || css.includes('underline'), msg: 'Cần font-style: italic hoặc text-decoration: underline' });
      } else if (lesson.id === 15) {
        const css = (lessonCodes[lesson.id].css + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();
        tests.push({ title: 'Màu chữ color (HEX / RGB)', passed: css.includes('color:'), msg: 'Cần có thuộc tính color' });
        tests.push({ title: 'Màu nền background-color', passed: css.includes('background-color:') || css.includes('background:'), msg: 'Cần thuộc tính background-color' });
        tests.push({ title: 'Viền border & bo góc border-radius', passed: (css.includes('border:') || css.includes('border-color:')) && css.includes('border-radius:'), msg: 'Cần border và border-radius' });
        tests.push({ title: 'Phối màu tương phản / RGBA', passed: css.includes('rgba(') || (css.match(/#[0-9a-f]{3,6}/gi) || []).length >= 2, msg: 'Cần phối màu tương phản' });
      } else if (lesson.id === 16) {
        const css = (lessonCodes[lesson.id].css + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();
        tests.push({ title: 'Kích thước khối (width/max-width)', passed: css.includes('width:') || css.includes('max-width:'), msg: 'Cần thuộc tính width hoặc max-width' });
        tests.push({ title: 'Căn giữa lề ngoài (margin: auto)', passed: css.includes('margin: auto') || css.includes('margin:auto') || /margin:\s*[^;]*auto/i.test(css), msg: 'Cần margin: auto để căn giữa khối' });
        tests.push({ title: 'Vùng đệm lề trong (padding)', passed: css.includes('padding:') || css.includes('padding-'), msg: 'Cần thuộc tính padding' });
        tests.push({ title: 'Viền border & box-sizing: border-box', passed: (css.includes('border:') || css.includes('border-')) && (css.includes('box-sizing:') || css.includes('border-box')), msg: 'Cần border và box-sizing: border-box' });
      } else if (lesson.id === 17) {
        const css = (lessonCodes[lesson.id].css + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();
        tests.push({ title: 'Bộ chọn phần tử (p { color: ... })', passed: /(^|\s|})p\s*\{[^}]*color:/i.test(css), msg: 'Cần p { color: ...; }' });
        tests.push({ title: 'Bộ chọn lớp (.class { color: ... })', passed: /\.[a-z0-9_-]+\s*\{[^}]*color:/i.test(css), msg: 'Cần .class { color: ...; }' });
        tests.push({ title: 'Bộ chọn định danh (#id { color: ... })', passed: /#[a-z0-9_-]+\s*\{[^}]*color:/i.test(css), msg: 'Cần #id { color: ...; }' });
        tests.push({ title: 'Phần tử mang cả class và id', passed: !!doc.querySelector('[class][id]'), msg: 'Cần phần tử có cả class và id' });
      } else if (lesson.id === 18) {
        const css = (lessonCodes[lesson.id].css + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();
        tests.push({ title: 'Cấu trúc web (header, nav, section, footer)', passed: !!doc.querySelector('header') && !!doc.querySelector('nav') && doc.querySelectorAll('section, main').length >= 1 && !!doc.querySelector('footer'), msg: 'Cần header, nav, section, footer' });
        tests.push({ title: 'Menu điều hướng (nav a)', passed: doc.querySelectorAll('nav a, header a').length >= 2, msg: 'Cần ít nhất 2 liên kết a trong nav' });
        tests.push({ title: 'Bảng (table) & Biểu mẫu (form)', passed: !!doc.querySelector('table') && !!doc.querySelector('form'), msg: 'Cần có cả <table> và <form>' });
        tests.push({ title: 'CSS tổng thể (padding, margin, color)', passed: css.includes('padding:') && css.includes('margin:') && css.includes('color:') && (css.includes('background-color:') || css.includes('background:')), msg: 'Cần CSS định dạng Box Model và màu sắc' });
      }

      const passedCount = tests.filter(t => t.passed).length;
      const totalCount = tests.length;
      const percent = Math.round((passedCount / totalCount) * 100);

      document.getElementById('scoreBadge').textContent = passedCount + '/' + totalCount;
      document.getElementById('gradePercent').textContent = percent + '%';
      document.getElementById('gradeBar').style.width = percent + '%';

      if (percent === 100) {
        document.getElementById('gradeComment').innerHTML = '🎉 <b>Xuất sắc!</b> Em đã hoàn thành trọn vẹn 100% tiêu chí SGK Tin học 12!';
        if (window.confetti) {
          window.confetti({ particleCount: 80, spread: 60 });
        }
      } else {
        document.getElementById('gradeComment').innerHTML = 'Em đã đạt ' + passedCount + '/' + totalCount + ' tiêu chí. Hãy xem các mục cần bổ sung dưới đây!';
      }

      const list = document.getElementById('gradeResultsList');
      list.innerHTML = '';
      tests.forEach(t => {
        const card = document.createElement('div');
        card.className = t.passed
          ? 'bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-2.5 text-xs text-emerald-300'
          : 'bg-amber-950/30 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-300';
        card.innerHTML = \`
          <div class="flex items-center gap-2 font-semibold">
            <i class="fa-solid \${t.passed ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-amber-400'}"></i>
            <span>\${t.title}</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-1 pl-5">\${t.passed ? 'Đạt tiêu chuẩn SGK.' : t.msg}</p>
        \`;
        list.appendChild(card);
      });
    }

    function switchResultTab(tab) {
      const vPrev = document.getElementById('viewPreview');
      const vGrad = document.getElementById('viewGrader');
      const vAI = document.getElementById('viewAITutor');
      const tPrev = document.getElementById('tabPreview');
      const tGrad = document.getElementById('tabGrader');
      const tAI = document.getElementById('tabAITutor');

      [vPrev, vGrad, vAI].forEach(v => v.classList.add('hidden'));
      [tPrev, tGrad, tAI].forEach(t => {
        t.className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200';
      });

      if (tab === 'preview') {
        vPrev.classList.remove('hidden');
        tPrev.className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 border-t-2 border-blue-500 rounded-t';
      } else if (tab === 'grader') {
        vGrad.classList.remove('hidden');
        tGrad.className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 border-t-2 border-emerald-500 rounded-t';
      } else if (tab === 'ai') {
        vAI.classList.remove('hidden');
        tAI.className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 border-t-2 border-purple-500 rounded-t';
      }
    }

    // Event Listeners
    select.onchange = (e) => loadLesson(parseInt(e.target.value, 10));
    document.getElementById('runBtn').onclick = runCode;
    document.getElementById('checkBtn').onclick = checkCode;
    document.getElementById('resetBtn').onclick = () => {
      if (confirm('Khôi phục mã mẫu ban đầu cho bài này?')) {
        const l = LESSONS_DATA[currentLessonIndex];
        lessonCodes[l.id].html = l.initialHtml;
        lessonCodes[l.id].css = l.initialCss;
        loadLesson(currentLessonIndex);
      }
    };

    document.getElementById('tabHtml').onclick = () => {
      activeEditorTab = 'html';
      document.getElementById('tabHtml').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 border-t-2 border-blue-500 rounded-t';
      document.getElementById('tabCss').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200';
      const l = LESSONS_DATA[currentLessonIndex];
      document.getElementById('codeEditor').value = lessonCodes[l.id].html;
      updateCharCount();
    };

    document.getElementById('tabCss').onclick = () => {
      activeEditorTab = 'css';
      document.getElementById('tabCss').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 border-t-2 border-blue-500 rounded-t';
      document.getElementById('tabHtml').className = 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200';
      const l = LESSONS_DATA[currentLessonIndex];
      document.getElementById('codeEditor').value = lessonCodes[l.id].css;
      updateCharCount();
    };

    document.getElementById('codeEditor').oninput = () => {
      saveCurrentCode();
    };

    document.getElementById('codeEditor').onkeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const editor = e.target;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
        saveCurrentCode();
      }
    };

    document.getElementById('tabPreview').onclick = () => switchResultTab('preview');
    document.getElementById('tabGrader').onclick = () => switchResultTab('grader');
    document.getElementById('tabAITutor').onclick = () => switchResultTab('ai');
    document.getElementById('reloadIframe').onclick = runCode;

    // Guide tabs
    const gTasks = document.getElementById('guideTabTasks');
    const gTheory = document.getElementById('guideTabTheory');
    const gSamples = document.getElementById('guideTabSamples');
    const pTasks = document.getElementById('panelTasks');
    const pTheory = document.getElementById('panelTheory');
    const pSamples = document.getElementById('panelSamples');

    function switchGuideTab(tab) {
      [pTasks, pTheory, pSamples].forEach(p => p.classList.add('hidden'));
      [gTasks, gTheory, gSamples].forEach(g => {
        g.className = 'flex-1 py-2 px-2 font-semibold text-slate-400 hover:text-slate-200 transition';
      });

      if (tab === 'tasks') {
        pTasks.classList.remove('hidden');
        gTasks.className = 'flex-1 py-2 px-2 font-semibold text-blue-400 border-b-2 border-blue-500 transition';
      } else if (tab === 'theory') {
        pTheory.classList.remove('hidden');
        gTheory.className = 'flex-1 py-2 px-2 font-semibold text-blue-400 border-b-2 border-blue-500 transition';
      } else if (tab === 'samples') {
        pSamples.classList.remove('hidden');
        gSamples.className = 'flex-1 py-2 px-2 font-semibold text-amber-400 border-b-2 border-amber-500 transition';
      }
    }

    gTasks.onclick = () => switchGuideTab('tasks');
    gTheory.onclick = () => switchGuideTab('theory');
    gSamples.onclick = () => switchGuideTab('samples');
    document.getElementById('samplesHeaderBtn').onclick = () => switchGuideTab('samples');

    // Start
    loadLesson(0);
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtmlFile() {
  const content = generateStandaloneHtml();
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'PhongThucHanh_HTML12_Offline.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
