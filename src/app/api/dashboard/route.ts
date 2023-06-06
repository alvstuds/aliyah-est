import { checkAuth } from '@/lib/api-middlewares/check-auth';
import { CREW_STATUS, mainRankOpts } from '@/lib/data';
import { db } from '@/lib/db';
import { errorHandlerServer } from '@/lib/error-handler';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await checkAuth();

    const shipData = await db.ship.findMany();
    const crewData = await db.crew.findMany();

    const crewStatus = CREW_STATUS.map((item) => ({
      status: item,
      value: crewData.filter((val) => val.status === item.value).length,
    }));

    const crewMainRank = mainRankOpts.map((item) => ({
      mainRank: item,
      value: crewData.filter((val) => val.mainRank === item.value).length,
    }));

    const data = {
      shipData,
      crewStatus,
      crewMainRank,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    errorHandlerServer(err);
  }
}
