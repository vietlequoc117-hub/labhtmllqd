import { QuizQuestion } from '../../types';

// BÀI 17: CÁC MỨC ƯU TIÊN CỦA BỘ CHỌN (CSS SPECIFICITY)
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_17_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Ký tự nào đứng trước tên bộ chọn để chỉ định chọn một phần tử theo lớp (Class Selector)?',
    options: [
      'Dấu chấm (.) ví dụ: .menu',
      'Dấu thăng (#) ví dụ: #menu',
      'Dấu sao (*) ví dụ: *menu',
      'Dấu và (&) ví dụ: &menu'
    ],
    correctIndex: 0,
    explanation: 'Dấu chấm (.) đại diện cho bộ chọn Class (ví dụ .title), còn dấu # đại diện cho bộ chọn ID.'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Ký tự nào đứng trước tên bộ chọn để chỉ định chọn một phần tử duy nhất theo định danh (ID Selector)?',
    options: [
      'Dấu thăng (#) ví dụ: #header',
      'Dấu chấm (.) ví dụ: .header',
      'Dấu hai chấm (:) ví dụ: :header',
      'Dấu gạch ngang (-) ví dụ: -header'
    ],
    correctIndex: 0,
    explanation: 'Dấu thăng (#) được sử dụng để chỉ định bộ chọn theo ID (định danh phần tử).'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Từ khóa đặc biệt nào có thể đặt ở cuối giá trị thuộc tính CSS để ép buộc mức ưu tiên cao nhất, vượt qua mọi bộ chọn khác?',
    snippet: {
      css: `p { color: red !important; }`
    },
    options: [
      '!important',
      '!priority',
      '!force',
      '!first'
    ],
    correctIndex: 0,
    explanation: '!important có mức ưu tiên tuyệt đối cao nhất trong CSS, ghi đè lên tất cả các quy tắc thông thường.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Bộ chọn giả lớp (pseudo-class) nào kích hoạt khi người dùng di chuyển con trỏ chuột lướt qua một phần tử?',
    options: [
      ':hover',
      ':active',
      ':focus',
      ':visited'
    ],
    correctIndex: 0,
    explanation: ':hover kích hoạt trạng thái rê chuột qua phần tử.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Thứ tự ưu tiên trọng số (Specificity) từ thấp đến cao giữa 3 bộ chọn: Type (thẻ HTML), Class (lớp), ID là gì?',
    options: [
      'Type Selector (Thẻ HTML) < Class Selector (.lớp) < ID Selector (#định_danh)',
      'ID < Class < Type',
      'Class < ID < Type',
      'Cả 3 bộ chọn có độ ưu tiên ngang hàng nhau'
    ],
    correctIndex: 0,
    explanation: 'Trọng số CSS tính theo bậc: Thẻ HTML (0,0,1) < Class (0,1,0) < ID (1,0,0).'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Nếu hai quy tắc CSS cùng có độ ưu tiên ngang nhau (cùng bộ chọn thẻ p), chữ trong đoạn văn sẽ có màu gì?',
    snippet: {
      css: `<style>\n  p { color: blue; }\n  p { color: orange; }\n</style>`,
      html: `<p>Đoạn văn thử nghiệm</p>`
    },
    options: [
      'Màu cam (orange), vì quy tắc nào viết sau trong tệp CSS sẽ ghi đè lên quy tắc viết trước',
      'Màu xanh (blue)',
      'Trình duyệt báo lỗi cú pháp',
      'Pha trộn giữa xanh và cam'
    ],
    correctIndex: 0,
    explanation: 'Quy tắc thứ tự xuất hiện (Cascade rule): Khi hai bộ chọn có cùng trọng số, quy tắc viết sau cùng sẽ được áp dụng.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Bộ chọn con trực tiếp div > p khác gì so với bộ chọn con cháu div p?',
    options: [
      'div > p chỉ chọn các thẻ <p> là con trực tiếp cấp 1 của <div>; còn div p chọn tất cả các thẻ <p> ở mọi cấp độ con cháu lồng bên trong <div>',
      'div > p chỉ chọn thẻ p có kích thước lớn hơn div',
      'Hai bộ chọn này hoàn toàn tương đương nhau',
      'div > p là cú pháp lỗi'
    ],
    correctIndex: 0,
    explanation: 'Dấu > là Child Combinator (chỉ chọn con trực tiếp), dấu khoảng trắng là Descendant Combinator (chọn mọi con cháu ở mọi tầng lồng nhau).'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Quan sát đoạn mã sau. Dòng chữ "Tin học 12" sẽ hiển thị với màu sắc nào trên màn hình trình duyệt?',
    snippet: {
      css: `<style>\n  #main-title { color: purple; }\n  .highlight { color: red; }\n  h1 { color: blue; }\n</style>`,
      html: `<h1 id="main-title" class="highlight">Tin học 12</h1>`
    },
    options: [
      'Màu tím (purple), vì bộ chọn ID (#main-title) có trọng số ưu tiên cao hơn Class (.highlight) và thẻ (h1)',
      'Màu đỏ (red)',
      'Màu xanh lam (blue)',
      'Màu đen mặc định'
    ],
    correctIndex: 0,
    explanation: 'Bộ chọn ID có trọng số (0,1,0,0) cao vượt trội so với Class (0,0,1,0) và Type (0,0,0,1), do đó màu tím chiến thắng.'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Trong trường hợp sau, mặc dù có ID #banner, màu chữ cuối cùng hiển thị là màu gì và tại sao?',
    snippet: {
      css: `<style>\n  #banner { color: blue; }\n  .title { color: green !important; }\n</style>`,
      html: `<h2 id="banner" class="title">Cổng thông tin tuyển sinh</h2>`
    },
    options: [
      'Màu xanh lá (green), vì từ khóa !important ghi đè lên bộ chọn ID thông thường',
      'Màu xanh dương (blue)',
      'Trình duyệt chọn màu ngẫu nhiên',
      'Hiển thị chữ trong suốt'
    ],
    correctIndex: 0,
    explanation: '!important có mức ưu tiên cao nhất trong CSS, ghi đè lên cả bộ chọn ID thông thường.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Cho đoạn mã sau kết hợp giữa Inline Style và thẻ <style>. Màu chữ hiển thị của đoạn văn bản là màu gì?',
    snippet: {
      css: `<style>\n  p#intro { color: green; }\n</style>`,
      html: `<p id="intro" style="color: red;">Chào mừng năm học mới</p>`
    },
    options: [
      'Màu đỏ (red), vì Inline Style (viết trong thuộc tính style) có trọng số (1,0,0,0) cao hơn bộ chọn trong thẻ <style>',
      'Màu xanh lá (green)',
      'Màu vàng',
      'Màu đen'
    ],
    correctIndex: 0,
    explanation: 'Inline CSS có trọng số 1000, cao hơn bộ chọn p#intro (trọng số 101: 1 ID + 1 thẻ).'
  }
];
