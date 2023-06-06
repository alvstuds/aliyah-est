'use client'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import useStore from '../../store/useStore'
import { Button } from '../Button'
import Dialog from '../Dialog'
import Paragraph from '../Paragraph'

interface DeleteDocProps {
  id: string
  type: string
}

const DeleteDoc: FC<DeleteDocProps> = ({ id, type }) => {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { deleteDoc, loadingDelete } = useStore()

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="subtle" size="sm">
        <Trash className="w-5 stroke-red-500" />
      </Button>
      <Dialog open={open} setOpen={setOpen}>
        <div className="space-y-3">
          <Paragraph>Do you really want to delete this data?</Paragraph>

          <Button
            onClick={async () => {
              await deleteDoc(id, type, router)
              setOpen(false)
            }}
            isLoading={loadingDelete}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  )
}

export default DeleteDoc
