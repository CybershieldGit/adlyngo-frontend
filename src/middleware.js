import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) return NextResponse.next();

  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  let on = false;
  try {
    const res = await fetch(`${api}/api/maintenance`, { cache: "no-store" });
    const json = await res.json();
    on = json?.data?.maintenanceMode === true;
  } catch {}

  if (on && pathname !== "/maintenance") return NextResponse.redirect(new URL("/maintenance", request.url));
  if (!on && pathname === "/maintenance") return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image).*)"] };
