import { checkAuth } from '@/lib/api-middlewares/check-auth'
import cloudinary from '@/lib/cloudinary'
import { db } from '@/lib/db'
import { errorHandlerServer } from '@/lib/error-handler'
import { crewSchema } from '@/lib/schemas'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    await checkAuth()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    let data

    if (status !== 'null') {
      data = await db.crew.findMany({ where: { status } })
    } else {
      data = await db.crew.findMany()
    }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return errorHandlerServer(err)
  }
}

export async function POST(req: Request) {
  const res = NextResponse

  try {
    const { user }: any = await checkAuth()

    const data = await req.json()
    const { bio_ps, td_array, sb_array } = data

    // validations
    await crewSchema.parseAsync(bio_ps)

    // check if crew existed
    const crewExisted = await db.crew.findFirst({
      where: { idNumber: bio_ps.idNumber },
    })

    if (crewExisted) {
      return res.json(
        { message: 'Crew already created before.' },
        { status: 400 }
      )
    }

    // check if td existed
    const tdExisted = await db.travelDocument.findMany({
      where: {
        number: {
          in: td_array.map((item: any) => item.number),
        },
      },
    })

    if (tdExisted.length !== 0) {
      return res.json(
        {
          message: `Travel Documents with number ${tdExisted
            .map((item: { number: any }) => item.number)
            .join(', ')} already created before.`,
        },
        { status: 400 }
      )
    }

    // check if td existed
    const sbExisted = await db.seamanBook.findMany({
      where: {
        number: {
          in: sb_array.map((item: any) => item.number),
        },
      },
    })

    if (sbExisted.length !== 0) {
      return res.json(
        {
          message: `Seaman Books with number ${sbExisted
            .map((item: { number: any }) => item.number)
            .join(', ')} already created before.`,
        },
        { status: 400 }
      )
    }

    // create new crew data
    const createdCrew = await db.crew.create({
      data: {
        ...bio_ps,
        height: parseInt(bio_ps.height),
        weight: parseInt(bio_ps.weight),
        shoeSize: parseInt(bio_ps.shoeSize),
        dob: new Date(bio_ps.dob).toISOString(),
        status: 'standby',
        createdBy: user.id,
      },
    })

    // documents structure
    td_array.forEach((data: any) => {
      data.crewId = createdCrew.id
      data.issued = new Date(data.issued).toISOString()
      data.expired = new Date(data.expired).toISOString()
    })

    sb_array.forEach((data: any) => {
      data.crewId = createdCrew.id
      data.issued = new Date(data.issued).toISOString()
      data.expired = new Date(data.expired).toISOString()
    })

    // create new documents data
    await db.travelDocument.createMany({ data: td_array })
    await db.seamanBook.createMany({ data: sb_array })

    return res.json({ message: 'Data created successfully.' }, { status: 200 })
  } catch (err) {
    return errorHandlerServer(err)
  }
}

export async function PUT(req: Request) {
  try {
    await checkAuth()

    const res = NextResponse
    const data = await req.json()

    if (!data.id) {
      return res.json({ message: 'Id is required.' }, { status: 400 })
    }

    await db.crew.update({
      data: {
        ...data,
        dob: new Date(data.dob ?? '').toISOString(),
      },
      where: { id: data.id },
    })

    return res.json({ message: 'Data edited successfully.' }, { status: 200 })
  } catch (err) {
    return errorHandlerServer(err)
  }
}

export async function DELETE(req: Request) {
  try {
    await checkAuth()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ message: 'Id is required.' }, { status: 400 })
    }

    await db.travelDocument
      .findMany({ where: { crewId: id } })
      .then(async (values: any[]) => {
        if (values.length === 0) return

        const fileIds: any = values.map(
          (value: { fileId: any }) => value.fileId
        )

        await cloudinary.api.delete_resources(fileIds, {
          resource_type: 'raw',
        })

        await db.travelDocument.deleteMany({
          where: { id: { in: values.map((value: { id: any }) => value.id) } },
        })
      })

    await db.seamanBook
      .findMany({ where: { crewId: id } })
      .then(async (values: any[]) => {
        if (values.length === 0) return

        const fileIds: any = values.map(
          (value: { fileId: any }) => value.fileId
        )

        await cloudinary.api.delete_resources(fileIds, {
          resource_type: 'raw',
        })

        await db.seamanBook.deleteMany({
          where: { id: { in: values.map((value: { id: any }) => value.id) } },
        })
      })

    const deletedCrew = await db.crew.delete({ where: { id } })
    await cloudinary.uploader.destroy(deletedCrew?.imageId!)

    return NextResponse.json(
      { message: 'Data deleted successfully.' },
      { status: 200 }
    )
  } catch (err) {
    return errorHandlerServer(err)
  }
}
