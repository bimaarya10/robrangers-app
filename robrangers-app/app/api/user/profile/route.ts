import { NextResponse } from "next/server";
import { dbManager } from "@/lib/db";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("ranger_session")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Sesi tidak ditemukan atau kedaluwarsa." },
        { status: 401 }
      );
    }

    const { name, phone, githubConnected, githubUsername } = await request.json();

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (githubConnected !== undefined) updates.githubConnected = githubConnected;
    if (githubUsername !== undefined) updates.githubUsername = githubUsername;

    const user = dbManager.updateUser(sessionId, updates);

    // Omit passwordHash before sending to client
    const { passwordHash, ...safeUser } = user;

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat memperbarui profil." },
      { status: 400 }
    );
  }
}
