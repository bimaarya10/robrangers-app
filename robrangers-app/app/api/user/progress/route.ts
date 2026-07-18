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

    const { xpAmount, activityTitle, completedQuizId, completedChallengeId } = await request.json();

    if (!xpAmount || !activityTitle) {
      return NextResponse.json(
        { error: "Jumlah XP dan deskripsi aktivitas wajib diisi." },
        { status: 400 }
      );
    }

    const user = dbManager.getUserById(sessionId);
    if (!user) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan." },
        { status: 404 }
      );
    }

    // Check if user already completed this quiz/challenge to prevent double XP reward
    const completedQuizzes = [...user.completedQuizzes];
    const completedChallenges = [...user.completedChallenges];

    if (completedQuizId !== undefined) {
      if (completedQuizzes.includes(completedQuizId)) {
        // Already completed, just return current user without error or double reward
        const { passwordHash, ...safeUser } = user;
        return NextResponse.json({ user: safeUser }, { status: 200 });
      }
      completedQuizzes.push(completedQuizId);
    }

    if (completedChallengeId !== undefined) {
      if (completedChallenges.includes(completedChallengeId)) {
        // Already completed
        const { passwordHash, ...safeUser } = user;
        return NextResponse.json({ user: safeUser }, { status: 200 });
      }
      completedChallenges.push(completedChallengeId);
    }

    // Update arrays in the DB
    dbManager.updateUser(sessionId, {
      completedQuizzes,
      completedChallenges
    });

    // Add XP (this also updates level and appends history item)
    const updatedUser = dbManager.addXp(sessionId, xpAmount, activityTitle);

    // Omit passwordHash before sending to client
    const { passwordHash, ...safeUser } = updatedUser;

    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat memperbarui progress." },
      { status: 400 }
    );
  }
}
