'use client'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../../store/useStore'
import Form from '../fields/Form'
import { Button } from '../Button'
import Dialog from '../Dialog'
import LargeHeading from '../LargeHeading'
import DocumentForm from './DocumentForm'

interface EditSeamanBookProps {
  data: any
}

const EditSeamanBook: FC<EditSeamanBookProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const editDoc = useStore((state) => state.editDoc)

  const methods = useForm({
    defaultValues: data,
  })

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" className="ml-4">
        <Pencil className="w-5" />
      </Button>

      <Dialog open={open} setOpen={setOpen}>
        <LargeHeading className="mb-3" size="sm">
          Edit Seaman Book
        </LargeHeading>
        <Form
          methods={methods}
          onSubmit={async (values) => {
            await editDoc(values, 'sb', router)
            methods.reset()
            setOpen(false)
          }}
          className="max-w-4xl space-y-3"
        >
          <DocumentForm edit withType />
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

export default EditSeamanBook
