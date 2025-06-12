import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

export async function GET() {
  const students = await prisma.student.findMany({ orderBy: { id: 'desc' } });
  return NextResponse.json({ students });
}

export async function POST(req) {
  const { name, className,phone  } = await req.json();
  if (!name || !className) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const newStudent = await prisma.student.create({
    data: { name, className,phone },
  });

  return NextResponse.json({ student: newStudent }, { status: 201 });
}


export async function PUT(req) {
  const { id, name, className, phone } = await req.json();
  const updated = await prisma.student.update({
    where: { id },
    data: { name, className, phone },
  });
  return NextResponse.json({ updated });
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.student.delete({ where: { id } });
  return NextResponse.json({ message: 'Deleted' });
}
