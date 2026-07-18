import { NextResponse } from "next/server";
import { dbManager } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("ranger_session")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Sesi tidak ditemukan atau kedaluwarsa." },
        { status: 401 }
      );
    }

    const user = dbManager.getUserById(sessionId);

    if (!user) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan." },
        { status: 401 }
      );
    }

    // Omit passwordHash before sending to client
    const { passwordHash, ...safeUser } = user;

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memeriksa sesi." },
      { status: 500 }
    );
  }
}
