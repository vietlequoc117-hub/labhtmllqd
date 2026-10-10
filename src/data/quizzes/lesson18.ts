import { QuizQuestion } from '../../types';

// BÀI 18: THỰC HÀNH TỔNG HỢP THIẾT KẾ TRANG WEB
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_18_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Trong cấu trúc trang web ngữ nghĩa (Semantic HTML5), thẻ nào được dùng để chứa phần đầu trang (logo, tiêu đề chính, slogan)?',
    options: [
      '<header>',
      '<top>',
      '<head>',
      '<banner>'
    ],
    correctIndex: 0,
    explanation: '<header> là thẻ ngữ nghĩa đại diện cho phần đầu trang hoặc đầu của một phần nội dung (khác với <head> chứa siêu thông tin).'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Thẻ ngữ nghĩa nào trong HTML5 được thiết kế chuyên biệt để bọc thanh menu điều hướng các liên kết chính của website?',
    options: [
      '<nav> (Navigation)',
      '<menu-bar>',
      '<navigate>',
      '<links>'
    ],
    correctIndex: 0,
    explanation: '<nav> (Navigation) chứa các liên kết điều hướng quan trọng của website.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Thẻ ngữ nghĩa <footer> thường được đặt ở vị trí nào và chứa các thông tin gì?',
    options: [
      'Ở cuối trang web, chứa thông tin bản quyền (copyright), tác giả, địa chỉ liên hệ và liên kết mạng xã hội',
      'Ở đầu trang web chứa thanh tìm kiếm',
      'Ở thanh bên cạnh chứa quảng cáo',
      'Chỉ dùng để chèn video'
    ],
    correctIndex: 0,
    explanation: '<footer> đại diện cho chân trang web (Footer), thường chứa thông tin pháp lý, bản quyền và liên hệ.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Thẻ ngữ nghĩa nào đại diện cho nội dung chính, quan trọng và độc nhất của một trang web (chỉ nên xuất hiện 1 lần trên mỗi trang)?',
    options: [
      '<main>',
      '<section>',
      '<article>',
      '<content>'
    ],
    correctIndex: 0,
    explanation: '<main> chứa nội dung cốt lõi độc nhất của trang, không lặp lại giữa các trang như header hay footer.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Lợi ích lớn nhất của việc sử dụng các thẻ ngữ nghĩa (Semantic HTML5 như header, nav, section, article, footer) thay vì chỉ dùng thẻ <div> là gì?',
    options: [
      'Giúp cấu trúc trang rõ ràng, dễ bảo trì, hỗ trợ tối ưu hóa công cụ tìm kiếm (SEO) và giúp các công cụ đọc màn hình cho người khiếm thị hiểu được cấu trúc tài liệu',
      'Làm cho trang web tự động đổi sang màu tím',
      'Tự động tăng tốc độ đường truyền Internet',
      'Các thẻ này bắt buộc phải có mới chạy được JavaScript'
    ],
    correctIndex: 0,
    explanation: 'Semantic HTML mang lại ý nghĩa ngữ cảnh cho máy móc (công cụ tìm kiếm Google, phần mềm trợ thính) và lập trình viên.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Quan sát bố cục trang web sau. Khi kết hợp các thẻ ngữ nghĩa, trật tự lồng ghép nào sau đây thể hiện cấu trúc chuẩn của một website tin tức?',
    snippet: {
      html: `<body>\n  <header>...</header>\n  <nav>...</nav>\n  <main>\n    <section class="tin-nong">...</section>\n  </main>\n  <footer>...</footer>\n</body>`
    },
    options: [
      'header và nav ở trên → main chứa các section/article ở giữa → footer ở dưới cùng',
      'footer ở trên cùng → header ở dưới',
      'nav bọc toàn bộ body',
      'Tất cả đặt lồng bên trong footer'
    ],
    correctIndex: 0,
    explanation: 'Đây là luồng kiến trúc giao diện website chuẩn quốc tế.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Thẻ <section> khác với thẻ <article> như thế nào về mặt ý nghĩa cấu trúc?',
    options: [
      '<article> đại diện cho một bài viết độc lập, tự trọn vẹn ý nghĩa (có thể chia sẻ riêng lẻ); còn <section> là một phân đoạn chủ đề chung của tài liệu',
      '<article> chỉ chứa hình ảnh, <section> chỉ chứa văn bản',
      'Hai thẻ này hoàn toàn giống hệt nhau',
      '<section> không được dùng CSS'
    ],
    correctIndex: 0,
    explanation: '<article> dùng cho tin tức, blog có thể tái xuất bản độc lập; <section> chia các phần theo chương mục.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Học sinh thiết kế bố cục chia 2 cột gồm nội dung chính (70%) và thanh bên Sidebar (30%) co giãn linh hoạt. Khối CSS hiện đại nào dưới đây xây dựng bố cục này tối ưu nhất?',
    snippet: {
      css: `<style>\n  .layout-wrapper {\n    display: flex;\n    gap: 20px;\n  }\n  .main-content { flex: 7; }\n  .sidebar { flex: 3; }\n</style>`,
      html: `<div class="layout-wrapper">\n  <main class="main-content">Nội dung chính</main>\n  <aside class="sidebar">Thanh bên</aside>\n</div>`
    },
    options: [
      'display: flex kết hợp tỉ lệ flex: 7 và flex: 3 cùng khoảng cách gap: 20px',
      'Dùng float: left và tính phần trăm bằng tay kết hợp clear: both',
      'Dùng position: absolute cố định tọa độ pixel',
      'Dùng table lồng nhau'
    ],
    correctIndex: 0,
    explanation: 'CSS Flexbox với thuộc tính flex: 7 và flex: 3 là kỹ thuật phân chia cột hiện đại, mượt mà và linh hoạt nhất.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Cần thiết kế thanh điều hướng cố định luôn dính ở mép trên cùng màn hình khi người dùng cuộn trang xuống dưới. Thuộc tính CSS nào thực hiện chuẩn xác?',
    snippet: {
      css: `<style>\n  header.sticky-header {\n    position: sticky;\n    top: 0;\n    z-index: 50;\n    background: #0f172a;\n  }\n</style>`
    },
    options: [
      'position: sticky; top: 0; z-index: 50;',
      'position: static; margin-top: 0;',
      'display: inline-block; top: 0;',
      'float: top;'
    ],
    correctIndex: 0,
    explanation: 'position: sticky kết hợp top: 0 giữ thanh điều hướng neo chắc chắn ở mép trên cửa sổ khi cuộn tài liệu.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Cho đoạn mã sau. Thuộc tính meta viewport đóng vai trò quyết định nào đối với việc hiển thị website trên màn hình điện thoại di động (Responsive Web Design)?',
    snippet: {
      html: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    },
    options: [
      'Khớp chiều rộng trang web vừa vặn với độ rộng thực tế của màn hình thiết bị và thiết lập tỉ lệ phóng to thu nhỏ ban đầu là 100%, ngăn việc chữ bị thu nhỏ li ti',
      'Chặn không cho mở web trên điện thoại',
      'Tự động quay ngang màn hình',
      'Tự động phóng to ảnh lên 200%'
    ],
    correctIndex: 0,
    explanation: 'Thẻ meta viewport là điều kiện tiên quyết bắt buộc để trang web hiển thị chuẩn xác và thân thiện trên thiết bị di động.'
  }
];
