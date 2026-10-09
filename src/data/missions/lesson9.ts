import { LessonMission } from '../../types';

export const LESSON_9_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Lịch CLB Thể thao (Hình 9.8 SGK)',
    description: 'Thiết kế bảng lịch hoạt động CLB Thể thao chuẩn SGK Tin học 12: có tiêu đề <caption>, gộp cột colspan="5" cho ô "Ngày" và gộp dòng rowspan="2" cho "Bộ môn" & "GV phụ trách".',
    requirements: [
      'Bảng <table> có tiêu đề <caption> rõ ràng',
      'Có thuộc tính border="1" để hiển thị khung viền',
      'Có ô gộp dòng rowspan="2" cho cột Bộ môn và Giáo viên',
      'Có ô gộp cột colspan="5" cho hàng tiêu đề các ngày trong tuần'
    ],
    targetResult: {
      title: 'Lịch hoạt động CLB Thể thao SGK',
      description: 'Bảng chuẩn kỹ thuật gộp dòng rowspan=2 và gộp cột colspan=5.',
      html: `<!DOCTYPE html>
<html>
<head><title>Lịch CLB</title></head>
<body>
  <table border="1" cellpadding="6" style="border-collapse: collapse;">
    <caption><b>Lịch hoạt động các CLB Thể thao</b></caption>
    <tr style="background: #e0f2fe;">
      <th rowspan="2">Bộ môn</th>
      <th rowspan="2">GV phụ trách</th>
      <th colspan="5">Ngày trong tuần</th>
    </tr>
    <tr style="background: #f0fdf4;">
      <th>Thứ 2</th><th>Thứ 3</th><th>Thứ 4</th><th>Thứ 5</th><th>Thứ 6</th>
    </tr>
    <tr>
      <td>Bóng đá</td><td>Thầy Nam</td><td>✓</td><td></td><td>✓</td><td></td><td>✓</td>
    </tr>
  </table>
</body>
</html>`
    },
    hint: 'rowspan="2" gộp 2 hàng dọc liên tiếp; colspan="5" mở rộng 1 ô trải dài qua 5 cột ngang.',
    checkCriteria: (doc) => {
      const hasCaption = !!doc.querySelector('table caption');
      const hasRowspan = doc.querySelectorAll('[rowspan="2"]').length >= 2;
      const hasColspan = doc.querySelectorAll('[colspan="5"]').length >= 1;
      const passed = hasCaption && hasRowspan && hasColspan;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Đã thiết kế đúng bảng CLB với caption, rowspan="2" và colspan="5"!'
          : `Còn thiếu: ${!hasCaption ? '<caption>, ' : ''}${!hasRowspan ? 'Ít nhất 2 ô rowspan="2", ' : ''}${!hasColspan ? 'Ô colspan="5"' : ''}`
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Thời khóa biểu tuần 12A1',
    description: 'Tạo bảng thời khóa biểu buổi sáng lớp 12A1 với 5 tiết học mỗi ngày, sử dụng thẻ <th> cho hàng tiêu đề các thứ.',
    requirements: [
      'Thẻ <table> có thuộc tính border',
      'Hàng đầu tiên sử dụng các thẻ tiêu đề cột <th> (Tiết, Thứ 2, Thứ 3, ...)',
      'Có ít nhất 3 hàng dữ liệu các tiết học bằng thẻ <tr> và <td>',
      'Tên các môn học được điền đầy đủ và ngay ngắn'
    ],
    targetResult: {
      title: 'Thời khóa biểu lớp 12A1',
      description: 'Bảng học tập phân tiết chuẩn mực với các môn Toán, Văn, Anh, Tin học.',
      html: `<!DOCTYPE html>
<html>
<head><title>Thời khóa biểu</title></head>
<body>
  <h2>THỜI KHÓA BIỂU BUỔI SÁNG</h2>
  <table border="1" cellpadding="6" style="border-collapse: collapse; text-align: center;">
    <tr style="background: #1e40af; color: white;">
      <th>Tiết</th><th>Thứ 2</th><th>Thứ 3</th><th>Thứ 4</th><th>Thứ 5</th><th>Thứ 6</th>
    </tr>
    <tr>
      <td><b>1</b></td><td>Chào cờ</td><td>Toán</td><td>Ngữ văn</td><td>Vật lý</td><td>Tin học</td>
    </tr>
    <tr>
      <td><b>2</b></td><td>Toán</td><td>Toán</td><td>Ngữ văn</td><td>Hóa học</td><td>Tin học</td>
    </tr>
  </table>
</body>
</html>`
    },
    hint: 'Sử dụng th trong hàng đầu tiên để chữ tự động in đậm và căn giữa.',
    checkCriteria: (doc) => {
      const hasTh = doc.querySelectorAll('table th').length >= 5;
      const trCount = doc.querySelectorAll('table tr').length;
      const passed = hasTh && trCount >= 3;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Thời khóa biểu hoàn chỉnh với thẻ th và các tiết học!'
          : 'Cần có ít nhất 5 thẻ <th> tiêu đề và tối thiểu 3 hàng <tr>.'
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Kế hoạch ôn thi với danh sách ol',
    description: 'Sử dụng thẻ danh sách có thứ tự <ol> để lên lộ trình 5 bước ôn thi tốt nghiệp môn Tin học theo trình tự thời gian.',
    requirements: [
      'Sử dụng thẻ <ol> (ordered list)',
      'Bên trong chứa ít nhất 4 mục <li> được đánh số tự động',
      'Mỗi mục là một bước ôn tập cụ thể (lý thuyết, thực hành, giải đề...)'
    ],
    targetResult: {
      title: 'Lộ trình 5 bước ôn thi tốt nghiệp',
      description: 'Danh sách đánh số thứ tự từ 1 đến 5 rõ ràng, khoa học.',
      html: `<!DOCTYPE html>
<html>
<head><title>Kế hoạch ôn thi</title></head>
<body>
  <h2>CÁC BƯỚC ÔN TẬP TIN HỌC 12</h2>
  <ol>
    <li>Học chắc kiến thức cấu trúc trang HTML (Bài 7).</li>
    <li>Luyện tập thành thạo định dạng văn bản và bảng (Bài 8, Bài 9).</li>
    <li>Thiết kế các biểu mẫu Form tương tác (Bài 12).</li>
    <li>Định kiểu giao diện với các thuộc tính CSS cơ bản (Bài 13, 14, 15).</li>
    <li>Luyện giải các đề thi tốt nghiệp chính thức các năm trước.</li>
  </ol>
</body>
</html>`
    },
    hint: 'Thẻ <ol> tự động đánh số thứ tự 1, 2, 3... cho các thẻ con <li>.',
    checkCriteria: (doc) => {
      const liCount = doc.querySelectorAll('ol li').length;
      const passed = liCount >= 4;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Danh sách thứ tự ol với đủ các bước ôn thi!'
          : `Hiện có ${liCount}/4 mục <li> bên trong <ol>.`
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Thuật ngữ Tin học với thẻ dl, dt, dd',
    description: 'Trình bày bảng giải thích thuật ngữ HTML, CSS, URL bằng cặp thẻ danh sách định nghĩa <dl>, <dt> (thuật ngữ) và <dd> (giải thích).',
    requirements: [
      'Có thẻ danh sách định nghĩa <dl>',
      'Có ít nhất 2 thẻ thuật ngữ <dt> (definition term)',
      'Mỗi thẻ <dt> có thẻ giải thích ý nghĩa tương ứng <dd> (definition description)'
    ],
    targetResult: {
      title: 'Thuật ngữ Web với danh sách định nghĩa',
      description: 'Các từ khóa HTML, CSS được giải thích thụt lề chuẩn quy cách từ điển.',
      html: `<!DOCTYPE html>
<html>
<head><title>Thuật ngữ Tin học</title></head>
<body>
  <h2>TỪ ĐIỂN THUẬT NGỮ LẬP TRÌNH WEB</h2>
  <dl>
    <dt><b>HTML (HyperText Markup Language)</b></dt>
    <dd>Ngôn ngữ đánh dấu siêu văn bản dùng để xây dựng bộ khung cho trang web.</dd>
    <dt><b>CSS (Cascading Style Sheets)</b></dt>
    <dd>Ngôn ngữ định kiểu tầng quy định màu sắc, cỡ chữ và giao diện hiển thị.</dd>
  </dl>
</body>
</html>`
    },
    hint: 'Cấu trúc: <dl> chứa các cặp <dt>Tên thuật ngữ</dt> và <dd>Nội dung giải thích</dd>.',
    checkCriteria: (doc) => {
      const dtCount = doc.querySelectorAll('dl dt').length;
      const ddCount = doc.querySelectorAll('dl dd').length;
      const passed = dtCount >= 2 && ddCount >= 2;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Danh sách định nghĩa dl, dt, dd chuẩn xác!'
          : `Cần ít nhất 2 thẻ <dt> và 2 thẻ <dd> (hiện có: ${dtCount} dt, ${ddCount} dd).`
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Bảng điểm phân loại học lực kết hợp',
    description: 'Thử thách tổng hợp: Thiết kế bảng điểm học kỳ gồm điểm các môn Toán, Văn, Tin học, Điểm Trung bình in đậm, sử dụng caption và màu sắc phân biệt môn nổi bật.',
    requirements: [
      'Bảng có <caption> ghi tên học sinh',
      'Có hàng tiêu đề <th> phân biệt rõ các cột môn học',
      'Có hàng tính điểm trung bình môn học',
      'Điểm môn Tin học được in đậm hoặc tô màu làm điểm nhấn'
    ],
    targetResult: {
      title: 'Bảng điểm tổng kết học kỳ',
      description: 'Bảng điểm chuyên nghiệp với caption, màu sắc và tính điểm TB.',
      html: `<!DOCTYPE html>
<html>
<head><title>Bảng điểm</title></head>
<body>
  <h2>KẾT QUẢ ĐÁNH GIÁ HỌC TẬP</h2>
  <table border="1" cellpadding="6" style="border-collapse: collapse; text-align: center;">
    <caption><b>Bảng điểm cá nhân - Nguyễn Văn An (12A1)</b></caption>
    <tr style="background: #f1f5f9;">
      <th>Môn học</th><th>Hệ số 1</th><th>Giữa kỳ</th><th>Cuối kỳ</th><th>ĐTB</th>
    </tr>
    <tr>
      <td>Toán học</td><td>9.0</td><td>8.5</td><td>9.0</td><td>8.8</td>
    </tr>
    <tr style="background: #eff6ff;">
      <td><b>Tin học</b></td><td>10.0</td><td>9.5</td><td>10.0</td><td><b style="color: blue;">9.8</b></td>
    </tr>
  </table>
</body>
</html>`
    },
    hint: 'Sử dụng table, caption, th, các hàng tr/td và thẻ b/style để làm nổi bật.',
    checkCriteria: (doc) => {
      const hasCaption = !!doc.querySelector('table caption');
      const trCount = doc.querySelectorAll('table tr').length;
      const hasTh = doc.querySelectorAll('table th').length >= 3;
      const passed = hasCaption && trCount >= 3 && hasTh;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Bảng điểm học kỳ được thiết kế chuyên nghiệp, rõ ràng.'
          : 'Cần có bảng đầy đủ <caption>, hàng tiêu đề <th> và ít nhất 2 hàng dữ liệu học sinh.'
      };
    }
  }
];
