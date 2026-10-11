import { Lesson } from '../types';

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
    keywords: ['table', 'rowspan', 'colspan', 'gộp ô', 'gộp dòng', 'gộp cột', 'bảng', 'thời khóa biểu', 'tr', 'td', 'th'],
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
];

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
  const qLower = question.toLowerCase();

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
    let reviewText = `👋 **Chào em! Thầy đã xem xét kỹ đoạn mã bài làm của em trong bài: "${lesson?.lessonNumber || 'Bài học'}: ${lesson?.title || 'Thực hành HTML'}".**\n\n`;

    if (analysis.strengths.length > 0) {
      reviewText += `### 🌟 Điểm khen ngợi tinh thần làm bài:\n`;
      analysis.strengths.forEach((s) => {
        reviewText += `- ✅ ${s}\n`;
      });
      reviewText += `\n`;
    }

    if (analysis.hasIssues) {
      reviewText += `### 🔍 Những điểm cần sửa chữa hoặc cải thiện ngay:\n`;
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
      reviewText += `### 🎉 Chúc mừng em!\nĐoạn mã HTML và CSS của em có cú pháp rất sạch sẽ, các cặp thẻ đóng mở đầy đủ và chuẩn cấu trúc W3C.\n\n`;
      reviewText += `💡 **Gợi ý nâng cao:** Em có thể trang trí thêm CSS như đổ bóng \`box-shadow\`, bo góc \`border-radius\`, hoặc thêm hiệu ứng di chuột \`:hover\` để trang web sinh động hơn nhé!\n\n`;
    }

    reviewText += `💪 *Em cứ tự tin chỉnh sửa mã trực tiếp ở khung soạn thảo bên trái và bấm "Chạy thử (Run)" để thấy kết quả ngay nhé! Thầy luôn đồng hành cùng em.*`;
    return reviewText;
  }

  // 3. Khớp cơ sở tri thức theo từ khóa
  for (const item of KNOWLEDGE_BASE) {
    const matched = item.keywords.some((kw) => qLower.includes(kw));
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

  // 4. Nếu câu hỏi về bài học cụ thể trong SGK
  if (lesson && (lesson.title || lesson.objective)) {
    let lessonAdvice = `### 🎯 Thầy giải đáp câu hỏi của em dựa theo ${lesson.lessonNumber || 'Bài học'}: ${lesson.title || 'Thực hành HTML'}\n\n`;
    if (lesson.objective) {
      lessonAdvice += `**Mục tiêu trọng tâm của bài này:** ${lesson.objective}\n\n`;
    }

    if (lesson.theorySummary && lesson.theorySummary.length > 0) {
      lessonAdvice += `### 💡 Kiến thức cốt lõi cần ghi nhớ:\n`;
      lesson.theorySummary.forEach((t) => {
        lessonAdvice += `- 📌 ${t}\n`;
      });
      lessonAdvice += `\n`;
    }

    if (lesson.quickReferences && lesson.quickReferences.length > 0) {
      lessonAdvice += `### 💻 Cú pháp các thẻ quan trọng nhất:\n`;
      lesson.quickReferences.slice(0, 3).forEach((ref) => {
        lessonAdvice += `\`\`\`html\n/* ${ref.name}: ${ref.description} */\n${ref.example}\n\`\`\`\n`;
      });
    }

    if (analysis && analysis.hasIssues) {
      lessonAdvice += `\n---\n### 🔍 Soi nhanh bài code em đang viết:\n`;
      analysis.issues.slice(0, 2).forEach((iss) => {
        lessonAdvice += `- ⚠️ ${iss}\n`;
      });
    }

    lessonAdvice += `\n🚀 *Nếu em cần hỏi chi tiết về một thẻ cụ thể nào (như div, span, table, form, img, a, css), em cứ gõ tên thẻ đó hỏi thầy nhé!*`;
    return lessonAdvice;
  }

  // 5. Trả lời tổng quát sư phạm
  return `### 🎯 Chào em! Thầy là Trợ lý AI Chuyên gia HTML Tin học 12.

Về câu hỏi của em: **"${question}"**

💡 **Định hướng từ thầy:**
- Trong lập trình web HTML5 và CSS3, điều quan trọng nhất là **hiểu rõ cấu trúc cây tài liệu (DOM)**: bắt đầu từ \`<!DOCTYPE html>\`, thẻ \`<html>\`, phần đầu \`<head>\` (chứa siêu dữ liệu và tiêu đề), và phần thân \`<body>\` (chứa mọi nội dung hiển thị).
- Mọi thẻ đều cần tuân thủ quy tắc đóng mở chuẩn xác: thẻ có nội dung thì dùng cặp \`<tag>...</tag>\`, thẻ đơn thì không cần thẻ đóng (\`<img>\`, \`<br>\`, \`<hr>\`, \`<input>\`).

💻 **Khung mã cơ bản chuẩn W3C:**
\`\`\`html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trang Web Tin Học 12</title>
  <style>
    body { font-family: sans-serif; line-height: 1.6; padding: 20px; }
  </style>
</head>
<body>
  <h1>Chào mừng đến với HTML5</h1>
  <p>Đây là trang web thực hành của học sinh THPT.</p>
</body>
</html>
\`\`\`

✨ *Em có thể bấm vào các câu hỏi gợi ý bên dưới hoặc hỏi cụ thể về thẻ nào em đang thắc mắc nhé!*`;
}
