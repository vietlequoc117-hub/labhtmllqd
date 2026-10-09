import { LessonMission } from '../../types';

export const LESSON_7_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Khung trang web chuẩn',
    level: 'Cơ bản',
    description: 'Lập trình trang web với cấu trúc tài liệu HTML chuẩn gồm <!DOCTYPE html>, <html>, <head>, <title>, <body> cùng tiêu đề <h1> và một đoạn văn <p>.',
    requirements: [
      'Khai báo đúng <!DOCTYPE html> ở dòng đầu tiên',
      'Có đủ cặp thẻ <html>, <head> và <body>',
      'Thẻ <head> chứa thẻ <title>Đặt tên trang web</title>',
      'Thẻ <body> chứa ít nhất một thẻ <h1> và một thẻ <p>'
    ],
    targetResult: {
      title: 'Trang web đầu tiên chuẩn cấu trúc',
      description: 'Trang hiển thị tiêu đề lớn h1 và một đoạn văn giới thiệu rõ ràng.',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trang web đầu tiên của em</title>
</head>
<body>
  <h1>XIN CHÀO PHÒNG LAB TIN HỌC 12!</h1>
  <p>Em đang bắt đầu hành trình lập trình web với ngôn ngữ đánh dấu siêu văn bản HTML.</p>
</body>
</html>`
    },
    hint: 'Mọi tài liệu HTML chuẩn đều bắt đầu bằng <!DOCTYPE html>, sau đó là <html> bao bọc <head> và <body>.',
    checkCriteria: (doc, html) => {
      const hasDoctype = /<!doctype\s+html>/i.test(html);
      const hasTitle = !!doc.querySelector('head title');
      const hasH1 = !!doc.querySelector('h1');
      const hasP = !!doc.querySelector('p');
      const passed = hasDoctype && hasTitle && hasH1 && hasP;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Cấu trúc trang chuẩn đầy đủ doctype, title, h1 và p!'
          : `Chưa đạt: ${!hasDoctype ? 'Thiếu <!DOCTYPE html>, ' : ''}${!hasTitle ? 'Thiếu <title>, ' : ''}${!hasH1 ? 'Thiếu <h1>, ' : ''}${!hasP ? 'Thiếu <p>' : ''}`
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Phân cấp 3 tầng tiêu đề',
    level: 'Thông hiểu',
    description: 'Lập trình trang tin tức với 3 cấp bậc tiêu đề khác nhau (h1, h2, h3) để thể hiện rõ thứ bậc nội dung theo SGK.',
    requirements: [
      'Sử dụng thẻ <h1> cho tiêu đề chính của trang',
      'Sử dụng thẻ <h2> cho tiêu đề chuyên mục lớn',
      'Sử dụng thẻ <h3> cho các bài viết/tiểu mục con',
      'Có các đoạn văn bản <p> tương ứng dưới mỗi tiêu đề'
    ],
    targetResult: {
      title: 'Trang phân cấp tiêu đề 3 tầng',
      description: 'Giao diện phân rõ thứ bậc từ chủ đề lớn nhất đến các tiểu mục con.',
      html: `<!DOCTYPE html>
<html>
<head><title>Phân cấp tiêu đề</title></head>
<body>
  <h1>CỔNG THÔNG TIN TRƯỜNG THPT</h1>
  <h2>Chuyên mục: Hoạt động Giáo dục</h2>
  <h3>1. Phong trào thi đua dạy tốt học tốt</h3>
  <p>Phát động đợt thi đua chào mừng ngày Nhà giáo Việt Nam trong toàn trường.</p>
  <h3>2. Kỳ thi học sinh giỏi cấp tỉnh</h3>
  <p>Đội tuyển khối 12 ra quân tham dự kỳ thi chọn học sinh giỏi năm học 2025-2026.</p>
</body>
</html>`
    },
    hint: 'Kích thước và mức độ ưu tiên giảm dần từ h1 (cao nhất) đến h6 (nhỏ nhất).',
    checkCriteria: (doc) => {
      const hasH1 = !!doc.querySelector('h1');
      const hasH2 = !!doc.querySelector('h2');
      const hasH3 = !!doc.querySelector('h3');
      const pCount = doc.querySelectorAll('p').length;
      const passed = hasH1 && hasH2 && hasH3 && pCount >= 2;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Đã sử dụng đúng 3 cấp tiêu đề h1, h2, h3 và đoạn văn!'
          : 'Cần có đủ cả thẻ <h1>, <h2>, <h3> và ít nhất 2 đoạn văn <p>.'
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Hồ sơ bản thân với ngắt dòng & đường kẻ',
    description: 'Tạo trang giới thiệu bản thân học sinh lớp 12, sử dụng đường kẻ ngang <hr> để phân cách các phần và thẻ <br> để ngắt dòng địa chỉ.',
    requirements: [
      'Tiêu đề <h1> hoặc <h2> ghi rõ tên học sinh và lớp',
      'Có ít nhất 01 đường kẻ ngang <hr> phân chia bố cục',
      'Sử dụng thẻ ngắt dòng <br> bên trong đoạn văn bản',
      'Nội dung nêu rõ mục tiêu thi tốt nghiệp hoặc sở thích'
    ],
    targetResult: {
      title: 'Hồ sơ học sinh lớp 12',
      description: 'Trang cá nhân có đường kẻ ngăn cách và các dòng thông tin liên hệ ngắt dòng gọn gàng.',
      html: `<!DOCTYPE html>
<html>
<head><title>Hồ sơ cá nhân</title></head>
<body>
  <h2>HỒ SƠ HỌC SINH: NGUYỄN VĂN AN</h2>
  <p>Lớp: 12A1 &bull; Trường THPT Chuyên<br>Ước mơ: Trúng tuyển ngành Công nghệ thông tin Bách Khoa.</p>
  <hr>
  <p>Sở thích: Lập trình web, chơi cờ vua và đọc sách khoa học.<br>Liên hệ: an.nguyen12@gmail.com</p>
</body>
</html>`
    },
    hint: 'Thẻ <hr> là thẻ đơn tạo đường phân cách ngang. Thẻ <br> dùng để xuống dòng trong một đoạn văn mà không tạo đoạn mới.',
    checkCriteria: (doc) => {
      const hasHeading = !!doc.querySelector('h1, h2');
      const hasHr = !!doc.querySelector('hr');
      const hasBr = !!doc.querySelector('br');
      const passed = hasHeading && hasHr && hasBr;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã có tiêu đề, đường kẻ ngang <hr> và ngắt dòng <br>!'
          : `Cần bổ sung: ${!hasHeading ? 'Tiêu đề h1/h2, ' : ''}${!hasHr ? 'Thẻ <hr>, ' : ''}${!hasBr ? 'Thẻ <br>' : ''}`
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Phân nhóm Tổ học tập với thẻ div',
    description: 'Sử dụng thẻ khối <div> để đóng gói thông tin từng thành viên hoặc từng tổ học tập, giúp cấu trúc trang web mạch lạc.',
    requirements: [
      'Có ít nhất 2 khối <div> riêng biệt',
      'Mỗi khối <div> chứa tiêu đề thành viên/tổ và thông tin chi tiết',
      'Có đường kẻ <hr> hoặc tiêu đề phân biệt giữa các khối'
    ],
    targetResult: {
      title: 'Danh sách tổ học tập phân nhóm div',
      description: 'Hai khối thông tin thành viên được đóng gói gọn trong các thẻ div.',
      html: `<!DOCTYPE html>
<html>
<head><title>Tổ học tập 12A</title></head>
<body>
  <h1>DANH SÁCH TỔ 1 - LỚP 12A</h1>
  <div>
    <h3>1. Lê Bảo Nam (Tổ trưởng)</h3>
    <p>Phụ trách: Môn Toán và Tin học.<br>Nhiệm vụ: Tổng hợp bài tập nhóm.</p>
  </div>
  <hr>
  <div>
    <h3>2. Trần Mai Lan (Tổ phó)</h3>
    <p>Phụ trách: Môn Ngữ văn và Tiếng Anh.<br>Nhiệm vụ: Thuyết trình dự án.</p>
  </div>
</body>
</html>`
    },
    hint: 'Thẻ <div> là phần tử khối (block element) dùng để nhóm các phần tử HTML lại với nhau.',
    checkCriteria: (doc) => {
      const divCount = doc.querySelectorAll('div').length;
      const hCount = doc.querySelectorAll('div h2, div h3, div h4').length;
      const passed = divCount >= 2 && hCount >= 2;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Đã tổ chức tốt với ít nhất 2 khối <div> chứa nội dung!'
          : `Hiện có ${divCount}/2 thẻ <div>. Hãy tạo ít nhất 2 khối <div> chứa thông tin thành viên.`
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Bản tin sinh hoạt Đoàn hoàn chỉnh',
    description: 'Thử thách tổng hợp: Xây dựng một trang Bản tin sinh hoạt Đoàn thanh niên trường THPT đầy đủ tiêu đề, ngày đăng, nội dung chi tiết và footer bản quyền.',
    requirements: [
      'Tiêu đề chính <h1> trang trọng',
      'Đoạn ghi chú ngày đăng và tác giả',
      'Đường kẻ ngang <hr> ngăn cách tiêu đề và nội dung',
      'Ít nhất 2 đoạn văn <p> mô tả sự kiện chi tiết',
      'Khối chân trang hoặc đoạn văn bản quyền cuối trang'
    ],
    targetResult: {
      title: 'Bản tin Đoàn thanh niên trường THPT',
      description: 'Trang tin tức hoàn chỉnh đáp ứng đầy đủ quy chuẩn xuất bản bài viết.',
      html: `<!DOCTYPE html>
<html>
<head><title>Bản tin Đoàn trường</title></head>
<body>
  <h1>PHÁT ĐỘNG THÁNG THANH NIÊN NĂM 2026</h1>
  <p><i>Ngày đăng: 26/03/2026 - Tác giả: Ban Chấp hành Đoàn trường</i></p>
  <hr>
  <p>Hòa chung không khí thi đua sôi nổi của tuổi trẻ cả nước, Đoàn trường THPT phát động chiến dịch "Tuổi trẻ 12 xung kích, sáng tạo và làm chủ công nghệ".</p>
  <p>Các hoạt động trọng tâm gồm: Hội thao thanh niên, Cuộc thi sáng tạo Web Tin học 12 và Chương trình tiếp sức mùa thi tốt nghiệp THPT.</p>
  <hr>
  <p>© 2026 Đoàn TNCS Hồ Chí Minh Trường THPT. Lưu hành nội bộ.</p>
</body>
</html>`
    },
    hint: 'Kết hợp h1, ngày đăng, hr, ít nhất 2 đoạn văn p và dòng chữ bản quyền © ở cuối trang.',
    checkCriteria: (doc) => {
      const hasH1 = !!doc.querySelector('h1');
      const hrCount = doc.querySelectorAll('hr').length;
      const pCount = doc.querySelectorAll('p').length;
      const passed = hasH1 && hrCount >= 1 && pCount >= 3;
      return {
        passed,
        message: passed
          ? 'Xuất sắc! Đã hoàn thành Nhiệm vụ 5 với cấu trúc bài viết bản tin đầy đủ tiêu đề, nội dung và chân trang.'
          : 'Cần có thẻ <h1>, ít nhất 1 thẻ <hr> và tối thiểu 3 đoạn văn <p> (ngày đăng, nội dung, bản quyền).'
      };
    }
  }
];
