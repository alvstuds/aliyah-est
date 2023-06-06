import { FC, ReactNode } from 'react'
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

interface FormProps {
  methods: UseFormReturn<any>
  onSubmit: SubmitHandler<any>
  children: ReactNode
  className?: string
}

const Form: FC<FormProps> = ({ methods, onSubmit, children, className }) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
