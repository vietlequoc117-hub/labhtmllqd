import { QuizQuestion } from '../../types';

// BÀI 11: ĐA PHƯƠNG TIỆN & KHUNG NỘI TUYẾN (IFRAME)
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_11_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Thẻ HTML nào sau đây được sử dụng để chèn tệp âm thanh (nhạc, podcast) vào trang web trong HTML5?',
    options: [
      '<audio>',
      '<sound>',
      '<music>',
      '<voice>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <audio> là thẻ chuẩn của HTML5 dùng để phát âm thanh trên trang web.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Thuộc tính nào của thẻ <audio> hoặc <video> phải được khai báo để hiển thị thanh điều khiển (nút Play/Pause, âm lượng, thời lượng)?',
    snippet: {
      html: `<audio src="nhac.mp3" controls></audio>`
    },
    options: [
      'controls',
      'autoplay',
      'panel',
      'buttons'
    ],
    correctIndex: 0,
    explanation: 'Nếu thiếu thuộc tính controls, trình duyệt sẽ ẩn toàn bộ giao diện điều khiển của trình phát nhạc/video.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Thẻ <iframe> trong HTML được sử dụng với mục đích chính là gì?',
    options: [
      'Nhúng một trang web hoặc tài liệu khác vào bên trong trang web hiện tại',
      'Chèn khung viền ảnh 3D',
      'Tạo hiệu ứng bóng đổ cho ảnh',
      'Chạy tệp nén zip'
    ],
    correctIndex: 0,
    explanation: '<iframe> (Inline Frame) nhúng một tài liệu HTML độc lập (hoặc bản đồ, video YouTube) lồng vào trong trang web.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Thuộc tính alt trong thẻ <img> có tác dụng gì?',
    snippet: {
      html: `<img src="lop12a1.jpg" alt="Tập thể lớp 12A1 ngày khai giảng">`
    },
    options: [
      'Hiển thị văn bản thay thế khi hình ảnh bị lỗi không tải được và hỗ trợ máy đọc màn hình',
      'Tự động tăng độ nét của hình ảnh',
      'Đổi màu nền của ảnh',
      'Tạo đường viền cho ảnh'
    ],
    correctIndex: 0,
    explanation: 'alt (alternative text) cung cấp nội dung mô tả thay thế khi ảnh lỗi tải và cho người khiếm thị dùng công cụ hỗ trợ.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Thuộc tính poster="thumbnail.jpg" trong thẻ <video> có ý nghĩa gì?',
    snippet: {
      html: `<video controls poster="thumbnail.jpg">\n  <source src="bai-giang.mp4" type="video/mp4">\n</video>`
    },
    options: [
      'Hiển thị hình ảnh bìa (ảnh đại diện) trước khi người dùng bấm nút phát video',
      'Tải toàn bộ phụ đề video',
      'Khóa video lại không cho xem',
      'Chèn hình mờ chìm bảo vệ bản quyền trong suốt quá trình phát'
    ],
    correctIndex: 0,
    explanation: 'Thuộc tính poster chỉ định hình ảnh đại diện hiển thị trước khi video được tải hoặc phát.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Tại sao bên trong thẻ <video> hoặc <audio> người ta thường đặt nhiều thẻ con <source> với các định dạng khác nhau (như mp4, webm)?',
    snippet: {
      html: `<video controls>\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  Trình duyệt của bạn không hỗ trợ thẻ video.\n</video>`
    },
    options: [
      'Để tăng tính tương thích, trình duyệt sẽ tự động chọn định dạng đầu tiên mà nó hỗ trợ tốt nhất',
      'Để phát 2 video cùng lúc tạo hiệu ứng 3D',
      'Bắt buộc theo chuẩn HTML5 nếu thiếu sẽ báo lỗi',
      'Để nhân đôi tốc độ tải trang'
    ],
    correctIndex: 0,
    explanation: 'Cung cấp nhiều định dạng qua các thẻ <source> đảm bảo tính tương thích chéo giữa các trình duyệt khác nhau.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Cho đoạn mã CSS và HTML sau. Thuộc tính object-fit: cover có tác dụng gì đối với hình ảnh trong khung?',
    snippet: {
      css: `<style>\n  .card-img {\n    width: 250px;\n    height: 150px;\n    object-fit: cover;\n    border-radius: 8px;\n  }\n</style>`,
      html: `<img class="card-img" src="phong-canh.jpg" alt="Trường học">`
    },
    options: [
      'Giữ nguyên tỉ lệ ảnh gốc, tự động cắt xén phần thừa để lấp đầy kích thước khung mà không bị méo hình',
      'Kéo dãn hình ảnh gây méo mó để vừa khít',
      'Biến ảnh thành ảnh đen trắng',
      'Xoay ảnh 90 độ'
    ],
    correctIndex: 0,
    explanation: 'object-fit: cover giữ nguyên tỉ lệ khung hình (aspect ratio) của ảnh và lấp đầy khung kích thước cố định mà không làm méo hình.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Học sinh muốn nhúng video clip giới thiệu trường từ YouTube vào website mà không làm tràn khỏi màn hình điện thoại (co giãn responsive theo tỉ lệ 16:9). Cách xử lý CSS hiện đại nào sau đây tối ưu nhất?',
    snippet: {
      css: `<style>\n  .video-container {\n    width: 100%;\n    aspect-ratio: 16 / 9;\n  }\n  .video-container iframe {\n    width: 100%;\n    height: 100%;\n    border: none;\n  }\n</style>`,
      html: `<div class="video-container">\n  <iframe src="https://www.youtube.com/embed/xyz123" allowfullscreen></iframe>\n</div>`
    },
    options: [
      'Sử dụng aspect-ratio: 16 / 9 cho khối bao ngoài và cho iframe chiếm width/height: 100%',
      'Cố định width="1280" height="720" trực tiếp trên iframe',
      'Dùng thẻ <object> thay cho <iframe>',
      'Đặt zoom: 50% trong CSS'
    ],
    correctIndex: 0,
    explanation: 'Thuộc tính aspect-ratio: 16 / 9 của CSS giúp khối chứa tự động co giãn theo tỉ lệ chuẩn video trên mọi độ phân giải màn hình.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Một học sinh muốn tạo tệp video tự động chạy lặp đi lặp lại vô tận và không có tiếng khi người dùng truy cập trang chủ để làm nền (video banner). Cần cấu hình các thuộc tính nào cho thẻ <video>?',
    options: [
      'autoplay muted loop playsinline',
      'controls loop',
      'autoplay sound="high"',
      'repeat="always"'
    ],
    correctIndex: 0,
    explanation: 'Chính sách bảo mật trình duyệt chỉ cho phép autoplay (tự phát) khi có thuộc tính muted (tắt tiếng), kết hợp loop (lặp lại).'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Quan sát đoạn mã sau. Thuộc tính loading="lazy" trong thẻ <img> mang lại lợi ích kỹ thuật quan trọng nào cho trang web?',
    snippet: {
      html: `<img src="anh-chan-dung-dung-luong-lon.jpg" alt="Kỷ yếu" loading="lazy">`
    },
    options: [
      'Trì hoãn tải ảnh cho đến khi người dùng cuộn trang tới gần vị trí của ảnh, giúp tiết kiệm băng thông và tăng tốc độ tải trang ban đầu',
      'Làm mờ ảnh để tạo hiệu ứng nghệ thuật',
      'Tự động giảm chất lượng ảnh xuống 10%',
      'Chặn người dùng tải ảnh về máy'
    ],
    correctIndex: 0,
    explanation: 'loading="lazy" (Lazy loading) giúp tối ưu hóa hiệu năng, trang web chỉ tải hình ảnh khi người dùng thực sự cuộn tới vùng hiển thị đó.'
  }
];
