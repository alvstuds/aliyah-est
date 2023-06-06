import { FC } from 'react'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from './Select'
import { Check, ChevronDown } from 'lucide-react'

interface SelectTableProps {
  name?: string
  value: string
  options: {
    name: string
    value: string
  }[]
  onChange?: (value: string, id?: string) => void
}

const SelectTable: FC<SelectTableProps> = ({
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <SelectRoot name={name} value={value} onValueChange={onChange}>
      <SelectTrigger asChild>
        <button className="flex w-full items-center justify-between gap-3 rounded-md bg-slate-200 px-2 py-2 font-sans outline-none">
          <SelectValue />
          <ChevronDown className="h-4 w-4" />
        </button>
      </SelectTrigger>
      <SelectContent>
        <SelectViewport className="bg-slate-200">
          {options.map(({ name, value }) => (
            <SelectItem key={value} value={value}>
              <SelectItemText>{name}</SelectItemText>
              <SelectItemIndicator>
                <Check className="h-5 w-5" />
              </SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectViewport>
      </SelectContent>
    </SelectRoot>
  )
}

export default SelectTable
