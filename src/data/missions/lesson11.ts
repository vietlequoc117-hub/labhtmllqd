import { LessonMission } from '../../types';

export const LESSON_11_MISSIONS: LessonMission[] = [
  {
    id: 1,
    title: 'Nhiệm vụ 1: Chèn ảnh chuẩn thuộc tính (img alt)',
    description: 'Chèn hình ảnh thể thao images/thethao.png vào trang web với đầy đủ văn bản thay thế alt và quy định chiều rộng width.',
    requirements: [
      'Sử dụng thẻ <img> với src="images/thethao.png"',
      'Bắt buộc có thuộc tính alt mô tả nội dung hình ảnh',
      'Có thuộc tính width (ví dụ: width="400") để kiểm soát kích thước'
    ],
    targetResult: {
      title: 'Ảnh thể thao học đường chuẩn SGK',
      description: 'Hình ảnh hiển thị sắc nét với kích thước vừa vặn và chú thích alt.',
      html: `<!DOCTYPE html>
<html>
<head><title>Chèn ảnh thể thao</title></head>
<body>
  <h2>HỘI THAO THANH NIÊN KHỐI 12</h2>
  <img src="images/thethao.png" alt="Biểu trưng Thể thao học đường" width="420">
  <p><i>Ảnh minh họa hoạt động thể dục thể thao năm học 2025-2026.</i></p>
</body>
</html>`
    },
    hint: 'Cú pháp: <img src="đường_dẫn" alt="mô_tả" width="400">. Thẻ img là thẻ đơn không có thẻ đóng.',
    checkCriteria: (doc) => {
      const img = doc.querySelector('img');
      const hasSrc = img && (img.getAttribute('src')?.includes('thethao') || !!img.getAttribute('src'));
      const hasAlt = img && !!img.getAttribute('alt');
      const passed = !!img && !!hasSrc && !!hasAlt;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 1: Đã chèn ảnh thành công với đầy đủ thuộc tính alt và width!'
          : 'Cần có thẻ <img> với thuộc tính src và alt.'
      };
    }
  },
  {
    id: 2,
    title: 'Nhiệm vụ 2: Nhúng video với thẻ video controls',
    description: 'Chèn video bài giảng videos/war_is_over.mp4 có thanh điều khiển âm lượng, tạm dừng/phát bằng thuộc tính controls.',
    requirements: [
      'Sử dụng thẻ <video> có đường dẫn src="videos/war_is_over.mp4"',
      'Bắt buộc có thuộc tính controls để người dùng điều khiển phát video',
      'Có quy định chiều rộng width (ví dụ: width="480")'
    ],
    targetResult: {
      title: 'Trình phát video học tập',
      description: 'Khung video với đầy đủ nút Play, thanh thời gian và điều khiển âm thanh.',
      html: `<!DOCTYPE html>
<html>
<head><title>Phát video</title></head>
<body>
  <h2>VIDEO TƯ LIỆU HỌC TẬP</h2>
  <video src="videos/war_is_over.mp4" controls width="480">
    Trình duyệt không hỗ trợ thẻ video.
  </video>
</body>
</html>`
    },
    hint: 'Thuộc tính controls cho phép hiển thị thanh điều khiển play/pause trên video.',
    checkCriteria: (doc) => {
      const video = doc.querySelector('video');
      const hasControls = !!(video && video.hasAttribute('controls'));
      const passed = !!video && hasControls;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 2: Đã nhúng video có thanh điều khiển controls thành công!'
          : 'Cần có thẻ <video> chứa thuộc tính controls.'
      };
    }
  },
  {
    id: 3,
    title: 'Nhiệm vụ 3: Phát âm thanh Tiến quân ca với thẻ audio',
    description: 'Chèn tệp âm thanh audio/Quoc_ca.mp3 vào trang web với thanh điều khiển controls phát nhạc mẫu.',
    requirements: [
      'Sử dụng thẻ <audio> với src="audio/Quoc_ca.mp3"',
      'Có thuộc tính controls để người dùng bật/tắt âm thanh',
      'Có dòng chữ giới thiệu tên bài hát và tác giả'
    ],
    targetResult: {
      title: 'Máy phát âm thanh Quốc ca',
      description: 'Thanh phát nhạc audio trực quan sẵn sàng bấm phát giai điệu.',
      html: `<!DOCTYPE html>
<html>
<head><title>Nghe Quốc ca</title></head>
<body>
  <h2>TIẾN QUÂN CA - QUỐC CA VIỆT NAM</h2>
  <p>Nhạc và lời: <b>Nhạc sĩ Văn Cao</b></p>
  <audio src="audio/Quoc_ca.mp3" controls></audio>
</body>
</html>`
    },
    hint: 'Cú pháp: <audio src="audio/Quoc_ca.mp3" controls></audio>.',
    checkCriteria: (doc) => {
      const audio = doc.querySelector('audio');
      const hasControls = !!(audio && audio.hasAttribute('controls'));
      const passed = !!audio && hasControls;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 3: Đã chèn thành công thẻ audio controls phát nhạc!'
          : 'Cần có thẻ <audio> chứa thuộc tính controls.'
      };
    }
  },
  {
    id: 4,
    title: 'Nhiệm vụ 4: Khung nội tuyến iframe nhúng CLB.html',
    description: 'Nhúng trang web giới thiệu CLB.html vào trong trang hiện tại bằng thẻ <iframe> với kích thước width="100%" và height="350".',
    requirements: [
      'Sử dụng thẻ <iframe> với src="CLB.html"',
      'Thiết lập thuộc tính width và height cho khung nội tuyến',
      'Có dòng tiêu đề giới thiệu khung nội tuyến'
    ],
    targetResult: {
      title: 'Khung nội tuyến nhúng trang con',
      description: 'Cửa sổ iframe hiển thị trực tiếp nội dung trang CLB.html bên trong.',
      html: `<!DOCTYPE html>
<html>
<head><title>Nhúng iframe</title></head>
<body>
  <h2>HOẠT ĐỘNG CÁC CÂU LẠC BỘ TRƯỜNG</h2>
  <iframe src="CLB.html" width="100%" height="320" style="border: 2px solid #94a3b8; border-radius: 8px;">
  </iframe>
</body>
</html>`
    },
    hint: 'Thẻ <iframe> dùng để nhúng một tài liệu HTML khác vào trong trang web hiện tại.',
    checkCriteria: (doc) => {
      const iframe = doc.querySelector('iframe');
      const hasSrc = !!(iframe && iframe.getAttribute('src'));
      const passed = !!iframe && hasSrc;
      return {
        passed,
        message: passed
          ? 'Đạt kết quả mục tiêu Nhiệm vụ 4: Đã nhúng trang con bằng thẻ iframe thành công!'
          : 'Cần có thẻ <iframe> với thuộc tính src (ví dụ: src="CLB.html").'
      };
    }
  },
  {
    id: 5,
    title: 'Nhiệm vụ 5: Trung tâm truyền thông tổng hợp (Hub)',
    description: 'Thử thách tổng hợp: Thiết kế một trang Trung tâm truyền thông đa phương tiện chứa đồng thời cả 4 yếu tố: Ảnh minh họa (img), Bản ghi âm (audio), Video tư liệu (video) và Khung nội tuyến (iframe).',
    requirements: [
      'Có ít nhất 01 thẻ <img>',
      'Có ít nhất 01 thẻ <audio controls>',
      'Có ít nhất 01 thẻ <video controls>',
      'Có ít nhất 01 thẻ <iframe>',
      'Bố cục các mục truyền thông rõ ràng, mạch lạc'
    ],
    targetResult: {
      title: 'Trung tâm truyền thông đa phương tiện',
      description: 'Trang tích hợp đầy đủ cả 4 phương tiện nghe, nhìn và nhúng web.',
      html: `<!DOCTYPE html>
<html>
<head><title>Trung tâm truyền thông</title></head>
<body>
  <h2>TRUNG TÂM TƯ LIỆU ĐA PHƯƠNG TIỆN</h2>
  <h3>1. Hình ảnh năng lượng mặt trời</h3>
  <img src="images/sun.png" alt="Mặt trời" width="200">
  <h3>2. Nhạc lễ chào cờ</h3>
  <audio src="audio/Quoc_ca.mp3" controls></audio>
  <h3>3. Phim tư liệu lịch sử</h3>
  <video src="videos/war_is_over.mp4" controls width="360"></video>
  <h3>4. Trang thông tin nội tuyến</h3>
  <iframe src="thong_tin.html" width="100%" height="220"></iframe>
</body>
</html>`
    },
    hint: 'Kết hợp img, audio controls, video controls và iframe trong cùng một tài liệu HTML.',
    checkCriteria: (doc) => {
      const hasImg = !!doc.querySelector('img');
      const hasAudio = !!doc.querySelector('audio');
      const hasVideo = !!doc.querySelector('video');
      const hasIframe = !!doc.querySelector('iframe');
      const passed = hasImg && hasAudio && hasVideo && hasIframe;
      return {
        passed,
        message: passed
          ? 'Tuyệt vời! Đã hoàn thành xuất sắc Nhiệm vụ 5: Đầy đủ cả 4 phương tiện img, audio, video và iframe!'
          : `Còn thiếu: ${!hasImg ? '<img>, ' : ''}${!hasAudio ? '<audio>, ' : ''}${!hasVideo ? '<video>, ' : ''}${!hasIframe ? '<iframe>' : ''}`
      };
    }
  }
];
