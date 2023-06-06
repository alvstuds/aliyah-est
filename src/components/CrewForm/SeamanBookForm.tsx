'use client'
import { Plus, X } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import InputText from '../fields/InputText'
import { Button } from '../Button'
import LargeHeading from '../LargeHeading'
import Paragraph from '../Paragraph'
import DocumentForm from './DocumentForm'

interface IProps {
  methods: UseFormReturn<any>
  setActiveSection: (sec: string) => void
}

const SeamanBookForm: FC<IProps> = ({ methods, setActiveSection }) => {
  const [data, setData] = useState<number>(0)

  useEffect(() => {
    const sbData = JSON.parse(window.localStorage.getItem('sbData')!)
    sbData !== 'null' && setData(sbData ?? 0)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('sbData', JSON.stringify(data))
  }, [data])

  return (
    <>
      <LargeHeading size="sm">Seaman Book</LargeHeading>
      <div>
        <div className="space-y-4">
          <div className="border p-3">
            <Paragraph className="font-bold">Seaman Book Indo</Paragraph>
            <div className="hidden">
              <InputText name="sb_0_type" label="type" />
            </div>
            <DocumentForm prefix="sb" num={0} />
          </div>

          {Array.from({ length: data }).map((_, i) => (
            <div className="border p-3" key={i}>
              <div className="flex justify-between">
                <Paragraph className="font-bold">Other</Paragraph>
                <button
                  onClick={() => {
                    setData((state) => state - 1)
                    window.localStorage.removeItem(`sb_${i + 1}_file`)
                  }}
                >
                  <X />
                </button>
              </div>
              <DocumentForm prefix="sb" num={i + 1} withType />
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
          onClick={() => setActiveSection('sec3')}
        >
          Prev
        </Button>

        <Button isLoading={methods.formState.isSubmitting}>Submit</Button>
      </div>
    </>
  )
}

export default SeamanBookForm
