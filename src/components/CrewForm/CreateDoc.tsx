'use client'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../../store/useStore'
import Form from '../fields/Form'
import { Button } from '../Button'
import Dialog from '../Dialog'
import LargeHeading from '../LargeHeading'
import DocumentForm from './DocumentForm'
import { PlusCircle } from 'lucide-react'

interface CreateDocProps {
  crewId: string
  type: string
}

const CreateDoc: FC<CreateDocProps> = ({ crewId, type }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const addDoc = useStore((state) => state.addDoc)

  const methods = useForm({
    defaultValues: { crewId },
  })

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="sm"
        className="ml-4"
      >
        <PlusCircle className="w-5" />
      </Button>

      <Dialog open={open} setOpen={setOpen}>
        <LargeHeading className="mb-3" size="sm">
          Add New Document
        </LargeHeading>
        <Form
          methods={methods}
          onSubmit={async (values) => {
            await addDoc(values, type, router)
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

export default CreateDoc
