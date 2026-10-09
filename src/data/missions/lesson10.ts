import { LessonMission } from '../../types';

export const LESSON_10_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Liên kết neo nội bộ cuộn trang',
    description: 'Tạo hệ thống liên kết neo nội bộ: bấm vào mục lục nhảy đến phần tử có id tương ứng (ví dụ: href="#CLBTT" nhảy đến id="CLBTT") và có nút quay về đầu trang href="#top".',
    requirements: [
      'Phần tử đầu trang có id="top"',
      'Có thẻ liên kết <a href="#CLBTT"> trỏ đến phần câu lạc bộ',
      'Có phần tử nội dung mang thuộc tính id="CLBTT"',
      'Có nút liên kết <a href="#top"> để cuộn quay lại đầu trang'
    ],
    targetResult: {
      title: 'Mục lục liên kết neo nội bộ',
      description: 'Nhấp chuột vào liên kết sẽ tự động cuộn trang đến đúng vị trí id.',
      html: `<!DOCTYPE html>
<html>
<head><title>Liên kết neo</title></head>
<body>
  <h2 id="top">MỤC LỤC BÀI VIẾT</h2>
  <p><a href="#CLBTT">👉 Chuyển nhanh đến: CLB Thể thao trường</a></p>
  <div style="height: 120px;"></div>
  <h3 id="CLBTT">HOẠT ĐỘNG CLB THỂ THAO</h3>
  <p>CLB sinh hoạt vào các buổi chiều thứ 3 và thứ 5 hàng tuần.</p>
  <p><a href="#top">↑ Quay về đầu trang</a></p>
</body>
</html>`
    },
    hint: 'Cú pháp liên kết neo: <a href="#ten_id">...</a> và phần tử đích: <div id="ten_id">...</div>.',
    checkCriteria: (doc) => {
      const hasLinkAnchor = !!doc.querySelector('a[href="#CLBTT"]');
      const hasTargetId = !!doc.getElementById('CLBTT');
      const hasBackTop = !!doc.querySelector('a[href="#top"]');
      const passed = hasLinkAnchor && hasTargetId && hasBackTop;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Liên kết neo nội bộ và nút về đầu trang hoạt động chính xác!'
          : `Còn thiếu: ${!hasLinkAnchor ? '<a href="#CLBTT">, ' : ''}${!hasTargetId ? 'phần tử id="CLBTT", ' : ''}${!hasBackTop ? '<a href="#top">' : ''}`
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Liên kết tương đối đến trang ảo thong_tin.html',
    description: 'Lập trình liên kết tương đối giữa các tệp nội bộ: nhấp vào liên kết sẽ mở trang thong_tin.html được định nghĩa sẵn trong phòng lab ảo.',
    requirements: [
      'Sử dụng thẻ <a> với thuộc tính href="thong_tin.html"',
      'Có văn bản mô tả rõ ràng (ví dụ: Xem trang thông tin chi tiết)',
      'Đường dẫn viết đúng tên tệp dạng tương đối'
    ],
    targetResult: {
      title: 'Liên kết sang trang thong_tin.html',
      description: 'Khi nhấp chuột, iframe lập tức hiển thị nội dung trang thông tin.',
      html: `<!DOCTYPE html>
<html>
<head><title>Trang liên kết</title></head>
<body>
  <h2>CỔNG THÔNG TIN HỌC SINH 12</h2>
  <p>Mời các em xem thông báo mới nhất của nhà trường tại đây:</p>
  <p><a href="thong_tin.html"><b>Xem Trang Bản Tin Thông Báo (thong_tin.html) →</b></a></p>
</body>
</html>`
    },
    hint: 'Liên kết tương đối không cần ghi http/https, chỉ cần gõ đúng tên tệp thong_tin.html.',
    checkCriteria: (doc) => {
      const hasRelLink = !!doc.querySelector('a[href="thong_tin.html"]');
      return {
        passed: hasRelLink,
        message: hasRelLink
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Đã có liên kết tương đối chuẩn đến thong_tin.html!'
          : 'Cần có thẻ liên kết dạng <a href="thong_tin.html">...</a>.'
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Biến hình ảnh thành nút bấm liên kết',
    description: 'Bọc thẻ hình ảnh <img> bằng thẻ <a> để khi học sinh bấm vào ảnh thể thao sẽ tự động chuyển hướng đến trang CLB.',
    requirements: [
      'Thẻ <a> bao bọc trực tiếp thẻ <img> (cấu trúc <a><img></a>)',
      'Thẻ <img> có đường dẫn src="images/thethao.png" và thuộc tính alt',
      'Thẻ <a> có thuộc tính href trỏ đến trang CLB.html hoặc #CLBTT'
    ],
    targetResult: {
      title: 'Hình ảnh làm liên kết chuyển trang',
      description: 'Nhấp chuột trực tiếp lên bức ảnh sẽ kích hoạt chuyển trang web.',
      html: `<!DOCTYPE html>
<html>
<head><title>Ảnh làm liên kết</title></head>
<body>
  <h2>BẤM VÀO ẢNH ĐỂ XEM CHI TIẾT</h2>
  <a href="CLB.html" title="Nhấp vào ảnh để xem CLB">
    <img src="images/thethao.png" alt="CLB Thể thao" width="280">
  </a>
</body>
</html>`
    },
    hint: 'Đặt thẻ <img> nằm giữa cặp thẻ mở <a> và thẻ đóng </a>.',
    checkCriteria: (doc) => {
      const imgInLink = !!doc.querySelector('a img');
      return {
        passed: imgInLink,
        message: imgInLink
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã biến hình ảnh thành nút liên kết thành công!'
          : 'Cần đặt thẻ <img> bên trong thẻ <a> (ví dụ: <a href="..."><img src="..."></a>).'
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Liên kết gửi Email (mailto:) và Gọi hotline (tel:)',
    description: 'Thiết lập 2 nút liên hệ thực tế: một liên kết mailto: để mở ứng dụng gửi email và một liên kết tel: để quay số gọi điện thoại.',
    requirements: [
      'Có thẻ <a> với href bắt đầu bằng mailto: (ví dụ: mailto:tuyensinh@thpt.edu.vn)',
      'Có thẻ <a> với href bắt đầu bằng tel: (ví dụ: tel:02438889999)',
      'Trình bày trong khối liên hệ rõ ràng, thân thiện'
    ],
    targetResult: {
      title: 'Nút liên hệ Email và Hotline',
      description: 'Liên kết thông minh kích hoạt gửi thư và gọi điện tức thời.',
      html: `<!DOCTYPE html>
<html>
<head><title>Liên hệ hỗ trợ</title></head>
<body>
  <h2>BAN TƯ VẤN HỌC TẬP KHỐI 12</h2>
  <p>📧 Email hỗ trợ: <a href="mailto:tuvan12@thpt.edu.vn">tuvan12@thpt.edu.vn</a></p>
  <p>📞 Hotline phòng thi: <a href="tel:0912345678">0912.345.678</a></p>
</body>
</html>`
    },
    hint: 'Dùng cú pháp href="mailto:dia_chi_email" và href="tel:so_dien_thoai".',
    checkCriteria: (doc) => {
      const hasMailto = !!doc.querySelector('a[href^="mailto:"]');
      const hasTel = !!doc.querySelector('a[href^="tel:"]');
      const passed = hasMailto && hasTel;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Đã có đủ liên kết mailto và tel chuyên nghiệp!'
          : `Còn thiếu: ${!hasMailto ? 'Liên kết mailto:..., ' : ''}${!hasTel ? 'Liên kết tel:...' : ''}`
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Thanh điều hướng trang web (Navbar)',
    description: 'Thử thách tổng hợp: Xây dựng thanh menu điều hướng ngang gồm các liên kết đến Trang chủ, Bản tin thong_tin.html, CLB.html và liên kết mở tab mới (target="_blank") đến trang Bộ GD&ĐT.',
    requirements: [
      'Sử dụng thẻ <nav> hoặc <div> chứa danh sách liên kết',
      'Có liên kết đến thong_tin.html',
      'Có liên kết đến CLB.html',
      'Có liên kết tuyệt đối ra ngoài sử dụng target="_blank"'
    ],
    targetResult: {
      title: 'Thanh menu điều hướng trang web',
      description: 'Thanh điều hướng hoàn chỉnh kết nối toàn bộ hệ thống website của trường.',
      html: `<!DOCTYPE html>
<html>
<head><title>Thanh điều hướng</title></head>
<body>
  <nav style="background: #0f172a; padding: 12px; border-radius: 8px;">
    <a href="index.html" style="color: #38bdf8; margin-right: 15px;">Trang chủ</a>
    <a href="thong_tin.html" style="color: #38bdf8; margin-right: 15px;">Bản tin</a>
    <a href="CLB.html" style="color: #38bdf8; margin-right: 15px;">Câu lạc bộ</a>
    <a href="https://moet.gov.vn" target="_blank" style="color: #facc15;">Cổng Bộ GD&ĐT ↗</a>
  </nav>
  <h2>TRANG CHỦ HỌC TẬP TIN HỌC 12</h2>
  <p>Chào mừng bạn đã đến với phòng lab thực hành web.</p>
</body>
</html>`
    },
    hint: 'Sử dụng target="_blank" để trình duyệt tự mở liên kết ngoài trong một tab mới.',
    checkCriteria: (doc) => {
      const hasBlank = !!doc.querySelector('a[target="_blank"]');
      const linkCount = doc.querySelectorAll('a').length;
      const passed = hasBlank && linkCount >= 3;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5: Thanh menu điều hướng chuyên nghiệp có mở tab mới.'
          : 'Cần có ít nhất 3 thẻ <a> và tối thiểu 01 liên kết dùng target="_blank".'
      };
    }
  }
];
