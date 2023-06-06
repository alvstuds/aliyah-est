'use client'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/Tabs'
import { Crew } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../../store/useStore'
import Form from '../fields/Form'
import BiodataForm from './BiodataForm'
import PositionSubForm from './PositionSubForm'
import SeamanBookForm from './SeamanBookForm'
import TravelDocForm from './TravelDocForm'

const CrewForm = () => {
  const { addCrew } = useStore()
  const [activeSection, setActiveSection] = useState<string>('sec1')
  const router = useRouter()

  const methods = useForm<Crew & { td_0_type: string; sb_0_type: string }>({
    defaultValues: {
      td_0_type: 'passport',
      sb_0_type: 'indonesia',
    },
  })

  return (
    <div>
      <Form methods={methods} onSubmit={(values) => addCrew(values, router)}>
        <TabsRoot
          defaultValue={activeSection}
          value={activeSection}
          onValueChange={(value) => setActiveSection(value)}
          className="mb-10"
        >
          {/* FORM MENU */}
          <TabsList className="grid grid-cols-4 gap-3 bg-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
            <TabsTrigger value="sec1" className="text-center">
              1
            </TabsTrigger>
            <TabsTrigger value="sec2" className="text-center">
              2
            </TabsTrigger>
            <TabsTrigger value="sec3" className="text-center">
              3
            </TabsTrigger>
            <TabsTrigger value="sec4" className="text-center">
              4
            </TabsTrigger>
          </TabsList>

          {/* BIODATA SECTION */}
          <TabsContent value="sec1" className="flex-1 space-y-4">
            <BiodataForm setActiveSection={setActiveSection} />
          </TabsContent>

          {/* POSITION SUBMISSION SECTION */}
          <TabsContent value="sec2" className="flex-1 space-y-4">
            <PositionSubForm setActiveSection={setActiveSection} />
          </TabsContent>

          {/* TRAVEL DOCUMENTS SECTION */}
          <TabsContent value="sec3" className="flex-1 space-y-4">
            <TravelDocForm setActiveSection={setActiveSection} />
          </TabsContent>

          {/* SEAMAN BOOK SECTION */}
          <TabsContent value="sec4" className="flex-1 space-y-4">
            <SeamanBookForm
              methods={methods}
              setActiveSection={setActiveSection}
            />
          </TabsContent>
        </TabsRoot>
      </Form>
    </div>
  )
}

export default CrewForm
