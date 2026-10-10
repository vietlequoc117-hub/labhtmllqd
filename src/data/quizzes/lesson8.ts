import { QuizQuestion } from '../../types';

// BÀI 8: ĐỊNH DẠNG VĂN BẢN
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_8_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Để viết số mũ trong công thức toán học như x² hoặc a³, ta sử dụng cặp thẻ HTML nào?',
    options: [
      'Thẻ <sup>...</sup> (superscript)',
      'Thẻ <sub>...</sub> (subscript)',
      'Thẻ <small>...</small>',
      'Thẻ <power>...</power>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <sup> (superscript) dùng để hiển thị chỉ số trên (số mũ toán học), còn <sub> (subscript) dùng cho chỉ số dưới (công thức hóa học).'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Để viết công thức hóa học của nước là H₂O, chữ số 2 cần được đặt trong cặp thẻ nào?',
    snippet: {
      html: `<p>Công thức phân tử nước: H<sub>2</sub>O</p>`
    },
    options: [
      'Thẻ <sub>...</sub>',
      'Thẻ <sup>...</sup>',
      'Thẻ <down>...</down>',
      'Thẻ <b>...</b>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <sub> (subscript) hiển thị ký tự thụt xuống thấp hơn dòng chữ bình thường (chỉ số dưới).'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Cặp thẻ nào sau đây dùng để định dạng văn bản in đậm mang ý nghĩa nhấn mạnh tầm quan trọng?',
    options: [
      '<strong>...</strong> hoặc <b>...</b>',
      '<em>...</em> hoặc <i>...</i>',
      '<u>...</u>',
      '<mark>...</mark>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <b> (bold) hoặc <strong> (strong importance) làm cho văn bản in đậm.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Thẻ nào trong HTML5 dùng để làm nổi bật (highlight) một đoạn văn bản bằng nền màu vàng giống như dùng bút dạ quang?',
    snippet: {
      html: `<p>Hạn nộp bài là <mark>ngày 20 tháng 10</mark>.</p>`
    },
    options: [
      '<mark>...</mark>',
      '<yellow>...</yellow>',
      '<highlight>...</highlight>',
      '<u>...</u>'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <mark> dùng để đánh dấu, làm nổi bật cụm từ được chú ý với nền màu vàng mặc định.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Khi hiển thị trên trình duyệt, dòng chữ "Học sinh khối 12" sẽ có kiểu dáng như thế nào?',
    snippet: {
      css: `<style>\n  .notice {\n    font-style: italic;\n    font-weight: bold;\n  }\n</style>`,
      html: `<p class="notice">Học sinh khối 12</p>`
    },
    options: [
      'Vừa in đậm vừa in nghiêng',
      'Chỉ in đậm',
      'Chỉ in nghiêng',
      'Chữ gạch chân màu đỏ'
    ],
    correctIndex: 0,
    explanation: 'font-weight: bold làm chữ in đậm và font-style: italic làm chữ in nghiêng, do đó chữ vừa in đậm vừa in nghiêng.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Cho đoạn mã sau. Thuộc tính style được áp dụng trực tiếp trong thẻ <p> dưới đây được gọi là phương pháp CSS nào?',
    snippet: {
      html: `<p style="color: blue; font-size: 18px;">\n  Đoạn văn có màu xanh lam\n</p>`
    },
    options: [
      'Inline CSS (CSS nội dòng)',
      'Internal CSS (CSS nội bộ)',
      'External CSS (CSS ngoài)',
      'Imported CSS'
    ],
    correctIndex: 0,
    explanation: 'Khai báo định dạng ngay bên trong thuộc tính style="..." của một thẻ HTML cụ thể được gọi là Inline CSS (CSS nội dòng).'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Đoạn mã sau hiển thị định dạng nào cho phương trình toán học bậc hai?',
    snippet: {
      html: `<p>\n  Phương trình: ax<sup>2</sup> + bx + c = 0 (với a &ne; 0)\n</p>`
    },
    options: [
      'Hiển thị số 2 dạng số mũ (x bình phương) và ký hiệu toán học khác 0',
      'Hiển thị số 2 dưới chân chữ x',
      'Hiển thị chữ ax2 trên cùng một dòng không số mũ',
      'Gây lỗi cú pháp không chạy được'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <sup>2</sup> tạo số mũ lũy thừa bậc 2 (ax²).'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Một học sinh muốn tạo đoạn thông báo có khung viền bo cong và chữ màu xanh lá đậm như đoạn mã sau. Đoạn mã CSS nào định nghĩa đúng kiểu dáng trên?',
    snippet: {
      css: `<style>\n  .alert-box {\n    border: 2px solid #16a34a;\n    border-radius: 8px;\n    color: #15803d;\n    padding: 10px;\n  }\n</style>`,
      html: `<div class="alert-box">\n  <strong>Thông báo:</strong> Đã cập nhật lịch thi thử Tin học 12.\n</div>`
    },
    options: [
      'Sử dụng .alert-box với viền 2px màu xanh lá, bo góc 8px và padding đệm 10px',
      'Sử dụng .alert-box với viền nét đứt màu đỏ',
      'Chỉ thay đổi màu nền không có đường viền',
      'Làm ẩn thông báo trên màn hình'
    ],
    correctIndex: 0,
    explanation: 'Thuộc tính border: 2px solid #16a34a tạo đường viền màu xanh lá, border-radius: 8px bo góc khung viền.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Học sinh viết công thức hóa học cho phản ứng: Axit sunfuric (H2SO4) tác dụng với Nhôm (Al). Đoạn mã HTML nào sau đây thể hiện chính xác chỉ số dưới của H₂SO₄?',
    snippet: {
      html: `<!-- Cần hiển thị chuẩn H₂SO₄ -->`
    },
    options: [
      'H<sub>2</sub>SO<sub>4</sub>',
      'H<sup>2</sup>SO<sup>4</sup>',
      'H<sub2>SO<sub4>',
      'H<down>2</down>SO<down>4</down>'
    ],
    correctIndex: 0,
    explanation: 'Chữ số 2 và 4 cần được đặt trong các thẻ <sub>...</sub> riêng biệt: H<sub>2</sub>SO<sub>4</sub>.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Cho đoạn mã kết hợp định dạng thẻ xóa (<del>) và thẻ thêm mới (<ins>). Kết quả hiển thị trực quan của đoạn mã trên trình duyệt là gì?',
    snippet: {
      css: `<style>\n  .price-tag { font-size: 16px; }\n</style>`,
      html: `<p class="price-tag">\n  Giá gốc: <del>500.000đ</del> - Khuyến mãi: <ins>350.000đ</ins>\n</p>`
    },
    options: [
      '500.000đ có đường gạch ngang xóa đi, 350.000đ có đường gạch chân thêm mới',
      'Cả hai giá tiền đều in đậm',
      '500.000đ bị ẩn đi hoàn toàn khỏi trang',
      '350.000đ biến thành màu đỏ nhấp nháy'
    ],
    correctIndex: 0,
    explanation: 'Thẻ <del> (delete) tạo đường kẻ gạch ngang chữ (strikethrough), thẻ <ins> (inserted) tạo đường gạch dưới chân (underline).'
  }
];
