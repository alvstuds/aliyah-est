import { checkAuth } from '@/lib/api-middlewares/check-auth'
import { db } from '@/lib/db'
import { errorHandlerServer } from '@/lib/error-handler'
import { genSalt, hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await checkAuth()

    const data = await db.user.findMany()
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    errorHandlerServer(err)
  }
}

export async function POST(req: Request) {
  try {
    await checkAuth()

    const body = await req.json()

    const adminExisted = await db.user.findFirst({
      where: { email: body.email },
    })

    if (adminExisted) {
      return NextResponse.json(
        { message: 'Admin already created before.' },
        { status: 400 }
      )
    }

    // hash password
    const salt = await genSalt(10)
    const hashPass = await hash(body.password, salt)
    const data = { ...body, password: hashPass, role: 'admin' }

    await db.user.create({ data })

    return NextResponse.json(
      { message: 'Admin created successfully.' },
      { status: 200 }
    )
  } catch (err) {
    errorHandlerServer(err)
  }
}

export async function PUT(req: Request) {
  try {
    await checkAuth()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const body = await req.json()

    if (!id) {
      return NextResponse.json({ message: 'Id is required.' }, { status: 400 })
    }

    await db.user.update({ data: body, where: { id } })

    return NextResponse.json(
      { message: 'Profile updated successfully.' },
      { status: 200 }
    )
  } catch (err) {
    errorHandlerServer(err)
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

    await db.user.delete({ where: { id } })

    return NextResponse.json(
      { message: 'Admin deleted successfully.' },
      { status: 200 }
    )
  } catch (err) {
    errorHandlerServer(err)
  }
}
