import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth'

export const checkAuth = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized to perform this action.' },
      { status: 401 }
    )
  }

  return session
}
