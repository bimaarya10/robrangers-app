import { NextResponse } from "next/server";
import { dbManager } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Harap lengkapi semua kolom pendaftaran." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Kata sandi minimal harus 6 karakter." },
        { status: 400 }
      );
    }

    const user = dbManager.createUser(name, email, password);

    // Set secure HTTP-only cookie session
    const cookieStore = await cookies();
    cookieStore.set("ranger_session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax"
    });

    // Log registration as a successful login log
    dbManager.createLoginLog(user.id, email, ip, "success");

    // Omit passwordHash before sending to client
    const { passwordHash, ...safeUser } = user;

    return NextResponse.json({ user: safeUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan pada server." },
      { status: 400 }
    );
  }
}
