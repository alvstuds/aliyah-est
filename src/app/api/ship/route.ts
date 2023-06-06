import { checkAuth } from '@/lib/api-middlewares/check-auth';
import { db } from '@/lib/db';
import { errorHandlerServer } from '@/lib/error-handler';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await checkAuth();

    const data = await db.ship.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    errorHandlerServer(err);
  }
}

export async function POST(req: Request) {
  try {
    const { user }: any = await checkAuth();

    const body = await req.json();

    const shipExisted = await db.ship.findFirst({
      where: { imoNumber: body.imoNumber },
    });

    if (shipExisted) {
      return NextResponse.json(
        { message: 'Ship already created before.' },
        { status: 400 }
      );
    }

    const data = { ...body, createdBy: user.id };
    await db.ship.create({ data });

    return NextResponse.json(
      { message: 'Ship created successfully.' },
      { status: 200 }
    );
  } catch (err) {
    errorHandlerServer(err);
  }
}

export async function PUT(req: Request) {
  try {
    await checkAuth();

    const body = await req.json();

    const shipFound = await db.ship.findFirst({
      where: { imoNumber: body.imoNumber },
    });

    if (!shipFound) {
      return NextResponse.json({ message: 'Ship not found.' }, { status: 400 });
    }

    await db.ship.update({
      data: body,
      where: { imoNumber: body.imoNumber },
    });

    return NextResponse.json(
      { message: 'Ship edited successfully.' },
      { status: 200 }
    );
  } catch (err) {
    errorHandlerServer(err);
  }
}

export async function DELETE(req: Request) {
  try {
    await checkAuth();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Id is required.' }, { status: 400 });
    }

    await db.ship.delete({ where: { id } });

    return NextResponse.json(
      { message: 'Ship deleted successfully.' },
      { status: 200 }
    );
  } catch (err) {
    errorHandlerServer(err);
  }
}
