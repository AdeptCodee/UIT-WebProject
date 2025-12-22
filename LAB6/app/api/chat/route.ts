import { searchDocs } from "@/lib/docs";

// Sử dụng Edge Runtime để tối ưu tốc độ (Yêu cầu đề bài)
export const runtime = "edge";

export async function POST(req: Request) {
  // `useChat` sends { prompt } — accept that shape.
  const { prompt } = await req.json();
  const lastMessage = String(prompt || "");

  // 1. RAG: Tìm kiếm thông tin liên quan từ "Database"
  const context = await searchDocs(lastMessage);

  // 2. Tạo nội dung trả lời (Giả lập AI suy nghĩ)
  let responseText =
    'Xin lỗi, tôi không tìm thấy thông tin trong tài liệu. Hãy thử nhập "Next.js" hoặc "Nguyen" để test A.I.';

  if (context) {
    responseText = `Dựa trên tài liệu của Lab 6:\n${context}\n(Câu trả lời được tạo tự động cho Nguyên - 23521065).`;
  } else if (lastMessage.toLowerCase().includes("hello")) {
    responseText =
      "Xin chào! Tôi là trợ lý AI của Project Lab 6. Bạn cần tra cứu gì?";
  }

  // Return JSON `{ text }` so `useChat` can parse `res.json()` or `res.text()`.
  return new Response(JSON.stringify({ text: responseText }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
