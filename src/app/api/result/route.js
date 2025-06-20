import { NextResponse } from "next/server";
 
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { subject, exam, marks, studentId } = body;

    if (!subject || !exam || !marks || !studentId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const result = await prisma.result.create({
      data: {
        subject,
        exam,
        marks: parseInt(marks),
        studentId: parseInt(studentId),
      },
    });

    return NextResponse.json(
      { message: "Successfully saved", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Result POST API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  const results = await prisma.result.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json({ results });
}

 


export async function PATCH(req) {
  const { id, subject, exam, marks } = await req.json();

  if (!id || !subject || !exam || !marks) {
    return NextResponse.json({ message: "All fields (id, subject, exam, marks) are required." }, { status: 400 });
  }

  try {
    const updated = await prisma.result.update({
      where: { id },
      data: {
        subject,
        exam,
        marks,
      },
    });

    return NextResponse.json({ updated });
  } catch (err) {
    console.error('Update error:', err);
    return NextResponse.json({ message: "Failed to update result." }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.result.delete({ where: { id } });
  return NextResponse.json({ message: 'Deleted' });
}
