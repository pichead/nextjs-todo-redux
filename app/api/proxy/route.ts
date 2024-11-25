import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // ดึง URL ปลายทางจาก Header
  
  const targetUrl = req.headers.get('x-proxy-url');
  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing x-proxy-url header' }, { status: 400 });
  }

  // ดึง path จาก Dynamic Route
  const { pathname } = req.nextUrl;
  const path = pathname.replace('/api/proxy', '');
  const fullUrl = `${targetUrl}${path}`;

  try {
    // สร้าง Body ถ้ามีในคำขอ
    const body = req.body ? req.body : null;

    // ส่งคำขอไปยัง URL ปลายทาง
    const response = await fetch(fullUrl, {
      method: req.method, // ใช้ HTTP Method เดิม
      headers: {
        ...Object.fromEntries(req.headers.entries()), // ส่ง headers ทั้งหมด
      },
      body: body ? await req.text() : undefined, // รองรับ Body ทุกรูปแบบ
    });

    // รับ Response จากปลายทาง
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: response.headers, // Forward headers กลับไปยัง Client
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 500 });
  }
}
