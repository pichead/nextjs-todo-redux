import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl);

  const res = NextResponse.next();

  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); // เปลี่ยน "*" เป็นโดเมนที่ต้องการอนุญาตหากไม่ต้องการอนุญาตทุกที่
  res.headers.append("Access-Control-Allow-Methods", "GET, DELETE, PATCH, POST, PUT");
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return res;
}

export const config = {
  matcher: ["/api/:path*"], // ใช้ matcher เพื่อให้ middleware ทำงานเฉพาะ endpoint ที่ขึ้นต้นด้วย "/api/"
};