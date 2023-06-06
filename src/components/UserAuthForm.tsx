'use client'
import { loginSchema } from '@/lib/schemas'
import { IUser } from '@/store/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../store/useStore'
import Form from './fields/Form'
import InputText from './fields/InputText'
import { Button } from './Button'

const UserAuthForm: FC = () => {
  const login = useStore((state) => state.login)
  const methods = useForm<Partial<IUser>>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <div className="my-4">
      <Form methods={methods} onSubmit={login} className="grid gap-3">
        <InputText placeholder="Email" name="email" />
        <InputText placeholder="Password" name="password" isSecured />
        <Button
          type="submit"
          className="w-full"
          isLoading={methods.formState.isSubmitting}
        >
          Login
        </Button>
      </Form>
    </div>
  )
}

export default UserAuthForm
