import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateLocalPedagogicalAnswer, analyzeStudentCode } from './src/services/aiPedagogicalEngine.ts';

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
  const models = ['gemini-2.5-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
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
        setTimeout(() => reject(new Error('Model timeout')), 6500)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
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

      const systemInstruction = `Bạn là "Chuyên Gia Cấp Cao về HTML & Cố Vấn Sư Phạm Tin Học 12" (Senior Web Architect & Expert Educator) có kinh nghiệm sâu sắc về chuẩn World Wide Web (W3C), HTML5, CSS3, đồng thời là một người thầy truyền cảm hứng, chuyên giải đáp thắc mắc cho học sinh cấp Trung học Phổ thông (THPT) Việt Nam (đặc biệt theo chương trình GDPT 2018 môn Tin học 12, SGK Kết nối tri thức với cuộc sống).

TÔN CHỈ VÀ PHONG CÁCH SƯ PHẠM:
1. DIỄN ĐẠT CỰC KỲ DỄ HIỂU CHO HỌC SINH CẤP THPT:
   - Sử dụng ngôn từ trong sáng, thân thiện, dễ hình dung, không dùng thuật ngữ kỹ thuật khô khan mà không giải nghĩa.
   - Luôn sử dụng ẨN DỤ ĐỜI THƯỜNG gần gũi với lứa tuổi 16-18 tuổi:
     * HTML = "Bộ khung xương" vững chắc của ngôi nhà (hoặc khung xe đạp/xe máy).
     * CSS = "Màu sơn, quần áo trang phục, trang trí nội thất" làm cho trang web đẹp mắt.
     * Thẻ <div> = "Chiếc thùng các-tông / hộp xốp" xếp thành khối riêng biệt (khối block, tự động xuống dòng).
     * Thẻ <span> = "Chiếc bút dạ quang" tô sáng hoặc định dạng từng từ trong đoạn văn mà không làm ngắt dòng (inline).
     * Thẻ <table> = "Bảng thời khóa biểu học tập" của lớp với hàng ngang (tr) và ô dữ liệu (td), tiêu đề cột (th).
     * Thuộc tính colspan = Gộp các cột nằm ngang (như ô "Chào cờ" kéo dài qua nhiều tiết).
     * Thuộc tính rowspan = Gộp các hàng nằm dọc.
     * Thẻ <form> = "Tờ phiếu đăng ký nguyện vọng đại học / phiếu đăng ký câu lạc bộ trường".
     * Thẻ <a> với thuộc tính href = "Cánh cửa thần kỳ Doraemon" dẫn sang trang khác.
     * Thẻ <img> với thuộc tính alt = Bức tranh treo tường kèm bảng ghi chú (để nếu mạng yếu ảnh không tải được thì người xem vẫn đọc được mô tả).

2. CẤU TRÚC PHẢN HỒI KHOA HỌC & CHUYÊN GIA:
   - 🎯 Tóm tắt câu trả lời cốt lõi trong 1-2 câu đầu (giúp học sinh nắm ngay bản chất).
   - 💡 Phân tích cặn kẽ, trực quan kèm hình tượng so sánh.
   - 💻 Ví dụ code minh họa HTML/CSS ngắn gọn, chuẩn HTML5, có chú thích tiếng Việt dễ nhớ.
   - ⚠️ Những lỗi sai hoặc "cạm bẫy" học sinh THPT hay mắc phải (quên đóng thẻ, viết hoa thường sai, nhầm class và id, quên thẻ đóng bảng...).
   - 🚀 Mẹo nhớ nhanh để làm bài thi trắc nghiệm học kỳ hoặc làm bài thực hành trên máy.
   - Luôn kết thúc bằng 1 lời động viên tinh thần tràn đầy năng lượng tích cực!

3. NGUYÊN TẮC SƯ PHẠM VÀNG (CHỈ HƯỚNG DẪN ĐỂ HỌC SINH TỰ SỬA, KHÔNG LÀM HỘ):
   - Khen ngợi tinh thần chủ động lập trình của học sinh.
   - Chỉ ra chính xác dòng hoặc thẻ đang gặp lỗi và giải thích nguyên nhân trực quan (vì sao trình duyệt hiển thị như vậy).
   - TUYỆT ĐỐI KHÔNG làm hộ, không viết sẵn toàn bộ bài giải để học sinh chỉ việc copy-paste.
   - Hướng dẫn gợi ý phương pháp, chỉ rõ quy tắc cú pháp cần thêm/sửa (ví dụ: thẻ nào cần thẻ đóng, cú pháp đóng thẻ như thế nào, thứ tự lồng thẻ ra sao) để học sinh tự giác gõ lại mã và ghi nhớ kiến thức sâu sắc.`;

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

      if (lessonTitle) {
        currentPrompt += `\n\n[BỐI CẢNH BÀI HỌC HIỆN TẠI]: ${lessonTitle}${lessonObjective ? `\n[Mục tiêu bài]: ${lessonObjective}` : ''}`;
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
