import { Skeleton } from '@/components/ui/skeleton'
import Header from './components/header'

export default function Loading() {
  return (
    <>
      <Header showNotifications={false} />
      <div className='p-4'>
        <Skeleton className='w-full h-[160px]' />
      </div>
    </>
  )
}
