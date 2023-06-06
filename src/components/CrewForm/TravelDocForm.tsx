'use client'
import { Plus, X } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import InputText from '../fields/InputText'
import { Button } from '../Button'
import LargeHeading from '../LargeHeading'
import Paragraph from '../Paragraph'
import DocumentForm from './DocumentForm'

interface IProps {
  setActiveSection: (sec: string) => void
}

const TravelDocForm: FC<IProps> = ({ setActiveSection }) => {
  const [data, setData] = useState<number>(0)

  useEffect(() => {
    const tdData = JSON.parse(window.localStorage.getItem('tdData')!)
    tdData !== 'null' && setData(tdData ?? 0)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('tdData', JSON.stringify(data))
  }, [data])

  return (
    <>
      <LargeHeading size="sm">Travel Documents</LargeHeading>
      <div>
        <div className="space-y-4">
          <div className="border p-3">
            <Paragraph className="font-bold">Passport</Paragraph>
            <div className="hidden">
              <InputText name="td_0_type" label="Type" />
            </div>
            <DocumentForm prefix="td" num={0} />
          </div>

          {Array.from({ length: data }).map((_, i) => (
            <div className="border p-3" key={i}>
              <div className="flex justify-between">
                <Paragraph className="font-bold">Other</Paragraph>
                <button
                  onClick={() => {
                    setData((state) => state - 1)
                    window.localStorage.removeItem(`td_${i + 1}_file`)
                  }}
                >
                  <X />
                </button>
              </div>
              <DocumentForm prefix="td" num={i + 1} withType />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            type="button"
            onClick={() => setData((state) => state + 1)}
            variant="ghost"
            size="sm"
          >
            <Plus className="mr-3" /> Add new Document
          </Button>
        </div>
      </div>

      <div className="space-x-3 text-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setActiveSection('sec2')}
        >
          Prev
        </Button>
        <Button type="button" onClick={() => setActiveSection('sec4')}>
          Next
        </Button>
      </div>
    </>
  )
}

export default TravelDocForm
