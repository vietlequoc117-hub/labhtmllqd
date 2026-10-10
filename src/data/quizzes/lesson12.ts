import { QuizQuestion } from '../../types';

// BÀI 12: TẠO BIỂU MẪU (FORM)
// 4 câu Biết (1-4), 3 câu Hiểu (5-7), 3 câu Vận dụng (8-10)
export const LESSON_12_QUIZ: QuizQuestion[] = [
  // --- MỨC BIẾT (4 CÂU) ---
  {
    id: 1,
    level: 'Biết',
    question: 'Cặp thẻ HTML nào sau đây được dùng để định nghĩa một biểu mẫu thu thập dữ liệu người dùng gửi về máy chủ?',
    options: [
      '<form>...</form>',
      '<input>...</input>',
      '<tableform>...</tableform>',
      '<action>...</action>'
    ],
    correctIndex: 0,
    explanation: '<form> là phần tử gốc chứa toàn bộ các điều khiển nhập liệu (inputs, buttons, select, textarea...).'
  },
  {
    id: 2,
    level: 'Biết',
    question: 'Để tạo ô nhập dữ liệu văn bản ngắn một dòng (như họ tên, tên đăng nhập), ta sử dụng giá trị nào cho thuộc tính type của thẻ <input>?',
    options: [
      'type="text"',
      'type="textarea"',
      'type="string"',
      'type="line"'
    ],
    correctIndex: 0,
    explanation: '<input type="text"> tạo ô nhập một dòng văn bản thông thường.'
  },
  {
    id: 3,
    level: 'Biết',
    question: 'Loại điều khiển form nào cho phép người dùng chỉ được chọn MỘT trong nhiều lựa chọn loại trừ lẫn nhau (ví dụ: giới tính Nam hoặc Nữ)?',
    options: [
      '<input type="radio"> (Radio button)',
      '<input type="checkbox"> (Hộp kiểm)',
      '<input type="file">',
      '<input type="range">'
    ],
    correctIndex: 0,
    explanation: 'Radio button (type="radio") có cùng tên nhóm name="..." chỉ cho phép người dùng chọn duy nhất 1 phương án.'
  },
  {
    id: 4,
    level: 'Biết',
    question: 'Để tạo một ô nhập văn bản nhiều dòng (như phần nhập góp ý, thư phản hồi), ta sử dụng thẻ nào?',
    options: [
      '<textarea>...</textarea>',
      '<input type="multiline">',
      '<textbox>',
      '<comment>'
    ],
    correctIndex: 0,
    explanation: '<textarea> là phần tử cho phép người dùng nhập văn bản nhiều dòng có thể cuộn và co giãn kích thước.'
  },

  // --- MỨC HIỂU (3 CÂU) ---
  {
    id: 5,
    level: 'Hiểu',
    question: 'Quan sát đoạn mã sau. Thuộc tính for trong thẻ <label> có mối liên hệ mật thiết như thế nào với thuộc tính id của thẻ <input>?',
    snippet: {
      css: `<style>\n  label { font-weight: bold; }\n</style>`,
      html: `<label for="emailInput">Địa chỉ Email:</label>\n<input type="email" id="emailInput" name="email">`
    },
    options: [
      'Khi người dùng nhấp chuột vào nhãn văn bản, con trỏ soạn thảo sẽ tự động tập trung (focus) vào ô input tương ứng',
      'Để đổi màu chữ của ô input sang màu đỏ',
      'Bắt buộc dữ liệu gửi đi phải trùng với chữ in trên nhãn',
      'Chỉ để trang trí cho đẹp, không có tác dụng tương tác'
    ],
    correctIndex: 0,
    explanation: 'for="emailInput" gắn kết với id="emailInput" giúp tăng trải nghiệm người dùng: bấm vào nhãn chữ sẽ tự focus vào ô nhập.'
  },
  {
    id: 6,
    level: 'Hiểu',
    question: 'Cho đoạn mã sau. Thuộc tính placeholder có ý nghĩa gì đối với trải nghiệm người dùng?',
    snippet: {
      html: `<input type="tel" name="phone" placeholder="Nhập số điện thoại (vd: 0912345678)">`
    },
    options: [
      'Hiển thị gợi ý văn bản màu mờ bên trong ô nhập liệu và tự biến mất khi người dùng bắt đầu gõ',
      'Đặt giá trị mặc định sẽ gửi về máy chủ kể cả khi không gõ gì',
      'Khóa ô nhập liệu không cho chỉnh sửa',
      'Bắt buộc phải nhập đủ 10 số'
    ],
    correctIndex: 0,
    explanation: 'placeholder cung cấp văn bản gợi ý mờ hỗ trợ người dùng nhận biết định dạng dữ liệu cần điền.'
  },
  {
    id: 7,
    level: 'Hiểu',
    question: 'Sự khác biệt giữa thuộc tính method="GET" và method="POST" trong thẻ <form> là gì?',
    options: [
      'GET gửi dữ liệu đính kèm trên thanh địa chỉ URL, còn POST gửi ngầm trong thân thông điệp HTTP bảo mật hơn',
      'GET chỉ gửi được ảnh, POST chỉ gửi được chữ',
      'GET không giới hạn dung lượng, POST bị giới hạn 255 ký tự',
      'Không có sự khác nhau về cơ chế truyền tải'
    ],
    correctIndex: 0,
    explanation: 'GET ghép nối dữ liệu vào chuỗi truy vấn URL (?key=val), còn POST đóng gói dữ liệu trong request body, phù hợp cho dữ liệu nhạy cảm như mật khẩu.'
  },

  // --- MỨC VẬN DỤNG (3 CÂU) ---
  {
    id: 8,
    level: 'Vận dụng',
    question: 'Một học sinh thiết kế hộp nhập Họ và tên với CSS Box Model như sau. Khi người dùng nhấp chuột vào ô nhập (sự kiện focus), làm thế nào để ô nhập có viền màu xanh dương và hiệu ứng sáng?',
    snippet: {
      css: `<style>\n  .box {\n    padding: 7px;\n    border: 5px dotted lightgreen;\n    width: 400px;\n    box-sizing: border-box;\n  }\n  input:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);\n  }\n</style>`,
      html: `<div class="box">\n  <label for="HoTen"> Họ và tên: </label>\n  <input type="text" id="HoTen" name="HoTen">\n</div>`
    },
    options: [
      'Sử dụng bộ chọn giả lớp input:focus trong CSS để tùy biến border-color và box-shadow',
      'Dùng input:hover',
      'Dùng input:visited',
      'Thêm thuộc tính active="true" vào HTML'
    ],
    correctIndex: 0,
    explanation: ':focus kích hoạt ngay khi phần tử nhận trạng thái nhập liệu (nhấp chuột hoặc phím Tab).'
  },
  {
    id: 9,
    level: 'Vận dụng',
    question: 'Để bắt buộc người dùng không được để trống ô Mật khẩu và mật khẩu phải dài tối thiểu 8 ký tự ngay từ phía trình duyệt, cần thêm các thuộc tính HTML5 nào vào thẻ <input>?',
    snippet: {
      html: `<!-- Khai báo trường mật khẩu bắt buộc tối thiểu 8 ký tự -->`
    },
    options: [
      '<input type="password" name="pwd" required minlength="8">',
      '<input type="text" length="8" notnull>',
      '<input type="secret" min="8">',
      '<input type="password" validate="8">'
    ],
    correctIndex: 0,
    explanation: 'Thuộc tính required ngăn chặn gửi form khi ô trống, minlength="8" yêu cầu số ký tự tối thiểu của mật khẩu.'
  },
  {
    id: 10,
    level: 'Vận dụng',
    question: 'Quan sát đoạn mã tạo menu thả xuống chọn lớp học sau. Muốn mục "Lớp 12A1" được chọn sẵn mặc định ngay khi tải trang, ta cần thêm từ khóa nào vào thẻ <option>?',
    snippet: {
      html: `<select name="lop">\n  <option value="12a1" ??? >Lớp 12A1</option>\n  <option value="12a2">Lớp 12A2</option>\n  <option value="12a3">Lớp 12A3</option>\n</select>`
    },
    options: [
      'selected',
      'checked',
      'active',
      'default="true"'
    ],
    correctIndex: 0,
    explanation: 'selected dùng cho thẻ <option> trong <select> để chỉ định phần tử được chọn trước; còn checked dùng cho radio/checkbox.'
  }
];
