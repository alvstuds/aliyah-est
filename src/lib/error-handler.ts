import { toast } from '@/components/toast'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export const errorHandlerClient = (error: unknown) => {
  if (error instanceof AxiosError) {
    const err = error?.response?.data

    if (err.name == 'ZodError') {
      const message = `${err.issues[0].path[0]}. ` + err.issues[0].message
      return toast({ title: 'Error', message, type: 'error' })
    }

    toast({ title: 'Error', message: err.message, type: 'error' })
  }
}

export const errorHandlerServer = (err: unknown) => {
  const res = NextResponse
  if (err instanceof ZodError) {
    return res.json(err, { status: 400 })
  }

  return res.json({ message: 'Internal Server Error' }, { status: 500 })
}
