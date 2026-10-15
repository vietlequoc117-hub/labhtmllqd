import { Lesson } from '../types';
import { lintHtmlCode } from '../utils/htmlLintValidator';

export interface CodeAnalysisResult {
  hasIssues: boolean;
  issues: string[];
  suggestions: string[];
  strengths: string[];
}

/**
 * Phân tích cú pháp và quy tắc HTML/CSS của học sinh (SGK Tin học 12)
 */
export function analyzeStudentCode(html: string, css: string, lesson?: Partial<Lesson>): CodeAnalysisResult {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const strengths: string[] = [];

  const trimmedHtml = html.trim();
  const trimmedCss = css.trim();

  if (!trimmedHtml) {
    return {
      hasIssues: true,
      issues: ['Khung soạn thảo HTML hiện đang trống rỗng, chưa có nội dung nào.'],
      suggestions: ['Em hãy gõ cấu trúc khung cơ bản với các thẻ như `<h1>`, `<p>`, `<div>` hoặc xem lại yêu cầu bài học nhé!'],
      strengths: [],
    };
  }

  // 1. Kiểm tra <!DOCTYPE html>
  if (/<!DOCTYPE\s+html/i.test(trimmedHtml)) {
    strengths.push('Đã khai báo chuẩn `<!DOCTYPE html>` rất chuyên nghiệp.');
  }

  // 2. Kiểm tra thẻ mở và thẻ đóng cơ bản
  const pairedTags = [
    'html', 'head', 'body', 'title', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'table', 'tr', 'td', 'th', 'ul', 'ol', 'li', 'form', 'button', 'a', 'span',
    'header', 'nav', 'main', 'footer', 'section', 'article', 'aside'
  ];

  for (const tag of pairedTags) {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
    const closeRegex = new RegExp(`</${tag}>`, 'gi');
    const openCount = (trimmedHtml.match(openRegex) || []).length;
    const closeCount = (trimmedHtml.match(closeRegex) || []).length;

    if (openCount > closeCount) {
      const diff = openCount - closeCount;
      issues.push(`Có ${diff} thẻ mở \`<${tag}>\` nhưng chưa có thẻ đóng tương ứng \`</${tag}>\`.`);
      suggestions.push(`Nhớ bổ sung thẻ đóng \`</${tag}>\` để tránh bị vỡ giao diện trang web.`);
    } else if (closeCount > openCount) {
      const diff = closeCount - openCount;
      issues.push(`Thừa ${diff} thẻ đóng \`</${tag}>\` mà không có thẻ mở tương ứng.`);
    } else if (openCount > 0) {
      if (['table', 'form', 'ul', 'ol', 'div'].includes(tag)) {
        strengths.push(`Sử dụng và đóng cặp thẻ \`<${tag}>\` chính xác.`);
      }
    }
  }

  // 3. Kiểm tra thẻ đơn (tự đóng hoặc không có thẻ đóng) mà học sinh hay viết nhầm thẻ đóng
  const voidTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
  for (const tag of voidTags) {
    const wrongCloseRegex = new RegExp(`</${tag}>`, 'gi');
    if (wrongCloseRegex.test(trimmedHtml)) {
      issues.push(`Thẻ \`<${tag}>\` là thẻ đơn (void tag), em không cần viết thẻ đóng \`</${tag}>\`.`);
      suggestions.push(`Hãy xóa thẻ \`</${tag}>\` đi em nhé.`);
    }
  }

  // 4. Kiểm tra thẻ <img>
  const imgMatches = trimmedHtml.match(/<img[^>]*>/gi);
  if (imgMatches) {
    imgMatches.forEach((imgTag, idx) => {
      if (!/src\s*=\s*["'][^"']+["']/i.test(imgTag)) {
        issues.push(`Thẻ <img> thứ ${idx + 1} thiếu thuộc tính \`src\` hoặc đường dẫn ảnh bị để trống.`);
        suggestions.push(`Thêm thuộc tính \`src="duong-dan-anh.jpg"\` để trình duyệt biết tải ảnh từ đâu.`);
      }
      if (!/alt\s*=\s*["'][^"']*["']/i.test(imgTag)) {
        issues.push(`Thẻ <img> thứ ${idx + 1} thiếu thuộc tính \`alt\` (chữ thay thế khi ảnh lỗi/dành cho người khiếm thị).`);
        suggestions.push(`Trong đề thi Tin học 12, thuộc tính \`alt\` luôn là điểm cộng chuẩn W3C! Ví dụ: \`alt="Ảnh chân dung học sinh"\`.`);
      }
    });
  }

  // 5. Kiểm tra thẻ <a>
  const aMatches = trimmedHtml.match(/<a[^>]*>/gi);
  if (aMatches) {
    aMatches.forEach((aTag, idx) => {
      if (!/href\s*=\s*["'][^"']+["']/i.test(aTag)) {
        issues.push(`Thẻ siêu liên kết <a> thứ ${idx + 1} thiếu thuộc tính \`href\`.`);
        suggestions.push(`Bổ sung \`href="https://..."\` hoặc \`href="#muc-tieu"\` để đường link có thể bấm chuyển trang.`);
      }
    });
  }

  // 6. Kiểm tra cấu trúc Table (Bài 9 SGK)
  if (/<table/i.test(trimmedHtml)) {
    if (/<td/i.test(trimmedHtml) && !/<tr/i.test(trimmedHtml)) {
      issues.push(`Phát hiện thẻ \`<td>\` nằm trực tiếp dưới \`<table>\` mà không được bọc trong hàng \`<tr>\`.`);
      suggestions.push(`Quy tắc cấu trúc bảng: \`<table>\` chứa các hàng \`<tr>\`, bên trong mỗi hàng \`<tr>\` mới chứa các ô \`<th>\` hoặc \`<td>\`.`);
    }

    // Kiểm tra colspan / rowspan
    if (/colspan\s*=\s*["']?\d+["']?/i.test(trimmedHtml)) {
      strengths.push('Đã áp dụng kỹ thuật gộp cột `colspan` trong bảng.');
    }
    if (/rowspan\s*=\s*["']?\d+["']?/i.test(trimmedHtml)) {
      strengths.push('Đã áp dụng kỹ thuật gộp dòng `rowspan` trong bảng.');
    }
  }

  // 7. Kiểm tra thẻ Form & Input (Bài 11 SGK)
  if (/<form/i.test(trimmedHtml)) {
    strengths.push('Biết cách tạo biểu mẫu `<form>` tương tác.');
    const inputMatches = trimmedHtml.match(/<input[^>]*>/gi);
    if (inputMatches) {
      inputMatches.forEach((inpTag, idx) => {
        if (!/type\s*=\s*["'][^"']+["']/i.test(inpTag)) {
          suggestions.push(`Thẻ <input> thứ ${idx + 1} chưa ghi rõ thuộc tính \`type\`. Trình duyệt sẽ mặc định là \`type="text"\`, nhưng em nên ghi rõ \`type="text"\`, \`type="email"\`, hoặc \`type="submit"\` cho chuẩn.`);
        }
      });
    }
  }

  // 8. Kiểm tra ngoặc kép thuộc tính chưa đóng
  const quoteIssues = trimmedHtml.match(/<[^>]*[a-zA-Z-]+\s*=\s*"[^">]*(?=<|$)/g);
  if (quoteIssues) {
    issues.push('Có thuộc tính HTML chưa đóng dấu ngoặc kép `"` trước dấu kết thúc thẻ `>`.');
  }

  // 9. Kiểm tra CSS
  if (trimmedCss) {
    const openBraces = (trimmedCss.match(/\{/g) || []).length;
    const closeBraces = (trimmedCss.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      issues.push(`Khối CSS có ${openBraces} dấu mở ngoặc nhọn \`{\` nhưng có ${closeBraces} dấu đóng ngoặc nhọn \`}\`.`);
      suggestions.push('Kiểm tra và đóng đủ các cặp ngoặc nhọn `{ ... }` cho mỗi bộ chọn CSS.');
    }

    // Kiểm tra thiếu dấu chấm phẩy
    const cssLines = trimmedCss.split('\n');
    cssLines.forEach((line) => {
      const trimmed = line.trim();
      if (
        trimmed &&
        trimmed.includes(':') &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith('}') &&
        !trimmed.startsWith('/*')
      ) {
        suggestions.push(`Dòng CSS: \`${trimmed}\` dường như thiếu dấu chấm phẩy \`;\` ở cuối khai báo thuộc tính.`);
      }
    });

    if (openBraces === closeBraces && openBraces > 0) {
      strengths.push('Cú pháp định kiểu CSS rõ ràng, các bộ chọn được đóng mở ngoặc chuẩn xác.');
    }
  }

  return {
    hasIssues: issues.length > 0,
    issues,
    suggestions,
    strengths,
  };
}

/**
 * Cơ sở tri thức chuẩn Sư phạm Tin học 12 & Chuyên gia HTML
 */
interface KnowledgeItem {
  keywords: string[];
  title: string;
  generateAnswer: (context: {
    question: string;
    lessonTitle?: string;
    codeHtml?: string;
    codeCss?: string;
    analysis?: CodeAnalysisResult;
  }) => string;
}

const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // 1. Phân biệt Block vs Inline
  {
    keywords: ['block', 'inline', 'div', 'span', 'khối', 'nội dòng', 'khác nhau giữa div và span', 'phan biet block inline'],
    title: 'Phân biệt phần tử Block và Inline trong HTML',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Trong HTML, các thẻ hiển thị nội dung được chia làm 2 họ chính: **Phần tử dạng khối (Block-level elements)** và **Phần tử nội dòng (Inline elements)**.

---

### 💡 Ẩn dụ đời sống dễ nhớ:
- 📦 **Phần tử Block (như \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<ul>\`, \`<table>\`):**
  * Giống như **"Một chiếc thùng các-tông hoặc viên gạch đặc"**.
  * **Đặc tính:** Luôn **bắt đầu trên một dòng mới** và tự động chiếm **toàn bộ chiều ngang (100% width)** của dòng đó. Các phần tử đứng sau nó bắt buộc phải nhảy xuống dòng tiếp theo.
  * Có thể tùy chỉnh tự do chiều rộng (\`width\`), chiều cao (\`height\`), lề trên dưới (\`margin\`, \`padding\`).

- 🖍️ **Phần tử Inline (như \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<code>\`):**
  * Giống như **"Một nét bút dạ quang tô màu"** lên vài từ trong cuốn vở.
  * **Đặc tính:** Nằm **ngay trên dòng hiện tại**, chỉ chiếm chiều rộng vừa khít với nội dung bên trong của nó. Không ngắt dòng!
  * Không thể đặt trực tiếp \`width\` và \`height\` (nếu muốn đặt thì phải đổi sang \`display: inline-block\`).

---

### 💻 Ví dụ so sánh trực quan:
\`\`\`html
<!-- Ví dụ Block: Hai thẻ p sẽ tự động nằm ở 2 dòng riêng biệt -->
<p style="background-color: lightblue;">Đây là dòng thứ nhất (Block)</p>
<p style="background-color: lightgreen;">Đây là dòng thứ hai (Block)</p>

<!-- Ví dụ Inline: Hai thẻ span sẽ nằm liền kề nhau trên cùng một dòng -->
<span>Học sinh</span> <span style="color: red; font-weight: bold;">Lớp 12A1</span>
\`\`\`

---

### ⚠️ Cạm bẫy thi Tin học 12 cần chú ý:
1. **Không bọc thẻ Block bên trong thẻ Inline:** Ví dụ đặt thẻ \`<p>\` bên trong thẻ \`<span>\` là sai ngữ nghĩa HTML! Ngược lại, đặt thẻ \`<span>\` bên trong \`<p>\` hoặc \`<div>\` là hoàn toàn chuẩn.
2. Thẻ \`<a>\` mặc định là inline, nhưng từ chuẩn HTML5 có thể bọc một khối \`<div>\` để biến cả khối thành liên kết bấm được.

🚀 **Mẹo thi:** Cứ nhớ **Block = Xuống dòng chiếm trọn hàng**, còn **Inline = Nằm cùng hàng với chữ khác**!`,
  },

  // 2. Bảng Table, Rowspan & Colspan
  {
    keywords: ['table', 'rowspan', 'colspan', 'gộp ô', 'gộp dòng', 'gộp cột', 'bảng', 'thời khóa biểu', 'thẻ table', 'thẻ tr', 'thẻ td', 'thẻ th', '<table>', '<tr>', '<td>', '<th>', 'tạo bảng'],
    title: 'Cách dùng thẻ Table, Rowspan và Colspan chuẩn xác',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Bảng trong HTML (\`<table>\`) được xây dựng **theo từng hàng từ trên xuống dưới**. Không có thẻ tạo cột trực tiếp, mà cột được hình thành bởi các ô nằm trong từng hàng.

---

### 💡 Thứ tự cấu trúc chuẩn Sách giáo khoa Tin học 12:
1. \`<table>\`: Khung bao toàn bộ bảng.
2. \`<tr>\` (Table Row): Đại diện cho **một hàng ngang**.
3. \`<th>\` (Table Header): Ô tiêu đề cột (chữ tự động in đậm và căn giữa).
4. \`<td>\` (Table Data): Ô dữ liệu bình thường của bảng.

---

### 📐 Tuyệt chiêu nhớ \`colspan\` và \`rowspan\`:
- ↔️ **\`colspan\` (Column Span - Gộp CỘT):**
  * Gộp nhiều ô nằm **ngang** trên cùng một hàng lại thành 1 ô duy nhất.
  * *Ẩn dụ:* Tiết "Chào cờ đầu tuần" kéo dài qua 4 cột của các tổ.
  * *Quy tắc:* Nếu ô này gộp \`colspan="3"\`, thì ở hàng đó em phải **bớt đi 2 thẻ \`<td>\`** kế tiếp!

- ↕️ **\`rowspan\` (Row Span - Gộp HÀNG / Gộp DÒNG):**
  * Gộp nhiều ô nằm **dọc** qua các hàng kế tiếp nhau.
  * *Ẩn dụ:* Môn "Giáo dục quốc phòng" học liền 2 buổi chiều thứ 4 và thứ 5.
  * *Quy tắc:* Nếu ô ở hàng trên dùng \`rowspan="2"\`, thì ở **hàng ngay bên dưới, em phải bớt đi 1 thẻ \`<td>\`** tương ứng vì ô trên đã chiếm chỗ rồi!

---

### 💻 Mã nguồn mẫu kinh điển (Bảng Thời Khóa Biểu):
\`\`\`html
<table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
  <tr>
    <th>Thứ</th>
    <th>Tiết 1</th>
    <th>Tiết 2</th>
  </tr>
  <tr>
    <td rowspan="2">Thứ Hai</td>
    <td>Toán</td>
    <td>Văn</td>
  </tr>
  <tr>
    <!-- Hàng này không cần td Thứ Hai nữa vì rowspan đã gộp từ trên xuống -->
    <td>Tin học</td>
    <td>Tiếng Anh</td>
  </tr>
  <tr>
    <td colspan="3" style="background-color: #fef08a; font-weight: bold;">
      Sinh hoạt tập thể cuối tuần (Gộp 3 cột)
    </td>
  </tr>
</table>
\`\`\`

🚀 **Mẹo thi:** Khi làm bài tập gộp ô, hãy vẽ phác thảo bảng ra giấy nháp trước và đếm tổng số ô của mỗi hàng để không bao giờ bị lệch khung bảng!`,
  },

  // 3. Form và Input
  {
    keywords: ['form', 'input', 'biểu mẫu', 'phiếu', 'submit', 'radio', 'checkbox', 'password', 'select', 'textarea'],
    title: 'Các loại Input thông dụng trong thẻ Form (Tin học 12)',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Thẻ \`<form>\` giống như một **"Tờ phiếu đăng ký nguyện vọng hoặc bài kiểm tra trắc nghiệm"** dùng để thu thập thông tin người dùng gửi lên máy chủ (Server).

---

### 📋 Các loại \`<input type="...">\` học sinh THPT bắt buộc phải nhớ:
1. 📝 \`type="text"\`: Ô nhập văn bản một dòng ngắn (Họ và tên, trường, lớp).
2. 🔒 \`type="password"\`: Ô mật khẩu (tự động che ký tự bằng dấu chấm tròn \`••••\`).
3. 📧 \`type="email"\`: Ô nhập email (tự động kiểm tra có dấu \`@\` hay không).
4. 🔢 \`type="number"\`: Ô nhập số (có thể đặt thuộc tính \`min\`, \`max\`).
5. 📅 \`type="date"\`: Ô chọn ngày tháng năm từ lịch popup.
6. 🔘 \`type="radio"\`: Nút chọn **1 trong nhiều** (Ví dụ: Giới tính Nam/Nữ). *Lưu ý sống còn: Các nút cùng nhóm phải có cùng thuộc tính \`name\`!*
7. ☑️ \`type="checkbox"\`: Ô tích chọn **nhiều đáp án cùng lúc** (Sở thích: Đá bóng, Đọc sách, Lập trình).
8. 🚀 \`type="submit"\`: Nút bấm gửi biểu mẫu đi.
9. 🔄 \`type="reset"\`: Nút bấm xóa trắng để nhập lại từ đầu.

---

### 💻 Mã ví dụ mẫu Form học sinh chuẩn mực:
\`\`\`html
<form action="#" method="POST" style="background: #f8fafc; padding: 15px; border-radius: 8px;">
  <!-- Nhập họ tên -->
  <label for="hoten">Họ và tên học sinh:</label><br>
  <input type="text" id="hoten" name="hoten" placeholder="Nguyễn Văn A" required><br><br>

  <!-- Chọn giới tính (Radio cùng name='gioitinh') -->
  <label>Giới tính:</label><br>
  <input type="radio" id="nam" name="gioitinh" value="Nam" checked>
  <label for="nam">Nam</label>
  <input type="radio" id="nu" name="gioitinh" value="Nu">
  <label for="nu">Nữ</label><br><br>

  <!-- Nút gửi -->
  <input type="submit" value="Đăng ký hồ sơ" style="background: #2563eb; color: white; padding: 6px 16px; border: none; border-radius: 4px; cursor: pointer;">
</form>
\`\`\`

🚀 **Mẹo thi trắc nghiệm:** Nếu đề bài hỏi *"Làm sao để khi chọn radio này thì radio kia tự hủy chọn?"* -> Câu trả lời chính xác là: **Đặt chung giá trị thuộc tính \`name\`**!`,
  },

  // 4. Thẻ img và thuộc tính alt, src
  {
    keywords: ['img', 'ảnh', 'hình ảnh', 'alt', 'src', 'tai sao anh khong hien thi', 'tai sao anh bi loi'],
    title: 'Thẻ chèn hình ảnh <img> và thuộc tính Alt trong HTML',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Thẻ \`<img>\` là **thẻ đơn (void tag)**, không chứa chữ bên trong và không có thẻ đóng \`</img>\`.

---

### 🖼️ 2 Thuộc tính cốt lõi của thẻ \`<img>\`:
1. 📂 **\`src\` (Source):**
   * Chỉ định đường dẫn tới tệp hình ảnh.
   * Có thể là link mạng tuyệt đối (\`https://example.com/logo.png\`) hoặc đường dẫn tương đối trong thư mục máy (\`./images/anh-lop.jpg\`).
2. 🏷️ **\`alt\` (Alternate Text - Chữ thay thế):**
   * Đây là thuộc tính cực kỳ quan trọng theo chuẩn W3C!
   * Nếu ảnh bị hỏng đường link hoặc người dùng mạng yếu không tải được ảnh, trình duyệt sẽ **hiển thị dòng chữ trong \`alt\`** để người đọc vẫn hiểu ảnh đó nói về điều gì.
   * Đồng thời giúp các phần mềm đọc màn hình cho người khiếm thị đọc nội dung ảnh.

---

### ❓ Vì sao ảnh của em không hiển thị?
Nếu em viết thẻ \`<img>\` mà trang web chỉ hiện biểu tượng ô vuông gãy hoặc khung trống:
1. **Sai chính tả tên file hoặc đuôi mở rộng:** Hệ thống phân biệt rõ \`.jpg\`, \`.jpeg\`, \`.png\`, \`.webp\`.
2. **Sai chữ hoa chữ thường:** Trên môi trường máy chủ web, \`anh1.JPG\` khác hoàn toàn \`anh1.jpg\`.
3. **Quên đặt trong dấu ngoặc kép:** Phải viết \`src="duong-dan"\` chứ không viết thiếu ngoặc.

---

### 💻 Mã ví dụ chuẩn:
\`\`\`html
<img 
  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" 
  alt="Góc học tập lập trình máy tính của học sinh"
  width="400" 
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
>
\`\`\`

🚀 **Mẹo thi:** Đi thi luôn nhớ thẻ \`<img>\` **không có \`</img>\`**, và luôn đi kèm cặp thuộc tính vàng \`src\` + \`alt\`.`,
  },

  // 5. 3 Cách nhúng CSS
  {
    keywords: ['css', '3 cach viet css', 'inline', 'internal', 'external', 'nhung css', 'cach dung css'],
    title: 'Phân biệt 3 cách nhúng CSS vào trang HTML',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
CSS (Cascading Style Sheets) là ngôn ngữ quy định diện mạo, màu sắc, bố cục cho trang web. Có 3 cách nhúng CSS vào tài liệu:

---

### 1. 🎨 Inline CSS (CSS Nội tuyến):
- **Cách viết:** Dùng trực tiếp thuộc tính \`style="..."\` ngay trong từng thẻ HTML.
- **Ví dụ:** \`<p style="color: red; font-size: 16px;">Đoạn văn chữ đỏ</p>\`
- **Ưu điểm:** Nhanh gọn khi cần thử nghiệm gấp 1 kiểu dáng duy nhất.
- **Nhược điểm:** Làm code HTML rối mắt, khó tái sử dụng nếu trang có hàng chục đoạn văn.

### 2. 📄 Internal CSS (CSS Nội bộ):
- **Cách viết:** Đặt toàn bộ mã CSS trong cặp thẻ \`<style> ... </style>\`, nằm bên trong phần \`<head>\` của trang HTML.
- **Ví dụ:**
\`\`\`html
<head>
  <style>
    p { color: blue; line-height: 1.5; }
    h1 { text-align: center; color: darkblue; }
  </style>
</head>
\`\`\`
- **Ưu điểm:** Quản lý tập trung phong cách cho cả một trang web duy nhất.

### 3. 🌐 External CSS (CSS Ngoại bộ - Chuẩn chuyên nghiệp):
- **Cách viết:** Viết CSS ra một tệp riêng có đuôi \`.css\` (ví dụ: \`style.css\`), sau đó liên kết vào trang HTML bằng thẻ \`<link>\` đặt trong \`<head>\`.
- **Ví dụ:** \`<link rel="stylesheet" href="style.css">\`
- **Ưu điểm:** Đây là cách chuẩn nhất trong thực tế và các dự án lớn, giúp dùng chung 1 file giao diện cho hàng trăm trang web khác nhau.

---

### 🏆 Thứ tự ưu tiên (Độ mạnh):
**Inline CSS > Internal CSS > External CSS > Kiểu mặc định của trình duyệt**
*(Ngoại lệ: Thuộc tính nào có kèm \`!important\` sẽ có độ ưu tiên cao nhất).*`,
  },

  // 6. Thẻ siêu liên kết <a> và neo trang
  {
    keywords: ['thẻ a', 'lien ket', 'hyperlink', 'href', 'target', '_blank', 'neo', 'chuyen trang'],
    title: 'Thẻ siêu liên kết <a> và thuộc tính href, target',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Thẻ \`<a>\` (viết tắt của **Anchor - Mỏ neo**) tạo ra một siêu liên kết (Hyperlink) cho phép người dùng click để nhảy sang một trang web khác, mở một tệp, gửi email hoặc cuộn tới vị trí khác trên cùng một trang.

---

### 🔑 Các thuộc tính quan trọng nhất:
1. 🌐 **\`href\` (Hypertext Reference):**
   * Địa chỉ đích mà liên kết sẽ dẫn tới.
   * Ví dụ: \`href="https://google.com"\` (Liên kết ngoài).
   * Ví dụ: \`href="#gioi-thieu"\` (Liên kết neo đến phần tử có \`id="gioi-thieu"\` trên cùng trang).
2. 🪟 **\`target="_blank"\`:**
   * Yêu cầu trình duyệt mở trang đích trong **một tab (thẻ) mới**, không làm mất trang hiện tại của người dùng.
3. 📧 **\`href="mailto:email@example.com"\`:**
   * Mở ứng dụng gửi thư điện tử khi click.

---

### 💻 Mã ví dụ mẫu:
\`\`\`html
<!-- Mở trang trong tab mới -->
<a href="https://moet.gov.vn" target="_blank" rel="noopener noreferrer">
  Cổng thông tin Bộ Giáo dục & Đào tạo
</a>

<!-- Liên kết neo nội bộ cuộn xuống phần liên hệ -->
<a href="#lien-he">Bấm vào đây để xuống mục Liên hệ</a>

...

<h2 id="lien-he">Thông tin liên hệ lớp 12A1</h2>
\`\`\`

🚀 **Mẹo thi:** Muốn tạo liên kết không nhảy đi đâu mà dùng để bấm chạy Javascript/thử nghiệm, người ta thường để \`href="#"\`.`,
  },

  // 7. Danh sách ul, ol, li
  {
    keywords: ['danh sach', 'ul', 'ol', 'li', 'danh sach co thu tu', 'danh sach khong thu tu', 'list'],
    title: 'Tạo danh sách trong HTML với thẻ <ul>, <ol> và <li>',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
HTML hỗ trợ 2 dạng danh sách cơ bản thường xuyên xuất hiện trong đề thi Tin học 12:

---

### 1. 🔘 Thẻ \`<ul>\` (Unordered List - Danh sách không thứ tự):
- Các mục liệt kê có dấu chấm tròn đầu dòng (bullet points).
- Dùng khi thứ tự các mục không quan trọng (ví dụ: Danh sách đồ dùng học tập cần mang).
- Thuộc tính kiểu dấu chấm (CSS \`list-style-type\`): \`disc\` (chấm tròn đen), \`circle\` (vòng tròn rỗng), \`square\` (hình vuông).

### 2. 🔢 Thẻ \`<ol>\` (Ordered List - Danh sách có thứ tự):
- Các mục được đánh số thứ tự tăng dần tự động (1, 2, 3... hoặc A, B, C... hoặc I, II, III...).
- Dùng cho các bước thực hiện, quy trình, bảng xếp hạng.
- Thuộc tính \`type\`: \`type="1"\`, \`type="A"\`, \`type="a"\`, \`type="I"\`, \`type="i"\`.

### 3. 📌 Thẻ \`<li>\` (List Item):
- Đại diện cho **từng mục con** bên trong danh sách.
- Bắt buộc phải nằm bên trong \`<ul>\` hoặc \`<ol>\`!

---

### 💻 Mã nguồn mẫu:
\`\`\`html
<h3>3 Bước học tốt môn Tin học:</h3>
<ol type="1">
  <li>Đọc kỹ lý thuyết SGK Tin học 12.</li>
  <li>Thực hành viết code trên phòng máy ảo.</li>
  <li>Làm bài tập trắc nghiệm và câu hỏi củng cố.</li>
</ol>
\`\`\`

⚠️ **Lỗi học sinh hay mắc:** Đặt chữ trực tiếp trong \`<ul>\` mà quên bọc bằng thẻ \`<li>\`. Hãy luôn nhớ: \`<ul>\` và \`<ol>\` chỉ được chứa con trực tiếp là các thẻ \`<li>\`!`,
  },

  // 8. Mô hình hộp CSS Box Model
  {
    keywords: ['box model', 'margin', 'padding', 'border', 'mo hinh hop', 'le', 'viền', 'khoang dem'],
    title: 'Hiểu cặn kẽ Mô hình hộp (CSS Box Model)',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Mọi phần tử HTML trên màn hình đều được trình duyệt coi như **một chiếc hộp chữ nhật**. Chiếc hộp này gồm 4 lớp từ trong ra ngoài:

---

### 🖼️ 4 Lớp của CSS Box Model (Ẩn dụ bức tranh treo tường):
1. 🎨 **Content (Nội dung bên trong):**
   * Là bức vẽ tranh vẽ thực tế (chữ, hình ảnh, video).
   * Kích thước xác định bởi \`width\` và \`height\`.
2. 🧽 **Padding (Khoảng đệm):**
   * Khoảng trống giữa nội dung và đường viền khung tranh.
   * Giúp chữ không bị dính sát vào đường viền mép hộp.
   * Có màu nền giống màu nền của hộp.
3. 🖼️ **Border (Đường viền):**
   * Khung gỗ bao quanh bức tranh.
   * Có độ dày (\`border-width\`), kiểu đường (\`border-style: solid/dashed/dotted\`), màu sắc (\`border-color\`).
4. 🌌 **Margin (Khoảng lề ngoài):**
   * Khoảng cách từ khung tranh này đến bức tranh khác treo trên tường.
   * Tạo khoảng cách giữa các phần tử với nhau, luôn trong suốt.

---

### 💻 Mã ví dụ trực quan:
\`\`\`css
.hop-thong-tin {
  width: 300px;         /* Bề rộng nội dung */
  padding: 20px;        /* Đệm cách nội dung 20px */
  border: 2px solid #2563eb; /* Viền xanh dày 2px */
  margin: 30px auto;    /* Lề ngoài cách các phần tử khác 30px, căn giữa */
  box-sizing: border-box;
}
\`\`\`

🚀 **Mẹo chuyên gia:** Luôn thêm thuộc tính \`box-sizing: border-box;\` để khi cộng thêm \`padding\` và \`border\`, chiếc hộp không bị phình to làm vỡ layout trang web!`,
  },

  // 9. Thẻ xuống dòng <br> và thẻ đường kẻ ngang <hr>
  {
    keywords: ['xuống dòng', 'ngắt dòng', '<br>', 'thẻ br', 'thẻ ngắt dòng', 'làm sao để xuống dòng', 'đường kẻ ngang', '<hr>', 'thẻ hr', 'gạch ngang'],
    title: 'Thẻ xuống dòng <br> và thẻ đường kẻ ngang <hr> trong HTML',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
- **Thẻ xuống dòng:** Là thẻ \`<br>\` (viết tắt của **Break** hoặc Line Break).
- **Thẻ đường kẻ ngang:** Là thẻ \`<hr>\` (viết tắt của **Horizontal Rule**).

---

### 💡 Đặc điểm quan trọng (Cực kỳ hay thi trắc nghiệm):
1. Cả \`<br>\` và \`<hr>\` đều là **Thẻ đơn (Void Element / Empty Tag)**:
   * **Không có nội dung** bên trong.
   * **KHÔNG CẦN và KHÔNG ĐƯỢC VIẾT thẻ đóng** như \`</br>\` hay \`</hr>\`!
   * Có thể viết là \`<br>\` hoặc \`<br />\` (chuẩn XHTML).
2. Khi gặp \`<br>\`, trình duyệt sẽ ngay lập tức **ngắt văn bản sang dòng mới** mà không tạo thêm khoảng trống lớn như thẻ \`<p>\`.
3. Khi gặp \`<hr>\`, trình duyệt sẽ vẽ một **đường kẻ ngang phân cách** giữa các phần nội dung của trang web.

---

### 💻 Mã ví dụ minh họa:
\`\`\`html
<p>
  Trường THPT Chuyên Lê Quý Đôn<br>
  Lớp 12A1 - Năm học 2024-2025<br>
  Môn: Tin học 12
</p>

<!-- Đường kẻ ngang phân cách -->
<hr>

<p>Phần nội dung tiếp theo bên dưới đường kẻ.</p>
\`\`\`

🚀 **Mẹo nhớ thi:** Muốn xuống dòng giữa bài thơ, địa chỉ thì dùng \`<br>\`. Muốn kẻ đường phân cách các chủ đề thì dùng \`<hr>\`!`,
  },

  // 10. Thẻ tiêu đề Heading <h1> đến <h6>
  {
    keywords: ['tiêu đề', 'heading', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'thẻ h', 'kích thước tiêu đề'],
    title: 'Các thẻ tiêu đề Heading từ <h1> đến <h6> trong HTML',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
Trong HTML5, các thẻ tiêu đề (Heading) được biểu diễn từ **\`<h1>\` đến \`<h6>\`**:
- \`<h1>\`: Tiêu đề quan trọng nhất, chữ lớn nhất (thường là tên trang web hoặc tiêu đề bài viết chính).
- \`<h2>\`: Tiêu đề mục lớn (Chương, phần chính).
- \`<h3>\`: Tiêu đề mục con bên trong \`<h2>\`.
- \`<h4>\`, \`<h5>\`, \`<h6>\`: Các tiêu đề nhỏ hơn giảm dần theo cấp bậc.

---

### 💡 Bản chất kỹ thuật & Quy tắc W3C:
1. Tất cả các thẻ \`<h1>\`-\`<h6>\` đều là **Phần tử khối (Block element)**: Chúng luôn chiếm trọn chiều ngang và tự động xuống dòng.
2. Chữ trong thẻ heading được trình duyệt **tự động in đậm (bold)**.
3. **Quy tắc SEO & Chuẩn ngữ nghĩa:** Trong mỗi trang web chỉ nên có **duy nhất một thẻ \`<h1>\`** để máy tìm kiếm hiểu đúng chủ đề chính của trang.

---

### 💻 Ví dụ chuẩn cấp bậc tiêu đề:
\`\`\`html
<h1>CỔNG THÔNG TIN KHỐI 12</h1>
<h2>1. Danh sách các câu lạc bộ</h2>
<h3>1.1. Câu lạc bộ Tin học</h3>
<h3>1.2. Câu lạc bộ Thể thao</h3>
<h2>2. Lịch thi tốt nghiệp THPT</h2>
\`\`\``,
  },

  // 11. Định dạng văn bản: In đậm, in nghiêng, gạch chân, highlight
  {
    keywords: ['in đậm', 'in nghiêng', 'gạch chân', 'thẻ b', 'thẻ strong', 'thẻ i', 'thẻ em', 'thẻ u', '<b>', '<strong>', '<i>', '<em>', '<u>', 'mark', 'del', 'sup', 'sub', 'chỉ số trên', 'chỉ số dưới', 'định dạng văn bản'],
    title: 'Các thẻ định dạng văn bản thông dụng trong HTML',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
HTML cung cấp các thẻ nội dòng (Inline) chuyên dụng để định dạng chữ:

| Thẻ HTML | Tác dụng hiển thị | Ý nghĩa ngữ nghĩa (Semantics) |
| :--- | :--- | :--- |
| \`<b>\` | **In đậm chữ** | Chỉ in đậm hình thức thông thường |
| \`<strong>\` | **In đậm chữ** | **Nhấn mạnh tầm quan trọng** (Khuyên dùng) |
| \`<i>\` | *In nghiêng chữ* | In nghiêng hình thức (thuật ngữ, tiếng nước ngoài) |
| \`<em>\` | *In nghiêng chữ* | Nhấn mạnh giọng điệu (Emphasis) |
| \`<u>\` | <u>Gạch chân chữ</u> | Gạch chân dưới từ |
| \`<mark>\` | <mark>Tô sáng (highlight)</mark> | Nền màu vàng nổi bật như bút dạ quang |
| \`<del>\` | ~~Gạch ngang chữ (xóa)~~ | Đánh dấu nội dung đã cũ, bị xóa |
| \`<sup>\` | X² (Chỉ số trên) | Viết số mũ toán học, chú thích (Superscript) |
| \`<sub>\` | H₂O (Chỉ số dưới) | Viết công thức hóa học (Subscript) |

---

### 💻 Mã ví dụ tổng hợp:
\`\`\`html
<p>Công thức hóa học của nước là <b>H<sub>2</sub>O</b>.</p>
<p>Công thức định lý Pythagoras: <i>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></i>.</p>
<p>Nhớ <strong>học kỹ lý thuyết Tin học 12</strong> trước ngày thi!</p>
\`\`\``,
  },

  // 12. Thẻ Đa phương tiện: Âm thanh <audio>, Video <video>, Nhúng <iframe>
  {
    keywords: ['audio', 'video', 'iframe', 'chèn nhạc', 'chèn video', 'phát nhạc', 'nhúng trang', 'khung nội tuyến', 'controls'],
    title: 'Chèn đa phương tiện Audio, Video và Iframe trong HTML',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
Trong HTML5 (Bài 11 SGK Tin học 12), chèn đa phương tiện được thực hiện qua 3 thẻ chính:

1. 🎵 **Thẻ \`<audio>\` (Chèn tệp âm thanh/nhạc):**
   * Thuộc tính bắt buộc để người dùng bấm Play/Pause: **\`controls\`**.
   * Cú pháp chuẩn:
\`\`\`html
<audio controls>
  <source src="bai-hat.mp3" type="audio/mpeg">
  Trình duyệt của bạn không hỗ trợ thẻ audio.
</audio>
\`\`\`

2. 🎬 **Thẻ \`<video>\` (Chèn video/clip):**
   * Các thuộc tính cốt lõi: \`controls\`, \`width\`, \`height\`, \`poster\` (ảnh bìa).
\`\`\`html
<video width="480" height="270" controls>
  <source src="gioi-thieu.mp4" type="video/mp4">
  Trình duyệt không hỗ trợ xem video này.
</video>
\`\`\`

3. 🪟 **Thẻ \`<iframe>\` (Khung nội tuyến nhúng trang web khác):**
   * Nhúng một tài liệu HTML khác hoặc nhúng video YouTube, bản đồ Google Maps vào trang web hiện tại.
\`\`\`html
<iframe src="thong_tin.html" width="100%" height="300" title="Trang thông tin"></iframe>
\`\`\`

⚠️ **Cạm bẫy bài thi:** Nếu quên thuộc tính \`controls\`, thẻ \`<audio>\` và \`<video>\` sẽ bị ẩn hoàn toàn thanh điều khiển và học sinh sẽ không thấy nút bấm nghe/xem!`,
  },

  // 13. Phân biệt Class và ID trong HTML/CSS
  {
    keywords: ['class', 'id', 'phân biệt class và id', 'khác nhau giữa class và id', 'khi nào dùng class', 'khi nào dùng id'],
    title: 'Phân biệt thuộc tính Class và ID trong HTML/CSS',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
- 🏷️ **\`id\` (Identity - Mã định danh cá nhân):**
  * Giống như **"Số Căn cước công dân (CCCD)"** của mỗi học sinh.
  * Trong cùng một trang web, mỗi giá trị \`id\` **CHỈ ĐƯỢC XUẤT HIỆN DUY NHẤT 1 LẦN**!
  * Trong CSS, bộ chọn ID được ký hiệu bằng dấu thăng: **\`#id-name\`**.

- 🎨 **\`class\` (Class - Lớp/Nhóm):**
  * Giống như **"Đồng phục lớp"** mà nhiều học sinh cùng mặc.
  * Có thể gán cùng một \`class\` cho **NHIỀU phần tử HTML khác nhau** để cùng chia sẻ chung một kiểu dáng giao diện.
  * Trong CSS, bộ chọn Class được ký hiệu bằng dấu chấm: **\`.class-name\`**.

---

### 💻 Bảng so sánh trực quan:
\`\`\`html
<!-- Thẻ này có id duy nhất -->
<h1 id="tieu-de-chinh">TRANG CHỦ KHỐI 12</h1>

<!-- Nhiều thẻ cùng mang class thong-bao -->
<p class="thong-bao">Lịch kiểm tra Tin học vào sáng thứ Năm.</p>
<p class="thong-bao">Nộp bài tập thực hành trước 17h00.</p>
\`\`\`

\`\`\`css
/* Định dạng cho ID duy nhất */
#tieu-de-chinh { color: #1e40af; text-align: center; }

/* Định dạng chung cho tất cả các thẻ có class */
.thong-bao { background-color: #fef08a; padding: 10px; border-left: 4px solid #eab308; }
\`\`\`

🚀 **Mẹo thi:** **# = ID** (Duy nhất), **. = Class** (Dùng chung cho nhiều thẻ)!`,
  },

  // 14. Menu lựa chọn <select> và ô nhập <textarea>
  {
    keywords: ['select', 'option', 'textarea', 'menu thả xuống', 'dropdown', 'nhập nhiều dòng', 'hộp văn bản'],
    title: 'Thẻ <select>, <option> và <textarea> trong biểu mẫu Form',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
1. 🔽 **Thẻ \`<select>\` và \`<option>\` (Menu thả xuống / Dropdown list):**
   * Dùng khi cần người dùng chọn 1 phương án trong danh sách dài (ví dụ: Chọn Tỉnh/Thành phố, chọn Năm sinh).
   * \`<select>\` là khung bao bên ngoài, mỗi mục lựa chọn bên trong là thẻ \`<option>\`.
   * Thuộc tính \`selected\` giúp chọn sẵn một mục mặc định.

2. 📝 **Thẻ \`<textarea>\` (Ô nhập văn bản nhiều dòng):**
   * Dùng để nhập nội dung dài như: Ý kiến đóng góp, lời nhắn, tiểu sử.
   * Khác với \`<input type="text">\` (chỉ nhập 1 dòng ngắn).
   * Thuộc tính: \`rows\` (số dòng), \`cols\` (số cột), \`placeholder\` (chữ gợi ý).

---

### 💻 Mã ví dụ mẫu:
\`\`\`html
<!-- Menu chọn lớp -->
<label for="lop">Chọn lớp học:</label>
<select id="lop" name="lop">
  <option value="12a1">Lớp 12A1</option>
  <option value="12a2" selected>Lớp 12A2 (Mặc định)</option>
  <option value="12a3">Lớp 12A3</option>
</select>

<br><br>

<!-- Ô nhập ý kiến nhiều dòng -->
<label for="gopy">Ý kiến đóng góp:</label><br>
<textarea id="gopy" name="gopy" rows="4" cols="40" placeholder="Nhập ý kiến của em tại đây..."></textarea>
\`\`\``,
  },

  // 15. Cấu trúc chuẩn khung trang web HTML5
  {
    keywords: ['cấu trúc html', 'cấu trúc trang web', 'doctype', 'html lang', 'head', 'meta charset', 'utf-8', 'body', 'khung cơ bản'],
    title: 'Cấu trúc tài liệu chuẩn của một trang web HTML5',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Một trang web HTML5 hợp lệ chuẩn W3C luôn bắt buộc phải có cấu trúc cây tài liệu (DOM) gồm các phần sau:

\`\`\`html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tiêu đề hiển thị trên tab trình duyệt</title>
</head>
<body>
  <!-- Mọi nội dung người dùng nhìn thấy trên màn hình đều nằm ở đây -->
  <h1>Xin chào thế giới!</h1>
  <p>Trang web đầu tiên của em.</p>
</body>
</html>
\`\`\`

---

### 💡 Giải nghĩa từng thành phần:
1. \`<!DOCTYPE html>\`: Khai báo phiên bản tài liệu là **HTML5** để trình duyệt kết xuất chuẩn xác.
2. \`<html lang="vi">\`: Thẻ gốc bao bọc toàn bộ mã HTML, ngôn ngữ tài liệu là Tiếng Việt.
3. \`<head>\`: Phần đầu chứa các **siêu dữ liệu (metadata)** không hiển thị trực tiếp lên trang (như bảng mã, tiêu đề tab, liên kết file CSS).
4. \`<meta charset="UTF-8">\`: Khai báo bảng mã ký tự Unicode để hiển thị **đúng dấu Tiếng Việt** mà không bị lỗi font (hình vuông hay ký tự lạ).
5. \`<title>\`: Tiêu đề xuất hiện trên tab trình duyệt và kết quả tìm kiếm Google.
6. \`<body>\`: Phần thân chứa **toàn bộ nội dung hiển thị** (chữ, hình ảnh, bảng biểu, liên kết, video).`,
  },

  // 16. Thẻ ngữ nghĩa Semantic HTML5
  {
    keywords: ['thẻ ngữ nghĩa', 'semantic', 'header', 'nav', 'main', 'footer', 'section', 'article', 'aside'],
    title: 'Các thẻ ngữ nghĩa (Semantic HTML5) trong thiết kế web hiện đại',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Thẻ ngữ nghĩa (Semantic elements) là những thẻ mà **tên thẻ nói lên chính xác ý nghĩa và vai trò nội dung của nó** cho cả lập trình viên và các cỗ máy tìm kiếm (Google, Bing) hiểu được.

---

### 🏛️ Các thẻ ngữ nghĩa chuẩn SGK Tin học 12:
- 🔝 **\`<header>\`**: Phần đầu trang web hoặc đầu bài viết (thường chứa logo, khẩu hiệu).
- 🧭 **\`<nav>\`**: Thanh điều hướng chứa các liên kết thực đơn (Menu).
- 📰 **\`<main>\`**: Khối chứa nội dung chính, quan trọng nhất của trang.
- 📦 **\`<section>\`**: Một phần, một chuyên mục nội dung cụ thể trong trang.
- 📄 **\`<article>\`**: Một bài viết độc lập hoàn chỉnh (như tin tức, bài blog).
- 📎 **\`<aside>\`**: Cột phụ bên hông (Sidebar), chứa thông tin liên quan hoặc quảng cáo.
- 🔻 **\`<footer>\`**: Phần chân trang (chứa thông tin bản quyền, địa chỉ trường, liên hệ).

---

### 💻 Ví dụ bố cục trang chuẩn:
\`\`\`html
<header>
  <h1>THPT Chuyên Lê Quý Đôn</h1>
  <nav>
    <a href="#trangchu">Trang chủ</a> | <a href="#tintuc">Tin tức</a> | <a href="#lienhe">Liên hệ</a>
  </nav>
</header>

<main>
  <article>
    <h2>Kết quả kỳ thi Học sinh giỏi cấp Tỉnh</h2>
    <p>Chúc mừng các em học sinh khối 12 đạt giải cao...</p>
  </article>
</main>

</footer>
\`\`\``,
  },

  // 17. Thuộc tính target="_blank" mở tab mới
  {
    keywords: ['target', '_blank', 'target="_blank"', 'mở tab mới', 'mở trang trong thẻ mới', 'tab mới', 'mở cửa sổ mới'],
    title: 'Thuộc tính target="_blank" mở liên kết trong tab mới',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
Trong HTML, để khi người dùng bấm vào đường link mà trang web mở ra trong **một thẻ (tab) mới** của trình duyệt mà không làm tắt trang hiện tại, ta sử dụng thuộc tính:
**\`target="_blank"\`** bên trong thẻ \`<a>\`.

---

### 💻 Mã ví dụ cú pháp chuẩn W3C:
\`\`\`html
<!-- Mở liên kết ngoài trong tab mới -->
<a href="https://moet.gov.vn" target="_blank" rel="noopener noreferrer">
  Cổng thông tin Bộ Giáo dục và Đào tạo (Mở tab mới)
</a>
\`\`\`

---

💡 **Lưu ý chuyên gia bảo mật & W3C:**
Khi dùng \`target="_blank"\`, chuẩn an toàn web khuyến nghị luôn thêm thuộc tính \`rel="noopener noreferrer"\` để chống trang web đích chiếm quyền điều khiển trang gốc (lỗi Tabnabbing).`,
  },

  // 18. Phân biệt đường dẫn tương đối và đường dẫn tuyệt đối
  {
    keywords: ['đường dẫn tương đối', 'đường dẫn tuyệt đối', 'relative', 'absolute', 'duong dan', 'khác nhau giữa đường dẫn', 'khi nào dùng đường dẫn tương đối'],
    title: 'Phân biệt đường dẫn tương đối và đường dẫn tuyệt đối trong HTML',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Khi chèn ảnh (\`src\`) hoặc tạo liên kết (\`href\`), HTML sử dụng 2 loại đường dẫn:

1. 🌐 **Đường dẫn tuyệt đối (Absolute URL):**
   * Là địa chỉ đầy đủ bao gồm giao thức mạng (ví dụ: \`https://...\` hoặc \`http://...\`).
   * Dùng khi muốn liên kết tới một tài nguyên nằm trên một máy chủ / website khác trên Internet.
   * Ví dụ: \`href="https://vietnamnet.vn"\` hoặc \`src="https://images.unsplash.com/photo.jpg"\`.

2. 📁 **Đường dẫn tương đối (Relative URL):**
   * Là đường dẫn tính từ vị trí của file HTML hiện tại trong thư mục máy tính.
   * Dùng khi liên kết giữa các trang web hoặc tệp ảnh trong cùng một dự án website của em.
   * Cú pháp chuẩn SGK Tin học 12:
     - \`thong_tin.html\`: File cùng thư mục với trang hiện tại.
     - \`./images/logo.png\`: Vào thư mục con \`images\` để lấy ảnh.
     - \`../trangchu.html\`: Lùi ra thư mục cha bên ngoài 1 cấp.

---

🚀 **Mẹo thi:** Trong các bài thực hành thiết kế web tại trường học, **luôn dùng đường dẫn tương đối** để khi nộp bài cho thầy cô hoặc copy sang máy khác trang web vẫn chạy bình thường!`,
  },

  // 19. Định dạng màu sắc và căn lề trong CSS (color, background-color, text-align)
  {
    keywords: ['màu chữ', 'đổi màu chữ', 'màu nền', 'đổi màu nền', 'căn giữa', 'can giua', 'can le', 'text-align', 'color', 'background-color', 'chữ màu đỏ', 'nền màu xanh'],
    title: 'Định dạng màu sắc và căn lề chữ trong CSS',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
Trong CSS, để đổi màu chữ, màu nền và căn chỉnh lề văn bản, ta sử dụng 3 thuộc tính cơ bản nhất:

1. 🎨 **\`color\` (Màu chữ):**
   - Đặt màu cho văn bản: \`color: red;\` (Tên màu tiếng Anh) hoặc \`color: #2563eb;\` (Mã màu HEX).
2. 🖌️ **\`background-color\` (Màu nền):**
   - Đặt màu nền cho khối hoặc trang web: \`background-color: #f8fafc;\`.
3. 📐 **\`text-align\` (Căn lề chữ):**
   - \`text-align: center;\`: Căn giữa dòng.
   - \`text-align: left;\`: Căn lề trái (mặc định).
   - \`text-align: right;\`: Căn lề phải.
   - \`text-align: justify;\`: Căn đều 2 bên mép.

---

### 💻 Mã ví dụ mẫu:
\`\`\`html
<!-- Dùng CSS nội tuyến (Inline) -->
<h1 style="color: #1e3a8a; text-align: center;">CỔNG THÔNG TIN KHỐI 12</h1>
<p style="background-color: #fef08a; color: #854d0e; padding: 10px;">
  Thông báo: Tiết thực hành Tin học diễn ra tại phòng máy số 2.
</p>
\`\`\``,
  },

  // 20. Phông chữ và kích thước chữ (font-family, font-size, font-weight)
  {
    keywords: ['font chữ', 'phông chữ', 'cỡ chữ', 'kích thước chữ', 'font-size', 'font-family', 'font-weight', 'chữ to', 'chữ nhỏ', 'chữ đậm'],
    title: 'Định dạng phông chữ và cỡ chữ trong CSS',
    generateAnswer: () => `### 🎯 Câu trả lời chính xác:
Để tùy chỉnh chữ trong CSS, ta dùng các thuộc tính thuộc họ **Font**:

1. 🔤 **\`font-family\` (Kiểu phông chữ):**
   - Chỉ định họ phông: \`font-family: Arial, sans-serif;\` hoặc \`font-family: 'Times New Roman', serif;\`.
2. 📏 **\`font-size\` (Kích thước / Cỡ chữ):**
   - Đơn vị pixel: \`font-size: 16px;\`, \`font-size: 24px;\` hoặc đơn vị \`rem\`.
3. 🏋️ **\`font-weight\` (Độ đậm của chữ):**
   - \`font-weight: bold;\` (in đậm) hoặc \`font-weight: normal;\` (bình thường), \`font-weight: 600;\`.
4. ✨ **\`font-style\` (Kiểu dáng chữ):**
   - \`font-style: italic;\` (in nghiêng).

---

### 💻 Mã ví dụ chuẩn:
\`\`\`css
p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
}

.tieu-de-noi-bat {
  font-size: 28px;
  font-weight: 700;
  color: #1d4ed8;
}
\`\`\``,
  },

  // 21. Thuộc tính biểu mẫu Form: required, placeholder, disabled, checked, name
  {
    keywords: ['required', 'placeholder', 'disabled', 'readonly', 'checked', 'thuộc tính form', 'bắt buộc nhập', 'chữ gợi ý trong ô nhập'],
    title: 'Các thuộc tính bổ trợ quan trọng của thẻ Input trong Form',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
Khi tạo ô nhập liệu \`<input>\`, các thuộc tính sau giúp nâng cao trải nghiệm người dùng:

1. ⚠️ **\`required\` (Bắt buộc nhập):**
   - Ngăn người dùng bỏ trống ô khi bấm nút Gửi. Nếu chưa nhập, trình duyệt sẽ cảnh báo: *"Vui lòng điền vào trường này"*.
   - Cú pháp: \`<input type="text" name="hoten" required>\`.

2. 💬 **\`placeholder\` (Văn bản gợi ý):**
   - Hiển thị dòng chữ mờ mờ trong ô nhập để hướng dẫn người dùng mẫu nhập (khi người dùng gõ chữ vào thì dòng chữ này tự biến mất).
   - Cú pháp: \`<input type="email" placeholder="ví_dụ: hs12@gmail.com">\`.

3. 🔘 **\`checked\` (Chọn sẵn mặc định):**
   - Dùng cho \`type="radio"\` hoặc \`type="checkbox"\` để chọn sẵn một mục khi vừa mở trang.
   - Cú pháp: \`<input type="radio" name="gioitinh" value="Nam" checked>\`.

4. 🚫 **\`disabled\` (Vô hiệu hóa):**
   - Khóa ô nhập liệu, người dùng không thể bấm hay sửa được.`,
  },

  // 22. HTML là gì? CSS là gì? Chuẩn W3C
  {
    keywords: ['html là gì', 'css là gì', 'w3c là gì', 'ngôn ngữ đánh dấu', 'siêu văn bản', 'khái niệm html', 'vai trò của html'],
    title: 'Khái niệm HTML, CSS và tổ chức chuẩn hóa web W3C',
    generateAnswer: () => `### 🎯 Bản chất cốt lõi:
- 🧱 **HTML (HyperText Markup Language - Ngôn ngữ đánh dấu siêu văn bản):**
  * Là bộ xương cốt lõi xây dựng nên mọi trang web trên thế giới.
  * HTML sử dụng các **thẻ (Tags)** để định nghĩa cấu trúc: Tiêu đề, đoạn văn, hình ảnh, bảng biểu, liên kết và video.
  * HTML **không phải là ngôn ngữ lập trình** (vì không có biến, vòng lặp hay cấu trúc rẽ nhánh logic phức tạp) mà là **ngôn ngữ đánh dấu cấu trúc**.

- 🎨 **CSS (Cascading Style Sheets - Bảng định kiểu tầng):**
  * Là lớp áo trang trí diện mạo bên ngoài: Màu sắc, phông chữ, kích thước, khoảng cách lề và bố cục hiển thị trên màn hình.

- 🌐 **W3C (World Wide Web Consortium):**
  * Tổ chức quốc tế do Tim Berners-Lee sáng lập, chịu trách nhiệm ban hành các tiêu chuẩn kỹ thuật thống nhất cho Internet (như chuẩn HTML5, CSS3) để mọi trình duyệt (Chrome, Edge, Firefox, Safari) đều hiển thị trang web nhất quán.`,
  },
];

/**
 * Phân tích và sinh câu trả lời trực tiếp cho bất kỳ thẻ HTML nào học sinh hỏi
 */
function answerDirectTagQuestion(tagName: string, question: string): string | null {
  const t = tagName.toLowerCase();
  
  const TAG_DESCRIPTIONS: Record<string, { desc: string; type: 'void' | 'paired'; example: string; tip: string }> = {
    br: {
      desc: 'Dùng để ngắt dòng văn bản ngay tại vị trí đặt thẻ.',
      type: 'void',
      example: '<p>Dòng thứ nhất<br>Dòng thứ hai</p>',
      tip: 'Là thẻ đơn, không có thẻ đóng </br>.'
    },
    hr: {
      desc: 'Dùng để tạo một đường kẻ ngang phân cách các khối nội dung.',
      type: 'void',
      example: '<p>Đoạn trên</p><hr><p>Đoạn dưới</p>',
      tip: 'Là thẻ đơn, không có thẻ đóng </hr>.'
    },
    p: {
      desc: 'Dùng để tạo một đoạn văn bản (Paragraph).',
      type: 'paired',
      example: '<p>Đây là nội dung đoạn văn bản chuẩn mực.</p>',
      tip: 'Là thẻ khối (block), tự động cách lề trên dưới.'
    },
    h1: {
      desc: 'Tiêu đề cấp 1 quan trọng nhất và có kích thước chữ lớn nhất trang.',
      type: 'paired',
      example: '<h1>TÊN TRANG WEB CỦA LỚP 12</h1>',
      tip: 'Mỗi trang web chỉ nên có 1 thẻ h1 duy nhất.'
    },
    h2: {
      desc: 'Tiêu đề cấp 2 cho các phần, chuyên mục chính của bài viết.',
      type: 'paired',
      example: '<h2>1. Giới thiệu câu lạc bộ</h2>',
      tip: 'Chữ tự động in đậm và có kích thước lớn.'
    },
    h3: {
      desc: 'Tiêu đề cấp 3 cho các mục con nằm bên trong tiêu đề h2.',
      type: 'paired',
      example: '<h3>1.1. Lịch sinh hoạt định kỳ</h3>',
      tip: 'Tuân thủ thứ tự phân cấp h1 > h2 > h3.'
    },
    a: {
      desc: 'Tạo siêu liên kết (hyperlink) chuyển trang hoặc liên kết neo nội bộ.',
      type: 'paired',
      example: '<a href="https://moet.gov.vn" target="_blank">Bộ GD&ĐT</a>',
      tip: 'Bắt buộc phải có thuộc tính href="đường-dẫn".'
    },
    img: {
      desc: 'Dùng để chèn hình ảnh vào tài liệu web.',
      type: 'void',
      example: '<img src="logo.png" alt="Logo trường THPT" width="200">',
      tip: 'Là thẻ đơn không có thẻ đóng </img>, bắt buộc phải có src và alt.'
    },
    table: {
      desc: 'Dùng để tạo bảng dữ liệu dạng lưới gồm các hàng và cột.',
      type: 'paired',
      example: '<table border="1">\n  <tr><th>Tiêu đề cột</th></tr>\n  <tr><td>Dữ liệu ô</td></tr>\n</table>',
      tip: 'Bảng xây dựng theo từng hàng <tr>, bên trong chứa <th> hoặc <td>.'
    },
    tr: {
      desc: 'Tạo một hàng ngang (Table Row) trong bảng.',
      type: 'paired',
      example: '<tr><td>Ô 1</td><td>Ô 2</td></tr>',
      tip: 'Chỉ được đặt trực tiếp bên trong thẻ <table> hoặc <tbody>.'
    },
    th: {
      desc: 'Tạo ô tiêu đề (Table Header) của cột hoặc hàng trong bảng.',
      type: 'paired',
      example: '<th>Họ và Tên</th>',
      tip: 'Chữ tự động được in đậm và căn giữa ô.'
    },
    td: {
      desc: 'Tạo ô dữ liệu (Table Data) bình thường trong bảng.',
      type: 'paired',
      example: '<td>Nguyễn Văn A</td>',
      tip: 'Chữ căn lề trái mặc định, luôn nằm trong thẻ <tr>.'
    },
    ul: {
      desc: 'Tạo danh sách không thứ tự (Unordered List) với các dấu chấm tròn.',
      type: 'paired',
      example: '<ul>\n  <li>Mục 1</li>\n  <li>Mục 2</li>\n</ul>',
      tip: 'Bên trong chỉ được chứa con trực tiếp là các thẻ <li>.'
    },
    ol: {
      desc: 'Tạo danh sách có thứ tự (Ordered List) được đánh số 1, 2, 3... tự động.',
      type: 'paired',
      example: '<ol type="1">\n  <li>Bước một</li>\n  <li>Bước hai</li>\n</ol>',
      tip: 'Có thuộc tính type="1" | "A" | "a" | "I" | "i".'
    },
    li: {
      desc: 'Tạo từng mục phần tử (List Item) trong danh sách.',
      type: 'paired',
      example: '<li>Sách giáo khoa Tin học 12</li>',
      tip: 'Bắt buộc phải nằm bên trong cặp thẻ <ul> hoặc <ol>.'
    },
    form: {
      desc: 'Tạo biểu mẫu thu thập thông tin người dùng gửi lên máy chủ.',
      type: 'paired',
      example: '<form action="#" method="POST">\n  <input type="text" name="hoten">\n  <input type="submit" value="Gửi">\n</form>',
      tip: 'Bao bọc các phần tử nhập liệu input, select, textarea, button.'
    },
    input: {
      desc: 'Tạo ô nhập liệu cho người dùng (văn bản, mật khẩu, nút chọn, ngày tháng).',
      type: 'void',
      example: '<input type="text" name="username" placeholder="Nhập tên của bạn">',
      tip: 'Là thẻ đơn không có thẻ đóng </input>, thuộc tính type quyết định kiểu nhập.'
    },
    button: {
      desc: 'Tạo nút bấm tương tác trên trang web.',
      type: 'paired',
      example: '<button type="button" onclick="alert(\'Xin chào!\')">Bấm vào đây</button>',
      tip: 'Trong form, mặc định nút có type="submit".'
    },
    div: {
      desc: 'Tạo một khối chứa (Division) dạng block để gom nhóm các phần tử.',
      type: 'paired',
      example: '<div class="hop-noi-dung">\n  <h2>Tiêu đề</h2>\n  <p>Văn bản</p>\n</div>',
      tip: 'Là thẻ khối, tự động xuống dòng và chiếm trọn 100% chiều ngang.'
    },
    span: {
      desc: 'Tạo vùng chọn nội dòng (Inline) để định dạng từng từ hoặc đoạn chữ ngắn.',
      type: 'paired',
      example: '<p>Học sinh <span style="color: red; font-weight: bold;">Lớp 12</span> xuất sắc.</p>',
      tip: 'Là thẻ nội dòng, không ngắt dòng, vừa khít nội dung.'
    },
    audio: {
      desc: 'Chèn tệp âm thanh (nhạc, giọng nói) vào trang web.',
      type: 'paired',
      example: '<audio controls>\n  <source src="baihat.mp3" type="audio/mpeg">\n</audio>',
      tip: 'Bắt buộc thêm thuộc tính controls để hiện thanh Play/Pause.'
    },
    video: {
      desc: 'Chèn tệp video vào trang web.',
      type: 'paired',
      example: '<video width="400" controls>\n  <source src="clip.mp4" type="video/mp4">\n</video>',
      tip: 'Nên đặt width và controls để người xem dễ điều khiển.'
    },
    iframe: {
      desc: 'Tạo khung nội tuyến nhúng một trang web khác vào trang hiện tại.',
      type: 'paired',
      example: '<iframe src="thong_tin.html" width="100%" height="300"></iframe>',
      tip: 'Cần thuộc tính src chỉ định địa chỉ trang được nhúng.'
    },
    b: {
      desc: 'In đậm chữ (về mặt hình thức trực quan).',
      type: 'paired',
      example: '<b>Chữ in đậm</b>',
      tip: 'Nếu muốn in đậm kèm nhấn mạnh ngữ nghĩa W3C thì nên dùng <strong>.'
    },
    strong: {
      desc: 'In đậm chữ và nhấn mạnh tầm quan trọng của nội dung theo chuẩn ngữ nghĩa W3C.',
      type: 'paired',
      example: '<strong>Thông báo quan trọng!</strong>',
      tip: 'Chuẩn SEO và hỗ trợ máy đọc màn hình tốt hơn thẻ <b>.'
    },
    i: {
      desc: 'In nghiêng chữ (thuật ngữ, tên nước ngoài, tiếng địa phương).',
      type: 'paired',
      example: '<i>HTML (HyperText Markup Language)</i>',
      tip: 'Nếu muốn nhấn mạnh giọng điệu theo ngữ nghĩa thì dùng <em>.'
    },
    em: {
      desc: 'In nghiêng chữ và nhấn mạnh giọng điệu (Emphasis).',
      type: 'paired',
      example: '<em>Em nhất định phải lưu ý điều này.</em>',
      tip: 'Chuẩn ngữ nghĩa HTML5.'
    },
    u: {
      desc: 'Gạch chân dưới văn bản.',
      type: 'paired',
      example: '<u>Từ được gạch chân</u>',
      tip: 'Tránh dùng u trong đoạn văn dài để người đọc không nhầm với liên kết link.'
    },
    mark: {
      desc: 'Tô sáng nổi bật một đoạn chữ với nền vàng như dùng bút dạ quang.',
      type: 'paired',
      example: '<mark>Nội dung quan trọng cần chú ý</mark>',
      tip: 'Rất hữu ích khi làm nổi bật từ khóa tìm kiếm.'
    },
    del: {
      desc: 'Đánh dấu đoạn văn bản bị gạch ngang (đã xóa/nội dung cũ).',
      type: 'paired',
      example: '<del>Giá cũ: 100.000đ</del> <span>Giá mới: 80.000đ</span>',
      tip: 'Thường kết hợp với thẻ <ins> để chỉ nội dung mới thay thế.'
    },
    sup: {
      desc: 'Tạo chữ/số chỉ số trên (Superscript) như số mũ toán học.',
      type: 'paired',
      example: '<p>Công thức diện tích hình tròn: S = &pi;r<sup>2</sup></p>',
      tip: 'Chữ tự động co nhỏ lại và nâng lên phía trên dòng.'
    },
    sub: {
      desc: 'Tạo chữ/số chỉ số dưới (Subscript) như công thức hóa học.',
      type: 'paired',
      example: '<p>Khí Carbon Dioxide: CO<sub>2</sub></p>',
      tip: 'Chữ tự động co nhỏ lại và hạ xuống dưới chân dòng.'
    },
    select: {
      desc: 'Tạo danh sách thực đơn lựa chọn thả xuống (Dropdown menu) trong Form.',
      type: 'paired',
      example: '<select name="lop">\n  <option value="12a1">Lớp 12A1</option>\n  <option value="12a2">Lớp 12A2</option>\n</select>',
      tip: 'Bao bọc các thẻ con <option> bên trong.'
    },
    option: {
      desc: 'Tạo từng mục phương án lựa chọn nằm bên trong thẻ <select>.',
      type: 'paired',
      example: '<option value="tin12" selected>Tin học 12</option>',
      tip: 'Có thuộc tính selected để chọn sẵn mặc định.'
    },
    textarea: {
      desc: 'Tạo ô nhập văn bản dài nhiều dòng (nhận xét, góp ý, bài viết).',
      type: 'paired',
      example: '<textarea rows="4" cols="30" placeholder="Ý kiến đóng góp..."></textarea>',
      tip: 'Là thẻ cặp bắt buộc phải đóng </textarea>, khác với thẻ đơn <input>.'
    },
    meta: {
      desc: 'Khai báo siêu dữ liệu (metadata) của trang web (bảng mã charset, viewport).',
      type: 'void',
      example: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      tip: 'Luôn đặt trong thẻ <head>, là thẻ đơn không có thẻ đóng.'
    },
    title: {
      desc: 'Đặt tiêu đề trang hiển thị trên tab trình duyệt và kết quả tìm kiếm Google.',
      type: 'paired',
      example: '<title>Trang web Tin học 12 - Lớp 12A1</title>',
      tip: 'Bắt buộc nằm trong cặp thẻ <head>...</head>.'
    },
    head: {
      desc: 'Phần đầu tài liệu chứa thông tin cấu hình, tiêu đề, mã CSS và siêu dữ liệu.',
      type: 'paired',
      example: '<head>\n  <meta charset="UTF-8">\n  <title>Tiêu đề</title>\n</head>',
      tip: 'Nội dung trong <head> không hiển thị trực tiếp trên giao diện màn hình.'
    },
    body: {
      desc: 'Phần thân trang web chứa toàn bộ nội dung hiển thị cho người xem.',
      type: 'paired',
      example: '<body>\n  <h1>Tiêu đề chính</h1>\n  <p>Đoạn văn</p>\n</body>',
      tip: 'Mọi chữ, ảnh, bảng, video mà người xem thấy đều phải nằm trong <body>.'
    },
    html: {
      desc: 'Thẻ gốc (Root element) bao bọc toàn bộ mã nguồn của trang web.',
      type: 'paired',
      example: '<html lang="vi">\n  <head>...</head>\n  <body>...</body>\n</html>',
      tip: 'Nên thêm thuộc tính lang="vi" để khai báo ngôn ngữ Tiếng Việt.'
    },
    style: {
      desc: 'Dùng để nhúng mã định kiểu CSS nội bộ (Internal CSS) vào tài liệu.',
      type: 'paired',
      example: '<style>\n  h1 { color: #2563eb; text-align: center; }\n</style>',
      tip: 'Thường đặt bên trong thẻ <head> của tài liệu HTML.'
    },
    link: {
      desc: 'Liên kết tài nguyên bên ngoài (như tệp CSS, font chữ, favicon) vào trang.',
      type: 'void',
      example: '<link rel="stylesheet" href="style.css">',
      tip: 'Là thẻ đơn, đặt trong phần <head>.'
    },
    header: {
      desc: 'Thẻ ngữ nghĩa (Semantic) đại diện cho phần đầu trang web hoặc đầu bài viết.',
      type: 'paired',
      example: '<header>\n  <h1>TÊN WEBSITE</h1>\n</header>',
      tip: 'Giúp cấu trúc trang rõ ràng, chuẩn SEO W3C.'
    },
    nav: {
      desc: 'Thẻ ngữ nghĩa đại diện cho thanh điều hướng chứa các liên kết thực đơn.',
      type: 'paired',
      example: '<nav>\n  <a href="#home">Trang chủ</a> | <a href="#about">Giới thiệu</a>\n</nav>',
      tip: 'Chuyên dùng cho Menu chính của website.'
    },
    main: {
      desc: 'Thẻ ngữ nghĩa bao bọc khối nội dung chính, quan trọng nhất của trang.',
      type: 'paired',
      example: '<main>\n  <article>...</article>\n</main>',
      tip: 'Mỗi trang web chỉ nên có 1 thẻ <main> duy nhất.'
    },
    footer: {
      desc: 'Thẻ ngữ nghĩa đại diện cho phần chân trang (chứa bản quyền, thông tin liên hệ).',
      type: 'paired',
      example: '<footer>\n  <p>&copy; 2024 Bản quyền thuộc về Lớp 12A1</p>\n</footer>',
      tip: 'Luôn nằm ở cuối cùng của phần thân <body>.'
    },
  };

  const tagInfo = TAG_DESCRIPTIONS[t];
  if (!tagInfo) return null;

  return `### 🎯 Câu trả lời chính xác từ Chuyên gia HTML:
Thẻ **\`<${t}>\`** trong HTML:
- **Chức năng chính:** ${tagInfo.desc}
- **Phân loại cú pháp:** ${tagInfo.type === 'void' ? '⚠️ **Thẻ đơn (Void element)** — Tuyệt đối KHÔNG có thẻ đóng `</' + t + '>`!' : '✅ **Thẻ cặp (Paired element)** — Bắt buộc phải có cặp mở `<' + t + '>` và đóng `</' + t + '>`. '}

---

### 💻 Mã ví dụ cú pháp chuẩn:
\`\`\`html
${tagInfo.example}
\`\`\`

---

💡 **Lưu ý quan trọng:** ${tagInfo.tip}`;
}

/**
 * Trình xử lý thông minh tạo câu trả lời sư phạm khi không dùng API
 */
export function generateLocalPedagogicalAnswer(params: {
  question: string;
  lesson?: Partial<Lesson>;
  codeHtml?: string;
  codeCss?: string;
  includeCode?: boolean;
}): string {
  const { question, lesson, codeHtml = '', codeCss = '', includeCode = false } = params;
  const qLower = question.toLowerCase().trim();

  // 1. Phân tích mã nguồn nếu có
  const analysis = (includeCode || qLower.includes('soi lỗi') || qLower.includes('code của em') || qLower.includes('sửa lỗi') || qLower.includes('kiểm tra'))
    ? analyzeStudentCode(codeHtml, codeCss, lesson)
    : undefined;

  // 2. Nếu học sinh yêu cầu soi lỗi hoặc kiểm tra code
  const isReviewRequest =
    qLower.includes('soi lỗi') ||
    qLower.includes('xem giúp') ||
    qLower.includes('sửa lỗi') ||
    qLower.includes('lỗi sai') ||
    qLower.includes('kiểm tra code') ||
    qLower.includes('mã của em') ||
    qLower.includes('đoạn mã');

  if (isReviewRequest && analysis) {
    let reviewText = `👋 **Chào em! Thầy là Trợ Lý AI. Thầy đã soi kỹ bài làm của em trong: "${lesson?.lessonNumber || 'Bài học'}: ${lesson?.title || 'Thực hành HTML'}".**\n\n`;

    if (analysis.strengths.length > 0) {
      reviewText += `### 🌟 Điểm khen ngợi tinh thần làm bài:\n`;
      analysis.strengths.forEach((s) => {
        reviewText += `- ✅ ${s}\n`;
      });
      reviewText += `\n`;
    }

    if (analysis.hasIssues) {
      reviewText += `### 🔍 Những điểm cần sửa chữa để code chuẩn xác:\n`;
      analysis.issues.forEach((issue) => {
        reviewText += `- ⚠️ **Vấn đề:** ${issue}\n`;
      });
      reviewText += `\n`;

      if (analysis.suggestions.length > 0) {
        reviewText += `### 💡 Hướng dẫn sửa từng bước:\n`;
        analysis.suggestions.forEach((sug, i) => {
          reviewText += `${i + 1}. ${sug}\n`;
        });
        reviewText += `\n`;
      }
    } else {
      reviewText += `### 🎉 Chúc mừng em!\nĐoạn mã HTML và CSS của em rất chuẩn xác, cú pháp sạch sẽ, các cặp thẻ đóng mở đầy đủ theo chuẩn W3C.\n\n`;
      reviewText += `💡 **Gợi ý nâng cao:** Em có thể trang trí thêm CSS như đổ bóng \`box-shadow\`, bo góc \`border-radius\`, hoặc hiệu ứng di chuột \`:hover\` để trang web bắt mắt hơn nhé!\n\n`;
    }

    reviewText += `💪 *Em cứ tự tin gõ mã ở khung soạn thảo bên trái và quan sát kết quả trực tiếp ở màn hình bên phải nhé! Thầy luôn đồng hành cùng em.*`;
    return reviewText;
  }

function stripVietnameseDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

  // 3. Kiểm tra nếu học sinh hỏi về một dòng cụ thể (Ví dụ: "lỗi dòng 7", "dòng 7 bị sai gì", "tại sao dòng 7 lỗi")
  const lineMatch = qLower.match(/dòng\s*(\d+)|dong\s*(\d+)|line\s*(\d+)/i);
  if (lineMatch && codeHtml) {
    const targetLine = parseInt(lineMatch[1] || lineMatch[2] || lineMatch[3], 10);
    const codeLines = codeHtml.split('\n');
    if (targetLine >= 1 && targetLine <= codeLines.length) {
      const lineContent = codeLines[targetLine - 1];
      const allDiags = lintHtmlCode(codeHtml);
      const lineDiag = allDiags.find((d) => d.line === targetLine);

      let lineAnswer = `### 🎯 Nhận xét chuyên gia về Dòng ${targetLine}:\n\n`;
      lineAnswer += `Mã nguồn tại **dòng ${targetLine}** của em:\n\`\`\`html\n${lineContent}\n\`\`\`\n\n`;

      if (lineDiag) {
        lineAnswer += `⚠️ **Lỗi phát hiện:** ${lineDiag.message}\n\n`;
        if (lineDiag.suggestion) {
          lineAnswer += `💡 **Hướng dẫn sửa:** ${lineDiag.suggestion}\n\n`;
        }
        if (lineDiag.quickFixCode) {
          lineAnswer += `🔧 **Đoạn mã gợi ý:** \`${lineDiag.quickFixCode}\`\n\n`;
        }
      } else {
        lineAnswer += `✅ **Đánh giá:** Dòng ${targetLine} có cú pháp hợp lệ, không có lỗi trực tiếp tại dòng này.\n\n`;
        if (allDiags.length > 0) {
          lineAnswer += `Tuy nhiên bài làm của em đang có lỗi ở các dòng khác:\n`;
          allDiags.forEach((d) => {
            lineAnswer += `- **Dòng ${d.line}:** ${d.message}\n`;
          });
        }
      }
      return lineAnswer;
    }
  }

  // 4. Kiểm tra câu hỏi trực tiếp về một thẻ cụ thể (Ví dụ: "thẻ br là gì", "thẻ hr", "<p>", "thẻ a",...)
  const tagInQuestionMatch = qLower.match(/thẻ\s+([a-zA-Z0-9]+)|the\s+([a-zA-Z0-9]+)|<([a-zA-Z0-9]+)>/);
  if (tagInQuestionMatch) {
    const rawTag = tagInQuestionMatch[1] || tagInQuestionMatch[2] || tagInQuestionMatch[3];
    const directTagAns = answerDirectTagQuestion(rawTag, question);
    if (directTagAns) {
      return directTagAns;
    }
  }

  // Quét các thẻ HTML phổ biến nếu câu hỏi chứa tên thẻ dạng từ đơn (ví dụ: "br dùng làm gì", "tác dụng của hr", "thẻ img",...)
  const POPULAR_TAGS = [
    'br', 'hr', 'p', 'a', 'img', 'table', 'tr', 'td', 'th', 'ul', 'ol', 'li',
    'form', 'input', 'button', 'select', 'textarea', 'div', 'span',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'audio', 'video', 'iframe',
    'b', 'strong', 'i', 'em', 'u', 'mark', 'del', 'sup', 'sub',
    'meta', 'title', 'head', 'body', 'html', 'style', 'link', 'header', 'nav', 'main', 'footer'
  ];
  for (const pt of POPULAR_TAGS) {
    const ptRegex = new RegExp(`(?:^|[\\s<]|thẻ\\s+|the\\s+)${pt}(?:$|[\\s>,.?])`, 'i');
    if (ptRegex.test(qLower)) {
      const directAns = answerDirectTagQuestion(pt, question);
      if (directAns) return directAns;
    }
  }

  // Hàm so khớp từ khóa chính xác, hỗ trợ cả tiếng Việt có dấu và không dấu
  const qStripped = stripVietnameseDiacritics(qLower);
  const matchKnowledgeKeyword = (q: string, kw: string): boolean => {
    const qClean = q.toLowerCase();
    const kwClean = kw.toLowerCase();
    const kwStripped = stripVietnameseDiacritics(kwClean);

    if (kwClean.length <= 3) {
      const escaped = kwClean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?:^|[\\s<]|thẻ\\s+|the\\s+)${escaped}(?:$|[\\s>,.?])`, 'i');
      if (regex.test(qClean) || regex.test(qStripped)) return true;
      return false;
    }
    return qClean.includes(kwClean) || qStripped.includes(kwStripped);
  };

  // 5. Khớp cơ sở tri thức theo từ khóa chuyên môn
  for (const item of KNOWLEDGE_BASE) {
    const matched = item.keywords.some((kw) => matchKnowledgeKeyword(qLower, kw));
    if (matched) {
      return item.generateAnswer({
        question,
        lessonTitle: lesson ? `${lesson.lessonNumber}: ${lesson.title}` : undefined,
        codeHtml,
        codeCss,
        analysis,
      });
    }
  }

  // 6. Nếu học sinh HỎI RÕ VỀ BÀI HỌC NÀY (VD: "yêu cầu bài này", "bài 10 làm thế nào", "mục tiêu bài học")
  const isAskingAboutCurrentLesson =
    qLower.includes('bài này') ||
    qLower.includes('yêu cầu bài') ||
    qLower.includes('mục tiêu bài') ||
    qLower.includes('hướng dẫn bài') ||
    qLower.includes('làm bài này') ||
    qLower.includes('bài thực hành này') ||
    qStripped.includes('bai nay') ||
    qStripped.includes('yeu cau');

  if (isAskingAboutCurrentLesson && lesson && (lesson.title || lesson.objective)) {
    let lessonAdvice = `### 🎯 Thầy hướng dẫn trọng tâm ${lesson.lessonNumber || 'Bài học'}: ${lesson.title || 'Thực hành HTML'}\n\n`;
    if (lesson.objective) {
      lessonAdvice += `**Mục tiêu bài học:** ${lesson.objective}\n\n`;
    }

    if (lesson.theorySummary && lesson.theorySummary.length > 0) {
      lessonAdvice += `### 💡 Kiến thức cốt lõi cần ghi nhớ:\n`;
      lesson.theorySummary.forEach((t) => {
        lessonAdvice += `- 📌 ${t}\n`;
      });
      lessonAdvice += `\n`;
    }

    if (lesson.quickReferences && lesson.quickReferences.length > 0) {
      lessonAdvice += `### 💻 Cú pháp các thẻ trọng tâm bài này:\n`;
      lesson.quickReferences.slice(0, 3).forEach((ref) => {
        lessonAdvice += `\`\`\`html\n/* ${ref.name}: ${ref.description} */\n${ref.example}\n\`\`\`\n`;
      });
    }

    return lessonAdvice;
  }

  // 7. Trả lời thông minh chuyên gia cấp cao HTML
  return `### 🎯 Chào em! Thầy là Trợ Lý AI - Chuyên gia cấp cao HTML & Sư phạm Tin học 12.

Về câu hỏi của em: **"${question}"**

💡 **Giải đáp chuyên môn chuẩn W3C:**
- Trong HTML5, mọi thành phần trên trang đều được biểu diễn thông qua các **thẻ (Tags)** đặt trong dấu ngoặc nhọn \`<...>\`.
- **Quy tắc vàng HTML:**
  1. **Thẻ cặp:** Có thẻ mở \`<tag>\` và thẻ đóng \`</tag>\` (ví dụ: \`<p>...</p>\`, \`<h1>...</h1>\`, \`<div>...</div>\`, \`<a>...</a>\`, \`<table>...</table>\`).
  2. **Thẻ đơn (Void Element):** Không có thẻ đóng, không chứa chữ bên trong (ví dụ: \`<img>\`, \`<br>\`, \`<hr>\`, \`<input>\`, \`<meta>\`).
  3. **Thuộc tính (Attributes):** Luôn nằm trong thẻ mở, dạng \`tên="giá trị"\` (ví dụ: \`href="link"\`, \`src="anh.jpg"\`, \`alt="mô tả"\`).

💻 **Cấu trúc khung chuẩn của một trang HTML5:**
\`\`\`html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trang web Tin học 12</title>
</head>
<body>
  <h1>Tiêu đề chính của trang</h1>
  <p>Nội dung đoạn văn thực hành.</p>
</body>
</html>
\`\`\`

✨ *Em có thể hỏi thầy cụ thể về bất kỳ thẻ nào (như br, hr, a, img, table, form, div, span, video, audio) hoặc bấm các câu hỏi gợi ý bên dưới nhé!*`;
}
