import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { generateLocalPedagogicalAnswer, analyzeStudentCode } from './src/services/aiPedagogicalEngine.ts';
import { MOCK_THONG_TIN_HTML, MOCK_CLB_HTML } from './src/data/mockAssets.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '5mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Helper for resilient model execution with fast fallback
async function generateWithFallback(
  ai: GoogleGenAI,
  params: { contents: any; systemInstruction: string; temperature?: number }
) {
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-pro'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const generatePromise = ai.models.generateContent({
        model,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: params.temperature ?? 0.7,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Model timeout')), 15000)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`[Gemini] Model ${model} error:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error('Không thể tạo phản hồi từ AI.');
}

// Gemini AI Tutor endpoint (review & grading)
app.post('/api/gemini/tutor', async (req, res) => {
  const {
    lessonTitle = '',
    lessonObjective = '',
    codeHtml = '',
    codeCss = '',
    failedTests = [],
    userQuestion = '',
  } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const failedTestsPrompt = failedTests.length > 0
        ? `\nCÁC TIÊU CHÍ ĐANG BỊ LỖI KHI CHẤM:\n${failedTests.map((t: string) => `- ${t}`).join('\n')}`
        : '\nTất cả các bài kiểm tra DOM tự động hiện tại đều đã đạt hoặc chưa chạy.';

      const questionPrompt = userQuestion.trim()
        ? `\nHỌC SINH ĐANG HỎI CÂU HỎI CỤ THỂ:\n"${userQuestion}"`
        : '\nHọc sinh nhờ thầy/cô nhận xét và gợi ý sửa mã nguồn.';

      const prompt = `
BÀI HỌC: ${lessonTitle}
MỤC TIÊU BÀI HỌC THEO SGK TIN HỌC 12: ${lessonObjective}

MÃ HTML CỦA HỌC SINH:
\`\`\`html
${codeHtml || '<!-- Chưa có mã -->'}
\`\`\`

MÃ CSS CỦA HỌC SINH:
\`\`\`css
${codeCss || '/* Chưa có CSS */'}
\`\`\`
${failedTestsPrompt}
${questionPrompt}

Hãy nhận xét sư phạm và đưa ra hướng dẫn cho học sinh.
`;

      const advice = await generateWithFallback(ai, {
        contents: prompt,
        systemInstruction: `Bạn là thầy/cô giáo Tin học 12 thân thiện, sư phạm và nhiệt tình của Việt Nam, theo chuẩn Sách giáo khoa Tin học 12 (Chủ đề 4: Giải quyết vấn đề với sự trợ giúp của máy tính - NXB Giáo dục Việt Nam, Bộ Kết nối tri thức với cuộc sống).
Nhiệm vụ của bạn:
1. Xem xét mã nguồn HTML/CSS của học sinh và mục tiêu bài học.
2. Phát hiện lỗi sai cụ thể (sai tên thẻ, quên đóng thẻ, viết hoa/thường sai, thiếu thuộc tính quan trọng như rowspan, colspan, href, src, type, v.v.).
3. Trình bày ngắn gọn, dễ hiểu, tối đa 3-4 gạch đầu dòng.
4. Đưa ra gợi ý thông minh dạng câu hỏi định hướng sư phạm để học sinh tự sửa.
5. QUY TẮC CỐT LÕI: KHÔNG được làm hộ hay viết sẵn toàn bộ mã đáp án đầy đủ. Chỉ gợi ý đoạn code mẫu siêu nhỏ (1 thẻ ví dụ) nếu thật sự cần thiết.
6. Luôn có 1 câu động viên khích lệ học sinh cuối bài.`,
      });

      return res.json({ advice });
    }
  } catch (_err) {
    // Graceful fallback to pedagogical engine without error logging
  }

  // Graceful Zero-API Pedagogical Fallback
  const analysis = analyzeStudentCode(codeHtml, codeCss);
  let fallbackAdvice = `👋 **Chào em! Thầy nhận xét nhanh bài làm của em trong ${lessonTitle || 'bài học'}:**\n\n`;
  if (analysis.strengths.length > 0) {
    fallbackAdvice += `🌟 **Điểm làm tốt:**\n${analysis.strengths.map(s => `- ✅ ${s}`).join('\n')}\n\n`;
  }
  if (analysis.hasIssues) {
    fallbackAdvice += `🔍 **Điểm cần chú ý sửa chữa:**\n${analysis.issues.map(i => `- ⚠️ ${i}`).join('\n')}\n\n`;
    if (analysis.suggestions.length > 0) {
      fallbackAdvice += `💡 **Gợi ý:**\n${analysis.suggestions.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}\n\n`;
    }
  } else {
    fallbackAdvice += `🎉 **Tuyệt vời!** Cú pháp thẻ HTML & CSS của em rất chuẩn xác và rõ ràng.\n\n`;
  }
  if (failedTests.length > 0) {
    fallbackAdvice += `📌 **Tiêu chí cần hoàn thiện thêm:**\n${failedTests.slice(0, 2).map((t: string) => `- ${t}`).join('\n')}\n\n`;
  }
  fallbackAdvice += `💪 Chúc em thực hành tốt và đạt kết quả cao môn Tin học 12!`;

  return res.json({ advice: fallbackAdvice });
});

// Dedicated Senior HTML AI Assistant for High School (THPT) Students
app.post('/api/gemini/html-expert', async (req, res) => {
  const {
    question = '',
    history = [],
    scope = 'all', // 'all' (toàn bộ chương trình) or 'specific' (theo bài học cụ thể)
    lessonTitle = '',
    lessonObjective = '',
    codeHtml = '',
    codeCss = '',
    includeCode = false,
  } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ error: 'Vui lòng nhập câu hỏi của bạn.' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `Bạn là "Trợ Lý AI - Chuyên Gia Cấp Cao về HTML & Cố Vấn Sư Phạm Tin Học 12" (Senior Web Architect & Expert Educator) có kiến thức chuyên sâu, uyên bác về chuẩn World Wide Web (W3C), HTML5, CSS3 và chương trình Tin học 12 (Bộ Kết nối tri thức với cuộc sống).

TÔN CHỈ VÀ NGUYÊN TẮC HÀNG ĐẦU:
1. PHẠM VI GIẢI ĐÁP TOÀN DIỆN TỔNG THỂ TẤT CẢ CÁC BÀI HỌC (TỪ BÀI 7 ĐẾN BÀI 18):
   - Bạn được thiết kế để giải đáp TỔNG THỂ TẤT CẢ CÁC BÀI TRONG CHƯƠNG TRÌNH TIN HỌC 12 và toàn bộ kiến thức lập trình web HTML5 & CSS3.
   - Các chuyên đề bạn làm chủ:
     * Bài 7: HTML & Cấu trúc trang web (Cấu trúc DOCTYPE, html, head, title, body, heading, p, br, hr)
     * Bài 8: Định dạng văn bản & ký tự (b, strong, i, em, u, mark, del, sup, sub, style inline)
     * Bài 9: Bảng (Table, tr, th, td, caption, rowspan, colspan) & Danh sách (ul, ol, li)
     * Bài 10: Liên kết trong trang web (Thẻ <a>, href, target, liên kết tương đối, tuyệt đối, liên kết neo #id)
     * Bài 11: Đa phương tiện & Iframe (Thẻ <img>, <video>, <audio>, <iframe>)
     * Bài 12: Biểu mẫu Form & Nhập liệu (form, input các loại, button, select, option, textarea, label)
     * Bài 13: Làm quen với CSS (Cú pháp, Inline/Internal/External, Bộ chọn phần tử/class/id)
     * Bài 14: Định dạng văn bản bằng CSS (font-family, font-size, font-style, text-align, line-height)
     * Bài 15: Màu sắc, Nền & Viền bằng CSS (color, background-color, border, border-radius, box-shadow)
     * Bài 16: Bố cục & Mô hình hộp Box Model (content, padding, border, margin, box-sizing, margin: auto)
     * Bài 17: Mức ưu tiên của các bộ chọn CSS (Specificity, Thứ tự tầng CSS)
     * Bài 18: Thực hành tổng hợp thiết kế website hoàn chỉnh
     * Kiến thức tổng hợp: So sánh giữa các bài, cấu trúc website hoàn chỉnh, luyện thi trắc nghiệm & thực hành.
   - TUYỆT ĐỐI KHÔNG giới hạn câu trả lời trong phạm vi một bài riêng lẻ trừ khi học sinh yêu cầu cụ thể. Luôn sẵn sàng liên hệ kiến thức tổng thể giữa các bài để học sinh có bức tranh toàn cảnh.

2. TRẢ LỜI CHÍNH XÁC, TRỰC TIẾP, ĐÚNG TRỌNG TÂM NGAY TỪ CÂU ĐẦU TIÊN:
   - TUYỆT ĐỐI KHÔNG TRẢ LỜI SAI, không đoán mò, không nói vòng vo mơ hồ.
   - Nếu hỏi về thẻ nào: Chỉ rõ tên thẻ và cú pháp.
   - Nếu hỏi về thuộc tính: Nêu chính xác tên thuộc tính, giá trị hợp lệ.
   - Nếu hỏi về lý thuyết hay so sánh (Block vs Inline, Class vs ID, Thẻ đơn vs Thẻ cặp, HTML vs CSS): Giải thích cặn kẽ, chính xác bản chất kèm ẩn dụ trực quan, dễ nhớ cho học sinh THPT.

3. CẤU TRÚC PHẢN HỒI CHUYÊN NGHIỆP:
   - 🎯 **Câu trả lời trực tiếp & cốt lõi:** Nêu ngay câu trả lời chuẩn xác nhất trong 1-2 câu đầu.
   - 💡 **Giải thích chi tiết & Ẩn dụ thực tế:** Phân tích cú pháp, cách trình duyệt hiển thị.
   - 💻 **Đoạn mã ví dụ mẫu (Code Snippet):** Luôn có ví dụ HTML/CSS chuẩn W3C, ngắn gọn, sạch sẽ, có chú thích tiếng Việt.
   - ⚠️ **Lưu ý & Cạm bẫy:** Các lỗi học sinh hay mắc.
   - 🚀 **Mẹo thi cử & Thực hành:** Gợi ý cách nhớ nhanh cho bài thi THPT.

4. KHI HỌC SINH YÊU CẦU SOI LỖI HOẶC HỎI VỀ MÃ BÀI LÀM:
   - Đọc kỹ mã HTML và CSS học sinh đang gửi kèm.
   - Chỉ ra chính xác dòng bị lỗi, giải thích rõ vì sao sai và hướng dẫn cách sửa cụ thể.
   - Động viên, khích lệ tinh thần học tập của học sinh.`;

      // Build contents array with past history if provided
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
          if (item.question) {
            contents.push({ role: 'user', parts: [{ text: item.question }] });
          }
          if (item.answer) {
            contents.push({ role: 'model', parts: [{ text: item.answer }] });
          }
        }
      }

      // Build current prompt
      let currentPrompt = question.trim();

      if (scope === 'all') {
        currentPrompt += `\n\n[CHẾ ĐỘ HỎI ĐÁP]: TỔNG THỂ TOÀN BỘ CHƯƠNG TRÌNH TIN HỌC 12 (Bài 7 đến Bài 18). Học sinh có thể hỏi về bất kỳ bài học hoặc chủ đề nào, hãy giải đáp toàn diện, liên hệ kiến thức tổng thể.`;
      } else if (lessonTitle) {
        currentPrompt += `\n\n[CHẾ ĐỘ HỎI ĐÁP]: THEO BÀI HỌC CỤ THỂ: ${lessonTitle}${lessonObjective ? `\n[Mục tiêu bài]: ${lessonObjective}` : ''}`;
      }

      if (includeCode && (codeHtml || codeCss)) {
        currentPrompt += `\n\n[MÃ NGUỒN HỌC SINH ĐANG VIẾT TRONG PHÒNG THỰC HÀNH]:`;
        if (codeHtml) {
          currentPrompt += `\n--- HTML ---\n\`\`\`html\n${codeHtml}\n\`\`\``;
        }
        if (codeCss) {
          currentPrompt += `\n--- CSS ---\n\`\`\`css\n${codeCss}\n\`\`\``;
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: currentPrompt }],
      });

      const answer = await generateWithFallback(ai, {
        contents,
        systemInstruction,
        temperature: 0.7,
      });

      if (answer && answer.trim()) {
        return res.json({ answer });
      }
    }
  } catch (_err) {
    // Graceful fallback to pedagogical engine without error logging
  }

  // Graceful Zero-API Pedagogical Fallback (100% Reliable, Instant, Zero-Setup)
  const localAnswer = generateLocalPedagogicalAnswer({
    question,
    lesson: {
      lessonNumber: lessonTitle.split(':')[0] || 'Bài học',
      title: lessonTitle,
      objective: lessonObjective,
    },
    codeHtml,
    codeCss,
    includeCode,
  });

  return res.json({ answer: localAnswer });
});

// Explicit Virtual Lab HTML Page Handlers (100% immune to 404 on iframe or browser navigation)
app.get(['/thong_tin.html', '/thong-tin.html', '/thongtin.html'], (req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'thong_tin.html');
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(MOCK_THONG_TIN_HTML);
});

app.get(['/CLB.html', '/clb.html'], (req, res) => {
  const filePath = path.resolve(__dirname, 'public', 'CLB.html');
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(MOCK_CLB_HTML);
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve production build
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Dev mode with Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HTML12 Lab Server running at http://localhost:${PORT}`);
  });
}

startServer();
