// Đây là giả lập Database Vector
export const documentation = [
  {
    id: "1",
    content:
      "Next.js 15 introduces partial prerendering allowing static and dynamic parts on the same page.",
  },
  {
    id: "2",
    content:
      "Vercel AI SDK is a library for building AI-powered streaming user interfaces.",
  },
  {
    id: "3",
    content:
      "Server Actions allow you to run asynchronous code directly on the server without creating a separate API route.",
  },
  {
    id: "4",
    content: "Nguyen is a student with ID 23521065 studying at UIT.",
  },
];

// Hàm giả lập RAG (Retrieval): Tìm đoạn văn bản khớp với câu hỏi
export async function searchDocs(query: string) {
  const lowerQuery = query.toLowerCase();
  // Tìm kiếm đơn giản (thay cho Vector Search xịn)
  return documentation
    .filter(
      (doc) =>
        (lowerQuery.includes("next.js") && doc.content.includes("Next.js")) ||
        (lowerQuery.includes("ai") && doc.content.includes("AI")) ||
        (lowerQuery.includes("nguyen") && doc.content.includes("Nguyen"))
    )
    .map((d) => d.content)
    .join("\n");
}
