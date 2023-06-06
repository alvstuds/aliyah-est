'use client'
import { profileSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../store/useStore'
import Form from './fields/Form'
import InputFile from './fields/InputFile'
import InputText from './fields/InputText'
import { Button } from './Button'
import Dialog from './Dialog'

interface IProps {
  data: User
}

const ProfileForm: FC<IProps> = ({ data }) => {
  const router = useRouter()
  const { editAdmin } = useStore()
  const [open, setOpen] = React.useState(false)

  const methods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: data,
  })

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="h-10 w-10 rounded-full p-0"
      >
        <Pencil />
      </Button>

      <Dialog open={open} setOpen={setOpen}>
        <Form
          methods={methods}
          onSubmit={async (values) => {
            await editAdmin(values, router)
            setOpen(false)
          }}
          className="grid gap-4"
        >
          <h1 className="text-2xl font-semibold">Edit Profile</h1>
          <InputFile
            name="avatar"
            label="Avatar"
            className="relative grid h-20 w-20 place-items-center  border border-dashed border-black/75"
          />
          <InputText name="name" label="Name" />
          <InputText name="email" label="Email" />
          <InputText name="phoneNumber" label="Phone Number" />
          <Button type="submit" isLoading={methods.formState.isSubmitting}>
            Submit
          </Button>
        </Form>
      </Dialog>
    </>
  )
}

export default ProfileForm
