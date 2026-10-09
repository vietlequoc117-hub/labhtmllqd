import { LessonMission } from '../../types';

export const LESSON_8_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Biện luận phương trình bậc 2',
    description: 'Lập trình văn bản toán học biện luận nghiệm phương trình bậc 2 như Hình 8.3 SGK Tin học 12, có chỉ số trên sup, in đậm b và đổi màu bằng thuộc tính style.',
    requirements: [
      'Công thức ax² dùng thẻ <sup> (ax<sup>2</sup>)',
      'In đậm tên biến và biệt thức Δ bằng thẻ <b>',
      'Đổi màu chữ các trường hợp nghiệm (xanh lá cho có nghiệm, đỏ cho vô nghiệm) bằng thuộc tính style'
    ],
    targetResult: {
      title: 'Biện luận nghiệm PT bậc 2 (SGK 12)',
      description: 'Trang toán học có chỉ số trên x² và các dòng kết luận nghiệm đổi màu sắc nét.',
      html: `<!DOCTYPE html>
<html>
<head><title>Biện luận PT bậc 2</title></head>
<body>
  <h2>Biện luận số nghiệm phương trình bậc 2</h2>
  <p>Cho phương trình: <b>ax<sup>2</sup> + bx + c = 0</b> (a ≠ 0)</p>
  <p>Biệt thức: <b>Δ = b<sup>2</sup> - 4ac</b></p>
  <p style="color: blue;">• Nếu Δ &gt; 0: Phương trình có 2 nghiệm phân biệt.</p>
  <p style="color: green;">• Nếu Δ = 0: Phương trình có nghiệm kép.</p>
  <p style="color: red;">• Nếu Δ &lt; 0: Phương trình vô nghiệm.</p>
</body>
</html>`
    },
    hint: 'Dùng thẻ <sup> cho số mũ 2 và style="color: red;" để đổi màu chữ cảnh báo.',
    checkCriteria: (doc, html) => {
      const hasSup = !!doc.querySelector('sup');
      const hasBold = !!doc.querySelector('b, strong');
      const hasColor = html.includes('color:');
      const passed = hasSup && hasBold && hasColor;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Đã trình bày đúng công thức toán học có sup, bold và màu sắc!'
          : `Còn thiếu: ${!hasSup ? 'Thẻ <sup>, ' : ''}${!hasBold ? 'Thẻ <b>, ' : ''}${!hasColor ? 'Thuộc tính style="color:..."' : ''}`
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Bảng công thức Hóa học 12',
    description: 'Ứng dụng chỉ số dưới sub và chỉ số trên sup để trình bày các công thức hóa học và phương trình ion lớp 12.',
    requirements: [
      'Sử dụng thẻ <sub> cho chỉ số nguyên tử (ví dụ: H₂O, H₂SO₄)',
      'Sử dụng thẻ <sup> cho điện tích ion (ví dụ: Cu²⁺, Fe³⁺)',
      'Tên chất và phương trình được in đậm hoặc in nghiêng rõ ràng'
    ],
    targetResult: {
      title: 'Công thức Hóa học và Ion',
      description: 'Trình bày chuẩn H₂O, H₂SO₄, Cu²⁺ và ion Fe³⁺.',
      html: `<!DOCTYPE html>
<html>
<head><title>Hóa học 12</title></head>
<body>
  <h2>CÔNG THỨC HÓA HỌC TRỌNG TÂM</h2>
  <p>1. Nước: <b>H<sub>2</sub>O</b></p>
  <p>2. Axit sunfuric đặc: <b>H<sub>2</sub>SO<sub>4</sub></b></p>
  <p>3. Ion đồng (II): <b>Cu<sup>2+</sup></b> và Ion sắt (III): <b>Fe<sup>3+</sup></b></p>
  <p>4. Khí Cacbonic: <b>CO<sub>2</sub></b></p>
</body>
</html>`
    },
    hint: 'Thẻ <sub> hạ thấp chữ xuống dưới dòng, thẻ <sup> nâng chữ lên trên.',
    checkCriteria: (doc) => {
      const subCount = doc.querySelectorAll('sub').length;
      const supCount = doc.querySelectorAll('sup').length;
      const passed = subCount >= 2 && supCount >= 1;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Đã sử dụng thành thạo cả <sub> và <sup> cho công thức hóa học!'
          : `Hiện có ${subCount} thẻ sub (cần ≥ 2) và ${supCount} thẻ sup (cần ≥ 1).`
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Niêm yết giá khuyến mãi (del, mark, small)',
    description: 'Thiết kế thông báo giảm giá sách ôn thi tốt nghiệp 12: gạch giá cũ bằng del, tô sáng giá mới bằng mark và điều kiện áp dụng bằng small.',
    requirements: [
      'Dùng thẻ <del> để gạch ngang giá bán cũ',
      'Dùng thẻ <mark> để làm nổi bật (highlight) giá khuyến mãi',
      'Dùng thẻ <small> cho dòng ghi chú điều kiện áp dụng nhỏ hơn'
    ],
    targetResult: {
      title: 'Khuyến mãi sách ôn thi tốt nghiệp',
      description: 'Giá cũ bị gạch ngang, giá mới được highlight vàng nổi bật kèm điều kiện nhỏ.',
      html: `<!DOCTYPE html>
<html>
<head><title>Khuyến mãi sách</title></head>
<body>
  <h2>BỘ ĐỀ ÔN THI TỐT NGHIỆP TIN HỌC 12</h2>
  <p>Giá bìa gốc: <del>250.000 VNĐ</del></p>
  <p>Giá ưu đãi: <mark><b>175.000 VNĐ</b></mark> (-30%)</p>
  <p><small>* Ưu đãi dành riêng cho 100 học sinh đầu tiên đăng ký trước ngày 30/04.</small></p>
</body>
</html>`
    },
    hint: 'del = văn bản bị xóa/gạch bỏ; mark = tô nền màu vàng như bút dạ quang; small = chữ cỡ nhỏ.',
    checkCriteria: (doc) => {
      const hasDel = !!doc.querySelector('del');
      const hasMark = !!doc.querySelector('mark');
      const hasSmall = !!doc.querySelector('small');
      const passed = hasDel && hasMark && hasSmall;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã sử dụng đúng cả 3 thẻ định dạng ý nghĩa del, mark, small!'
          : `Còn thiếu: ${!hasDel ? '<del>, ' : ''}${!hasMark ? '<mark>, ' : ''}${!hasSmall ? '<small>' : ''}`
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Trích dẫn thơ Tây Tiến lãng mạn',
    description: 'Trình bày một khổ thơ văn học 12 (ví dụ tác phẩm Tây Tiến của Quang Dũng) sử dụng in nghiêng em, gạch chân u và đổi màu chữ phong cách cổ điển.',
    requirements: [
      'Tiêu đề bài thơ và tên tác giả trang trọng',
      'Đoạn thơ sử dụng thẻ <em> hoặc <i> để in nghiêng',
      'Có thẻ <u> gạch chân tên tác phẩm hoặc cụm từ then chốt',
      'Dùng thuộc tính style đổi màu chữ phù hợp với phong cách thơ ca'
    ],
    targetResult: {
      title: 'Khổ thơ Tây Tiến định dạng nghệ thuật',
      description: 'Các câu thơ in nghiêng thanh nhã, ngắt dòng chuẩn và tên tác phẩm được gạch chân.',
      html: `<!DOCTYPE html>
<html>
<head><title>Thơ Tây Tiến</title></head>
<body>
  <h2 style="color: #7c2d12;">TÂY TIẾN - QUANG DŨNG</h2>
  <p style="font-style: italic; color: #374151;">
    "Sông Mã xa rồi Tây Tiến ơi!<br>
    Nhớ về rừng núi, nhớ chơi vơi.<br>
    Sài Khao sương lấp đoàn quân mỏi,<br>
    Mường Lát hoa về trong đêm hơi..."
  </p>
  <p><small><b>Trích:</b> <u>Ngữ văn 12 - Tập 1</u>, NXB Giáo dục Việt Nam.</small></p>
</body>
</html>`
    },
    hint: 'Dùng <br> ngắt từng câu thơ và style="color: #..." để tạo sắc màu hoài niệm.',
    checkCriteria: (doc, html) => {
      const hasItalic = !!doc.querySelector('i, em') || html.includes('italic');
      const hasUnderline = !!doc.querySelector('u');
      const hasBr = !!doc.querySelector('br');
      const passed = hasItalic && hasUnderline && hasBr;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Khổ thơ trình bày đẹp mắt với in nghiêng, gạch chân và ngắt dòng!'
          : 'Cần có chữ in nghiêng (i/em), gạch chân (u) và ngắt dòng (br).'
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Bảng cảnh báo Quy chế thi THPT',
    description: 'Thử thách tổng hợp: Thiết kế thông báo quy chế phòng thi tốt nghiệp kết hợp strong nhấn mạnh, mark cảnh báo, del và đổi màu đỏ cảnh giác cao độ.',
    requirements: [
      'Dùng thẻ <strong> nhấn mạnh các quy định bắt buộc',
      'Dùng thẻ <mark> làm nổi bật các từ khóa cấm (ví dụ: cấm mang điện thoại)',
      'Dùng thuộc tính style="color: red;" cho các hình thức kỷ luật đình chỉ thi',
      'Dùng thẻ <u> gạch chân mốc thời gian có mặt tại điểm thi'
    ],
    targetResult: {
      title: 'Quy chế phòng thi tốt nghiệp THPT',
      description: 'Văn bản cảnh báo kỷ luật thi cử rõ ràng, ấn tượng với đầy đủ sắc độ nhấn mạnh.',
      html: `<!DOCTYPE html>
<html>
<head><title>Quy chế phòng thi</title></head>
<body>
  <h2 style="color: #b91c1c;">NHỮNG ĐIỀU THÍ SINH CẦN TUÂN THỦ</h2>
  <p><strong>1. Thời gian:</strong> Thí sinh phải có mặt tại phòng thi trước <u>06 giờ 45 phút</u> sáng.</p>
  <p><strong>2. Vật dụng:</strong> <mark>Tuyệt đối không mang điện thoại</mark> và thiết bị thu phát sóng vào phòng thi.</p>
  <p style="color: red; font-weight: bold;">3. Kỷ luật: Thí sinh mang điện thoại sẽ bị ĐÌNH CHỈ THI ngay lập tức và hủy kết quả toàn bộ kỳ thi!</p>
</body>
</html>`
    },
    hint: 'Kết hợp strong, mark, style color red và thẻ u để tạo nên văn bản cảnh báo chuẩn mực.',
    checkCriteria: (doc, html) => {
      const hasStrong = !!doc.querySelector('strong, b');
      const hasMark = !!doc.querySelector('mark');
      const hasU = !!doc.querySelector('u');
      const hasRed = html.includes('color:') && (html.includes('red') || html.includes('#b91c1c') || html.includes('#dc2626'));
      const passed = hasStrong && hasMark && hasU && hasRed;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Văn bản quy chế phòng thi được nhấn mạnh chuyên nghiệp.'
          : 'Cần có đủ strong/b, mark, u và chữ màu đỏ (style="color: red;").'
      };
    }
  }
];
