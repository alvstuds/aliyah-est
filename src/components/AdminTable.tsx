'use client'
import useAdminList from '@/hooks/useAdminList'
import * as x from '@mui/x-data-grid'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { FC } from 'react'
import useStore from '../store/useStore'
import { Button } from './Button'
import Dialog from './Dialog'
import Paragraph from './Paragraph'
import Table from './Table'
import { Trash } from 'lucide-react'

const AdminTable: FC = () => {
  const { data: session } = useSession()

  const { adminTableColumns, deleteAdmin, loadingDelete } = useStore()
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState<x.GridRowId>()

  const { data, loading } = useAdminList()
  if (loading) return <div>loading...</div>

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <div className="space-y-3">
          <Paragraph>Do you really want to delete this data?</Paragraph>
          <Button
            onClick={async () => {
              await deleteAdmin(id!)
              setOpen(false)
            }}
            isLoading={loadingDelete}
          >
            Delete
          </Button>
        </div>
      </Dialog>

      <Table
        header={[
          ...adminTableColumns,
          {
            field: 'col5',
            type: 'actions',
            getActions: (params: x.GridRowParams) => [
              <x.GridActionsCellItem
                key={params.id}
                icon={<Trash className="stroke-red-500 disabled:hidden" />}
                onClick={() => {
                  setOpen(true)
                  setId(params.id)
                }}
                label="Delete"
                disabled={params.id === session?.user.id}
              />,
            ],
          },
        ]}
        data={data.map((request: User) => ({
          id: request.id,
          col1: request.id,
          col2: request.name,
          col3: request.email,
          col4: request.phoneNumber,
        }))}
      />
    </>
  )
}

export default AdminTable
