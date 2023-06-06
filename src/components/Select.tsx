import { cn } from '@/lib/utils'
import * as SelectPrimitive from '@radix-ui/react-select'
import { FC } from 'react'

const SelectRoot = SelectPrimitive.Root

const SelectTrigger = SelectPrimitive.Trigger

const SelectValue = SelectPrimitive.Value

const SelectIcon = SelectPrimitive.Icon

const SelectContent: FC<SelectPrimitive.SelectContentProps> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Content
      className={cn(
        'z-50 min-w-[var(--radix-select-trigger-width)]',
        className
      )}
      position="popper"
      sideOffset={8}
      {...props}
    />
  )
}

const SelectViewport: FC<SelectPrimitive.SelectViewportProps> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Viewport
      className={cn('max-h-56 rounded-lg bg-white p-2 shadow-lg', className)}
      {...props}
    />
  )
}

const SelectGroup = SelectPrimitive.Group

const SelectItem: FC<SelectPrimitive.SelectItemProps> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Item
      className={cn(
        'text-neutral-4 focus:bg-primary-1 relative flex items-center rounded-md px-8 py-2 text-sm font-medium',
        'radix-disabled:opacity-50',
        'select-none focus:outline-none',
        className
      )}
      {...props}
    />
  )
}

const SelectItemText = SelectPrimitive.ItemText

const SelectItemIndicator: FC<SelectPrimitive.SelectItemIndicatorProps> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.ItemIndicator
      className={cn('absolute left-2 inline-flex items-center', className)}
      {...props}
    />
  )
}

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
}
