import Header from '@/app/project/components/header'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <Header>
        <Skeleton className='h-5 w-40' />
      </Header>
      <div className='p-4'>
        <div className='w-full flex gap-4 mb-4 min-w-[50vw]'>
          <Skeleton className='grow h-9' />
          <Skeleton className='w-25 h-9' />
        </div>
        <Skeleton className='w-full h-[200px] min-w-[50vw]' />
      </div>
    </>
  )
}
