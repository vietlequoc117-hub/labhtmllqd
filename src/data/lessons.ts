import { Lesson, DomTestResult } from '../types';
import { GLOBAL_MOCK_ASSETS } from './mockAssets';

export const LESSONS: Lesson[] = [
  // ==========================================
  // BÀI 7: HTML VÀ CẤU TRÚC TRANG WEB
  // ==========================================
  {
    id: 7,
    lessonNumber: 'Bài 7',
    title: 'HTML và Cấu trúc trang web',
    subtitle: 'Khởi đầu với các thẻ cơ bản và khung sườn tài liệu HTML5',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 7 (Trang 35-41)',
    objective:
      'Nắm vững cú pháp cơ bản của HTML, cấu trúc cây tài liệu với các thẻ <!DOCTYPE html>, <html>, <head>, <title>, <body>. Biết cách sử dụng các thẻ tiêu đề (<h1> đến <h6>), đoạn văn (<p>), thẻ phân chia khối (<div>), ngắt dòng (<br>) và đường kẻ ngang (<hr>).',
    theorySummary: [
      'HTML (HyperText Markup Language) là ngôn ngữ đánh dấu siêu văn bản dùng để định hình cấu trúc trang web.',
      'Cấu trúc trang chuẩn gồm: <!DOCTYPE html> khai báo phiên bản HTML5; cặp thẻ <html> bao toàn bộ; <head> chứa siêu thông tin (tiêu đề, mã hóa tiếng Việt utf-8); <body> chứa nội dung hiển thị.',
      'Các thẻ tiêu đề <h1> đến <h6> thể hiện mức độ quan trọng giảm dần của đề mục.',
      'Thẻ <p> dùng cho đoạn văn bản; thẻ <br> ngắt dòng (thẻ đơn, không có thẻ đóng); thẻ <hr> chèn đường kẻ ngang ngăn cách nội dung.',
    ],
    quickReferences: [
      {
        tag: '<!DOCTYPE html>',
        name: 'Khai báo chuẩn HTML5',
        syntax: '<!DOCTYPE html>',
        example: '<!DOCTYPE html>',
        description: 'Báo cho trình duyệt biết tài liệu tuân theo tiêu chuẩn HTML5 hiện đại.',
      },
      {
        tag: '<h1>...</h1>',
        name: 'Tiêu đề cấp 1',
        syntax: '<h1>Nội dung tiêu đề lớn nhất</h1>',
        example: '<h1>Nhóm Bạn Tốt - Lớp 12A1</h1>',
        description: 'Tiêu đề quan trọng nhất của trang, thường chỉ có 1 thẻ <h1> trên mỗi trang.',
      },
      {
        tag: '<p>...</p>',
        name: 'Đoạn văn bản',
        syntax: '<p>Nội dung đoạn văn bản...</p>',
        example: '<p>Chúng mình là những người bạn thân cùng chung ước mơ đỗ đại học.</p>',
        description: 'Hiển thị một đoạn văn bản riêng biệt, có khoảng cách trên và dưới.',
      },
      {
        tag: '<hr>',
        name: 'Đường kẻ ngang',
        syntax: '<hr>',
        example: '<hr>',
        description: 'Tạo một đường kẻ phân chia các chủ đề hoặc nội dung.',
      },
      {
        tag: '<br>',
        name: 'Ngắt dòng',
        syntax: '<br>',
        example: 'Dòng thứ nhất<br>Dòng thứ hai',
        description: 'Xuống dòng ngay trong cùng một đoạn văn mà không tạo đoạn mới.',
      },
    ],
    checklists: [
      {
        id: 'b7_c1',
        title: 'Cấu trúc tài liệu chuẩn HTML5',
        description: 'Có đầy đủ <!DOCTYPE html>, <html>, <head>, <title> và <body>.',
        hint: 'Hãy bao bọc nội dung trong thẻ <html>, thêm <head><title>Tên trang</title></head> và <body>...</body>.',
      },
      {
        id: 'b7_c2',
        title: 'Tiêu đề chính trang web (<h1>)',
        description: 'Có ít nhất một thẻ tiêu đề <h1> giới thiệu về nhóm bạn hoặc lớp học.',
        hint: 'Thêm thẻ <h1>Giới thiệu Nhóm bạn 12A1</h1> bên trong phần <body>.',
      },
      {
        id: 'b7_c3',
        title: 'Đoạn văn bản (<p>) và ngắt dòng (<br>)',
        description: 'Có ít nhất 2 đoạn văn <p> miêu tả các thành viên và có sử dụng thẻ <br>.',
        hint: 'Viết <p>Thành viên gồm: Minh An<br>Bảo Châu<br>Đức Huy</p>.',
      },
      {
        id: 'b7_c4',
        title: 'Đường kẻ ngang phân cách (<hr>)',
        description: 'Sử dụng ít nhất một thẻ <hr> để phân chia đề mục hoặc kết thúc trang.',
        hint: 'Thêm thẻ <hr> trước đoạn kết bài hoặc phương châm hoạt động của nhóm.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_lop12a1')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Giới thiệu nhóm bạn</title>
</head>
<body>
  <!-- Bắt đầu viết mã HTML của em ở đây -->
  <h1>Nhóm Bạn Học Tập 12A1</h1>
  <p>Chào mừng bạn đến với trang giới thiệu nhóm của chúng mình!</p>
  
</body>
</html>`,
    initialCss: `body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  padding: 20px;
  background-color: #f8fafc;
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Giới thiệu nhóm bạn - 12A1</title>
</head>
<body>
  <h1>Nhóm Bạn Học Tập 12A1</h1>
  <hr>
  <p>Chào mừng bạn đến với trang giới thiệu nhóm học tập của chúng mình!<br>Nhóm được thành lập vào đầu năm học lớp 12 với mục tiêu cùng nhau rèn luyện kiến thức Tin học và Toán học.</p>
  <p>Các thành viên nòng cốt gồm:<br>- Nguyễn Văn An (Trưởng nhóm)<br>- Lê Thu Hà (Phụ trách tài liệu)<br>- Trần Đức Minh (Thực hành máy tính)</p>
  <hr>
  <p>Phương châm: "Học đi đôi với hành, cùng nhau chinh phục kỳ thi Tốt nghiệp THPT 2025!"</p>
</body>
</html>`,
    evaluate: (doc: Document, htmlString: string): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const lowerHtml = htmlString.toLowerCase();

      // Test 1: Doctype & Root structure
      const hasDoctype = lowerHtml.includes('<!doctype html>');
      const hasHtml = !!doc.querySelector('html');
      const hasHead = !!doc.querySelector('head');
      const hasTitle = !!doc.querySelector('title');
      const hasBody = !!doc.querySelector('body');
      const structPassed = hasDoctype && hasHtml && hasHead && hasTitle && hasBody;

      results.push({
        id: 'b7_c1',
        title: 'Cấu trúc tài liệu chuẩn HTML5',
        passed: structPassed,
        message: structPassed
          ? 'Đã khai báo đúng cấu trúc chuẩn HTML5 (DOCTYPE, html, head, title, body).'
          : 'Chưa đủ các thẻ chuẩn: cần có <!DOCTYPE html>, <html>, <head>, <title> và <body>.',
        details: `DOCTYPE: ${hasDoctype ? '✓' : '✗'}, <html>: ${hasHtml ? '✓' : '✗'}, <head>: ${hasHead ? '✓' : '✗'}, <title>: ${hasTitle ? '✓' : '✗'}, <body>: ${hasBody ? '✓' : '✗'}`,
      });

      // Test 2: H1 heading
      const h1Count = doc.querySelectorAll('h1').length;
      const h1Passed = h1Count >= 1;
      results.push({
        id: 'b7_c2',
        title: 'Tiêu đề chính (<h1>)',
        passed: h1Passed,
        message: h1Passed
          ? `Đã tìm thấy ${h1Count} thẻ tiêu đề <h1> giới thiệu nhóm.`
          : 'Chưa có thẻ <h1> để làm tiêu đề nổi bật cho trang web.',
      });

      // Test 3: Paragraphs and line breaks
      const pCount = doc.querySelectorAll('p').length;
      const brCount = doc.querySelectorAll('br').length;
      const pBrPassed = pCount >= 2 && brCount >= 1;
      results.push({
        id: 'b7_c3',
        title: 'Đoạn văn (<p>) và ngắt dòng (<br>)',
        passed: pBrPassed,
        message: pBrPassed
          ? `Đạt yêu cầu: có ${pCount} đoạn văn <p> và ${brCount} thẻ <br> ngắt dòng.`
          : `Cần ít nhất 2 đoạn văn <p> (hiện có: ${pCount}) và ít nhất 1 thẻ <br> ngắt dòng (hiện có: ${brCount}).`,
      });

      // Test 4: HR separator
      const hrCount = doc.querySelectorAll('hr').length;
      const hrPassed = hrCount >= 1;
      results.push({
        id: 'b7_c4',
        title: 'Đường kẻ ngang phân cách (<hr>)',
        passed: hrPassed,
        message: hrPassed
          ? `Đã sử dụng ${hrCount} thẻ <hr> phân tách nội dung rõ ràng.`
          : 'Chưa có thẻ đường kẻ ngang <hr> để ngăn cách các phần nội dung.',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 8: ĐỊNH DẠNG VĂN BẢN
  // ==========================================
  {
    id: 8,
    lessonNumber: 'Bài 8',
    title: 'Định dạng văn bản',
    subtitle: 'Định dạng ký tự, chỉ số trên/dưới và thuộc tính style trong HTML',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 8 (Trang 42-47)',
    objective:
      'Thành thạo các thẻ định dạng kiểu chữ như <b>, <strong>, <i>, <em>, <u>, <mark>, <small>, <sup>, <sub>, <del>. Biết cách sử dụng thuộc tính style (inline CSS) để đổi màu chữ (color), kích thước (font-size) và phông chữ (font-family). Áp dụng thực hành bài toán biện luận phương trình bậc hai (Hình 8.3 SGK).',
    theorySummary: [
      '<b> và <strong>: Làm chữ in đậm (strong mang ý nghĩa nhấn mạnh quan trọng).',
      '<i> và <em>: Làm chữ in nghiêng (em biểu thị ngữ điệu nhấn mạnh).',
      '<sup>: Tạo chỉ số trên (ví dụ x², a³); <sub>: Tạo chỉ số dưới (ví dụ H₂O, x₁).',
      '<mark>: Đánh dấu nổi bật văn bản màu vàng; <u>: Gạch chân; <del>: Gạch ngang giữa chữ.',
      'Thuộc tính style="..." cho phép định dạng trực tiếp phần tử: style="color: red; font-size: 18px; font-family: Tahoma;".',
    ],
    quickReferences: [
      {
        tag: '<sup>...</sup>',
        name: 'Chỉ số trên (Số mũ)',
        syntax: 'x<sup>2</sup>',
        example: 'ax<sup>2</sup> + bx + c = 0',
        description: 'Tạo số mũ hoặc chỉ số phía trên, rất phổ biến trong công thức toán lý hóa.',
      },
      {
        tag: '<sub>...</sub>',
        name: 'Chỉ số dưới',
        syntax: 'x<sub>1</sub>',
        example: 'x<sub>1</sub>, x<sub>2</sub>',
        description: 'Tạo chỉ số chân phía dưới (ví dụ nghiệm x1, x2 của phương trình bậc 2).',
      },
      {
        tag: '<b> hoặc <strong>',
        name: 'Chữ in đậm',
        syntax: '<b>In đậm</b> hoặc <strong>Quan trọng</strong>',
        example: '<b>Biện luận:</b>',
        description: 'Làm nổi bật từ khóa hoặc tiêu đề phụ.',
      },
      {
        tag: '<i> hoặc <em>',
        name: 'Chữ in nghiêng',
        syntax: '<i>In nghiêng</i>',
        example: '<i>Trường hợp 1:</i>',
        description: 'Dùng cho các ghi chú, giả thiết hoặc thuật ngữ.',
      },
      {
        tag: 'style="color:..."',
        name: 'Thuộc tính style',
        syntax: '<span style="color: red; font-size: 20px;">Nội dung</span>',
        example: '<p style="color: blue; font-family: Arial;">Phương trình bậc hai</p>',
        description: 'Định dạng màu sắc, kích thước trực tiếp bằng thuộc tính style.',
      },
    ],
    checklists: [
      {
        id: 'b8_c1',
        title: 'Công thức toán học với thẻ chỉ số trên (<sup>)',
        description: 'Trình bày phương trình bậc hai ax² + bx + c = 0 sử dụng đúng thẻ <sup> cho số mũ 2.',
        hint: 'Viết: ax<sup>2</sup> + bx + c = 0 (với a &ne; 0).',
      },
      {
        id: 'b8_c2',
        title: 'Sử dụng thẻ in đậm (<b> hoặc <strong>) và in nghiêng (<i> hoặc <em>)',
        description: 'Có các từ khóa được in đậm (như "Biện luận", "Vô nghiệm", "Nghiệm kép") và in nghiêng cho chú thích.',
        hint: 'Sử dụng <b>Biện luận:</b> hoặc <i>Trường hợp:</i>.',
      },
      {
        id: 'b8_c3',
        title: 'Định dạng màu sắc bằng thuộc tính style (color)',
        description: 'Có ít nhất một phần tử áp dụng style="color: ...;" để làm nổi bật kết luận bằng màu sắc.',
        hint: 'Thêm style="color: red;" cho trường hợp vô nghiệm hoặc style="color: blue;".',
      },
      {
        id: 'b8_c4',
        title: 'Chỉ số dưới (<sub>) hoặc thẻ đánh dấu (<mark>, <u>)',
        description: 'Biểu diễn hai nghiệm x₁ và x₂ bằng thẻ <sub>, hoặc dùng thẻ <mark> làm nổi bật.',
        hint: 'Viết x<sub>1</sub> và x<sub>2</sub> trong trường hợp delta > 0.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Biện luận phương trình bậc hai</title>
</head>
<body>
  <h1>Biện luận số nghiệm của phương trình bậc hai</h1>
  <!-- Trình bày công thức ax^2 + bx + c = 0 và các trường hợp của Delta -->
  <p>Dạng tổng quát: ax2 + bx + c = 0 (a khác 0)</p>
  
</body>
</html>`,
    initialCss: `body {
  font-family: 'Times New Roman', Times, serif;
  font-size: 17px;
  line-height: 1.8;
  padding: 24px;
  background-color: #fffbeb;
  color: #1f2937;
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Biện luận số nghiệm của phương trình bậc hai - Hình 8.3 SGK</title>
</head>
<body>
  <h1 style="color: #1e3a8a; font-family: Arial, sans-serif;">Biện luận số nghiệm của phương trình bậc hai</h1>
  <hr>
  <p><b>Phương trình dạng tổng quát:</b> <i>ax<sup>2</sup> + bx + c = 0</i> (với <b>a &ne; 0</b>)</p>
  <p>Biệt thức Delta: <b>&Delta; = b<sup>2</sup> - 4ac</b></p>
  <hr>
  <h3><b>Các trường hợp biện luận:</b></h3>
  <p>1. Nếu <mark>&Delta; &lt; 0</mark>: Phương trình <b style="color: red;">vô nghiệm</b>.</p>
  <p>2. Nếu <mark>&Delta; = 0</mark>: Phương trình có <b style="color: green;">nghiệm kép</b>: x<sub>1</sub> = x<sub>2</sub> = -b / (2a).</p>
  <p>3. Nếu <mark>&Delta; &gt; 0</mark>: Phương trình có <b style="color: blue;">hai nghiệm phân biệt</b>: x<sub>1</sub> và x<sub>2</sub>.</p>
</body>
</html>`,
    evaluate: (doc: Document, htmlString: string): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const lowerHtml = htmlString.toLowerCase();

      // Test 1: <sup> tag
      const supCount = doc.querySelectorAll('sup').length;
      const supPassed = supCount >= 1;
      results.push({
        id: 'b8_c1',
        title: 'Chỉ số trên số mũ (<sup>)',
        passed: supPassed,
        message: supPassed
          ? `Đã sử dụng ${supCount} thẻ <sup> để biểu diễn số mũ công thức.`
          : 'Chưa có thẻ <sup> để hiển thị số mũ 2 (ví dụ: ax<sup>2</sup> hoặc b<sup>2</sup>).',
      });

      // Test 2: <b>, <strong>, <i>, <em>
      const boldCount = doc.querySelectorAll('b, strong').length;
      const italicCount = doc.querySelectorAll('i, em').length;
      const formatPassed = boldCount >= 1 && italicCount >= 1;
      results.push({
        id: 'b8_c2',
        title: 'In đậm (<b>/<strong>) & In nghiêng (<i>/<em>)',
        passed: formatPassed,
        message: formatPassed
          ? `Rất tốt! Có ${boldCount} đoạn in đậm và ${italicCount} đoạn in nghiêng.`
          : `Cần phối hợp cả chữ in đậm (b/strong: ${boldCount}) và chữ in nghiêng (i/em: ${italicCount}).`,
      });

      // Test 3: style="color:..."
      const elementsWithStyle = doc.querySelectorAll('[style*="color"]');
      const hasColorStyle = elementsWithStyle.length >= 1 || lowerHtml.includes('color:');
      results.push({
        id: 'b8_c3',
        title: 'Đổi màu chữ bằng thuộc tính style',
        passed: hasColorStyle,
        message: hasColorStyle
          ? 'Đã áp dụng thuộc tính style="color: ...;" đổi màu chữ theo yêu cầu.'
          : 'Chưa thấy thuộc tính style chứa thuộc tính color (ví dụ: style="color: red;").',
      });

      // Test 4: <sub> or <mark> or <u>
      const subCount = doc.querySelectorAll('sub').length;
      const markCount = doc.querySelectorAll('mark, u, del').length;
      const advancedPassed = subCount >= 1 || markCount >= 1;
      results.push({
        id: 'b8_c4',
        title: 'Chỉ số dưới (<sub>) hoặc Đánh dấu (<mark>/<u>)',
        passed: advancedPassed,
        message: advancedPassed
          ? `Đạt yêu cầu nâng cao: phát hiện ${subCount} thẻ <sub> và ${markCount} thẻ đánh dấu.`
          : 'Hãy thêm chỉ số dưới cho nghiệm x<sub>1</sub>, x<sub>2</sub> hoặc thẻ <mark> làm nổi bật điều kiện.',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 9: TẠO DANH SÁCH, BẢNG
  // ==========================================
  {
    id: 9,
    lessonNumber: 'Bài 9',
    title: 'Tạo danh sách và Bảng (Table)',
    subtitle: 'Thẻ bảng, tiêu đề caption, gộp ô colspan và rowspan (Hình 9.8 SGK)',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 9 (Trang 48-55)',
    objective:
      'Nắm vững cách lập danh sách có thứ tự (<ol>), không thứ tự (<ul>) và danh sách định nghĩa (<dl>). Thành thạo thẻ bảng: <table>, <tr>, <th>, <td>, tiêu đề <caption>, thuộc tính gộp ô theo hàng (rowspan) và theo cột (colspan). Thực hiện bài tập thiết kế "Lịch hoạt động CLB Thể thao" (Hình 9.8 SGK).',
    theorySummary: [
      '<table>: Bắt đầu bảng; <tr>: Định nghĩa một dòng (table row).',
      '<th>: Ô tiêu đề cột (tự động in đậm và căn giữa); <td>: Ô dữ liệu thông thường.',
      '<caption>: Tiêu đề của toàn bộ bảng, phải đặt ngay sau thẻ mở <table>.',
      'colspan="n": Gộp n ô nằm liền nhau trên cùng một hàng theo chiều ngang.',
      'rowspan="m": Gộp m ô nằm liền nhau trên các hàng theo chiều dọc.',
      'Thuộc tính border="1" hoặc style CSS: Đóng khung viền cho bảng và các ô.',
    ],
    quickReferences: [
      {
        tag: '<table>...</table>',
        name: 'Thẻ Bảng',
        syntax: '<table border="1">...</table>',
        example: '<table border="1">\n  <tr><th>STT</th><th>Họ tên</th></tr>\n</table>',
        description: 'Thẻ chứa toàn bộ bảng dữ liệu.',
      },
      {
        tag: '<caption>...</caption>',
        name: 'Tiêu đề bảng',
        syntax: '<caption>Lịch sinh hoạt CLB</caption>',
        example: '<caption>Bảng 1: Lịch hoạt động thể thao</caption>',
        description: 'Đặt ngay sau thẻ <table> để mô tả nội dung bảng.',
      },
      {
        tag: 'colspan="n"',
        name: 'Gộp cột (Ngang)',
        syntax: '<th colspan="5">Ngày trong tuần</th>',
        example: '<th colspan="5">Ngày</th>',
        description: 'Gộp 5 cột liền nhau lại thành một ô duy nhất trên dòng.',
      },
      {
        tag: 'rowspan="m"',
        name: 'Gộp dòng (Dọc)',
        syntax: '<th rowspan="2">Bộ môn</th>',
        example: '<th rowspan="2">Bộ môn</th>',
        description: 'Gộp ô qua 2 hàng liên tiếp để không phải gõ lại tiêu đề.',
      },
      {
        tag: '<ul> và <ol>',
        name: 'Danh sách',
        syntax: '<ul><li>Mục 1</li><li>Mục 2</li></ul>',
        example: '<ol><li>Thứ Hai</li><li>Thứ Tư</li></ol>',
        description: 'Tạo danh sách các lưu ý dụng cụ tập luyện hoặc lịch thi đấu.',
      },
    ],
    checklists: [
      {
        id: 'b9_c1',
        title: 'Khởi tạo bảng (<table>) và tiêu đề bảng (<caption>)',
        description: 'Có thẻ <table> và thẻ <caption> đặt tên bảng là "Lịch hoạt động CLB Thể thao".',
        hint: 'Đặt <caption>Lịch hoạt động CLB Thể thao</caption> ngay dưới <table>.',
      },
      {
        id: 'b9_c2',
        title: 'Gộp dòng bằng rowspan="2"',
        description: 'Gộp 2 dòng cho cột "Bộ môn" và cột "GV phụ trách" (hoặc cột tương ứng) bằng thuộc tính rowspan="2".',
        hint: 'Viết <th rowspan="2">Bộ môn</th> và <th rowspan="2">GV phụ trách</th> ở hàng đầu tiên.',
      },
      {
        id: 'b9_c3',
        title: 'Gộp cột bằng colspan="5"',
        description: 'Có một ô tiêu đề "Ngày" gộp 5 cột các thứ trong tuần bằng colspan="5".',
        hint: 'Viết <th colspan="5">Ngày</th> rồi ở dòng kế tiếp ghi 5 thẻ <th> tương ứng Thứ Hai -> Thứ Sáu.',
      },
      {
        id: 'b9_c4',
        title: 'Danh sách lưu ý (<ul> hoặc <ol>)',
        description: 'Bổ sung danh sách các nội quy hoặc dụng cụ cần mang theo sử dụng <ul> hoặc <ol> cùng các thẻ <li>.',
        hint: 'Thêm danh sách: <ul><li>Trang phục thể thao đúng quy định</li><li>Giày chạy chuyên dụng</li></ul>.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thethao')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Lịch hoạt động CLB Thể thao</title>
</head>
<body>
  <h1>HOẠT ĐỘNG THỂ THAO HỌC ĐƯỜNG</h1>
  
  <!-- Thiết kế bảng có caption, rowspan="2", colspan="5" theo Hình 9.8 SGK -->
  
</body>
</html>`,
    initialCss: `table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 16px;
  background-color: white;
}
th, td {
  border: 1px solid #334155;
  padding: 8px 12px;
  text-align: center;
}
th {
  background-color: #dbeafe;
  color: #1e3a8a;
}
caption {
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: #1e40af;
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Lịch hoạt động CLB Thể thao - Hình 9.8 SGK</title>
</head>
<body>
  <h1>CLB THỂ THAO TRƯỜNG THPT</h1>
  
  <table border="1">
    <caption>LỊCH HOẠT ĐỘNG CLB THỂ THAO (HÌNH 9.8 SGK)</caption>
    <tr>
      <th rowspan="2">Bộ môn</th>
      <th colspan="5">Ngày</th>
      <th rowspan="2">GV phụ trách</th>
    </tr>
    <tr>
      <th>Hai</th>
      <th>Ba</th>
      <th>Tư</th>
      <th>Năm</th>
      <th>Sáu</th>
    </tr>
    <tr>
      <td>Bóng đá</td>
      <td>x</td>
      <td></td>
      <td>x</td>
      <td></td>
      <td>x</td>
      <td>Thầy Nam</td>
    </tr>
    <tr>
      <td>Bóng rổ</td>
      <td></td>
      <td>x</td>
      <td></td>
      <td>x</td>
      <td></td>
      <td>Cô Thảo</td>
    </tr>
    <tr>
      <td>Cầu lông</td>
      <td>x</td>
      <td></td>
      <td>x</td>
      <td></td>
      <td></td>
      <td>Thầy Hoàng</td>
    </tr>
  </table>

  <h3>Quy định tham gia CLB:</h3>
  <ul>
    <li>Mang giày và trang phục thể thao nghiêm chỉnh.</li>
    <li>Có mặt đúng giờ trước 15 phút để khởi động.</li>
    <li>Bảo quản dụng cụ thi đấu của nhà trường.</li>
  </ul>
</body>
</html>`,
    evaluate: (doc: Document): DomTestResult[] => {
      const results: DomTestResult[] = [];

      // Test 1: table & caption
      const table = doc.querySelector('table');
      const caption = doc.querySelector('table caption');
      const hasTableAndCaption = !!table && !!caption;
      results.push({
        id: 'b9_c1',
        title: 'Thẻ <table> & <caption>',
        passed: hasTableAndCaption,
        message: hasTableAndCaption
          ? `Đã tạo bảng hợp lệ có tiêu đề: "${caption?.textContent?.trim()}".`
          : 'Cần có thẻ <table> chứa thẻ <caption> đặt tiêu đề cho bảng.',
      });

      // Test 2: rowspan="2"
      const rowspanCells = doc.querySelectorAll('th[rowspan="2"], td[rowspan="2"]');
      const hasRowspan2 = rowspanCells.length >= 2;
      results.push({
        id: 'b9_c2',
        title: 'Gộp dòng với rowspan="2"',
        passed: hasRowspan2,
        message: hasRowspan2
          ? `Đã gộp ${rowspanCells.length} ô dọc thành công bằng rowspan="2".`
          : `Yêu cầu ít nhất 2 ô có thuộc tính rowspan="2" (hiện có: ${rowspanCells.length}). Cần gộp ô "Bộ môn" và "GV phụ trách".`,
      });

      // Test 3: colspan="5"
      const colspanCells = doc.querySelectorAll('th[colspan="5"], td[colspan="5"]');
      const hasColspan5 = colspanCells.length >= 1;
      results.push({
        id: 'b9_c3',
        title: 'Gộp cột với colspan="5"',
        passed: hasColspan5,
        message: hasColspan5
          ? 'Đạt chuẩn: Đã có ô tiêu đề "Ngày" gộp 5 cột ngày trong tuần bằng colspan="5".'
          : 'Chưa tìm thấy ô nào có thuộc tính colspan="5" để gộp 5 cột từ Thứ Hai đến Thứ Sáu.',
      });

      // Test 4: ul or ol with li
      const listItems = doc.querySelectorAll('ul li, ol li');
      const hasList = listItems.length >= 2;
      results.push({
        id: 'b9_c4',
        title: 'Danh sách lưu ý (<ul>/<ol>)',
        passed: hasList,
        message: hasList
          ? `Đã tạo danh sách nội quy gồm ${listItems.length} mục li.`
          : 'Hãy thêm danh sách <ul> hoặc <ol> với ít nhất 2 thẻ <li> nhắc nhở học sinh mang dụng cụ.',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 10: TẠO LIÊN KẾT
  // ==========================================
  {
    id: 10,
    lessonNumber: 'Bài 10',
    title: 'Tạo liên kết',
    subtitle: 'Thẻ <a>, liên kết tương đối, tuyệt đối, neo nội bộ và liên kết bằng ảnh',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 10 (Trang 56-61)',
    objective:
      'Nắm vững cách sử dụng thẻ <a> và thuộc tính href. Phân biệt liên kết tuyệt đối (URL đầy đủ), liên kết tương đối trỏ tới tệp cùng thư mục (thong_tin.html), liên kết neo nội bộ (#id) trỏ đến một vị trí trong trang web, và kỹ thuật bọc thẻ <img> trong <a> để biến hình ảnh thành liên kết có thể nhấp chuột.',
    theorySummary: [
      'Thẻ <a href="...">: Thẻ neo tạo siêu liên kết (hyperlink).',
      'Liên kết nội bộ (Bookmark / Anchor link): href="#id_phan_tu" dẫn tới phần tử có id tương ứng mà không tải lại trang.',
      'Liên kết tương đối: href="thong_tin.html" dẫn tới trang con trong cùng hệ thống tệp.',
      'Liên kết tuyệt đối: href="https://..." dẫn tới trang web bất kỳ trên Internet.',
      'Liên kết ảnh: <a href="..."><img src="..." alt="..."></a> biến ảnh thành nút liên kết.',
    ],
    quickReferences: [
      {
        tag: '<a href="#id">...</a>',
        name: 'Liên kết neo nội bộ',
        syntax: '<a href="#CLBTT">Xem chi tiết CLB</a>',
        example: '<a href="#CLBTT">Đến mục CLB Thể Thao</a>',
        description: 'Khi bấm vào, trình duyệt cuộn mượt tới phần tử có id="CLBTT".',
      },
      {
        tag: '<div id="...">',
        name: 'Đích đến của neo',
        syntax: '<div id="CLBTT">...</div>',
        example: '<section id="CLBTT"><h2>CLB Thể Thao</h2></section>',
        description: 'Thuộc tính id gán định danh duy nhất cho phần tử đích.',
      },
      {
        tag: '<a href="file.html">',
        name: 'Liên kết tương đối',
        syntax: '<a href="thong_tin.html">Xem trang thông tin</a>',
        example: '<a href="thong_tin.html">Điều lệ hoạt động</a>',
        description: 'Mở trang web thong_tin.html đã chuẩn bị sẵn trong phòng lab ảo.',
      },
      {
        tag: '<a href="..."><img ...></a>',
        name: 'Liên kết bằng hình ảnh',
        syntax: '<a href="thong_tin.html"><img src="images/thethao.png" alt="CLB"></a>',
        example: '<a href="#CLBTT"><img src="images/thethao.png" width="200" alt="Thể thao"></a>',
        description: 'Bọc thẻ <img> bên trong cặp thẻ <a> để người dùng bấm vào ảnh để chuyển trang.',
      },
    ],
    checklists: [
      {
        id: 'b10_c1',
        title: 'Liên kết neo nội bộ (href="#CLBTT")',
        description: 'Tạo thẻ <a href="#CLBTT"> liên kết đến vị trí Câu lạc bộ Thể thao trong trang.',
        hint: 'Thêm thẻ <a href="#CLBTT">Nhảy đến CLB Thể Thao</a> ở đầu trang.',
      },
      {
        id: 'b10_c2',
        title: 'Phần tử đích có định danh id="CLBTT"',
        description: 'Tạo một phần tử (h2, div, hoặc section) có thuộc tính id="CLBTT".',
        hint: 'Viết <h2 id="CLBTT">Thông Tin Câu Lạc Bộ Thể Thao</h2> ở phía dưới trang.',
      },
      {
        id: 'b10_c3',
        title: 'Liên kết sang trang phụ (thong_tin.html)',
        description: 'Tạo liên kết tương đối có href="thong_tin.html".',
        hint: 'Viết <a href="thong_tin.html">Đọc thêm điều lệ chi tiết</a>.',
      },
      {
        id: 'b10_c4',
        title: 'Liên kết bằng hình ảnh (<a> bọc <img>)',
        description: 'Bọc một thẻ <img> bên trong thẻ <a> để tạo liên kết hình ảnh tương tác.',
        hint: 'Sử dụng <a href="thong_tin.html"><img src="images/thethao.png" alt="Ảnh thể thao" width="200"></a>.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thethao')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thong_tin')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thực hành tạo liên kết</title>
</head>
<body>
  <h1>CỔNG THÔNG TIN HỌC SINH KHỐI 12</h1>
  <!-- Tạo liên kết neo #CLBTT và liên kết tới thong_tin.html -->
  
</body>
</html>`,
    initialCss: `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  line-height: 1.6;
}
a {
  color: #2563eb;
  text-decoration: underline;
  margin-right: 12px;
}
.spacer {
  height: 400px;
  background: #f1f5f9;
  border: 1px dashed #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  margin: 20px 0;
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Thực hành tạo liên kết - Bài 10</title>
</head>
<body>
  <h1>CỔNG THÔNG TIN HỌC SINH KHỐI 12</h1>
  <nav>
    <p>
      Menu điều hướng nhanh:
      <a href="#CLBTT">Đi tới Mục CLB Thể Thao (#CLBTT)</a> | 
      <a href="thong_tin.html">Mở trang Thông tin chi tiết (thong_tin.html)</a>
    </p>
  </nav>

  <p>Nhấp chuột vào hình ảnh dưới đây để mở trang điều lệ hoạt động:</p>
  <a href="thong_tin.html">
    <img src="images/thethao.png" alt="Biểu trưng Thể thao" width="280">
  </a>

  <div class="spacer">
    (Khu vực khoảng đệm nội dung để quan sát hiệu ứng cuộn trang của liên kết neo #CLBTT)
  </div>

  <section id="CLBTT">
    <h2>MỤC THÔNG TIN: CÂU LẠC BỘ THỂ THAO TRƯỜNG THPT</h2>
    <p>Chào mừng bạn đã đến với đích của liên kết neo nội bộ <strong>#CLBTT</strong>!</p>
    <p>CLB sinh hoạt vào thứ Bảy hàng tuần. Hãy đăng ký ngay hôm nay.</p>
    <p><a href="#">&uarr; Lên đầu trang</a></p>
  </section>
</body>
</html>`,
    evaluate: (doc: Document): DomTestResult[] => {
      const results: DomTestResult[] = [];

      // Test 1: Anchor link with href="#CLBTT"
      const anchorClb = doc.querySelector('a[href="#CLBTT"]');
      results.push({
        id: 'b10_c1',
        title: 'Liên kết neo (href="#CLBTT")',
        passed: !!anchorClb,
        message: anchorClb
          ? 'Đã có thẻ <a href="#CLBTT"> liên kết neo nội bộ chính xác.'
          : 'Chưa tìm thấy thẻ <a href="#CLBTT"> để liên kết đến phần tử có id="CLBTT".',
      });

      // Test 2: Target element with id="CLBTT"
      const targetElement = doc.getElementById('CLBTT');
      results.push({
        id: 'b10_c2',
        title: 'Phần tử đích (id="CLBTT")',
        passed: !!targetElement,
        message: targetElement
          ? `Đã tìm thấy phần tử đích <${targetElement.tagName.toLowerCase()} id="CLBTT">.`
          : 'Chưa có phần tử nào đặt thuộc tính id="CLBTT" làm điểm dừng chân cho liên kết neo.',
      });

      // Test 3: Relative link thong_tin.html
      const relativeLink = doc.querySelector('a[href="thong_tin.html"]');
      results.push({
        id: 'b10_c3',
        title: 'Liên kết sang thong_tin.html',
        passed: !!relativeLink,
        message: relativeLink
          ? 'Đã có liên kết tương đối dẫn tới thong_tin.html.'
          : 'Cần tạo thẻ <a> có thuộc tính href="thong_tin.html".',
      });

      // Test 4: Image link (a > img)
      const imageLink = doc.querySelector('a img');
      results.push({
        id: 'b10_c4',
        title: 'Liên kết bằng hình ảnh',
        passed: !!imageLink,
        message: imageLink
          ? 'Tuyệt vời! Đã bọc thẻ <img> bên trong thẻ <a> để tạo liên kết hình ảnh.'
          : 'Chưa có thẻ <img> nào nằm bên trong cặp thẻ <a>.',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 11: CHÈN ĐA PHƯƠNG TIỆN VÀ KHUNG NỘI TUYẾN
  // ==========================================
  {
    id: 11,
    lessonNumber: 'Bài 11',
    title: 'Đa phương tiện & Khung nội tuyến (iframe)',
    subtitle: 'Nhúng hình ảnh, âm thanh, video và khung nội tuyến iframe 600x400',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 11 (Trang 62-68)',
    objective:
      'Làm chủ các thẻ đa phương tiện: <img> với các thuộc tính src, alt, width, height; thẻ <audio> và <video> với thuộc tính điều khiển controls, autoplay; thẻ <iframe> để nhúng trang web con với kích thước chiều rộng và chiều cao chỉ định (600x400).',
    theorySummary: [
      '<img src="duong_dan" alt="chu_thich" width="..." height="...">: Chèn hình ảnh tĩnh hoặc ảnh động.',
      '<audio src="duong_dan.mp3" controls>: Nhúng tệp âm thanh (thuộc tính controls hiển thị thanh phát/dừng âm lượng).',
      '<video src="duong_dan.mp4" controls width="...">: Nhúng video đa phương tiện độ phân giải cao.',
      '<iframe src="trang_con.html" width="600" height="400">: Tạo một cửa sổ nhúng một trang web độc lập vào ngay bên trong trang hiện tại.',
    ],
    quickReferences: [
      {
        tag: '<img src="..." alt="...">',
        name: 'Thẻ Hình ảnh',
        syntax: '<img src="images/thethao.png" alt="CLB Thể Thao" width="400">',
        example: '<img src="images/thethao.png" alt="Thể thao 12" width="350">',
        description: 'Chèn ảnh và luôn kèm thuộc tính alt để hỗ trợ khả năng tiếp cận.',
      },
      {
        tag: '<video controls>',
        name: 'Thẻ Video',
        syntax: '<video src="videos/war_is_over.mp4" controls width="480"></video>',
        example: '<video src="videos/war_is_over.mp4" controls width="400"></video>',
        description: 'Bắt buộc có thuộc tính controls để học sinh có thể bấm phát/tua/dừng video.',
      },
      {
        tag: '<audio controls>',
        name: 'Thẻ Âm thanh',
        syntax: '<audio src="audio/Quoc_ca.mp3" controls></audio>',
        example: '<audio src="audio/Quoc_ca.mp3" controls></audio>',
        description: 'Phát tệp âm thanh nghe thử trực tiếp trên trình duyệt.',
      },
      {
        tag: '<iframe width="600" height="400">',
        name: 'Khung nội tuyến iframe',
        syntax: '<iframe src="thong_tin.html" width="600" height="400"></iframe>',
        example: '<iframe src="thong_tin.html" width="600" height="400" title="Thông tin"></iframe>',
        description: 'Hiển thị trang con với kích thước chuẩn 600x400 như yêu cầu bài học.',
      },
    ],
    checklists: [
      {
        id: 'b11_c1',
        title: 'Chèn hình ảnh thể thao (<img>) có alt',
        description: 'Nhúng ảnh "images/thethao.png" có thuộc tính alt và kích thước rõ ràng.',
        hint: 'Viết <img src="images/thethao.png" alt="Ảnh thể thao" width="400">.',
      },
      {
        id: 'b11_c2',
        title: 'Nhúng video có thanh điều khiển (<video controls>)',
        description: 'Sử dụng thẻ <video> trỏ tới "videos/war_is_over.mp4" và có thuộc tính controls.',
        hint: 'Viết <video src="videos/war_is_over.mp4" controls width="450"></video>.',
      },
      {
        id: 'b11_c3',
        title: 'Nhúng tệp âm thanh (<audio controls>)',
        description: 'Sử dụng thẻ <audio> trỏ tới "audio/Quoc_ca.mp3" và có thuộc tính controls.',
        hint: 'Viết <audio src="audio/Quoc_ca.mp3" controls></audio>.',
      },
      {
        id: 'b11_c4',
        title: 'Khung nội tuyến (<iframe>) kích thước 600x400',
        description: 'Nhúng trang con "thong_tin.html" (hoặc "CLB.html") vào thẻ <iframe> với width="600" và height="400".',
        hint: 'Viết <iframe src="thong_tin.html" width="600" height="400"></iframe>.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thethao')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_video')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_audio')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thong_tin')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đa phương tiện và Khung nội tuyến</title>
</head>
<body>
  <h1>TRẢI NGHIỆM ĐA PHƯƠNG TIỆN TRÊN WEB</h1>
  <!-- Nhúng img, video, audio và iframe 600x400 -->
  
</body>
</html>`,
    initialCss: `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background-color: #f8fafc;
  color: #0f172a;
}
.media-box {
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đa phương tiện và Khung nội tuyến - Bài 11</title>
</head>
<body>
  <h1>TRẢI NGHIỆM ĐA PHƯƠNG TIỆN TRÊN TRANG WEB</h1>

  <section>
    <h2>1. Hình ảnh thể thao học đường</h2>
    <img src="images/thethao.png" alt="CLB Thể thao trường THPT" width="450">
  </section>

  <section>
    <h2>2. Video tài liệu</h2>
    <video src="videos/war_is_over.mp4" controls width="480"></video>
  </section>

  <section>
    <h2>3. Bản tin âm thanh</h2>
    <p>Nghe bản tin sinh hoạt đầu tuần:</p>
    <audio src="audio/Quoc_ca.mp3" controls></audio>
  </section>

  <section>
    <h2>4. Khung nội tuyến nhúng trang thông tin (600x400)</h2>
    <iframe src="thong_tin.html" width="600" height="400"></iframe>
  </section>
</body>
</html>`,
    evaluate: (doc: Document, htmlString: string): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const lowerHtml = htmlString.toLowerCase();

      // Test 1: img with alt
      const imgs = doc.querySelectorAll('img');
      const validImg = Array.from(imgs).some((img) => {
        const src = img.getAttribute('src') || '';
        return (src.includes('thethao') || src.includes('data:image')) && img.hasAttribute('alt');
      });
      results.push({
        id: 'b11_c1',
        title: 'Hình ảnh (<img>) có thuộc tính alt',
        passed: validImg,
        message: validImg
          ? 'Đã nhúng hình ảnh thể thao và khai báo thuộc tính alt đầy đủ.'
          : 'Cần có thẻ <img src="images/thethao.png" alt="..."> kèm thuộc tính alt mô tả ảnh.',
      });

      // Test 2: video controls
      const video = doc.querySelector('video');
      const videoPassed = !!video && video.hasAttribute('controls');
      results.push({
        id: 'b11_c2',
        title: 'Video có điều khiển (<video controls>)',
        passed: videoPassed,
        message: videoPassed
          ? 'Đã nhúng video HTML5 và kích hoạt thanh điều khiển controls.'
          : 'Chưa có thẻ <video> hoặc thiếu thuộc tính controls để người dùng điều khiển video.',
      });

      // Test 3: audio controls
      const audio = doc.querySelector('audio');
      const audioPassed = !!audio && audio.hasAttribute('controls');
      results.push({
        id: 'b11_c3',
        title: 'Âm thanh có điều khiển (<audio controls>)',
        passed: audioPassed,
        message: audioPassed
          ? 'Đã nhúng tệp âm thanh <audio> có thuộc tính controls sẵn sàng phát.'
          : 'Chưa có thẻ <audio> hoặc thiếu thuộc tính controls.',
      });

      // Test 4: iframe width 600 height 400
      const iframe = doc.querySelector('iframe');
      let iframePassed = false;
      if (iframe) {
        const w = iframe.getAttribute('width');
        const h = iframe.getAttribute('height');
        if (w === '600' && h === '400') {
          iframePassed = true;
        } else if (lowerHtml.includes('width="600"') && lowerHtml.includes('height="400"')) {
          iframePassed = true;
        }
      }
      results.push({
        id: 'b11_c4',
        title: 'Khung nội tuyến (<iframe>) kích thước 600x400',
        passed: iframePassed,
        message: iframePassed
          ? 'Đạt chuẩn: Thẻ <iframe> đã được cấu hình width="600" và height="400".'
          : `Thẻ <iframe> cần có kích thước width="600" và height="400" (hiện tại: ${iframe ? `w=${iframe.getAttribute('width')}, h=${iframe.getAttribute('height')}` : 'chưa có iframe'}).`,
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 12: TẠO BIỂU MẪU (FORM)
  // ==========================================
  {
    id: 12,
    lessonNumber: 'Bài 12',
    title: 'Tạo biểu mẫu (Form)',
    subtitle: 'Thực hành phiếu đăng kí thi tốt nghiệp THPT (Hình 12.3 SGK)',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 12 (Trang 69-75)',
    objective:
      'Nắm vững thẻ <form> và các điều khiển nhập liệu: <input> với các kiểu type (text, number, date, radio, checkbox, submit), danh sách chọn thả xuống <select> và <option>, vùng nhập văn bản nhiều dòng <textarea>, nhãn <label>. Xây dựng hoàn chỉnh Phiếu đăng kí môn thi tốt nghiệp (Hình 12.3 SGK).',
    theorySummary: [
      '<form>: Bao bọc toàn bộ các điều khiển nhập dữ liệu trên biểu mẫu.',
      '<input type="text">: Ô nhập văn bản một dòng (Họ tên, CCCD).',
      '<input type="date">: Ô chọn ngày tháng năm sinh tiện lợi có lịch thả xuống.',
      '<input type="radio" name="...">: Nút chọn một (Giới tính: Nam hoặc Nữ) - các nút cùng nhóm phải chung thuộc tính name.',
      '<input type="checkbox">: Ô đánh dấu nhiều lựa chọn cùng lúc (Môn thi: Toán, Văn, Ngoại ngữ,...).',
      '<select> chứa các <option>: Hộp chọn thả xuống (Tổ hợp môn: KHTN, KHXH).',
      '<input type="submit"> hoặc <button type="submit">: Nút gửi dữ liệu biểu mẫu.',
    ],
    quickReferences: [
      {
        tag: '<input type="radio">',
        name: 'Nút chọn đơn (Radio)',
        syntax: '<input type="radio" name="gioitinh" value="nam"> Nam',
        example: '<input type="radio" name="gioitinh" id="nam"> <label for="nam">Nam</label>',
        description: 'Bắt buộc cùng thuộc tính name="gioitinh" để chỉ chọn được một trong các phương án.',
      },
      {
        tag: '<input type="checkbox">',
        name: 'Hộp kiểm (Checkbox)',
        syntax: '<input type="checkbox" name="monthi" value="toan"> Toán',
        example: '<input type="checkbox" name="mon" value="toan"> Toán học',
        description: 'Cho phép thí sinh tích chọn đồng thời nhiều môn thi dự kiến.',
      },
      {
        tag: '<select> & <option>',
        name: 'Danh sách chọn thả xuống',
        syntax: '<select name="tohop"><option>KHTN</option><option>KHXH</option></select>',
        example: '<select name="tohop">\n  <option>Khoa học Tự nhiên</option>\n  <option>Khoa học Xã hội</option>\n</select>',
        description: 'Menu chọn phương án tổ hợp môn thi.',
      },
      {
        tag: '<input type="submit">',
        name: 'Nút Gửi biểu mẫu',
        syntax: '<input type="submit" value="Gửi thông tin">',
        example: '<input type="submit" value="Đăng ký thi">',
        description: 'Kích hoạt hành động gửi dữ liệu khi thí sinh hoàn tất điền phiếu.',
      },
    ],
    checklists: [
      {
        id: 'b12_c1',
        title: 'Thẻ <form> và trường Họ tên, Ngày sinh',
        description: 'Chứa thẻ <form>, ô nhập text cho Họ tên và ô date cho Ngày tháng năm sinh.',
        hint: 'Viết <input type="text" name="hoten"> và <input type="date" name="ngaysinh">.',
      },
      {
        id: 'b12_c2',
        title: 'Giới tính dạng nút chọn đơn (radio)',
        description: 'Có ít nhất 2 nút radio Nam/Nữ và cùng chung thuộc tính name để loại trừ lẫn nhau.',
        hint: 'Viết <input type="radio" name="gioitinh" value="Nam"> Nam <input type="radio" name="gioitinh" value="Nu"> Nữ.',
      },
      {
        id: 'b12_c3',
        title: 'Môn thi (checkbox) & Tổ hợp thi (select/option)',
        description: 'Có các ô checkbox cho các môn thi và một thẻ <select> chứa các <option> cho tổ hợp KHTN/KHXH.',
        hint: 'Thêm checkbox cho Toán, Văn, Ngoại ngữ và <select><option>Khoa học Tự nhiên</option><option>Khoa học Xã hội</option></select>.',
      },
      {
        id: 'b12_c4',
        title: 'Nút gửi dữ liệu (submit)',
        description: 'Có nút <input type="submit"> hoặc <button type="submit"> với nhãn "Gửi thông tin".',
        hint: 'Thêm <input type="submit" value="Gửi thông tin"> ở cuối biểu mẫu.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Phiếu đăng kí môn thi tốt nghiệp</title>
</head>
<body>
  <h1>PHIẾU ĐĂNG KÍ MÔN THI TỐT NGHIỆP THPT</h1>
  <!-- Xây dựng biểu mẫu form theo Hình 12.3 SGK -->
  <form action="" method="post">
    
  </form>
</body>
</html>`,
    initialCss: `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background-color: #f1f5f9;
}
form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 600px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}
input[type="text"], input[type="date"], select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type="submit"] {
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
input[type="submit"]:hover {
  background-color: #1d4ed8;
}`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Phiếu đăng kí môn thi tốt nghiệp THPT - Hình 12.3 SGK</title>
</head>
<body>
  <h1>PHIẾU ĐĂNG KÍ MÔN THI TỐT NGHIỆP THPT</h1>

  <form action="" method="post">
    <div class="form-group">
      <label for="hoten">Họ và tên thí sinh:</label>
      <input type="text" id="hoten" name="hoten" placeholder="Nguyễn Văn A" required>
    </div>

    <div class="form-group">
      <label for="cccd">Số CCCD / Mã định danh:</label>
      <input type="text" id="cccd" name="cccd" placeholder="001204000000" required>
    </div>

    <div class="form-group">
      <label for="ngaysinh">Ngày sinh:</label>
      <input type="date" id="ngaysinh" name="ngaysinh" required>
    </div>

    <div class="form-group">
      <label>Giới tính:</label>
      <input type="radio" id="nam" name="gioitinh" value="Nam" checked>
      <label for="nam" style="display:inline; font-weight:normal; margin-right:15px;">Nam</label>
      <input type="radio" id="nu" name="gioitinh" value="Nữ">
      <label for="nu" style="display:inline; font-weight:normal;">Nữ</label>
    </div>

    <div class="form-group">
      <label>Môn thi bắt buộc đăng kí:</label>
      <input type="checkbox" id="toan" name="monthi" value="Toan" checked>
      <label for="toan" style="display:inline; font-weight:normal; margin-right:10px;">Toán</label>
      <input type="checkbox" id="van" name="monthi" value="Van" checked>
      <label for="van" style="display:inline; font-weight:normal; margin-right:10px;">Ngữ Văn</label>
      <input type="checkbox" id="anh" name="monthi" value="NgoaiNgu">
      <label for="anh" style="display:inline; font-weight:normal;">Ngoại ngữ</label>
    </div>

    <div class="form-group">
      <label for="tohop">Đăng kí Tổ hợp bài thi:</label>
      <select id="tohop" name="tohop">
        <option value="khtn">Khoa học Tự nhiên (Vật lí, Hóa học, Sinh học)</option>
        <option value="khxh">Khoa học Xã hội (Lịch sử, Địa lí, GDKT & PL)</option>
      </select>
    </div>

    <div class="form-group">
      <label for="ghichu">Ghi chú thêm:</label>
      <textarea id="ghichu" name="ghichu" rows="3" placeholder="Nhập yêu cầu đặc biệt nếu có..."></textarea>
    </div>

    <div class="form-group">
      <input type="submit" value="Gửi thông tin">
    </div>
  </form>
</body>
</html>`,
    evaluate: (doc: Document): DomTestResult[] => {
      const results: DomTestResult[] = [];

      // Test 1: form, text, date
      const form = doc.querySelector('form');
      const textInput = doc.querySelector('input[type="text"]');
      const dateInput = doc.querySelector('input[type="date"]');
      const pass1 = !!form && !!textInput && !!dateInput;
      results.push({
        id: 'b12_c1',
        title: 'Thẻ <form>, Họ tên (text) & Ngày sinh (date)',
        passed: pass1,
        message: pass1
          ? 'Đã có biểu mẫu <form>, ô nhập họ tên (type="text") và ô ngày sinh (type="date").'
          : `Còn thiếu: ${!form ? 'thẻ <form>, ' : ''}${!textInput ? 'ô input text (Họ tên), ' : ''}${!dateInput ? 'ô input date (Ngày sinh)' : ''}`,
      });

      // Test 2: radio group
      const radios = doc.querySelectorAll('input[type="radio"]');
      let passRadio = false;
      if (radios.length >= 2) {
        const firstRadioName = radios[0].getAttribute('name');
        passRadio = !!firstRadioName && Array.from(radios).every((r) => r.getAttribute('name') === firstRadioName);
      }
      results.push({
        id: 'b12_c2',
        title: 'Giới tính (input type="radio")',
        passed: passRadio,
        message: passRadio
          ? `Đã tạo ${radios.length} nút radio cùng nhóm name="${radios[0]?.getAttribute('name')}".`
          : 'Cần ít nhất 2 nút radio cho Nam/Nữ và chúng phải có CÙNG thuộc tính name (ví dụ: name="gioitinh").',
      });

      // Test 3: checkbox & select
      const checkboxes = doc.querySelectorAll('input[type="checkbox"]');
      const select = doc.querySelector('select');
      const options = doc.querySelectorAll('select option');
      const pass3 = checkboxes.length >= 2 && !!select && options.length >= 2;
      results.push({
        id: 'b12_c3',
        title: 'Môn thi (checkbox) & Tổ hợp (select/option)',
        passed: pass3,
        message: pass3
          ? `Đạt yêu cầu: có ${checkboxes.length} ô checkbox môn thi và menu thả xuống <select> với ${options.length} lựa chọn.`
          : `Cần ít nhất 2 ô checkbox (hiện có: ${checkboxes.length}) và 1 thẻ <select> có ít nhất 2 <option> (hiện có: ${options.length}).`,
      });

      // Test 4: submit button
      const submit = doc.querySelector('input[type="submit"], button[type="submit"]');
      const pass4 = !!submit;
      results.push({
        id: 'b12_c4',
        title: 'Nút gửi thông tin (submit)',
        passed: pass4,
        message: pass4
          ? 'Đã có nút gửi thông tin biểu mẫu (type="submit").'
          : 'Chưa có nút gửi: thêm <input type="submit" value="Gửi thông tin">.',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 13: KHÁI NIỆM, VAI TRÒ CỦA CSS
  // ==========================================
  {
    id: 13,
    lessonNumber: 'Bài 13',
    title: 'Khái niệm, vai trò của CSS',
    subtitle: 'Tìm hiểu cấu trúc quy tắc CSS, cách nhúng CSS và các bộ chọn (Selector)',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 13 (Trang 76-81)',
    objective:
      'Hiểu khái niệm và vai trò của CSS (Cascading Style Sheets) trong việc tách rời nội dung HTML và hình thức trình bày. Nắm vững cấu trúc quy tắc CSS: selector { property: value; }. Biết 3 cách chèn CSS (nội dòng, nội bộ với <style>, ngoại tuyến với thẻ <link rel="stylesheet">). Sử dụng thành thạo 3 bộ chọn cơ bản: Bộ chọn phần tử (element), Bộ chọn lớp (class), Bộ chọn định danh (id).',
    theorySummary: [
      'CSS là ngôn ngữ quy định cách hiển thị các phần tử HTML trên màn hình thiết bị.',
      'Cú pháp một quy tắc CSS: Bộ_chọn { Thuộc_tính: Giá_trị; } (Ví dụ: p { color: blue; }).',
      '3 cách chèn CSS: 1. Ngoại tuyến: <link rel="stylesheet" href="style.css">; 2. Nội bộ: <style> trong <head>; 3. Nội dòng: thuộc tính style="..." trực tiếp trong thẻ.',
      'Bộ chọn phần tử (Element selector): Áp dụng cho mọi thẻ cùng tên (Ví dụ: h1 { ... }, p { ... }).',
      'Bộ chọn lớp (Class selector): Bắt đầu bằng dấu chấm (.) áp dụng cho các phần tử có class tương ứng (Ví dụ: .tieude { ... }). Một lớp có thể gán cho nhiều phần tử.',
      'Bộ chọn định danh (ID selector): Bắt đầu bằng dấu thăng (#) áp dụng cho phần tử duy nhất có id tương ứng (Ví dụ: #dacbiet { ... }).',
    ],
    quickReferences: [
      {
        tag: '<link rel="stylesheet">',
        name: 'Liên kết CSS ngoại tuyến',
        syntax: '<link rel="stylesheet" href="style.css">',
        example: '<link rel="stylesheet" href="style.css">',
        description: 'Đặt trong thẻ <head> của HTML để nạp các định dạng từ tệp style.css.',
      },
      {
        tag: 'tag { ... }',
        name: 'Bộ chọn phần tử (Element)',
        syntax: 'h1 { color: #1e40af; font-size: 24px; }',
        example: 'h1 {\n  color: #1e40af;\n  text-align: center;\n}',
        description: 'Định dạng chung cho tất cả các thẻ h1 xuất hiện trong trang web.',
      },
      {
        tag: '.class { ... }',
        name: 'Bộ chọn lớp (Class)',
        syntax: '.gioithieu { color: green; font-weight: bold; }',
        example: '.gioithieu {\n  background-color: #f1f5f9;\n  padding: 10px;\n}',
        description: 'Bộ chọn lớp bắt đầu bằng dấu chấm (.), dùng để áp dụng cho nhiều thẻ cùng lúc qua class="...".',
      },
      {
        tag: '#id { ... }',
        name: 'Bộ chọn định danh (ID)',
        syntax: '#noibat { color: red; border: 1px solid red; }',
        example: '#noibat {\n  border-left: 4px solid #2563eb;\n  padding-left: 12px;\n}',
        description: 'Bộ chọn ID bắt đầu bằng dấu thăng (#), chỉ áp dụng cho một phần tử duy nhất có id="...".',
      },
    ],
    checklists: [
      {
        id: 'b13_c1',
        title: 'Liên kết CSS (thẻ <link> hoặc <style>)',
        description: 'Khai báo thẻ <link rel="stylesheet" href="style.css"> trong phần <head> hoặc sử dụng thẻ <style>.',
        hint: 'Thêm <link rel="stylesheet" href="style.css"> bên trong cặp thẻ <head>...</head>.',
      },
      {
        id: 'b13_c2',
        title: 'Bộ chọn phần tử (Element selector)',
        description: 'Có quy tắc CSS áp dụng cho bộ chọn thẻ cơ bản (như h1, p, hoặc body) trong style.css.',
        hint: 'Viết h1 { color: #1e40af; } hoặc p { line-height: 1.6; } trong tab style.css.',
      },
      {
        id: 'b13_c3',
        title: 'Bộ chọn lớp (Class selector .classname)',
        description: 'Tạo phần tử có thuộc tính class (ví dụ class="gioithieu") và định nghĩa quy tắc tương ứng .gioithieu { ... } trong CSS.',
        hint: 'Trong HTML gán <p class="gioithieu">...</p>, trong CSS viết .gioithieu { color: #059669; }.',
      },
      {
        id: 'b13_c4',
        title: 'Bộ chọn định danh (ID selector #idname)',
        description: 'Tạo phần tử có thuộc tính id (ví dụ id="noibat") và định nghĩa quy tắc tương ứng #noibat { ... } trong CSS.',
        hint: 'Trong HTML gán <div id="noibat">...</div>, trong CSS viết #noibat { font-weight: bold; }.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_lop12a1')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khái niệm và vai trò của CSS</title>
  <!-- Nhúng tệp style.css tại đây -->
</head>
<body>
  <h1>GÓC HỌC TẬP TIN HỌC 12</h1>

  <!-- Sử dụng class và id cho các phần tử bên dưới -->
  <p>CSS giúp trang web trở nên sinh động và tách biệt giữa cấu trúc và giao diện.</p>
  <p>Đây là đoạn văn bản cần áp dụng lớp class.</p>
  <div>Đây là khối nội dung đặc biệt cần áp dụng định danh id.</div>
</body>
</html>`,
    initialCss: `/* Viết các quy tắc CSS cho Bài 13 tại đây */

/* 1. Bộ chọn phần tử (h1, p) */
h1 {
  
}

/* 2. Bộ chọn lớp (.classname) */


/* 3. Bộ chọn định danh (#idname) */
`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khái niệm và vai trò của CSS - Bài 13</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>GÓC HỌC TẬP TIN HỌC 12</h1>

  <p class="gioithieu">CSS (Cascading Style Sheets) định hình vẻ đẹp cho trang web hiện đại.</p>
  <p class="gioithieu">Nhờ có CSS, việc thay đổi giao diện trở nên dễ dàng và đồng bộ hơn.</p>

  <div id="noibat">
    Lưu ý quan trọng: Mỗi trang web chỉ nên có 1 phần tử mang id duy nhất!
  </div>
</body>
</html>`,
    solutionCss: `/* 1. Bộ chọn phần tử */
h1 {
  color: #1e40af;
  text-align: center;
  font-family: Arial, sans-serif;
}

p {
  line-height: 1.6;
}

/* 2. Bộ chọn lớp */
.gioithieu {
  color: #047857;
  background-color: #ecfdf5;
  padding: 8px 12px;
  border-radius: 6px;
}

/* 3. Bộ chọn định danh */
#noibat {
  color: #b91c1c;
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 10px 14px;
  font-weight: bold;
}`,
    evaluate: (doc: Document, htmlString: string, cssString = ''): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const combinedCss = (cssString + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();
      const lowerHtml = htmlString.toLowerCase();

      // Test 1: link or style tag
      const hasLink = !!doc.querySelector('link[rel*="stylesheet"]') || lowerHtml.includes('href="style.css"');
      const hasStyle = !!doc.querySelector('style');
      const pass1 = hasLink || hasStyle;
      results.push({
        id: 'b13_c1',
        title: 'Liên kết CSS (thẻ <link> hoặc <style>)',
        passed: pass1,
        message: pass1
          ? 'Đã nhúng CSS vào trang web hợp lệ (bằng thẻ <link rel="stylesheet"> hoặc thẻ <style>).'
          : 'Chưa có thẻ <link rel="stylesheet" href="style.css"> bên trong thẻ <head> để liên kết tệp CSS.',
      });

      // Test 2: Element selector in CSS
      const hasElementSelector = /(^|\s|})(h1|p|body|div|section|span)\s*\{/i.test(combinedCss);
      results.push({
        id: 'b13_c2',
        title: 'Bộ chọn phần tử (Element selector)',
        passed: hasElementSelector,
        message: hasElementSelector
          ? 'Đã sử dụng bộ chọn phần tử (h1, p, body...) trong quy tắc CSS.'
          : 'Chưa có quy tắc CSS nào dùng bộ chọn phần tử (ví dụ: h1 { color: blue; } hoặc p { ... }).',
      });

      // Test 3: Class selector in HTML & CSS
      const hasClassInHtml = doc.querySelectorAll('[class]').length >= 1;
      const hasClassInCss = /\.[a-z0-9_-]+\s*\{/i.test(combinedCss);
      const pass3 = hasClassInHtml && hasClassInCss;
      results.push({
        id: 'b13_c3',
        title: 'Bộ chọn lớp (Class selector .class)',
        passed: pass3,
        message: pass3
          ? 'Đạt yêu cầu: Đã gán class trong HTML và viết quy tắc bộ chọn lớp (.tên_lớp { ... }) trong CSS.'
          : `Cần có cả thuộc tính class trong HTML (${hasClassInHtml ? '✓' : 'chưa có'}) và quy tắc .class { ... } trong CSS (${hasClassInCss ? '✓' : 'chưa có'}).`,
      });

      // Test 4: ID selector in HTML & CSS
      const hasIdInHtml = doc.querySelectorAll('[id]').length >= 1;
      const hasIdInCss = /#[a-z0-9_-]+\s*\{/i.test(combinedCss);
      const pass4 = hasIdInHtml && hasIdInCss;
      results.push({
        id: 'b13_c4',
        title: 'Bộ chọn định danh (ID selector #id)',
        passed: pass4,
        message: pass4
          ? 'Đạt yêu cầu: Đã gán id trong HTML và viết quy tắc bộ chọn định danh (#tên_id { ... }) trong CSS.'
          : `Cần có cả thuộc tính id trong HTML (${hasIdInHtml ? '✓' : 'chưa có'}) và quy tắc #id { ... } trong CSS (${hasIdInCss ? '✓' : 'chưa có'}).`,
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 14: ĐỊNH DẠNG VĂN BẢN BẰNG CSS
  // ==========================================
  {
    id: 14,
    lessonNumber: 'Bài 14',
    title: 'Định dạng văn bản bằng CSS',
    subtitle: 'Làm chủ phông chữ font-family, căn lề text-align, khoảng cách dòng line-height',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 14 (Trang 82-87)',
    objective:
      'Sử dụng thành thạo các thuộc tính định dạng văn bản quan trọng trong CSS: font-family (chọn phông chữ), font-size (kích thước chữ), font-weight (độ đậm), font-style (kiểu in nghiêng), text-align (căn giữa center, căn đều justify), line-height (giãn khoảng cách dòng), text-decoration (gạch chân) và text-transform (chữ in hoa). Ứng dụng để thiết kế bài viết hoặc bài thơ trang nhã, chuyên nghiệp.',
    theorySummary: [
      'font-family: Quy định phông chữ cho văn bản. Nên khai báo danh sách phông kèm phông chữ họ chung (generic family), ví dụ: font-family: Arial, Helvetica, sans-serif;.',
      'font-size: Quy định kích thước chữ (đơn vị thông dụng: px, pt, em, rem).',
      'font-weight: Độ đậm của chữ (normal, bold, hoặc giá trị số 400, 700).',
      'text-align: Căn chỉnh văn bản theo chiều ngang (left: trái, right: phải, center: giữa, justify: căn đều 2 bên).',
      'line-height: Khoảng cách giữa các dòng văn bản (ví dụ 1.6, 1.8 hoặc 28px) giúp tăng khả năng đọc.',
      'text-transform: Chuyển đổi chữ (uppercase: toàn bộ in hoa, capitalize: viết hoa chữ cái đầu từ).',
      'text-decoration: Thêm đường gạch trang trí (underline: gạch chân, none: bỏ gạch chân liên kết).',
    ],
    quickReferences: [
      {
        tag: 'font-family: ...;',
        name: 'Phông chữ văn bản',
        syntax: 'font-family: Arial, sans-serif;',
        example: 'body {\n  font-family: "Segoe UI", Tahoma, sans-serif;\n}',
        description: 'Chỉ định phông chữ hiển thị mượt mà trên mọi hệ điều hành.',
      },
      {
        tag: 'text-align: center | justify;',
        name: 'Căn chỉnh văn bản',
        syntax: 'text-align: center;',
        example: 'h1 {\n  text-align: center;\n}\np {\n  text-align: justify;\n}',
        description: 'Căn giữa tiêu đề hoặc căn đều hai bên lề cho bài viết.',
      },
      {
        tag: 'line-height: ...;',
        name: 'Khoảng cách dòng',
        syntax: 'line-height: 1.6;',
        example: 'p {\n  line-height: 1.8;\n}',
        description: 'Giãn dòng hợp lý giúp văn bản thoáng đãng, dễ theo dõi.',
      },
      {
        tag: 'text-transform: uppercase;',
        name: 'Chữ in hoa',
        syntax: 'text-transform: uppercase;',
        example: 'h2 {\n  text-transform: uppercase;\n}',
        description: 'Tự động biến đổi tất cả chữ cái thành chữ in hoa trang trọng.',
      },
      {
        tag: 'font-weight: bold;',
        name: 'Độ đậm chữ',
        syntax: 'font-weight: bold;',
        example: '.nhan-manh {\n  font-weight: bold;\n}',
        description: 'Tạo chữ in đậm bằng CSS thay cho thẻ b trong HTML.',
      },
    ],
    checklists: [
      {
        id: 'b14_c1',
        title: 'Cấu hình phông chữ (font-family) và cỡ chữ (font-size)',
        description: 'Áp dụng thuộc tính font-family (như Arial, sans-serif) và font-size cho trang web.',
        hint: 'Viết body { font-family: Arial, sans-serif; font-size: 16px; } trong CSS.',
      },
      {
        id: 'b14_c2',
        title: 'Căn lề tiêu đề (text-align: center) và chữ hoa (text-transform)',
        description: 'Tiêu đề h1 được căn giữa (center) và biến đổi chữ in hoa (uppercase) bằng CSS.',
        hint: 'Viết h1 { text-align: center; text-transform: uppercase; } trong CSS.',
      },
      {
        id: 'b14_c3',
        title: 'Căn lề đoạn văn (text-align: justify) và giãn dòng (line-height)',
        description: 'Các đoạn văn bản được căn đều hai bên (justify) và có khoảng cách dòng line-height từ 1.5 trở lên.',
        hint: 'Viết p { text-align: justify; line-height: 1.8; } trong CSS.',
      },
      {
        id: 'b14_c4',
        title: 'Kiểu chữ nghiêng (font-style: italic) hoặc gạch chân (text-decoration)',
        description: 'Có phần tử áp dụng font-style: italic (cho trích dẫn/tác giả) hoặc text-decoration: underline.',
        hint: 'Viết .tac-gia { font-style: italic; font-weight: bold; } trong CSS.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_lop12a1')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Định dạng văn bản bằng CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Thông điệp tuổi 18 - Khát vọng tương lai</h1>

  <p class="doan-van">
    Tuổi 18 là dấu mốc quan trọng của đời học sinh, là thời điểm chúng ta bắt đầu bước chân vào ngưỡng cửa tương lai với nhiều ước mơ và hoài bão lớn lao. Hãy trân trọng từng ngày tháng bên bạn bè, thầy cô và nỗ lực hết mình trong học tập.
  </p>

  <p class="doan-van">
    Mỗi dòng mã lệnh HTML và CSS hôm nay là viên gạch đầu tiên giúp các em tự tin hội nhập vào kỷ nguyên số, mở ra vô vàn cơ hội nghề nghiệp trong tương lai.
  </p>

  <p class="tac-gia">— Ban Chấp hành Đoàn trường THPT</p>
</body>
</html>`,
    initialCss: `/* Định dạng văn bản cho Bài 14 bằng CSS */

body {
  padding: 24px;
}

h1 {
  
}

.doan-van {
  
}

.tac-gia {
  
}
`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Định dạng văn bản bằng CSS - Bài 14</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Thông điệp tuổi 18 - Khát vọng tương lai</h1>

  <p class="doan-van">
    Tuổi 18 là dấu mốc quan trọng của đời học sinh, là thời điểm chúng ta bắt đầu bước chân vào ngưỡng cửa tương lai với nhiều ước mơ và hoài bão lớn lao. Hãy trân trọng từng ngày tháng bên bạn bè, thầy cô và nỗ lực hết mình trong học tập.
  </p>

  <p class="doan-van">
    Mỗi dòng mã lệnh HTML và CSS hôm nay là viên gạch đầu tiên giúp các em tự tin hội nhập vào kỷ nguyên số, mở ra vô vàn cơ hội nghề nghiệp trong tương lai.
  </p>

  <p class="tac-gia">— Ban Chấp hành Đoàn trường THPT</p>
</body>
</html>`,
    solutionCss: `body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  background-color: #f8fafc;
  color: #1e293b;
  padding: 30px;
}

h1 {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
  color: #1e40af;
  margin-bottom: 24px;
}

.doan-van {
  text-align: justify;
  line-height: 1.8;
  margin-bottom: 16px;
  text-indent: 24px;
}

.tac-gia {
  text-align: right;
  font-style: italic;
  font-weight: bold;
  color: #475569;
  text-decoration: underline;
}`,
    evaluate: (doc: Document, _htmlString: string, cssString = ''): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const combinedCss = (cssString + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();

      // Test 1: font-family and font-size
      const hasFontFamily = combinedCss.includes('font-family:');
      const hasFontSize = combinedCss.includes('font-size:');
      const pass1 = hasFontFamily && hasFontSize;
      results.push({
        id: 'b14_c1',
        title: 'Thuộc tính font-family và font-size',
        passed: pass1,
        message: pass1
          ? 'Đã cấu hình phông chữ font-family và kích thước font-size rõ ràng.'
          : `Cần có cả thuộc tính font-family (${hasFontFamily ? '✓' : 'chưa có'}) và font-size (${hasFontSize ? '✓' : 'chưa có'}) trong CSS.`,
      });

      // Test 2: text-align: center & text-transform or font-weight
      const hasTextAlignCenter = combinedCss.includes('text-align: center') || combinedCss.includes('text-align:center');
      const hasTextTransform = combinedCss.includes('text-transform: uppercase') || combinedCss.includes('text-transform:uppercase') || combinedCss.includes('font-weight: bold') || combinedCss.includes('font-weight:bold');
      const pass2 = hasTextAlignCenter && hasTextTransform;
      results.push({
        id: 'b14_c2',
        title: 'Căn giữa (text-align: center) & Chữ hoa (text-transform)',
        passed: pass2,
        message: pass2
          ? 'Tiêu đề đã được căn giữa text-align: center và định dạng nổi bật.'
          : 'Cần có text-align: center cho tiêu đề và text-transform: uppercase (hoặc font-weight: bold).',
      });

      // Test 3: text-align: justify and line-height
      const hasJustify = combinedCss.includes('text-align: justify') || combinedCss.includes('text-align:justify');
      const hasLineHeight = combinedCss.includes('line-height:');
      const pass3 = hasJustify && hasLineHeight;
      results.push({
        id: 'b14_c3',
        title: 'Căn đều (text-align: justify) & Giãn dòng (line-height)',
        passed: pass3,
        message: pass3
          ? 'Đoạn văn đã được căn đều 2 bên (justify) và thiết lập khoảng cách dòng line-height thoáng đãng.'
          : `Cần có text-align: justify (${hasJustify ? '✓' : 'chưa có'}) và line-height (${hasLineHeight ? '✓' : 'chưa có'}) cho đoạn văn.`,
      });

      // Test 4: font-style: italic or text-decoration: underline
      const hasItalic = combinedCss.includes('font-style: italic') || combinedCss.includes('font-style:italic');
      const hasUnderline = combinedCss.includes('text-decoration: underline') || combinedCss.includes('text-decoration:underline');
      const pass4 = hasItalic || hasUnderline;
      results.push({
        id: 'b14_c4',
        title: 'Kiểu in nghiêng (font-style: italic) / Gạch chân',
        passed: pass4,
        message: pass4
          ? 'Đã áp dụng chữ in nghiêng (font-style: italic) hoặc gạch chân (text-decoration) cho ghi chú tác giả.'
          : 'Hãy thêm font-style: italic hoặc text-decoration: underline cho phần tử tác giả/ghi chú.',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 15: TẠO MÀU CHO CHỮ VÀ NỀN
  // ==========================================
  {
    id: 15,
    lessonNumber: 'Bài 15',
    title: 'Tạo màu cho chữ và nền',
    subtitle: 'Hệ màu HEX, RGB, RGBA, thuộc tính color, background-color và đường viền border',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 15 (Trang 88-93)',
    objective:
      'Làm chủ các cách biểu diễn màu sắc trong CSS: Tên màu tiếng Anh (blue, navy, gold), Mã màu HEX (#1e40af, #f59e0b), Giá trị RGB và RGBA (có độ trong suốt alpha). Thành thạo các thuộc tính màu chữ color, màu nền background-color, khung viền border (độ dày, kiểu viền, màu viền), bo góc border-radius. Thiết kế "Thẻ thông tin học sinh" hoặc "Hộp thông báo" có màu sắc tương phản, hài hòa.',
    theorySummary: [
      '3 cách xác định màu trong CSS: 1. Tên màu; 2. Mã thập lục phân HEX (#RRGGBB); 3. rgb(đỏ, lục, lam) hoặc rgba(đỏ, lục, lam, độ_trong_suốt).',
      'color: Thiết lập màu sắc hiển thị cho văn bản.',
      'background-color: Thiết lập màu nền cho phần tử.',
      'border: Quy định đường viền xung quanh phần tử theo cú pháp: border: độ_dày kiểu_viền màu_viền; (Ví dụ: border: 2px solid #2563eb;).',
      'border-radius: Bo tròn các góc của hộp để giao diện hiện đại, mềm mại hơn (Ví dụ: border-radius: 12px;).',
      'Nguyên tắc tương phản màu sắc: Nền tối dùng chữ sáng, nền sáng dùng chữ tối để đảm bảo người xem đọc rõ ràng.',
    ],
    quickReferences: [
      {
        tag: 'color: #1e40af;',
        name: 'Màu chữ bằng mã HEX',
        syntax: 'color: #1e40af;',
        example: 'h1 {\n  color: #1e40af;\n}',
        description: 'Mã HEX bắt đầu bằng dấu thăng (#) gồm 6 ký tự đại diện cho 3 kênh Đỏ-Lục-Lam.',
      },
      {
        tag: 'background-color: ...;',
        name: 'Màu nền phần tử',
        syntax: 'background-color: #f1f5f9;',
        example: '.the-hoc-sinh {\n  background-color: #ffffff;\n}',
        description: 'Tô màu nền cho hộp hoặc toàn bộ trang web.',
      },
      {
        tag: 'background-color: rgba(...);',
        name: 'Màu nền trong suốt RGBA',
        syntax: 'background-color: rgba(30, 64, 175, 0.1);',
        example: '.hop-chu-y {\n  background-color: rgba(37, 99, 235, 0.15);\n}',
        description: 'Giá trị alpha từ 0 (trong suốt hoàn toàn) đến 1 (đặc hoàn toàn).',
      },
      {
        tag: 'border: 2px solid #3b82f6;',
        name: 'Khung viền có màu sắc',
        syntax: 'border: 2px solid #3b82f6;',
        example: '.khung {\n  border: 2px solid #2563eb;\n  border-radius: 8px;\n}',
        description: 'Đóng khung với độ dày, nét kẻ liền (solid), nét đứt (dashed) và màu viền.',
      },
      {
        tag: 'border-radius: 12px;',
        name: 'Bo góc khung hộp',
        syntax: 'border-radius: 12px;',
        example: '.the {\n  border-radius: 12px;\n}',
        description: 'Bo cong góc khung viền theo bán kính mong muốn.',
      },
    ],
    checklists: [
      {
        id: 'b15_c1',
        title: 'Màu chữ (color) sử dụng mã màu HEX hoặc RGB',
        description: 'Có thuộc tính color thiết lập màu chữ bằng mã HEX (ví dụ #1e40af) hoặc RGB/RGBA.',
        hint: 'Viết color: #1e40af; hoặc color: rgb(30, 64, 175); trong CSS.',
      },
      {
        id: 'b15_c2',
        title: 'Màu nền (background-color) tương phản dễ đọc',
        description: 'Có thuộc tính background-color cho thẻ body hoặc hộp khối (ví dụ #eff6ff hoặc #ffffff).',
        hint: 'Viết background-color: #eff6ff; cho body hoặc hộp thẻ học sinh.',
      },
      {
        id: 'b15_c3',
        title: 'Khung viền có màu (border) và bo góc (border-radius)',
        description: 'Thiết lập đường viền có màu sắc rõ ràng (border) và bo góc hộp (border-radius).',
        hint: 'Thêm border: 2px solid #3b82f6; border-radius: 12px; vào hộp thông tin.',
      },
      {
        id: 'b15_c4',
        title: 'Phối màu đa cấp (tiêu đề, nhãn badge hoặc màu RGBA)',
        description: 'Sử dụng ít nhất 2 màu nền hoặc phối màu RGBA trong suốt để tạo điểm nhấn cho các phần tử con.',
        hint: 'Thêm lớp .badge { background-color: rgba(37, 99, 235, 0.15); color: #1d4ed8; }.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thethao')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_lop12a1')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tạo màu cho chữ và nền - Bài 15</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Thiết kế Thẻ Hồ Sơ Học Sinh hoặc Hộp Thông Báo -->
  <div class="the-hoc-sinh">
    <span class="huy-hieu">Học sinh Tiêu biểu Khối 12</span>
    <h2 class="ho-ten">Nguyễn Văn An</h2>
    <p class="thong-tin">Lớp: 12A1 - Trường THPT Chuyên</p>
    <p class="thanh-tich">Thành tích: Giải Nhất Học sinh Giỏi Tin học cấp Tỉnh</p>
  </div>
</body>
</html>`,
    initialCss: `/* Thiết lập màu sắc chữ và nền cho Bài 15 */

body {
  /* Thiết lập màu nền toàn trang */
  
}

.the-hoc-sinh {
  /* Thiết lập màu nền, viền border, bo góc border-radius */
  
}

.ho-ten {
  /* Màu chữ tiêu đề */
  
}

.huy-hieu {
  /* Màu nền nhãn badge dạng RGBA hoặc HEX */
  
}
`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tạo màu cho chữ và nền - Bài 15</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="the-hoc-sinh">
    <span class="huy-hieu">Học sinh Tiêu biểu Khối 12</span>
    <h2 class="ho-ten">Nguyễn Văn An</h2>
    <p class="thong-tin">Lớp: 12A1 - Trường THPT Chuyên</p>
    <p class="thanh-tich">Thành tích: Giải Nhất Học sinh Giỏi Tin học cấp Tỉnh</p>
  </div>
</body>
</html>`,
    solutionCss: `body {
  background-color: #f1f5f9;
  font-family: Arial, sans-serif;
  padding: 40px;
  display: flex;
  justify-content: center;
}

.the-hoc-sinh {
  background-color: #ffffff;
  border: 2px solid #3b82f6;
  border-radius: 16px;
  padding: 24px;
  max-width: 420px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.huy-hieu {
  display: inline-block;
  background-color: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
  font-weight: bold;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 9999px;
  margin-bottom: 12px;
}

.ho-ten {
  color: #1e3a8a;
  font-size: 22px;
  margin: 0 0 8px 0;
}

.thong-tin {
  color: #475569;
  margin: 4px 0;
}

.thanh-tich {
  color: #047857;
  font-weight: bold;
  background-color: #ecfdf5;
  padding: 8px 12px;
  border-radius: 8px;
  border-left: 3px solid #10b981;
}`,
    evaluate: (doc: Document, _htmlString: string, cssString = ''): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const combinedCss = (cssString + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();

      // Test 1: color with HEX or rgb
      const hasHexColor = /color:\s*#[0-9a-f]{3,6}/i.test(combinedCss);
      const hasRgbColor = /color:\s*rgba?\([^)]+\)/i.test(combinedCss);
      const pass1 = hasHexColor || hasRgbColor || combinedCss.includes('color:');
      results.push({
        id: 'b15_c1',
        title: 'Màu chữ (color) chuẩn mã màu',
        passed: pass1,
        message: pass1
          ? 'Đã thiết lập màu chữ bằng mã màu chuyên nghiệp (HEX hoặc RGB).'
          : 'Cần có thuộc tính color sử dụng mã HEX (ví dụ: color: #1e40af;) hoặc RGB.',
      });

      // Test 2: background-color with HEX, RGB or RGBA
      const hasBgColor = combinedCss.includes('background-color:') || combinedCss.includes('background:');
      results.push({
        id: 'b15_c2',
        title: 'Màu nền (background-color)',
        passed: hasBgColor,
        message: hasBgColor
          ? 'Đã cấu hình màu nền background-color cho giao diện.'
          : 'Chưa có thuộc tính background-color để tạo màu nền.',
      });

      // Test 3: border and border-radius
      const hasBorder = combinedCss.includes('border:') || combinedCss.includes('border-color:');
      const hasBorderRadius = combinedCss.includes('border-radius:');
      const pass3 = hasBorder && hasBorderRadius;
      results.push({
        id: 'b15_c3',
        title: 'Khung viền (border) & Bo góc (border-radius)',
        passed: pass3,
        message: pass3
          ? 'Đã tạo khung viền màu sắc (border) kết hợp bo góc (border-radius) hiện đại.'
          : `Cần có cả thuộc tính viền border (${hasBorder ? '✓' : 'chưa có'}) và bo góc border-radius (${hasBorderRadius ? '✓' : 'chưa có'}).`,
      });

      // Test 4: multi color / rgba
      const hasRgba = combinedCss.includes('rgba(');
      const colorMatches = combinedCss.match(/(#[0-9a-f]{3,6}|rgba?\([^)]+\))/gi) || [];
      const pass4 = hasRgba || colorMatches.length >= 2;
      results.push({
        id: 'b15_c4',
        title: 'Phối màu tương phản / RGBA',
        passed: pass4,
        message: pass4
          ? `Tuyệt vời! Đã áp dụng phối màu đa sắc độ (${colorMatches.length} mã màu) tạo độ tương phản cao.`
          : 'Hãy dùng thêm màu nền cho nhãn huy hiệu hoặc sử dụng màu trong suốt rgba(...) để làm nổi bật.',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 16: ĐỊNH DẠNG KHUNG (CSS BOX MODEL)
  // ==========================================
  {
    id: 16,
    lessonNumber: 'Bài 16',
    title: 'Định dạng khung (Box Model)',
    subtitle: 'Mô hình hộp trong CSS: Kích thước width, vùng đệm padding, viền border, lề ngoài margin',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 16 (Trang 94-99)',
    objective:
      'Nắm vững mô hình hộp (Box Model) trong CSS gồm 4 lớp từ trong ra ngoài: Content (nội dung), Padding (khoảng đệm bên trong), Border (đường viền), Margin (khoảng lề bên ngoài). Sử dụng thành thạo các thuộc tính width, height, max-width; padding (trên, dưới, trái, phải); margin (căn giữa với margin: auto); và thuộc tính box-sizing: border-box để kiểm soát kích thước khối chính xác.',
    theorySummary: [
      'Mọi phần tử HTML trên trang web đều được trình duyệt biểu diễn dưới dạng một khối hình hộp chữ nhật (Box Model).',
      'Content: Khu vực chứa văn bản, hình ảnh, có kích thước quy định bởi width và height.',
      'Padding: Khoảng cách giữa nội dung và đường viền (padding: 16px; hoặc padding: 12px 20px;).',
      'Border: Đường viền bao quanh phần đệm (border: 2px solid #2563eb;).',
      'Margin: Khoảng cách giữa đường viền của khối với các phần tử xung quanh. margin: auto; giúp căn giữa khối có chiều rộng cố định.',
      'box-sizing: border-box;: Thuộc tính quan trọng giúp kích thước width bao gồm cả padding và border, chống tràn khung.',
    ],
    quickReferences: [
      {
        tag: 'margin: 0 auto;',
        name: 'Căn giữa khối nội dung',
        syntax: 'margin: 20px auto;',
        example: '.hop-tin {\n  width: 500px;\n  margin: 20px auto;\n}',
        description: 'Tự động tính toán khoảng cách 2 bên trái/phải bằng nhau để đặt khối ra chính giữa màn hình.',
      },
      {
        tag: 'padding: 16px;',
        name: 'Vùng đệm lề trong',
        syntax: 'padding: 16px 24px;',
        example: '.khung {\n  padding: 20px;\n}',
        description: 'Tạo khoảng cách thở giữa chữ và đường viền để văn bản không bị dính sát mép khung.',
      },
      {
        tag: 'box-sizing: border-box;',
        name: 'Khóa kích thước hộp',
        syntax: 'box-sizing: border-box;',
        example: '* {\n  box-sizing: border-box;\n}',
        description: 'Đảm bảo tổng chiều rộng của hộp luôn đúng bằng giá trị width đã khai báo.',
      },
      {
        tag: 'border: 1px solid #cbd5e1;',
        name: 'Đường viền bao quanh',
        syntax: 'border: 2px solid #3b82f6;',
        example: '.khung {\n  border: 1px solid #94a3b8;\n  border-radius: 8px;\n}',
        description: 'Quy định đường bao quanh phân tách khối nội dung với phần còn lại của trang.',
      },
    ],
    checklists: [
      {
        id: 'b16_c1',
        title: 'Khai báo kích thước khối (width hoặc max-width)',
        description: 'Thiết lập chiều rộng cho khung nội dung bằng width (ví dụ 500px, 600px) hoặc max-width.',
        hint: 'Viết width: 500px; hoặc max-width: 600px; trong quy tắc CSS của lớp khung.',
      },
      {
        id: 'b16_c2',
        title: 'Căn giữa khối bằng lề ngoài (margin: auto)',
        description: 'Sử dụng margin: auto hoặc margin: 20px auto để căn giữa hộp nội dung theo chiều ngang.',
        hint: 'Thêm margin: 20px auto; vào lớp khung thông tin.',
      },
      {
        id: 'b16_c3',
        title: 'Vùng đệm lề trong (padding)',
        description: 'Tạo khoảng cách giữa nội dung và mép viền bằng thuộc tính padding từ 12px trở lên.',
        hint: 'Viết padding: 20px; trong CSS để nội dung không bị dính sát đường viền.',
      },
      {
        id: 'b16_c4',
        title: 'Đường viền (border) và thuộc tính box-sizing',
        description: 'Có đường viền border rõ ràng và khai báo thuộc tính box-sizing: border-box.',
        hint: 'Thêm border: 2px solid #2563eb; và box-sizing: border-box;.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thethao')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Định dạng khung bằng CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Khung bảng tin sinh hoạt học đường -->
  <div class="khung-tin-tuc">
    <h2>BẢN TIN HOẠT ĐỘNG NGOẠI KHÓA KHỐI 12</h2>
    <p>
      Tuần tới, nhà trường tổ chức chuỗi hoạt động hướng nghiệp và ngày hội thể thao dành riêng cho học sinh khối 12. Tất cả các lớp tham gia đăng ký theo lịch hướng dẫn của Đoàn trường.
    </p>
    <div class="nut-xem-them">Xem chi tiết lịch thi đấu</div>
  </div>
</body>
</html>`,
    initialCss: `/* Áp dụng mô hình hộp Box Model cho Bài 16 */

body {
  background-color: #f8fafc;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

.khung-tin-tuc {
  /* Thiết lập width, margin: auto, padding, border, box-sizing */
  
}

.nut-xem-them {
  /* Định dạng nút bấm với padding và margin */
  
}
`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Định dạng khung bằng CSS - Bài 16</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="khung-tin-tuc">
    <h2>BẢN TIN HOẠT ĐỘNG NGOẠI KHÓA KHỐI 12</h2>
    <p>
      Tuần tới, nhà trường tổ chức chuỗi hoạt động hướng nghiệp và ngày hội thể thao dành riêng cho học sinh khối 12. Tất cả các lớp tham gia đăng ký theo lịch hướng dẫn của Đoàn trường.
    </p>
    <div class="nut-xem-them">Xem chi tiết lịch thi đấu</div>
  </div>
</body>
</html>`,
    solutionCss: `* {
  box-sizing: border-box;
}

body {
  background-color: #f1f5f9;
  font-family: Arial, Helvetica, sans-serif;
  padding: 30px;
}

.khung-tin-tuc {
  width: 550px;
  max-width: 100%;
  margin: 40px auto;
  padding: 28px;
  background-color: #ffffff;
  border: 2px solid #2563eb;
  border-radius: 14px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.khung-tin-tuc h2 {
  color: #1e40af;
  margin-top: 0;
  margin-bottom: 14px;
  font-size: 20px;
}

.khung-tin-tuc p {
  color: #334155;
  line-height: 1.6;
  margin-bottom: 20px;
}

.nut-xem-them {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}`,
    evaluate: (doc: Document, _htmlString: string, cssString = ''): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const combinedCss = (cssString + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();

      // Test 1: width or max-width
      const hasWidth = combinedCss.includes('width:') || combinedCss.includes('max-width:');
      results.push({
        id: 'b16_c1',
        title: 'Kích thước khối (width / max-width)',
        passed: hasWidth,
        message: hasWidth
          ? 'Đã khai báo kích thước width hoặc max-width cho khối nội dung.'
          : 'Cần có thuộc tính width (ví dụ: width: 500px;) hoặc max-width trong CSS.',
      });

      // Test 2: margin: auto
      const hasMarginAuto = combinedCss.includes('margin: auto') || combinedCss.includes('margin:auto') || combinedCss.includes('auto;') || /margin:\s*[^;]*auto/i.test(combinedCss);
      results.push({
        id: 'b16_c2',
        title: 'Căn giữa khối bằng lề ngoài (margin: auto)',
        passed: hasMarginAuto,
        message: hasMarginAuto
          ? 'Đã sử dụng margin: auto để căn giữa khối trên màn hình chuẩn xác.'
          : 'Cần sử dụng margin: auto hoặc margin: 20px auto; để căn giữa khối hình hộp.',
      });

      // Test 3: padding
      const hasPadding = combinedCss.includes('padding:') || combinedCss.includes('padding-');
      results.push({
        id: 'b16_c3',
        title: 'Vùng đệm lề trong (padding)',
        passed: hasPadding,
        message: hasPadding
          ? 'Đã tạo khoảng đệm lề trong padding giúp nội dung thoáng đãng.'
          : 'Chưa có thuộc tính padding để tạo vùng đệm bên trong đường viền.',
      });

      // Test 4: border & box-sizing
      const hasBorder = combinedCss.includes('border:') || combinedCss.includes('border-');
      const hasBoxSizing = combinedCss.includes('box-sizing:') || combinedCss.includes('border-box');
      const pass4 = hasBorder && hasBoxSizing;
      results.push({
        id: 'b16_c4',
        title: 'Đường viền (border) & box-sizing: border-box',
        passed: pass4,
        message: pass4
          ? 'Đã cấu hình đường viền border và áp dụng box-sizing: border-box chống vỡ layout.'
          : `Cần có cả thuộc tính border (${hasBorder ? '✓' : 'chưa có'}) và box-sizing: border-box (${hasBoxSizing ? '✓' : 'chưa có'}).`,
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 17: CÁC MỨC ƯU TIÊN CỦA BỘ CHỌN
  // ==========================================
  {
    id: 17,
    lessonNumber: 'Bài 17',
    title: 'Các mức ưu tiên của bộ chọn',
    subtitle: 'Nguyên tắc thác nước Cascade, trọng số ưu tiên: Thẻ < Lớp (.class) < Định danh (#id) < Inline',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 17 (Trang 100-105)',
    objective:
      'Hiểu rõ nguyên tắc phân giải xung đột trong CSS (Cascading & Specificity). Nắm vững thứ tự ưu tiên của các bộ chọn: Bộ chọn định danh (#id) có độ ưu tiên cao hơn Bộ chọn lớp (.class), Bộ chọn lớp có độ ưu tiên cao hơn Bộ chọn phần tử (thẻ HTML). Hiểu thứ tự xuất hiện (quy tắc viết sau ghi đè quy tắc viết trước cùng cấp độ), và vai trò của định kiểu nội dòng (style="") cùng từ khóa !important.',
    theorySummary: [
      'Khi nhiều quy tắc CSS cùng định dạng cho một thuộc tính của một phần tử, trình duyệt sẽ dùng trọng số ưu tiên (Specificity) để xác định quy tắc chiến thắng.',
      'Bảng trọng số ưu tiên: Thẻ phần tử HTML (1 điểm) < Lớp .class (10 điểm) < Định danh #id (100 điểm) < Style nội dòng (1000 điểm).',
      'Nếu hai bộ chọn có cùng trọng số: Quy tắc nào được viết sau trong mã nguồn sẽ ghi đè quy tắc viết trước.',
      'Từ khóa !important: Đặt sau giá trị thuộc tính (ví dụ: color: red !important;) sẽ bỏ qua mọi quy tắc thông thường và đạt mức ưu tiên tối thượng.',
      'Hiểu quy tắc ưu tiên giúp lập trình viên kiểm soát giao diện và sửa lỗi xung đột định dạng dễ dàng.',
    ],
    quickReferences: [
      {
        tag: 'p { color: ...; }',
        name: 'Độ ưu tiên cấp 1 (Thẻ)',
        syntax: 'p { color: #64748b; }',
        example: 'p {\n  color: #64748b;\n}',
        description: 'Trọng số thấp nhất trong 3 loại bộ chọn, áp dụng mặc định cho mọi đoạn văn bản.',
      },
      {
        tag: '.class { color: ...; }',
        name: 'Độ ưu tiên cấp 2 (Lớp)',
        syntax: '.noi-bat { color: #2563eb; }',
        example: '.noi-bat {\n  color: #2563eb;\n}',
        description: 'Trọng số ưu tiên cao hơn thẻ, sẽ ghi đè màu sắc do thẻ p quy định.',
      },
      {
        tag: '#id { color: ...; }',
        name: 'Độ ưu tiên cấp 3 (Định danh)',
        syntax: '#dac-biet { color: #dc2626; }',
        example: '#dac-biet {\n  color: #dc2626;\n}',
        description: 'Trọng số ưu tiên cao hơn lớp, sẽ ghi đè màu của cả class và thẻ p.',
      },
      {
        tag: '!important',
        name: 'Ưu tiên tối thượng',
        syntax: 'color: green !important;',
        example: '.bat-buoc {\n  color: green !important;\n}',
        description: 'Ghi đè tất cả các quy tắc khác bất kể bộ chọn hay vị trí khai báo.',
      },
    ],
    checklists: [
      {
        id: 'b17_c1',
        title: 'Quy tắc bộ chọn phần tử (thẻ p hoặc h2)',
        description: 'Khai báo một thuộc tính (như color) cho bộ chọn phần tử p { color: ...; } làm mức ưu tiên cơ bản.',
        hint: 'Viết p { color: #64748b; } trong tab style.css.',
      },
      {
        id: 'b17_c2',
        title: 'Bộ chọn lớp (.class) ghi đè bộ chọn phần tử',
        description: 'Khai báo lớp .lop-uutien { color: ...; } cùng thuộc tính để kiểm chứng lớp ghi đè thẻ phần tử.',
        hint: 'Viết .lop-uutien { color: #2563eb; } và gán class="lop-uutien" vào thẻ HTML.',
      },
      {
        id: 'b17_c3',
        title: 'Bộ chọn định danh (#id) ghi đè bộ chọn lớp',
        description: 'Khai báo định danh #id-uutien { color: ...; } cùng thuộc tính để kiểm chứng id ghi đè class.',
        hint: 'Viết #id-uutien { color: #dc2626; } và gán id="id-uutien" vào phần tử.',
      },
      {
        id: 'b17_c4',
        title: 'Phần tử thực nghiệm có đủ cả thẻ, class và id',
        description: 'Có ít nhất một phần tử HTML đồng thời mang cả thuộc tính class và id để quan sát thứ tự ưu tiên.',
        hint: 'Viết <p class="lop-uutien" id="id-uutien">Đoạn văn thử nghiệm mức ưu tiên</p>.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Các mức ưu tiên của bộ chọn CSS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>THỰC NGHIỆM MỨC ĐỘ ƯU TIÊN CSS (BÀI 17)</h1>

  <!-- Đoạn 1: Chỉ mang bộ chọn phần tử -->
  <p>1. Đoạn văn thông thường chịu tác động của bộ chọn thẻ p.</p>

  <!-- Đoạn 2: Mang cả bộ chọn thẻ và bộ chọn lớp -->
  <p class="lop-uutien">2. Đoạn văn mang class (Lớp sẽ ghi đè thẻ p).</p>

  <!-- Đoạn 3: Mang cả thẻ, lớp và định danh id -->
  <p class="lop-uutien" id="id-uutien">
    3. Đoạn văn mang cả class và id (ID sẽ chiến thắng cả Lớp và Thẻ).
  </p>
</body>
</html>`,
    initialCss: `/* Thử nghiệm mức ưu tiên bộ chọn trong Bài 17 */

/* Mức 1: Bộ chọn phần tử (Ưu tiên thấp nhất) */
p {
  color: #64748b;
  font-size: 16px;
}

/* Mức 2: Bộ chọn lớp (Ghi đè phần tử) */
.lop-uutien {
  
}

/* Mức 3: Bộ chọn định danh (Ghi đè lớp và phần tử) */
#id-uutien {
  
}
`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Các mức ưu tiên của bộ chọn CSS - Bài 17</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>THỰC NGHIỆM MỨC ĐỘ ƯU TIÊN CSS (BÀI 17)</h1>

  <p>1. Đoạn văn thông thường chịu tác động của bộ chọn thẻ p (Màu xám).</p>

  <p class="lop-uutien">2. Đoạn văn mang class: Bộ chọn lớp ghi đè thẻ p (Màu xanh dương).</p>

  <p class="lop-uutien" id="id-uutien">
    3. Đoạn văn mang cả class và id: Bộ chọn ID chiến thắng cả Lớp và Thẻ (Màu đỏ)!
  </p>
</body>
</html>`,
    solutionCss: `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background-color: #f8fafc;
}

h1 {
  color: #0f172a;
  border-bottom: 2px solid #cbd5e1;
  padding-bottom: 8px;
}

/* Mức 1: Trọng số 1 - Bộ chọn phần tử */
p {
  color: #64748b;
  font-size: 16px;
  line-height: 1.6;
  padding: 8px 12px;
  background-color: #ffffff;
  border-left: 4px solid #cbd5e1;
}

/* Mức 2: Trọng số 10 - Bộ chọn lớp (Ghi đè p) */
.lop-uutien {
  color: #2563eb;
  border-left-color: #2563eb;
  font-weight: 500;
}

/* Mức 3: Trọng số 100 - Bộ chọn định danh ID (Ghi đè .lop-uutien) */
#id-uutien {
  color: #dc2626;
  border-left-color: #dc2626;
  font-weight: bold;
}`,
    evaluate: (doc: Document, _htmlString: string, cssString = ''): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const combinedCss = (cssString + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();

      // Test 1: element selector with color
      const hasElemColor = /(^|\s|})p\s*\{[^}]*color:/i.test(combinedCss);
      results.push({
        id: 'b17_c1',
        title: 'Bộ chọn phần tử (p { color: ...; })',
        passed: hasElemColor,
        message: hasElemColor
          ? 'Đã khai báo màu sắc trong bộ chọn phần tử p làm mức ưu tiên cơ bản.'
          : 'Cần có quy tắc p { color: ...; } trong CSS.',
      });

      // Test 2: class selector with color
      const hasClassColor = /\.[a-z0-9_-]+\s*\{[^}]*color:/i.test(combinedCss);
      results.push({
        id: 'b17_c2',
        title: 'Bộ chọn lớp (.class { color: ...; })',
        passed: hasClassColor,
        message: hasClassColor
          ? 'Đã khai báo bộ chọn lớp với thuộc tính color để kiểm chứng độ ưu tiên cao hơn thẻ.'
          : 'Cần có quy tắc bộ chọn lớp .tên_lớp { color: ...; } trong CSS.',
      });

      // Test 3: ID selector with color
      const hasIdColor = /#[a-z0-9_-]+\s*\{[^}]*color:/i.test(combinedCss);
      results.push({
        id: 'b17_c3',
        title: 'Bộ chọn định danh (#id { color: ...; })',
        passed: hasIdColor,
        message: hasIdColor
          ? 'Đã khai báo bộ chọn định danh #id với thuộc tính color để kiểm chứng độ ưu tiên cao hơn lớp.'
          : 'Cần có quy tắc bộ chọn định danh #tên_id { color: ...; } trong CSS.',
      });

      // Test 4: Element having both class and id in HTML
      const elemWithClassAndId = doc.querySelector('p[class][id], div[class][id]');
      const pass4 = !!elemWithClassAndId;
      results.push({
        id: 'b17_c4',
        title: 'Phần tử kiểm chứng đồng thời có class và id',
        passed: pass4,
        message: pass4
          ? `Đã tạo phần tử <${elemWithClassAndId?.tagName.toLowerCase()}> mang đồng thời cả class và id để kiểm chứng độ ưu tiên thực tế.`
          : 'Cần có một phần tử trong HTML mang cả thuộc tính class và thuộc tính id (ví dụ: <p class="..." id="...">).',
      });

      return results;
    },
  },

  // ==========================================
  // BÀI 18: THỰC HÀNH TỔNG HỢP THIẾT KẾ TRANG WEB
  // ==========================================
  {
    id: 18,
    lessonNumber: 'Bài 18',
    title: 'Thực hành tổng hợp thiết kế trang web',
    subtitle: 'Dự án thực tế: Xây dựng Website hoàn chỉnh kết hợp HTML cấu trúc và CSS giao diện',
    sgkSection: 'Sách giáo khoa Tin học 12 - Chủ đề 4, Bài 18 (Trang 106-112)',
    objective:
      'Vận dụng tổng hợp toàn bộ kỹ năng đã học trong Chủ đề 4 (từ Bài 7 đến Bài 17) để xây dựng một website hoàn chỉnh theo quy trình chuẩn: Phân tích yêu cầu, thiết kế cấu trúc tài liệu HTML (Header, Navigation, Banner, Bảng Table, Biểu mẫu Form, Đa phương tiện), và lập trình giao diện CSS thẩm mỹ, hài hòa theo mô hình hộp Box Model và các bảng màu tương phản.',
    theorySummary: [
      'Quy trình xây dựng trang web hoàn chỉnh: 1. Xác định mục tiêu và nội dung; 2. Thiết kế khung sườn HTML; 3. Tạo phong cách CSS đồng bộ; 4. Kiểm thử hiển thị trên các thiết bị.',
      'Cấu trúc trang web tiêu chuẩn: Header (đầu trang), Nav (thanh điều hướng), Main/Section (nội dung chính), Aside (thanh phụ), Footer (chân trang).',
      'Kết hợp linh hoạt các thẻ: Bảng biểu <table> cho thời khóa biểu/lịch hoạt động, Biểu mẫu <form> cho đăng ký/liên hệ, Đa phương tiện <img>/<video>/<iframe>.',
      'Nguyên tắc thiết kế CSS chuyên nghiệp: Font chữ đồng nhất (font-family), khoảng cách thoáng đãng (padding, margin, line-height), màu sắc chủ đạo và điểm nhấn.',
    ],
    quickReferences: [
      {
        tag: '<nav> & <ul>',
        name: 'Thanh điều hướng Menu',
        syntax: '<nav><ul><li><a href="...">Trang chủ</a></li></ul></nav>',
        example: '<nav class="menu">\n  <a href="#gioithieu">Giới thiệu</a>\n  <a href="#lich">Lịch sinh hoạt</a>\n  <a href="#dangky">Đăng ký</a>\n</nav>',
        description: 'Tạo menu chuyển trang hoặc cuộn nhanh tới các phân đoạn nội dung.',
      },
      {
        tag: '<section id="...">',
        name: 'Phân đoạn nội dung',
        syntax: '<section id="lich"><h2>Lịch hoạt động</h2></section>',
        example: '<section id="lich">\n  <!-- Bảng biểu table hoặc form -->\n</section>',
        description: 'Chia trang web thành các khối nội dung rành mạch, dễ quản lý.',
      },
      {
        tag: '<footer>...</footer>',
        name: 'Chân trang',
        syntax: '<footer><p>&copy; 2025 THPT</p></footer>',
        example: '<footer>\n  <p>&copy; 2025 CLB Thể Thao THPT - Khóa 12</p>\n</footer>',
        description: 'Chứa thông tin bản quyền tác giả, địa chỉ liên hệ và liên kết mạng xã hội.',
      },
    ],
    checklists: [
      {
        id: 'b18_c1',
        title: 'Bố cục trang hoàn chỉnh (header, nav, section, footer)',
        description: 'Có đầy đủ các khu vực chính của website: phần đầu trang (header), menu (nav), các phân đoạn nội dung (section hoặc div có id), và chân trang (footer).',
        hint: 'Sử dụng các thẻ ngữ nghĩa <header>, <nav>, <section>, <footer> trong body.',
      },
      {
        id: 'b18_c2',
        title: 'Thanh menu điều hướng liên kết (<nav> hoặc <a>)',
        description: 'Có ít nhất 3 liên kết menu trong phần điều hướng (ví dụ: Giới thiệu, Lịch hoạt động, Đăng ký).',
        hint: 'Tạo <nav><a href="#gioithieu">Giới thiệu</a> <a href="#lich">Lịch sinh hoạt</a> <a href="#dangky">Đăng ký</a></nav>.',
      },
      {
        id: 'b18_c3',
        title: 'Tích hợp Bảng dữ liệu (<table>) & Biểu mẫu (<form>)',
        description: 'Trang web chứa cả một bảng thông tin (table) và một biểu mẫu liên hệ hoặc đăng ký (form).',
        hint: 'Nhúng bảng lịch hoạt động và form đăng ký thành viên vào các thẻ section.',
      },
      {
        id: 'b18_c4',
        title: 'Định dạng CSS tổng thể (Box Model & Màu sắc)',
        description: 'Tệp style.css áp dụng font-family, màu sắc tương phản (color, background-color), padding, margin và border-radius cho các khối hộp.',
        hint: 'Viết đầy đủ các quy tắc CSS định dạng menu, bảng, form và các khối nội dung trong style.css.',
      },
    ],
    mockAssets: [
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thethao')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_sun')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_lop12a1')!,
      GLOBAL_MOCK_ASSETS.find((a) => a.id === 'asset_thong_tin')!,
    ],
    initialHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Cổng thông tin CLB Trường THPT - Dự án Bài 18</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- BÀI 18: THỰC HÀNH TỔNG HỢP THIẾT KẾ WEBSITE -->

  <!-- 1. Header & Menu Navigation -->
  <header>
    <h1>CLB KỸ NĂNG & THỂ THAO TRƯỜNG THPT</h1>
    <nav>
      <!-- Menu các mục -->
    </nav>
  </header>

  <!-- 2. Section Bảng lịch hoạt động -->
  <section id="lich">
    <!-- Thêm bảng table -->
  </section>

  <!-- 3. Section Biểu mẫu đăng ký -->
  <section id="dangky">
    <!-- Thêm biểu mẫu form -->
  </section>

  <!-- 4. Footer chân trang -->
  <footer>
    <p>&copy; 2025 Tin học 12 - Bộ Kết nối tri thức với cuộc sống</p>
  </footer>
</body>
</html>`,
    initialCss: `/* CSS Thiết kế hoàn chỉnh cho Dự án Bài 18 */

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  color: #1e293b;
}

header {
  
}

nav a {
  
}

table {
  
}

form {
  
}

footer {
  
}
`,
    solutionHtml: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Cổng thông tin CLB Trường THPT - Bài 18</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 1. Đầu trang & Menu -->
  <header>
    <div class="banner">
      <h1>CLB KỸ NĂNG & THỂ THAO TRƯỜNG THPT</h1>
      <p>Nơi rèn luyện sức khỏe, chia sẻ kinh nghiệm học tập khối 12</p>
    </div>
    <nav>
      <a href="#gioithieu">Giới thiệu</a>
      <a href="#lich">Lịch sinh hoạt</a>
      <a href="#dangky">Đăng ký tham gia</a>
    </nav>
  </header>

  <main>
    <!-- 2. Giới thiệu -->
    <section id="gioithieu" class="khoi-noi-dung">
      <h2>Giới thiệu Câu lạc bộ</h2>
      <p>Câu lạc bộ được thành lập nhằm tạo sân chơi bổ ích cho học sinh sau những giờ học căng thẳng, sẵn sàng tâm thế cho kỳ thi Tốt nghiệp THPT.</p>
      <img src="images/thethao.png" alt="CLB Thể thao" width="400">
    </section>

    <!-- 3. Bảng lịch hoạt động -->
    <section id="lich" class="khoi-noi-dung">
      <h2>Lịch sinh hoạt hàng tuần</h2>
      <table border="1">
        <caption>LỊCH HOẠT ĐỘNG THỂ THAO VÀ KỸ NĂNG</caption>
        <tr>
          <th>Thứ</th>
          <th>Nội dung</th>
          <th>Địa điểm</th>
          <th>Phụ trách</th>
        </tr>
        <tr>
          <td>Thứ 3</td>
          <td>Bóng đá & Cầu lông</td>
          <td>Sân trường</td>
          <td>Thầy Nam</td>
        </tr>
        <tr>
          <td>Thứ 5</td>
          <td>Bóng rổ</td>
          <td>Nhà đa năng</td>
          <td>Cô Thảo</td>
        </tr>
        <tr>
          <td>Thứ 7</td>
          <td>Tọa đàm ôn thi</td>
          <td>Phòng Tin học 1</td>
          <td>Thầy Hoàng</td>
        </tr>
      </table>
    </section>

    <!-- 4. Biểu mẫu đăng ký -->
    <section id="dangky" class="khoi-noi-dung">
      <h2>Đăng ký gia nhập Câu lạc bộ</h2>
      <form action="" method="post">
        <div class="dong-form">
          <label for="hoten">Họ và tên học sinh:</label>
          <input type="text" id="hoten" name="hoten" placeholder="Nguyễn Văn A" required>
        </div>
        <div class="dong-form">
          <label for="lop">Lớp học:</label>
          <input type="text" id="lop" name="lop" placeholder="12A1" required>
        </div>
        <div class="dong-form">
          <label for="bomon">Bộ môn quan tâm:</label>
          <select id="bomon" name="bomon">
            <option>Bóng đá</option>
            <option>Bóng rổ</option>
            <option>Cầu lông</option>
            <option>Kỹ năng Tin học</option>
          </select>
        </div>
        <div class="dong-form">
          <input type="submit" value="Gửi đơn đăng ký">
        </div>
      </form>
    </section>
  </main>

  <!-- 5. Chân trang -->
  <footer>
    <p>&copy; 2025 Cổng thông tin học sinh Trường THPT - Bài thực hành 18 Tin học 12</p>
  </footer>
</body>
</html>`,
    solutionCss: `* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
}

header {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  text-align: center;
  padding: 30px 20px 0 20px;
}

header h1 {
  margin: 0 0 10px 0;
  font-size: 26px;
}

nav {
  margin-top: 20px;
  background-color: rgba(15, 23, 42, 0.4);
  padding: 12px;
  border-radius: 8px 8px 0 0;
}

nav a {
  color: #f1f5f9;
  text-decoration: none;
  font-weight: bold;
  margin: 0 15px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

main {
  max-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
}

.khoi-noi-dung {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.khoi-noi-dung h2 {
  color: #1e40af;
  border-bottom: 2px solid #dbeafe;
  padding-bottom: 8px;
  margin-top: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #cbd5e1;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #eff6ff;
  color: #1e40af;
}

.dong-form {
  margin-bottom: 15px;
}

.dong-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.dong-form input[type="text"], .dong-form select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.dong-form input[type="submit"] {
  background-color: #2563eb;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

footer {
  background-color: #0f172a;
  color: #94a3b8;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  font-size: 13px;
}`,
    evaluate: (doc: Document, _htmlString: string, cssString = ''): DomTestResult[] => {
      const results: DomTestResult[] = [];
      const combinedCss = (cssString + ' ' + Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join(' ')).toLowerCase();

      // Test 1: Layout structure (header, nav, section, footer)
      const hasHeader = !!doc.querySelector('header');
      const hasNav = !!doc.querySelector('nav');
      const hasSection = doc.querySelectorAll('section, main, article').length >= 1;
      const hasFooter = !!doc.querySelector('footer');
      const pass1 = hasHeader && hasNav && hasSection && hasFooter;
      results.push({
        id: 'b18_c1',
        title: 'Cấu trúc website chuẩn (header, nav, section, footer)',
        passed: pass1,
        message: pass1
          ? 'Đã xây dựng đầy đủ các khối cấu trúc website chuẩn (header, nav, section, footer).'
          : `Còn thiếu: ${!hasHeader ? '<header>, ' : ''}${!hasNav ? '<nav>, ' : ''}${!hasSection ? '<section>, ' : ''}${!hasFooter ? '<footer>' : ''}.`,
      });

      // Test 2: Navigation menu links (at least 3 links)
      const navLinks = doc.querySelectorAll('nav a, header a');
      const pass2 = navLinks.length >= 2;
      results.push({
        id: 'b18_c2',
        title: 'Thanh menu điều hướng (nav chứa các liên kết a)',
        passed: pass2,
        message: pass2
          ? `Đã tạo menu điều hướng với ${navLinks.length} liên kết trang/mục.`
          : `Thanh menu cần ít nhất 2 liên kết (hiện có: ${navLinks.length}). Thêm các thẻ <a> trong <nav>.`,
      });

      // Test 3: Integrated Table and Form
      const hasTable = !!doc.querySelector('table');
      const hasForm = !!doc.querySelector('form');
      const pass3 = hasTable && hasForm;
      results.push({
        id: 'b18_c3',
        title: 'Tích hợp Bảng dữ liệu (<table>) & Biểu mẫu (<form>)',
        passed: pass3,
        message: pass3
          ? 'Đã nhúng cả Bảng dữ liệu thông tin và Biểu mẫu đăng ký tương tác vào website.'
          : `Cần có cả bảng dữ liệu <table> (${hasTable ? '✓' : 'chưa có'}) và biểu mẫu <form> (${hasForm ? '✓' : 'chưa có'}).`,
      });

      // Test 4: Overall CSS styling
      const hasBoxModel = combinedCss.includes('padding:') && combinedCss.includes('margin:');
      const hasColors = combinedCss.includes('color:') && (combinedCss.includes('background-color:') || combinedCss.includes('background:'));
      const pass4 = hasBoxModel && hasColors;
      results.push({
        id: 'b18_c4',
        title: 'Định dạng CSS tổng thể (Box Model & Phối màu)',
        passed: pass4,
        message: pass4
          ? 'Giao diện CSS hoàn chỉnh với đầy đủ padding, margin, màu sắc và typography.'
          : 'Cần bổ sung định dạng CSS toàn diện cho bố cục (margin, padding) và màu sắc (color, background-color).',
      });

      return results;
    },
  },
];
