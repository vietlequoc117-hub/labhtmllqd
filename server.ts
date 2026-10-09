import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Gemini AI Tutor endpoint
app.post('/api/gemini/tutor', async (req, res) => {
  try {
    const {
      lessonTitle,
      lessonObjective,
      codeHtml,
      codeCss,
      failedTests = [],
      userQuestion = '',
      customApiKey,
    } = req.body;

    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: 'Chưa cấu hình API Key. Vui lòng kiểm tra biến môi trường GEMINI_API_KEY hoặc nhập API Key trong phần Cài đặt.',
      });
    }

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

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `Bạn là thầy/cô giáo Tin học 12 thân thiện, sư phạm và nhiệt tình của Việt Nam, theo chuẩn Sách giáo khoa Tin học 12 (Chủ đề 4: Giải quyết vấn đề với sự trợ giúp của máy tính - NXB Giáo dục Việt Nam, Bộ Kết nối tri thức với cuộc sống).
Nhiệm vụ của bạn:
1. Xem xét mã nguồn HTML/CSS của học sinh và mục tiêu bài học.
2. Phát hiện lỗi sai cụ thể (sai tên thẻ, quên đóng thẻ, viết hoa/thường sai, thiếu thuộc tính quan trọng như rowspan, colspan, href, src, type, v.v.).
3. Trình bày ngắn gọn, dễ hiểu, tối đa 3-4 gạch đầu dòng.
4. Đưa ra gợi ý thông minh dạng câu hỏi định hướng sư phạm để học sinh tự sửa.
5. QUY TẮC CỐT LÕI: KHÔNG được làm hộ hay viết sẵn toàn bộ mã đáp án đầy đủ. Chỉ gợi ý đoạn code mẫu siêu nhỏ (1 thẻ ví dụ) nếu thật sự cần thiết.
6. Luôn có 1 câu động viên khích lệ học sinh cuối bài.`,
        temperature: 0.7,
      },
    });

    const advice = response.text || 'Thầy/cô chưa có phản hồi, em hãy thử kiểm tra lại các thẻ đã đóng đúng chưa nhé!';
    return res.json({ advice });
  } catch (error: any) {
    console.error('Gemini Tutor Error:', error);
    return res.status(500).json({
      error: error?.message || 'Có lỗi xảy ra khi gọi trợ lý AI. Vui lòng thử lại.',
    });
  }
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
