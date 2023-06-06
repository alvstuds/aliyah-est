import * as D from '@radix-ui/react-dialog'
import React, { FC } from 'react'

interface IProps {
  children: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

const Dialog: FC<IProps> = ({ children, open, setOpen }) => {
  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Trigger />
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-20 grid place-items-center overflow-y-auto bg-black/50">
          <D.Content className="my-5 min-w-[400px] rounded bg-slate-50 p-7 dark:bg-slate-900">
            {children}
          </D.Content>
        </D.Overlay>
      </D.Portal>
    </D.Root>
  )
}

export default Dialog
