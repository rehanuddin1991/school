import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
     
    const {name, email, password, role } = body;

     

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
         name,
        email,
        password: hashedPassword,
          role
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json(
      { message: "11Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json({ users });
}

 


export async function PATCH(req) {
  const { id, name, email, role } = await req.json();

  if (!id || !name || !email || !role) {
    return NextResponse.json({ message: "All fields (id, name, email, role) are required." }, { status: 400 });
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
    });

    return NextResponse.json({ updated });
  } catch (err) {
    console.error('Update error:', err);
    return NextResponse.json({ message: "Failed to update user." }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: 'Deleted' });
}
