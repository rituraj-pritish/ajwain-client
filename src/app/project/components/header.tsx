import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Notifications from './notifications/notifications'

export default function Header({
  children,
  showNotifications = true,
}: {
  children?: React.ReactNode
  showNotifications?: boolean
}) {
  return (
    <header className='bg-background h-15 sticky top-0 flex shrink-0 items-center justify-between gap-2 border-b px-4 py-3'>
      <span className='flex items-center'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mr-2 data-[orientation=vertical]:h-4'
        />
        {children}
      </span>
      {showNotifications && <Notifications />}
    </header>
  )
}
