'use client'
import { userSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../store/useStore'
import Form from './fields/Form'
import InputText from './fields/InputText'
import { Button } from './Button'
import Dialog from './Dialog'
import LargeHeading from './LargeHeading'

const AdminForm = () => {
  const { addAdmin } = useStore()
  const [open, setOpen] = React.useState(false)

  const methods = useForm({
    resolver: zodResolver(userSchema),
  })

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="ghost">
        <span className="hidden md:block">Add New Admin</span>
        <PlusCircle className="md:ml-3" />
      </Button>

      <Dialog open={open} setOpen={setOpen}>
        <Form
          methods={methods}
          onSubmit={async (values) => {
            await addAdmin(values)
            methods.reset()
            setOpen(false)
          }}
          className="grid gap-4"
        >
          <LargeHeading size="sm">Add New Admin</LargeHeading>
          <InputText name="name" label="Name" />
          <InputText name="email" label="Email" />
          <InputText name="phoneNumber" label="Phone Number" />
          <InputText name="password" label="Password" isSecured />
          <Button type="submit" isLoading={methods.formState.isSubmitting}>
            Submit
          </Button>
        </Form>
      </Dialog>
    </>
  )
}

export default AdminForm
