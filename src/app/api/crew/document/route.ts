import { checkAuth } from '@/lib/api-middlewares/check-auth';
import cloudinary from '@/lib/cloudinary';
import { db } from '@/lib/db';
import { errorHandlerServer } from '@/lib/error-handler';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await checkAuth();

    const res = NextResponse;
    const { searchParams } = new URL(req.url);
    const data = await req.json();
    const type = searchParams.get('type');
    const tdDB = db.travelDocument;
    const sbDB = db.seamanBook;

    if (type === 'td') {
      await tdDB.create({ data });
    } else if (type === 'sb') {
      await sbDB.create({ data });
    }

    return res.json({ message: 'Data created successfully.' }, { status: 200 });
  } catch (err) {
    errorHandlerServer(err);
  }
}

export async function PUT(req: Request) {
  try {
    await checkAuth();

    const res = NextResponse;
    const { searchParams } = new URL(req.url);
    const data = await req.json();
    const type = searchParams.get('type');
    const { id } = data;
    const tdDB = db.travelDocument;
    const sbDB = db.seamanBook;

    data.issued = new Date(data.issued).toISOString();
    data.expired = new Date(data.expired).toISOString();

    if (type === 'td') {
      const dataFound = await tdDB.findFirst({ where: { id } });
      if (!dataFound) {
        return res.json({ message: 'Data not found.' }, { status: 400 });
      }
      await tdDB.update({ where: { id }, data });
    } else if (type === 'sb') {
      const dataFound = await sbDB.findFirst({ where: { id } });
      if (!dataFound) {
        return res.json({ message: 'Data not found.' }, { status: 400 });
      }
      await sbDB.update({ where: { id }, data });
    }

    return res.json({ message: 'Data edited successfully.' }, { status: 200 });
  } catch (err) {
    errorHandlerServer(err);
  }
}

export async function DELETE(req: Request) {
  try {
    await checkAuth();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Id is required.' }, { status: 400 });
    }

    if (type == 'sb') {
      const deletedDoc = await db.seamanBook.delete({ where: { id } });
      await cloudinary.uploader.destroy(deletedDoc?.fileId!);
    } else if (type == 'td') {
      const deletedDoc = await db.travelDocument.delete({ where: { id } });
      await cloudinary.uploader.destroy(deletedDoc?.fileId!);
    }

    return NextResponse.json(
      { message: 'Data deleted successfully.' },
      { status: 200 }
    );
  } catch (err) {
    errorHandlerServer(err);
  }
}
