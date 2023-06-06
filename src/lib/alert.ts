import { toast } from '@/components/toast'

export const alert = (message: string) =>
  toast({
    title: 'Success',
    type: 'success',
    message,
  })
