'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'
import Project from '@/types/project.interface'
import User from '@/types/user.interface'
import NavWorkspaces from './nav-workspaces'
import { NavUser } from './nav-user'
import NavSecondary from './nav-secondary'
import { Separator } from '@/components/ui/separator'

interface Props {
  className?: string
  project: Project
  user: User
}

export default function AppSidebar({ className, project, user }: Props) {
  return (
    <Sidebar className={className}>
      <SidebarHeader className='flex flex-row my-0.5'>
        <div className='bg-sidebar-primary dark:bg-primary text-sidebar-primary-foreground dark:text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg'>
          {project?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className='flex flex-col justify-between gap-1 leading-none'>
          <span className='text-md font-semibold'>{project?.name}</span>
          <span className='flex items-baseline'>
            <span className='text-[10px] font-extralight'>powered by</span>
            <span className='text-xs ml-1 font-extralight tracking-widest'>
              AJWAIN
            </span>
          </span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavWorkspaces workspaces={project.workspaces} />
        <NavSecondary />
      </SidebarContent>
      <Separator />
      <SidebarFooter className='my-0.5'>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
