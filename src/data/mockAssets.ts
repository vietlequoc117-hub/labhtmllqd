import { MockAsset } from '../types';

// High-fidelity SVG assets encoded as data URIs
const sportsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </radialGradient>
  </defs>
  <rect width="600" height="400" rx="16" fill="url(#skyGrad)"/>
  <circle cx="500" cy="80" r="45" fill="url(#sunGlow)"/>
  <!-- Field green -->
  <path d="M0,280 Q300,240 600,280 L600,400 L0,400 Z" fill="#15803d"/>
  <path d="M0,320 Q300,290 600,320 L600,400 L0,400 Z" fill="#16a34a"/>
  <!-- Running track curve -->
  <path d="M-50,390 C200,310 400,310 650,390" stroke="#dc2626" stroke-width="26" fill="none"/>
  <path d="M-50,390 C200,310 400,310 650,390" stroke="#ffffff" stroke-width="2" stroke-dasharray="8 8" fill="none"/>
  <!-- Soccer ball -->
  <g transform="translate(180, 240)">
    <circle cx="30" cy="30" r="28" fill="#ffffff" stroke="#1f2937" stroke-width="3"/>
    <polygon points="30,16 39,23 35,34 25,34 21,23" fill="#1f2937"/>
    <line x1="30" y1="16" x2="30" y2="2" stroke="#1f2937" stroke-width="2"/>
    <line x1="39" y1="23" x2="52" y2="22" stroke="#1f2937" stroke-width="2"/>
    <line x1="35" y1="34" x2="44" y2="46" stroke="#1f2937" stroke-width="2"/>
    <line x1="25" y1="34" x2="16" y2="46" stroke="#1f2937" stroke-width="2"/>
    <line x1="21" y1="23" x2="8" y2="22" stroke="#1f2937" stroke-width="2"/>
  </g>
  <!-- Basketball -->
  <g transform="translate(360, 220)">
    <circle cx="35" cy="35" r="32" fill="#ea580c" stroke="#1f2937" stroke-width="3"/>
    <line x1="3" y1="35" x2="67" y2="35" stroke="#1f2937" stroke-width="2.5"/>
    <line x1="35" y1="3" x2="35" y2="67" stroke="#1f2937" stroke-width="2.5"/>
    <path d="M12,12 Q35,35 12,58" stroke="#1f2937" stroke-width="2.5" fill="none"/>
    <path d="M58,12 Q35,35 58,58" stroke="#1f2937" stroke-width="2.5" fill="none"/>
  </g>
  <!-- Badminton Shuttlecock -->
  <g transform="translate(280, 160)">
    <polygon points="25,50 10,20 40,20" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
    <line x1="17" y1="20" x2="25" y2="50" stroke="#cbd5e1" stroke-width="1.5"/>
    <line x1="33" y1="20" x2="25" y2="50" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="25" cy="54" r="8" fill="#ef4444"/>
  </g>
  <!-- Badge banner -->
  <rect x="120" y="40" width="360" height="52" rx="10" fill="#0f172a" fill-opacity="0.85" stroke="#fbbf24" stroke-width="2"/>
  <text x="300" y="74" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#f8fafc" text-anchor="middle">
    CLB THỂ THAO TRƯỜNG THPT
  </text>
  <text x="300" y="115" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#fef08a" text-anchor="middle">
    Khỏe để học tập và rèn luyện - Tin học 12
  </text>
</svg>`;

const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <defs>
    <radialGradient id="sunCenter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </radialGradient>
  </defs>
  <rect width="300" height="300" fill="#e0f2fe" rx="16"/>
  <!-- Rays -->
  <g stroke="#f59e0b" stroke-width="8" stroke-linecap="round">
    <line x1="150" y1="30" x2="150" y2="60"/>
    <line x1="150" y1="240" x2="150" y2="270"/>
    <line x1="30" y1="150" x2="60" y2="150"/>
    <line x1="240" y1="150" x2="270" y2="150"/>
    <line x1="65" y1="65" x2="88" y2="88"/>
    <line x1="212" y1="212" x2="235" y2="235"/>
    <line x1="65" y1="235" x2="88" y2="212"/>
    <line x1="212" y1="88" x2="235" y2="65"/>
  </g>
  <!-- Sun face -->
  <circle cx="150" cy="150" r="65" fill="url(#sunCenter)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
  <!-- Eyes -->
  <circle cx="130" cy="140" r="7" fill="#1e293b"/>
  <circle cx="170" cy="140" r="7" fill="#1e293b"/>
  <circle cx="132" cy="138" r="2.5" fill="#ffffff"/>
  <circle cx="172" cy="138" r="2.5" fill="#ffffff"/>
  <!-- Smile -->
  <path d="M130,165 Q150,185 170,165" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Cheeks -->
  <circle cx="118" cy="155" r="8" fill="#f87171" opacity="0.6"/>
  <circle cx="182" cy="155" r="8" fill="#f87171" opacity="0.6"/>
</svg>`;

const groupSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGroup" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
  </defs>
  <rect width="500" height="350" rx="16" fill="url(#bgGroup)"/>
  <rect x="20" y="20" width="460" height="310" rx="12" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="6 4"/>
  <!-- Student avatars -->
  <!-- Student 1 -->
  <g transform="translate(90, 110)">
    <circle cx="40" cy="40" r="32" fill="#38bdf8"/>
    <circle cx="40" cy="30" r="16" fill="#fde047"/>
    <path d="M20,68 C20,50 60,50 60,68" fill="#0284c7"/>
    <text x="40" y="95" font-family="Arial" font-size="13" font-weight="bold" fill="#e2e8f0" text-anchor="middle">Minh An</text>
  </g>
  <!-- Student 2 (Center) -->
  <g transform="translate(210, 85)">
    <circle cx="40" cy="40" r="38" fill="#ec4899"/>
    <circle cx="40" cy="30" r="19" fill="#fde047"/>
    <path d="M15,74 C15,52 65,52 65,74" fill="#be185d"/>
    <text x="40" y="105" font-family="Arial" font-size="14" font-weight="bold" fill="#fbcfe8" text-anchor="middle">Bảo Châu (Trưởng nhóm)</text>
  </g>
  <!-- Student 3 -->
  <g transform="translate(330, 110)">
    <circle cx="40" cy="40" r="32" fill="#10b981"/>
    <circle cx="40" cy="30" r="16" fill="#fde047"/>
    <path d="M20,68 C20,50 60,50 60,68" fill="#047857"/>
    <text x="40" y="95" font-family="Arial" font-size="13" font-weight="bold" fill="#e2e8f0" text-anchor="middle">Đức Huy</text>
  </g>
  <text x="250" y="55" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#a5b4fc" text-anchor="middle">
    NHÓM 1 - LỚP 12A1 KHOÁ 2024-2027
  </text>
  <text x="250" y="275" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">
    Đoàn kết - Sáng tạo - Học tập hết mình vì tương lai
  </text>
</svg>`;

export const SPORTS_IMAGE_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(sportsSvg)}`;
export const SUN_IMAGE_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(sunSvg)}`;
export const GROUP_IMAGE_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(groupSvg)}`;

// Mock HTML for secondary pages
export const MOCK_THONG_TIN_HTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thông tin chi tiết - Tin học 12</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      color: #0f172a;
      line-height: 1.6;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      max-width: 650px;
      margin: 0 auto;
      border-top: 5px solid #2563eb;
    }
    h1 { color: #1e40af; margin-top: 0; }
    .badge {
      display: inline-block;
      background: #dbeafe;
      color: #1d4ed8;
      font-size: 13px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    a.back-btn {
      display: inline-block;
      margin-top: 16px;
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }
    a.back-btn:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Trang liên kết phụ (thong_tin.html)</span>
    <h1>Thông Tin Hoạt Động Đoàn & CLB</h1>
    <p>Chào mừng bạn đã điều hướng thành công đến trang <strong>thong_tin.html</strong>!</p>
    <p>Đây là trang chi tiết chứa nội dung điều lệ, nội quy và danh sách các câu lạc bộ ngoại khóa của trường THPT trong học kỳ này.</p>
    <ul>
      <li><strong>Thời gian sinh hoạt:</strong> Chiều thứ Bảy hàng tuần (14h00 - 17h00)</li>
      <li><strong>Địa điểm:</strong> Nhà tập đa năng & Sân bóng cỏ nhân tạo</li>
      <li><strong>Trang thiết bị:</strong> Nhà trường cung cấp đầy đủ vợt, bóng và lưới</li>
    </ul>
    <p><a href="javascript:history.back()" class="back-btn">&larr; Quay lại trang trước</a></p>
  </div>
</body>
</html>`;

export const MOCK_CLB_HTML = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>CLB Thể Thao Học Đường</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      padding: 24px;
      background: #eff6ff;
      color: #1e3a8a;
      line-height: 1.6;
      margin: 0;
    }
    .card {
      background: #ffffff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #bfdbfe;
      max-width: 550px;
      margin: 20px auto;
    }
    .badge {
      display: inline-block;
      background: #dbeafe;
      color: #1d4ed8;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    h2 { margin-top: 0; color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 18px;
      background: #2563eb;
      color: #ffffff;
      text-decoration: none;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      font-size: 13px;
    }
    .back-btn:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Trang liên kết phụ: CLB.html</span>
    <h2>Câu Lạc Bộ Thể Thao THPT</h2>
    <p>Chào mừng bạn đã điều hướng thành công đến trang <strong>CLB.html</strong>!</p>
    <p>Rèn luyện sức khỏe, tự tin tỏa sáng với các bộ môn Bóng đá, Cầu lông, Bóng rổ, Cờ vua.</p>
    <ul>
      <li><strong>Bóng đá:</strong> Sân cỏ nhân tạo - Chiều Thứ 3 & Thứ 5</li>
      <li><strong>Cầu lông:</strong> Nhà tập đa năng - Chiều Thứ 4 & Thứ 7</li>
      <li><strong>Lịch thi đấu tuần này:</strong> Chung kết giải bóng đá Khối 12 diễn ra vào 8h00 sáng Chủ nhật.</li>
    </ul>
    <button class="back-btn" onclick="window.parent.postMessage({ type: 'RESTORE_MAIN_PAGE' }, '*');">&larr; Quay lại trang chính (index.html)</button>
  </div>
</body>
</html>`;

// A valid, royalty-free lightweight open video link for testing HTML5 video tag
export const SAMPLE_VIDEO_URL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
export const SAMPLE_AUDIO_URL = 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg';

export const GLOBAL_MOCK_ASSETS: MockAsset[] = [
  {
    id: 'asset_thethao',
    name: 'thethao.png',
    path: 'images/thethao.png',
    type: 'image',
    description: 'Hình ảnh biểu trưng CLB Thể thao (Bóng đá, bóng rổ, cầu lông)',
    previewUrl: SPORTS_IMAGE_DATA_URI,
    size: '600x400 SVG',
  },
  {
    id: 'asset_sun',
    name: 'sun.png',
    path: 'images/sun.png',
    type: 'image',
    description: 'Hình minh họa mặt trời sáng rực rỡ',
    previewUrl: SUN_IMAGE_DATA_URI,
    size: '300x300 SVG',
  },
  {
    id: 'asset_lop12a1',
    name: 'lop12a1.png',
    path: 'images/lop12a1.png',
    type: 'image',
    description: 'Hình ảnh minh họa kỷ yếu nhóm học sinh lớp 12',
    previewUrl: GROUP_IMAGE_DATA_URI,
    size: '500x350 SVG',
  },
  {
    id: 'asset_video',
    name: 'war_is_over.mp4',
    path: 'videos/war_is_over.mp4',
    type: 'video',
    description: 'Video tư liệu ngắn chuẩn MP4 có tiếng và hình ảnh động',
    previewUrl: SAMPLE_VIDEO_URL,
    size: '720p H.264',
  },
  {
    id: 'asset_audio',
    name: 'Quoc_ca.mp3',
    path: 'audio/Quoc_ca.mp3',
    type: 'audio',
    description: 'Tệp âm thanh mẫu chuẩn MP3/OGG để thực hành thẻ audio',
    previewUrl: SAMPLE_AUDIO_URL,
    size: 'Stereo Audio',
  },
  {
    id: 'asset_thong_tin',
    name: 'thong_tin.html',
    path: 'thong_tin.html',
    type: 'html',
    description: 'Trang HTML phụ liên kết thông tin hoạt động',
    previewUrl: 'data:text/html;charset=utf-8,' + encodeURIComponent(MOCK_THONG_TIN_HTML),
    size: 'Virtual HTML',
  },
  {
    id: 'asset_clb',
    name: 'CLB.html',
    path: 'CLB.html',
    type: 'html',
    description: 'Trang HTML giới thiệu câu lạc bộ thể thao nhúng trong iframe',
    previewUrl: 'data:text/html;charset=utf-8,' + encodeURIComponent(MOCK_CLB_HTML),
    size: 'Virtual HTML',
  },
];

/**
 * Transforms raw student HTML before inserting into iframe
 * Replaces simulated file paths with virtual data URIs or virtual blob endpoints
 */
export function resolveVirtualPaths(html: string): string {
  let processed = html;

  // Replace images
  processed = processed.replace(/src=["'](?:images\/)?thethao\.png["']/gi, `src="${SPORTS_IMAGE_DATA_URI}"`);
  processed = processed.replace(/src=["'](?:images\/)?sun\.png["']/gi, `src="${SUN_IMAGE_DATA_URI}"`);
  processed = processed.replace(/src=["'](?:images\/)?lop12a1\.png["']/gi, `src="${GROUP_IMAGE_DATA_URI}"`);

  // Replace video
  processed = processed.replace(/src=["'](?:videos\/)?war_is_over\.mp4["']/gi, `src="${SAMPLE_VIDEO_URL}"`);
  processed = processed.replace(/<source([^>]+)src=["'](?:videos\/)?war_is_over\.mp4["']/gi, `<source$1src="${SAMPLE_VIDEO_URL}"`);

  // Replace audio
  processed = processed.replace(/src=["'](?:audio\/)?Quoc_ca\.mp3["']/gi, `src="${SAMPLE_AUDIO_URL}"`);
  processed = processed.replace(/<source([^>]+)src=["'](?:audio\/)?Quoc_ca\.mp3["']/gi, `<source$1src="${SAMPLE_AUDIO_URL}"`);

  // Inject script to intercept link clicks:
  // 1. External links (https://, http://, etc.) -> opened safely in new tab via window.open & parent postMessage (preventing YouTube/Google X-Frame-Options sad-face crash!)
  // 2. Relative virtual pages (CLB.html, thong_tin.html, or any other .html) -> renders virtual subpage with back button
  // 3. Anchor links (#section) -> smooth scroll
  const virtualNavigationScript = `
  <style>
    .virtual-toast-alert {
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: #0f172a;
      color: #f8fafc;
      padding: 9px 16px;
      border-radius: 10px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.35);
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: toastIn 0.2s ease-out;
      border: 1px solid #334155;
      max-width: 90%;
      text-align: left;
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translate(-50%, -10px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
  </style>
  <script>
    (function() {
      function showToast(msg) {
        var old = document.getElementById('virtual-link-toast');
        if (old) old.remove();
        var toast = document.createElement('div');
        toast.id = 'virtual-link-toast';
        toast.className = 'virtual-toast-alert';
        toast.innerHTML = '<span>🔗</span><span>' + msg + '</span>';
        document.body.appendChild(toast);
        setTimeout(function() {
          if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 4000);
      }

      document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href');
        if (!href) return;

        // Case 1: In-page anchor link (#section, #muc-luc, etc.)
        if (href.charAt(0) === '#') {
          if (href === '#') {
            e.preventDefault();
            return;
          }
          var targetId = href.substring(1);
          var targetElem = document.getElementById(targetId) || document.querySelector('[name="' + targetId + '"]');
          if (targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        // Case 2: External URLs (https://, http://, //, mailto:, tel:)
        // Crucial fix: External websites like YouTube or Google explicitly block iframe embedding via X-Frame-Options.
        // Opening them in a new tab allows the student to verify their link works 100% without crashing the preview iframe!
        if (/^(https?:|\\/\\/|mailto:|tel:)/i.test(href)) {
          e.preventDefault();
          showToast('Đang mở liên kết ngoài <b>' + href + '</b> trong tab mới (do YouTube/Google bảo mật không cho nhúng trong khung nhỏ)!');
          try {
            window.parent.postMessage({ type: 'OPEN_EXTERNAL_URL', url: href }, '*');
            window.open(href, '_blank', 'noopener,noreferrer');
          } catch(err) {
            console.warn(err);
          }
          return;
        }

        // Case 3: Local virtual HTML pages (CLB.html, thong_tin.html, or other pages)
        e.preventDefault();
        var cleanHref = href.replace(/^(\\.\\/|\\/)/, '').toLowerCase();

        if (cleanHref.indexOf('clb') !== -1) {
          window.parent.postMessage({ type: 'NAVIGATE_VIRTUAL_PAGE', page: 'CLB.html' }, '*');
          document.open();
          document.write(${JSON.stringify(MOCK_CLB_HTML)});
          document.close();
        } else if (cleanHref.indexOf('thong_tin') !== -1) {
          window.parent.postMessage({ type: 'NAVIGATE_VIRTUAL_PAGE', page: 'thong_tin.html' }, '*');
          document.open();
          document.write(${JSON.stringify(MOCK_THONG_TIN_HTML)});
          document.close();
        } else {
          var fileName = href.replace(/^(\\.\\/|\\/)/, '');
          window.parent.postMessage({ type: 'NAVIGATE_VIRTUAL_PAGE', page: fileName }, '*');
          var genericHtml = '<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>' + fileName + '</title>' +
            '<style>' +
            'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;padding:24px;background:#f8fafc;color:#1e293b;line-height:1.6;margin:0;}' +
            '.card{background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);border:1px solid #e2e8f0;max-width:550px;margin:20px auto;}' +
            '.badge{display:inline-block;background:#e0e7ff;color:#4338ca;font-size:12px;font-weight:700;padding:4px 10px;border-radius:9999px;margin-bottom:12px;}' +
            'h2{margin-top:0;color:#0f172a;border-bottom:2px solid #6366f1;padding-bottom:8px;}' +
            '.btn{display:inline-flex;align-items:center;margin-top:16px;background:#4f46e5;color:#fff;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;}' +
            '.btn:hover{background:#4338ca;}' +
            '</style></head><body><div class="card">' +
            '<span class="badge">Trang ảo: ' + fileName + '</span>' +
            '<h2>✓ Thẻ liên kết hoạt động chính xác!</h2>' +
            '<p>Em đã liên kết thành công đến tệp <code>&lt;a href="' + href + '"&gt;</code>.</p>' +
            '<p>Trong môi trường web thật, trình duyệt sẽ tải trang <strong>' + fileName + '</strong> tương ứng trong cùng thư mục dự án.</p>' +
            '<button class="btn" onclick="window.parent.postMessage({ type: \\'RESTORE_MAIN_PAGE\\' }, \\'*\\');">&larr; Quay lại trang chính (index.html)</button>' +
            '</div></body></html>';
          document.open();
          document.write(genericHtml);
          document.close();
        }
      });
    })();
  <\/script>
  `;

  // Inject iframe src virtual resolver
  processed = processed.replace(/src=["']thong_tin\.html["']/gi, `src="data:text/html;charset=utf-8,${encodeURIComponent(MOCK_THONG_TIN_HTML)}"`);
  processed = processed.replace(/src=["']CLB\.html["']/gi, `src="data:text/html;charset=utf-8,${encodeURIComponent(MOCK_CLB_HTML)}"`);

  // Attach virtualNavigationScript before </body> or at the end
  if (processed.includes('</body>')) {
    processed = processed.replace('</body>', `${virtualNavigationScript}</body>`);
  } else {
    processed += virtualNavigationScript;
  }

  return processed;
}
