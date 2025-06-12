import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import { parse } from 'csv-parse/sync';


export async function GET() {
  const logs = await prisma.attendance.findMany({
    orderBy: { timestamp: 'desc' },
  });
   
  return NextResponse.json(logs);
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
  }

  const text = await file.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });

  const dataToInsert = records.map(row => ({
    userId: parseInt(row.UserID),
    name: row.Name,
    timestamp: new Date(row.DateTime),
  }));

  try {
    await prisma.attendance.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: 'Attendance uploaded successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to insert data' }, { status: 500 });
  }
}
