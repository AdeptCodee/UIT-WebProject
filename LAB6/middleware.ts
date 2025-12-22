import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ======================================================
  // LOGIC CŨ: EXERCISE 3 (Vẫn giữ nguyên để thầy chấm)
  // ======================================================
  if (pathname.startsWith("/api/secret")) {
    const apiKey = request.headers.get("x-api-key");
    const validKey = process.env.MY_SECRET_KEY;

    if (apiKey !== validKey) {
      return NextResponse.json(
        { message: "Unauthorized: Sai key hoặc thiếu key rồi!" },
        { status: 401 }
      );
    }
  }

  // ======================================================
  // LOGIC MỚI: SMALL PROJECT
  // TẠM THỜI TẮT RATE LIMIT ĐỂ TEST CHỨC NĂNG CHAT TRƯỚC
  // (Khi nào nộp bài muốn bật lại thì bỏ dấu comment /* ... */ đi)
  // ======================================================

  /* if (pathname.startsWith("/api/chat")) {
    const ip = (request as any).ip || "127.0.0.1";
    const limit = 5; 
    const windowMs = 60 * 1000;

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, { count: 0, startTime: Date.now() });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.startTime > windowMs) {
      ipData.count = 0;
      ipData.startTime = Date.now();
    }

    ipData.count += 1;

    if (ipData.count > limit) {
      return NextResponse.json(
        { message: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/secret", "/api/chat"],
};
