import { NextResponse } from "next/server";
import { dbManager } from "@/lib/db";

export async function GET() {
  try {
    const videos = dbManager.getModuleVideos();
    return NextResponse.json({ videos }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil daftar video modul." },
      { status: 500 }
    );
  }
}
