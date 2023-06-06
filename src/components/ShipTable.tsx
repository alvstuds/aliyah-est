'use client'
import useShipList from '@/hooks/useShipList'
import { IShip } from '@/store/types'
import * as x from '@mui/x-data-grid'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import useStore from '../store/useStore'
import { Button } from './Button'
import Dialog from './Dialog'
import Paragraph from './Paragraph'
import Table from './Table'
import { Edit, Printer, Trash } from 'lucide-react'
import { pvOpts } from '@/lib/data'
import ShipReport from './ShipReport'
import { useSession } from 'next-auth/react'

const ShipTable: FC = () => {
  const router = useRouter()
  const session = useSession()
  const isAdmin = session.data?.user.role === 'admin'

  const { shipTableColumns, deleteShip, loadingDelete } = useStore()
  const [previewReport, setPreviewReport] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [id, setId] = React.useState<x.GridRowId>()

  const { data, loading } = useShipList()
  if (loading) return <div>loading...</div>

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <div className="space-y-3">
          <Paragraph>Do you really want to delete this data?</Paragraph>

          <Button
            onClick={async () => {
              await deleteShip(id!)
              setOpen(false)
            }}
            isLoading={loadingDelete}
          >
            Delete
          </Button>
        </div>
      </Dialog>

      <ShipReport
        data={data}
        previewReport={previewReport}
        setPreviewReport={setPreviewReport}
      />

      <div className="ml-auto">
        <Button onClick={() => setPreviewReport(true)}>
          <Printer className="mr-3" /> Download Report
        </Button>
      </div>

      <Table
        header={[
          ...shipTableColumns,
          {
            field: 'col10',
            type: 'actions',
            getActions: (params: x.GridRowParams) => [
              <x.GridActionsCellItem
                key={params.id}
                icon={<Edit className="stroke-blue-500" />}
                onClick={() => router.push(`/ship/edit/${params.id}`)}
                label="Edit"
                disabled={!isAdmin}
              />,
              <x.GridActionsCellItem
                key={params.id}
                icon={<Trash className="stroke-red-500" />}
                onClick={() => {
                  setOpen(true)
                  setId(params.id)
                }}
                label="Delete"
                disabled={!isAdmin}
              />,
            ],
          },
        ]}
        data={data.map((request: IShip) => ({
          id: request.id,
          col1: request.imoNumber,
          col2: request.name,
          col3: pvOpts.find((item) => item.value === request.type)?.name,
          col4: request.flag,
          col5: request.grt,
          col6: request.dwt,
          col7: request.hp,
          col8: request.callSign,
          col9: request.yearBuilt,
        }))}
      />
    </>
  )
}

export default ShipTable
