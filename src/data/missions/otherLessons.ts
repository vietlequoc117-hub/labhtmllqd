import { LessonMission } from '../../types';

export const LESSON_16_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Căn giữa khối hộp với margin: 0 auto',
    level: 'Cơ bản',
    description: 'Tạo một khối hộp có chiều rộng cố định (ví dụ: width: 380px) và căn giữa trang web bằng margin: 20px auto.',
    requirements: ['Có thuộc tính width hoặc max-width cụ thể', 'Sử dụng margin: ... auto để căn giữa', 'Có màu nền và viền hộp'],
    targetResult: {
      title: 'Khối hộp căn giữa trang',
      description: 'Hộp nằm chính xác giữa khung màn hình bất kể kích thước cửa sổ.',
      html: `<!DOCTYPE html><html><head><title>Margin Auto</title><link rel="stylesheet" href="style.css"></head><body><div class="hop-giua">NỘI DUNG CĂN GIỮA</div></body></html>`,
      css: `.hop-giua { width: 360px; margin: 30px auto; padding: 20px; background: white; border: 2px solid #3b82f6; text-align: center; border-radius: 8px; }`
    },
    hint: 'margin: 0 auto chỉ có tác dụng khi khối đã được đặt chiều rộng width cố định.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const hasWidth = lower.includes('width:');
      const hasAuto = lower.includes('auto');
      const passed = hasWidth && hasAuto;
      return { passed, message: passed ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Đã căn giữa khối hộp bằng margin: auto!' : 'Cần có width và margin: auto.' };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Vùng đệm 4 hướng (Padding)',
    level: 'Thông hiểu',
    description: 'Thiết lập vùng đệm bên trong với các giá trị khác nhau cho 4 phía trên, dưới, trái, phải.',
    requirements: ['Sử dụng padding đa hướng (ví dụ: padding: 15px 25px;)', 'Nội dung bên trong không dính sát vào đường viền'],
    targetResult: {
      title: 'Khối đệm Padding 4 phía',
      description: 'Khoảng cách giữa chữ và viền thông thoáng, chuẩn tỉ lệ.',
      html: `<!DOCTYPE html><html><head><title>Padding</title><link rel="stylesheet" href="style.css"></head><body><div class="hop-padding">Vùng đệm Padding chuẩn</div></body></html>`,
      css: `.hop-padding { padding: 20px 30px; background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 6px; }`
    },
    hint: 'padding: 20px 30px; nghĩa là trên-dưới 20px, trái-phải 30px.',
    checkCriteria: (_doc, _html, css = '') => {
      const hasPadding = css.toLowerCase().includes('padding:');
      return { passed: hasPadding, message: hasPadding ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Padding thiết lập chuẩn!' : 'Cần có thuộc tính padding.' };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Chống tràn khung với box-sizing: border-box',
    level: 'Vận dụng',
    description: 'Khai báo box-sizing: border-box để chiều rộng bao gồm cả padding và border.',
    requirements: ['Có thuộc tính box-sizing: border-box', 'Có width và padding'],
    targetResult: {
      title: 'Khung chuẩn box-sizing',
      description: 'Khối hộp không bị phình to kích thước khi tăng padding.',
      html: `<!DOCTYPE html><html><head><title>Border-box</title><link rel="stylesheet" href="style.css"></head><body><div class="hop-box">Hộp border-box</div></body></html>`,
      css: `.hop-box { box-sizing: border-box; width: 300px; padding: 25px; border: 4px solid #16a34a; background: #f0fdf4; }`
    },
    hint: 'box-sizing: border-box giữ nguyên chiều rộng tổng thể.',
    checkCriteria: (_doc, _html, css = '') => {
      const hasBoxSizing = css.toLowerCase().includes('box-sizing:') && css.toLowerCase().includes('border-box');
      return { passed: hasBoxSizing, message: hasBoxSizing ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã dùng box-sizing: border-box!' : 'Cần có box-sizing: border-box.' };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Thẻ card giới thiệu sản phẩm Box Model',
    level: 'Vận dụng cao',
    description: 'Thiết kế card sản phẩm kết hợp margin, padding, border và max-width hoàn hảo.',
    requirements: ['Kết hợp đủ 4 lớp của Box Model', 'Đường viền bo góc đẹp mắt'],
    targetResult: {
      title: 'Card giới thiệu Box Model',
      description: 'Thẻ card cân đối, tinh tế.',
      html: `<!DOCTYPE html><html><head><title>Card</title><link rel="stylesheet" href="style.css"></head><body><div class="card"><h3>Khóa học Tin 12</h3><p>Học lập trình web thực hành.</p></div></body></html>`,
      css: `.card { box-sizing: border-box; max-width: 320px; margin: 20px auto; padding: 20px; border: 1px solid #cbd5e1; border-radius: 10px; background: white; text-align: center; }`
    },
    hint: 'Sử dụng max-width kết hợp margin: auto.',
    checkCriteria: (_doc, _html, css = '') => {
      const lower = css.toLowerCase();
      const passed = lower.includes('margin:') && lower.includes('padding:') && (lower.includes('border:') || lower.includes('border-radius:'));
      return { passed, message: passed ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Card Box Model hoàn chỉnh!' : 'Cần có margin, padding và border.' };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Bố cục 3 khối song song',
    level: 'Thử thách',
    description: 'Tạo 3 cột khối đặt cạnh nhau bằng kỹ thuật phần trăm và lề ngoài cân đối.',
    requirements: ['Có ít nhất 3 khối con', 'Mỗi khối có padding và border'],
    targetResult: {
      title: 'Lưới 3 khối song song',
      description: '3 cột hiển thị đồng đều trên trang.',
      html: `<!DOCTYPE html><html><head><title>3 Cột</title><link rel="stylesheet" href="style.css"></head><body><div class="cot">Cột 1</div><div class="cot">Cột 2</div><div class="cot">Cột 3</div></body></html>`,
      css: `.cot { display: inline-block; width: 28%; margin: 1%; padding: 15px; background: #f8fafc; border: 1px solid #cbd5e1; box-sizing: border-box; text-align: center; }`
    },
    hint: 'Dùng display: inline-block hoặc flex với width theo phần %.',
    checkCriteria: (doc) => {
      const count = doc.querySelectorAll('.cot, div').length;
      return { passed: count >= 3, message: count >= 3 ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Bố cục 3 khối song song.' : 'Cần có ít nhất 3 khối.' };
    }
  }
];

export const LESSON_17_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Hiệu ứng rê chuột (:hover)',
    level: 'Cơ bản',
    description: 'Tạo hiệu ứng đổi màu nền và biến đổi khi rê chuột vào nút bấm.',
    requirements: ['Có lớp giả :hover trong CSS', 'Nút bấm đổi màu khi tương tác'],
    targetResult: {
      title: 'Nút bấm có hiệu ứng hover',
      description: 'Khi rê chuột qua nút, màu nền chuyển sắc mượt mà.',
      html: `<!DOCTYPE html><html><head><title>Hover</title><link rel="stylesheet" href="style.css"></head><body><button class="nut">Rê chuột vào tôi</button></body></html>`,
      css: `.nut { background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; transition: 0.3s; }\n.nut:hover { background: #1d4ed8; }`
    },
    hint: 'Cú pháp: .nut:hover { background: #1d4ed8; }.',
    checkCriteria: (_doc, _html, css = '') => {
      const hasHover = css.toLowerCase().includes(':hover');
      return { passed: hasHover, message: hasHover ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Hiệu ứng :hover hoạt động tốt!' : 'Cần có bộ chọn :hover trong CSS.' };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Trạng thái tiêu điểm (:focus)',
    level: 'Thông hiểu',
    description: 'Tạo hiệu ứng đường viền phát sáng khi người dùng nhấp vào ô nhập input.',
    requirements: ['Có lớp giả :focus trong CSS', 'Ô input đổi màu viền khi chọn'],
    targetResult: {
      title: 'Ô nhập liệu phát sáng khi focus',
      description: 'Viền xanh phát sáng rõ nét khi trỏ chuột vào ô text.',
      html: `<!DOCTYPE html><html><head><title>Focus</title><link rel="stylesheet" href="style.css"></head><body><input type="text" class="o-nhap" placeholder="Nhấp chuột vào đây..."></body></html>`,
      css: `.o-nhap { padding: 8px 12px; border: 2px solid #cbd5e1; border-radius: 6px; outline: none; }\n.o-nhap:focus { border-color: #2563eb; }`
    },
    hint: 'Cú pháp: input:focus { border-color: blue; }.',
    checkCriteria: (_doc, _html, css = '') => {
      const hasFocus = css.toLowerCase().includes(':focus');
      return { passed: hasFocus, message: hasFocus ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Hiệu ứng :focus thành công!' : 'Cần có bộ chọn :focus trong CSS.' };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Tô màu hàng xen kẽ (:nth-child)',
    level: 'Vận dụng',
    description: 'Tô sọc ngựa vằn cho bảng dữ liệu bằng tr:nth-child(even).',
    requirements: ['Bảng có nhiều hàng', 'Sử dụng :nth-child(even) hoặc :nth-child(odd)'],
    targetResult: {
      title: 'Bảng sọc ngựa vằn nth-child',
      description: 'Các hàng chẵn tự động nhận màu nền xám nhạt.',
      html: `<!DOCTYPE html><html><head><title>nth-child</title><link rel="stylesheet" href="style.css"></head><body><table border="1"><tr><td>Hàng 1</td></tr><tr><td>Hàng 2</td></tr><tr><td>Hàng 3</td></tr></table></body></html>`,
      css: `tr:nth-child(even) { background-color: #f1f5f9; }`
    },
    hint: 'tr:nth-child(even) chọn các hàng thứ 2, 4, 6...',
    checkCriteria: (_doc, _html, css = '') => {
      const hasNth = css.toLowerCase().includes(':nth-child');
      return { passed: hasNth, message: hasNth ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Sọc bảng nth-child chuẩn xác!' : 'Cần có :nth-child trong CSS.' };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Bộ chọn thuộc tính [type="submit"]',
    level: 'Vận dụng cao',
    description: 'Định kiểu riêng cho nút gửi dựa vào thuộc tính [type="submit"].',
    requirements: ['Sử dụng cú pháp ngoặc vuông [type="..."] trong CSS'],
    targetResult: {
      title: 'Nút submit định kiểu theo thuộc tính',
      description: 'Nút gửi mang phong cách xanh lá riêng biệt.',
      html: `<!DOCTYPE html><html><head><title>Attribute Selector</title><link rel="stylesheet" href="style.css"></head><body><input type="text"><input type="submit" value="Gửi"></body></html>`,
      css: `input[type="submit"] { background: #16a34a; color: white; padding: 8px 16px; border: none; cursor: pointer; }`
    },
    hint: 'input[type="submit"] chỉ nhắm mục tiêu vào các nút gửi.',
    checkCriteria: (_doc, _html, css = '') => {
      const hasAttr = /\[\s*type\s*=\s*["']?submit["']?\s*\]/i.test(css);
      return { passed: hasAttr, message: hasAttr ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Bộ chọn thuộc tính hoạt động tốt!' : 'Cần có input[type="submit"] trong CSS.' };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Bộ chọn con trực tiếp (>) & :hover kết hợp',
    level: 'Thử thách',
    description: 'Xây dựng thanh menu cấp 1 với bộ chọn nav > a và hiệu ứng :hover đổi màu.',
    requirements: ['Có cú pháp bộ chọn con trực tiếp >', 'Có hiệu ứng :hover'],
    targetResult: {
      title: 'Thanh điều hướng bộ chọn con trực tiếp',
      description: 'Menu chuyển động linh hoạt khi lướt chuột qua.',
      html: `<!DOCTYPE html><html><head><title>Menu Con</title><link rel="stylesheet" href="style.css"></head><body><nav><a href="#">Trang 1</a><a href="#">Trang 2</a></nav></body></html>`,
      css: `nav > a { color: #2563eb; padding: 8px 12px; text-decoration: none; font-weight: bold; }\nnav > a:hover { color: #dc2626; }`
    },
    hint: 'nav > a chỉ chọn các thẻ a là con trực tiếp của nav.',
    checkCriteria: (_doc, _html, css = '') => {
      const hasChild = css.includes('>') && css.includes(':hover');
      return { passed: hasChild, message: hasChild ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Kết hợp bộ chọn con > và :hover.' : 'Cần có cả ký tự > và :hover trong CSS.' };
    }
  }
];

export const LESSON_18_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Khung cấu trúc website hoàn chỉnh (Semantic HTML)',
    level: 'Cơ bản',
    description: 'Xây dựng cấu trúc trang web với các thẻ ngữ nghĩa: <header>, <nav>, <main>, <section> và <footer>.',
    requirements: ['Có đủ header, nav, section và footer', 'Tiêu đề website trang trọng'],
    targetResult: {
      title: 'Khung cấu trúc web chuẩn Semantic',
      description: 'Bố cục 4 tầng rõ ràng từ đầu trang đến chân trang.',
      html: `<!DOCTYPE html><html><head><title>Web 12</title></head><body><header><h1>WEBSITE TRƯỜNG</h1></header><nav><a href="#">Trang chủ</a></nav><section><p>Nội dung chính.</p></section><footer><p>© 2026</p></footer></body></html>`,
      css: `header { background: #1e40af; color: white; padding: 15px; text-align: center; }\nfooter { background: #0f172a; color: #94a3b8; padding: 10px; text-align: center; }`
    },
    hint: 'Sử dụng các thẻ semantic theo chuẩn HTML5.',
    checkCriteria: (doc) => {
      const hasH = !!doc.querySelector('header');
      const hasN = !!doc.querySelector('nav');
      const hasS = !!doc.querySelector('section, main');
      const hasF = !!doc.querySelector('footer');
      const passed = hasH && hasN && hasS && hasF;
      return { passed, message: passed ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Cấu trúc Semantic HTML chuẩn!' : 'Cần có header, nav, section và footer.' };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Thanh điều hướng đa liên kết (Navbar)',
    level: 'Thông hiểu',
    description: 'Thiết kế thanh menu ngang trong <nav> chứa ít nhất 3 liên kết có màu sắc và hiệu ứng hover.',
    requirements: ['Trong <nav> có ít nhất 3 liên kết <a>', 'Định dạng CSS menu ngang'],
    targetResult: {
      title: 'Menu thanh điều hướng đa liên kết',
      description: 'Menu điều hướng ngang đẹp mắt, kết nối các mục.',
      html: `<!DOCTYPE html><html><head><title>Menu</title><link rel="stylesheet" href="style.css"></head><body><nav><a href="#">Trang chủ</a><a href="#">Giới thiệu</a><a href="#">Liên hệ</a></nav></body></html>`,
      css: `nav { background: #0f172a; padding: 12px; text-align: center; }\nnav a { color: #38bdf8; text-decoration: none; margin: 0 12px; font-weight: bold; }`
    },
    hint: 'Đặt các thẻ a vào bên trong nav.',
    checkCriteria: (doc) => {
      const count = doc.querySelectorAll('nav a').length;
      return { passed: count >= 3, message: count >= 3 ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Menu điều hướng hoàn chỉnh!' : 'Cần ít nhất 3 liên kết trong nav.' };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Tích hợp Bảng dữ liệu và Hình ảnh',
    level: 'Vận dụng',
    description: 'Chèn bảng lịch thi đấu thể thao hoặc học tập kèm hình ảnh minh họa bên cạnh.',
    requirements: ['Có thẻ <img> có thuộc tính alt', 'Có thẻ <table> đầy đủ tiêu đề cột'],
    targetResult: {
      title: 'Bảng dữ liệu kết hợp hình ảnh',
      description: 'Hình ảnh sống động kèm bảng thông số rõ ràng.',
      html: `<!DOCTYPE html><html><head><title>Bảng và Ảnh</title></head><body><img src="images/thethao.png" alt="Thể thao" width="260"><table border="1"><tr><th>Môn</th><th>Giờ</th></tr><tr><td>Bóng đá</td><td>16h30</td></tr></table></body></html>`,
      css: `table { border-collapse: collapse; margin-top: 10px; }`
    },
    hint: 'Kết hợp thẻ img và thẻ table.',
    checkCriteria: (doc) => {
      const hasImg = !!doc.querySelector('img');
      const hasTable = !!doc.querySelector('table');
      return { passed: hasImg && hasTable, message: hasImg && hasTable ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã tích hợp cả ảnh và bảng!' : 'Cần có cả <img> và <table>.' };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Tích hợp Form liên hệ tương tác',
    level: 'Vận dụng cao',
    description: 'Thêm biểu mẫu đăng ký thành viên hoặc góp ý tương tác người dùng vào trang.',
    requirements: ['Có thẻ <form>', 'Có input text và nút submit'],
    targetResult: {
      title: 'Form đăng ký thành viên',
      description: 'Biểu mẫu gọn gàng sẵn sàng nhập liệu.',
      html: `<!DOCTYPE html><html><head><title>Form</title></head><body><form>Họ tên: <input type="text"><button type="submit">Đăng ký</button></form></body></html>`,
      css: `form { padding: 15px; background: #f8fafc; border: 1px solid #cbd5e1; }`
    },
    hint: 'Tích hợp thẻ form có text và submit.',
    checkCriteria: (doc) => {
      const hasForm = !!doc.querySelector('form') && !!doc.querySelector('input');
      return { passed: hasForm, message: hasForm ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Form tương tác đã được tích hợp!' : 'Cần có thẻ <form> chứa ô nhập liệu.' };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Đồ án Website tổng hợp Tin học 12 hoàn chỉnh',
    level: 'Thử thách',
    description: 'Thử thách đỉnh cao: Xây dựng đồ án website tổng thể kết hợp cấu trúc Semantic, thanh Menu, Bảng, Ảnh, Form và tệp CSS định kiểu toàn diện.',
    requirements: ['Có cấu trúc Semantic (header, nav, section, footer)', 'Có ảnh và bảng', 'Có biểu mẫu form', 'Có định kiểu CSS hoàn chỉnh'],
    targetResult: {
      title: 'Đồ án Website Tin học 12 hoàn chỉnh',
      description: 'Website chuẩn đồ án tốt nghiệp với đầy đủ mọi thành phần.',
      html: `<!DOCTYPE html><html><head><title>Đồ án 12</title><link rel="stylesheet" href="style.css"></head><body><header><h1>CLB TIN HỌC 12</h1></header><nav><a href="#">Trang chủ</a><a href="#">Hoạt động</a><a href="#">Đăng ký</a></nav><main><section><h3>Lịch sinh hoạt</h3><table border="1"><tr><th>Thứ</th><th>Nội dung</th></tr><tr><td>Thứ 7</td><td>Lập trình Web</td></tr></table></section><section><h3>Đăng ký tham gia</h3><form><input type="text" placeholder="Họ tên"><button type="submit">Gửi</button></form></section></main><footer>© 2026 CLB Tin học</footer></body></html>`,
      css: `body { font-family: Arial, sans-serif; margin: 0; background: #f8fafc; }\nheader { background: #1e40af; color: white; padding: 20px; text-align: center; }\nnav { background: #0f172a; padding: 10px; text-align: center; }\nnav a { color: #38bdf8; margin: 0 10px; text-decoration: none; font-weight: bold; }\nmain { max-width: 600px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; }\nfooter { background: #0f172a; color: #94a3b8; text-align: center; padding: 12px; }`
    },
    hint: 'Kết hợp toàn bộ kiến thức từ Bài 7 đến Bài 17 để tạo nên sản phẩm hoàn chỉnh.',
    checkCriteria: (doc, _html, css = '') => {
      const hasStructure = !!doc.querySelector('header') && !!doc.querySelector('nav') && !!doc.querySelector('footer');
      const hasTable = !!doc.querySelector('table');
      const hasForm = !!doc.querySelector('form');
      const hasCss = css.length > 50;
      const passed = hasStructure && hasTable && hasForm && hasCss;
      return { passed, message: passed ? 'Chúc mừng bạn! Đã xuất sắc hoàn thành Đồ án Website Tin học 12 tổng thể!' : 'Cần có header, nav, footer, bảng, form và mã CSS hoàn chỉnh.' };
    }
  }
];
