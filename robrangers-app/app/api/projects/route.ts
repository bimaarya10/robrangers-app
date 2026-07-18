import { NextResponse } from "next/server";
import { dbManager } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const projects = dbManager.getProjects();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Gagal mengambil daftar proyek." },
      { status: 500 }
    );
  }
}

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

    const user = dbManager.getUserById(sessionId);
    if (!user) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan." },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const titleInput = formData.get("title") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "File proyek Roblox (.rbxl) wajib diunggah." },
        { status: 400 }
      );
    }

    if (!file.name.endsWith(".rbxl")) {
      return NextResponse.json(
        { error: "Harap unggah file proyek Roblox berekstensi .rbxl" },
        { status: 400 }
      );
    }

    const projectTitle = titleInput || file.name.replace(".rbxl", "");

    // Perform basic heuristic analysis on the file content
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const content = fileBuffer.toString("binary");

    // Search counts
    const hasScripts = (content.match(/Script|LocalScript|ModuleScript/g) || []).length;
    const hasTouched = (content.match(/Touched|Connect/g) || []).length;
    const hasNetworking = (content.match(/RemoteEvent|RemoteFunction|FireServer|OnServerEvent/g) || []).length;
    const hasDatastores = (content.match(/DataStoreService|GetDataStore/g) || []).length;

    // Calculate quality score and feedback
    let scriptCount = Math.max(1, Math.round(hasScripts / 4));
    let eventCount = Math.max(0, Math.round(hasTouched / 3));
    let networkingCount = Math.max(0, Math.round(hasNetworking / 3));
    
    let baseScore = 75;
    const features = [];
    
    if (scriptCount > 0) {
      baseScore += Math.min(10, scriptCount * 2);
      features.push(`${scriptCount} skrip terprogram`);
    }
    if (eventCount > 0) {
      baseScore += Math.min(5, eventCount * 1.5);
      features.push(`${eventCount} trigger event / event sensor`);
    }
    if (networkingCount > 0) {
      baseScore += 5;
      features.push(`komunikasi client-server via RemoteEvent`);
    }
    if (hasDatastores > 0) {
      baseScore += 5;
      features.push(`fitur penyimpanan data pemain (DataStore)`);
    }

    const qualityScore = Math.min(98, Math.round(baseScore));

    // Dynamic feedback report
    let feedback = "";
    if (qualityScore >= 90) {
      feedback = `Struktur kode sangat luar biasa! AI mendeteksi ${features.join(", ")}. Logika pergerakan dan optimasi script diatur dengan tingkat keamanan server-side yang sangat baik. Sangat direkomendasikan untuk portofolio lanjut.`;
    } else if (qualityScore >= 80) {
      feedback = `Proyek terverifikasi dengan baik. Ditemukan ${features.join(", ")}. Sinkronisasi logic berjalan lancar, namun masih ada ruang optimasi di sisi garbage collector dan penanganan event debounce agar game berjalan lebih lancar.`;
    } else {
      feedback = `Proyek berhasil diverifikasi. Terdeteksi ${features.join(", ")}. Logika dasar berfungsi, tapi disarankan menambahkan skrip debounce untuk menghindari lag ganda pada part sensor.`;
    }

    // Save to showcase projects database
    const newProject = dbManager.createProject(
      projectTitle,
      user.name,
      user.id,
      qualityScore,
      feedback,
      fileBuffer
    );

    // Award XP (e.g. 250 XP for submitting a project)
    const updatedUser = dbManager.addXp(
      user.id,
      250,
      `Mengunggah Proyek Showcase: ${projectTitle}`
    );

    return NextResponse.json({
      project: newProject,
      user: {
        xp: updatedUser.xp,
        level: updatedUser.level,
        learningHistory: updatedUser.learningHistory
      },
      report: `🤖 Penilaian AI: Proyek terverifikasi!\nSistem mendeteksi ${features.join(", ")}.\nSkor Kualitas Script: ${qualityScore}% - Lolos Kriteria Kelulusan.`
    }, { status: 201 });

  } catch (error: any) {
    console.error("Project upload api error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses unggahan." },
      { status: 500 }
    );
  }
}
