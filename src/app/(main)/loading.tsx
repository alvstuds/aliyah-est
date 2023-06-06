import Paragraph from '@/components/Paragraph'
import { Loader2 } from 'lucide-react'

const Loading = async () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <Paragraph>Preparing your page</Paragraph>
      <Loader2 className="h-10 w-10 animate-spin dark:text-slate-200" />
    </div>
  )
}

export default Loading
