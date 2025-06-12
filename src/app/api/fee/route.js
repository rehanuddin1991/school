// app/api/fee/route.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function GET() {
  try {
    const fees = await prisma.fee.findMany({
      include: {
        student: true, // Student info including name & className
      },
      orderBy: {
        paidDate: 'desc',
      },
    });
    return Response.json(fees);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { studentId, type, amount, status, paidDate, method } = body;

  try {
    const fee = await prisma.fee.create({
      data: {
        studentId: Number(studentId),
        type,
        amount,
        status,
        paidDate: paidDate ? new Date(paidDate) : null,
        method,
      },
    });
    return Response.json({ message: 'Fee added', fee });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
