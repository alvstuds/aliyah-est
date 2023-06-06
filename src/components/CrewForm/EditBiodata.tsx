'use client'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../../store/useStore'
import Form from '../fields/Form'
import { Button } from '../Button'
import Dialog from '../Dialog'
import BiodataForm from './BiodataForm'

interface EditBiodataProps {
  data: any
}

const EditBiodata: FC<EditBiodataProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const editCrew = useStore((state) => state.editCrew)

  const methods = useForm({
    defaultValues: data,
  })

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" className="ml-4">
        <Pencil />
      </Button>

      <Dialog open={open} setOpen={setOpen}>
        <Form
          methods={methods}
          onSubmit={async (values) => {
            await editCrew(values, router)
            methods.reset()
            setOpen(false)
          }}
          className="max-w-4xl space-y-3"
        >
          <BiodataForm />
          <Button
            type="submit"
            className="w-full"
            isLoading={methods.formState.isSubmitting}
          >
            Submit
          </Button>
        </Form>
      </Dialog>
    </>
  )
}

export default EditBiodata
