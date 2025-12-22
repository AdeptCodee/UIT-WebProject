import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Chỉ chặn các request gửi đến đường dẫn /api/secret
  if (request.nextUrl.pathname.startsWith("/api/secret")) {
    // 2. Lấy header x-api-key từ request
    const apiKey = request.headers.get("x-api-key");

    // 3. So sánh với key trong file .env.local
    const validKey = process.env.MY_SECRET_KEY;

    // 4. Nếu sai key, trả về lỗi 401 Unauthorized ngay lập tức
    if (apiKey !== validKey) {
      return NextResponse.json(
        { message: "Unauthorized: Sai key hoặc thiếu key rồi!" },
        { status: 401 }
      );
    }
  }

  // Nếu đúng key (hoặc không phải route cần bảo vệ), cho phép đi tiếp
  return NextResponse.next();
}

// Cấu hình để middleware chỉ chạy trên path này (tối ưu hiệu năng)
export const config = {
  matcher: "/api/secret",
};
