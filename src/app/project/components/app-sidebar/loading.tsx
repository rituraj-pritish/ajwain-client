import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Sidebar>
      <SidebarHeader className='flex flex-row my-0.5'>
        <Skeleton className='h-10 w-full' />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup className='gap-2'>
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
          <Skeleton className='h-8 w-full' />
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter className='my-0.5'>
        <Skeleton className='h-12 w-full' />
      </SidebarFooter>
    </Sidebar>
  )
}
