import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Clear session cookie
    cookieStore.set("ranger_session", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat logout." },
      { status: 500 }
    );
  }
}
