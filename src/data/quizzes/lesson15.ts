import { QuizQuestion } from '../../types';

// BÀI 15: TẠO MÀU CHO CHỮ VÀ NỀN
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_15_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Để thiết lập màu sắc cho văn bản chữ trong CSS, ta sử dụng thuộc tính nào?',
    options: [
      'color',
      'text-color',
      'font-color',
      'foreground'
    ],
    correctIndex: 0,
    explanation: 'Thuộc tính color trong CSS quy định màu sắc của ký tự chữ.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Để thiết lập màu nền cho một phần tử khối hoặc toàn bộ trang web, ta sử dụng thuộc tính nào?',
    options: [
      'background-color',
      'bgcolor',
      'color-background',
      'surface'
    ],
    correctIndex: 0,
    explanation: 'background-color (hoặc viết gọn background) đặt màu nền cho phần tử.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Trong hệ màu Hexadecimal (mã màu thập lục phân #RRGGBB), mã màu nào sau đây biểu diễn màu trắng tinh khiết?',
    options: [
      '#ffffff (hoặc #fff)',
      '#000000',
      '#ff0000',
      '#00ff00'
    ],
    correctIndex: 0,
    explanation: '#ffffff là độ sáng tối đa của cả 3 kênh Đỏ (Red), Lục (Green), Lam (Blue) tạo ra màu trắng.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Trong mô hình màu rgba(R, G, B, A), chữ cái "A" là viết tắt của thành phần nào?',
    snippet: {
      css: `div { background: rgba(30, 41, 59, 0.8); }`
    },
    options: [
      'Alpha (độ trong suốt mờ ảo từ 0 đến 1)',
      'Animation',
      'Active',
      'Auto'
    ],
    correctIndex: 0,
    explanation: 'Alpha là kênh điều khiển độ trong suốt, với 0 là hoàn toàn vô hình và 1 là hoàn toàn đặc mờ.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Thuộc tính opacity: 0.5 khác gì so với background-color: rgba(0, 0, 0, 0.5)?',
    snippet: {
      css: `<style>\n  .box-a { opacity: 0.5; background: black; color: white; }\n  .box-b { background: rgba(0,0,0,0.5); color: white; }\n</style>`
    },
    options: [
      'opacity làm mờ cả nền và toàn bộ chữ, hình ảnh con bên trong; còn rgba chỉ làm trong suốt màu nền, chữ bên trong vẫn sắc nét 100%',
      'opacity chỉ chạy được trên điện thoại',
      'Hai thuộc tính này hoàn toàn giống hệt nhau không khác gì',
      'rgba bị trình duyệt chặn không cho dùng'
    ],
    correctIndex: 0,
    explanation: 'opacity áp dụng độ trong suốt lên toàn bộ phần tử và con cháu của nó, trong khi kênh alpha của rgba chỉ tác động lên màu nền của chính nó.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Cho đoạn mã CSS sau. Giá trị linear-gradient tạo ra hiệu ứng gì cho thẻ .hero-banner?',
    snippet: {
      css: `<style>\n  .hero-banner {\n    background: linear-gradient(135deg, #2563eb, #7c3aed);\n    color: white;\n    padding: 24px;\n  }\n</style>`,
      html: `<div class="hero-banner">Chào mừng đến với Tin học 12</div>`
    },
    options: [
      'Tạo nền dải màu chuyển tiếp mượt mà từ xanh dương (#2563eb) sang tím (#7c3aed) theo góc chéo 135 độ',
      'Chèn 2 bức ảnh lồng vào nhau',
      'Tạo đường viền chuyển màu chạy vòng quanh',
      'Làm cho chữ đổi màu liên tục theo thời gian'
    ],
    correctIndex: 0,
    explanation: 'linear-gradient tạo nền chuyển sắc mượt mà (gradient) giữa các điểm dừng màu theo một góc độ hoặc hướng xác định.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Khi thiết kế giao diện web, tại sao cần chú ý đến độ tương phản (contrast ratio) giữa thuộc tính color và background-color?',
    options: [
      'Đảm bảo chữ nổi bật rõ ràng, người dùng không bị mỏi mắt và người có thị lực kém vẫn đọc được văn bản dễ dàng theo chuẩn tiếp cận WCAG',
      'Để trang web tải nhanh hơn',
      'Để tránh bị trình duyệt báo lỗi cú pháp',
      'Để tự động đổi màu khi trời tối'
    ],
    correctIndex: 0,
    explanation: 'Tương phản màu sắc là tiêu chuẩn quan trọng trong trải nghiệm người dùng và tiếp cận web (Accessibility).'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Học sinh thiết kế thẻ Card với phong cách kính mờ hiện đại (Glassmorphism). Đoạn mã CSS nào sau đây kết hợp màu nền trong suốt và hiệu ứng mờ hậu cảnh chuẩn xác?',
    snippet: {
      css: `<style>\n  .glass-card {\n    background: rgba(255, 255, 255, 0.15);\n    backdrop-filter: blur(10px);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    border-radius: 12px;\n  }\n</style>`,
      html: `<div class="glass-card"><p>Nội dung kính mờ</p></div>`
    },
    options: [
      'Sử dụng background: rgba(...) kết hợp backdrop-filter: blur(...) và viền bán trong suốt',
      'Chỉ dùng filter: blur() trên ảnh',
      'Dùng opacity: 0.1',
      'Dùng display: glass'
    ],
    correctIndex: 0,
    explanation: 'Hiệu ứng Glassmorphism hiện đại được tạo bởi nền màu bán trong suốt rgba kết hợp bộ lọc làm nhòe hậu cảnh backdrop-filter: blur().'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Một học sinh muốn tạo nút bấm có dải màu nền đổi hướng khi người dùng rê chuột vào (:hover). Đoạn mã nào sau đây mô tả đúng cách chuyển đổi?',
    snippet: {
      css: `<style>\n  .btn-grad {\n    background: linear-gradient(to right, #06b6d4, #3b82f6);\n    color: white;\n    transition: background 0.3s ease;\n  }\n  .btn-grad:hover {\n    background: linear-gradient(to right, #3b82f6, #06b6d4);\n  }\n</style>`
    },
    options: [
      'Đảo ngược các điểm dừng màu trong linear-gradient khi kích hoạt trạng thái giả lớp :hover',
      'Đổi màu chữ sang màu đen',
      'Xóa sạch màu nền',
      'Dùng transform: rotate(180deg)'
    ],
    correctIndex: 0,
    explanation: 'Khai báo lớp :hover đảo ngược trật tự màu trong linear-gradient tạo hiệu ứng chuyển động dải màu sinh động khi tương tác.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Để sử dụng biến màu CSS (CSS Variables) giúp quản lý bảng màu chủ đạo (Primary color) xuyên suốt toàn bộ dự án website, cú pháp định nghĩa trong :root và gọi sử dụng nào sau đây là chuẩn?',
    snippet: {
      css: `:root {\n  --primary-color: #3b82f6;\n}\nh1 {\n  color: var(--primary-color);\n}`
    },
    options: [
      'Khai báo --primary-color trong :root và gọi lại bằng var(--primary-color)',
      'Khai báo $primary trong body và gọi $primary',
      'Khai báo @color và gọi get(@color)',
      'CSS không hỗ trợ biến'
    ],
    correctIndex: 0,
    explanation: 'Cú pháp biến CSS chuẩn của W3C bắt đầu bằng hai dấu gạch nối (--ten-bien) và được gọi bằng hàm var(--ten-bien).'
  }
];
