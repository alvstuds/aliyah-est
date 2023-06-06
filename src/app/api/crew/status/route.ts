import { checkAuth } from '@/lib/api-middlewares/check-auth';
import { db } from '@/lib/db';
import { errorHandlerServer } from '@/lib/error-handler';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    await checkAuth();

    const res = NextResponse;
    const data = await req.json();

    if (!data.id) {
      return res.json({ message: 'Id is required.' }, { status: 400 });
    }

    await db.crew.update({
      data: { status: data.status },
      where: { id: data.id },
    });

    return res.json({ message: 'Data edited successfully.' }, { status: 200 });
  } catch (err) {
    return errorHandlerServer(err);
  }
}
