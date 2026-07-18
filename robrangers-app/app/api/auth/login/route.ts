import { NextResponse } from "next/server";
import { dbManager } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Harap masukkan email dan kata sandi Anda." },
        { status: 400 }
      );
    }

    const user = dbManager.getUserByEmail(email);

    if (!user) {
      dbManager.createLoginLog(null, email, ip, "failed");
      return NextResponse.json(
        { error: "Email atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    const inputHash = dbManager.hashPassword(password);
    if (user.passwordHash !== inputHash) {
      dbManager.createLoginLog(user.id, email, ip, "failed");
      return NextResponse.json(
        { error: "Email atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    // Set secure HTTP-only cookie session
    const cookieStore = await cookies();
    cookieStore.set("ranger_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax"
    });

    // Log successful login
    dbManager.createLoginLog(user.id, email, ip, "success");

    // Omit passwordHash before sending to client
    const { passwordHash, ...safeUser } = user;

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
