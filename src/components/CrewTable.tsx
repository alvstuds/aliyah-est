'use client'
import useCrewList from '@/hooks/useCrewList'
import * as x from '@mui/x-data-grid'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FC } from 'react'
import useStore from '../store/useStore'
import { Button } from './Button'
import Dialog from './Dialog'
import Table from './Table'
import Paragraph from './Paragraph'
import SelectTable from './SelectTable'
import axios from 'axios'
import { alert } from '@/lib/alert'
import { errorHandlerClient } from '@/lib/error-handler'
import { mutate } from 'swr'
import { Info, Loader2Icon, Printer, Trash } from 'lucide-react'
import CrewReport from './CrewReport'
import { useSession } from 'next-auth/react'

const CrewTable: FC = () => {
  const router = useRouter()
  const { crewTableColumns, deleteCrew, loadingDelete } = useStore()
  const session = useSession()
  const isAdmin = session.data?.user.role === 'admin'
  const [open, setOpen] = React.useState(false)
  const [previewReport, setPreviewReport] = React.useState(false)
  const [openStatus, setOpenStatus] = React.useState(false)
  const [loadingStatus, setLoadingStatus] = React.useState(false)
  const [id, setId] = React.useState<x.GridRowId>()
  const searchParams = useSearchParams()
  const status = searchParams?.get('status') ?? null

  const { data, loading } = useCrewList(status)
  if (loading) return <div>loading...</div>

  const statusOpts = [
    { name: 'Crew Standby', value: 'standby' },
    { name: 'Crew Onboarding', value: 'onboarding' },
    { name: 'Ex-Crew Standby', value: 'ex-standby' },
    { name: 'Out', value: 'out' },
  ]

  const changeCrewStatus = async (status: string, id: string) => {
    try {
      setLoadingStatus(true)
      const { data } = await axios.put('/api/crew/status', { id, status })
      alert(data.message)
      setLoadingStatus(false)
      setOpenStatus(false)
      mutate('crewList')
    } catch (error) {
      errorHandlerClient(error)
    }
  }

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <div className="space-y-3">
          <Paragraph>Do you really want to delete this data?</Paragraph>

          <Button
            onClick={async () => {
              await deleteCrew(id!)
              setOpen(false)
            }}
            isLoading={loadingDelete}
          >
            Delete
          </Button>
        </div>
      </Dialog>

      <CrewReport
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
          ...crewTableColumns.map((col) => ({
            ...col,
            renderCell(
              params: x.GridRenderCellParams<
                any,
                any,
                any,
                x.GridTreeNodeWithRender
              >
            ) {
              return <div className="font-sans">{params.value}</div>
            },
          })),
          {
            field: 'col5',
            headerName: 'Status',
            width: 200,
            renderCell(
              params: x.GridRenderCellParams<
                any,
                any,
                any,
                x.GridTreeNodeWithRender
              >
            ) {
              return (
                <div className="z-50 font-sans">
                  <button onClick={() => setOpenStatus(true)}>
                    {statusOpts.find((opt) => opt.value === params.value)?.name}
                  </button>
                  <Dialog open={openStatus} setOpen={setOpenStatus}>
                    {loadingStatus ? (
                      <div className="flex justify-center">
                        <Loader2Icon className="animate-spin dark:stroke-white" />
                      </div>
                    ) : (
                      <>
                        <Paragraph className="mb-3">
                          Change Crew Status
                        </Paragraph>
                        <SelectTable
                          options={statusOpts}
                          value={params.value}
                          onChange={(value) =>
                            changeCrewStatus(value, params.id.toString())
                          }
                        />
                      </>
                    )}
                  </Dialog>
                </div>
              )
            },
          },
          {
            field: 'col6',
            type: 'actions',
            getActions: (params: x.GridRowParams) => [
              <x.GridActionsCellItem
                key={params.id}
                icon={<Info className="stroke-blue-500" />}
                onClick={() => router.push(`/crew/${params.id}`)}
                label="Edit"
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
        data={data.map((request: any) => ({
          id: request.id,
          col1: request.idNumber,
          col2: `${request.givenName} ${request.surName}`,
          col3: request.phoneNumber,
          col4: request.mainRank,
          col5: request.status,
        }))}
      />
    </>
  )
}

export default CrewTable
