import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = signToken({ id: user.id, role: user.role });

    return NextResponse.json({ token, role: user.role }, { status: 200 });

  } catch (err) {
      console.error("Login Error:", err.message, err.stack);

    return NextResponse.json({ message: "111Internal server error" }, { status: 500 });
  }
}
