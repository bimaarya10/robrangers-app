import { NextResponse } from "next/server";
import { dbManager } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("ranger_session")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Sesi tidak ditemukan atau kedaluwarsa." },
        { status: 401 }
      );
    }

    const { projectId } = await request.json();

    if (projectId === undefined) {
      return NextResponse.json(
        { error: "ID Proyek wajib disertakan." },
        { status: 400 }
      );
    }

    const updatedProject = dbManager.toggleLikeProject(Number(projectId), sessionId);

    return NextResponse.json({ project: updatedProject }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Gagal mengubah status like proyek." },
      { status: 400 }
    );
  }
}
