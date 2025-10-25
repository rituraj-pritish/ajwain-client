'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import ThemeToggle from '../../components/theme-toggle'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Project from '@/types/project.interface'
import User from '@/types/user.interface'
import NavWorkspaces from './nav-workspaces'
import { NavUser } from './nav-user'

interface Props {
  project: Project
  user: User
}

export default function AppSidebar({ project, user }: Props) {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row my-2">
        <div className="bg-sidebar-primary dark:bg-primary text-sidebar-primary-foreground dark:text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
          {project?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex flex-col justify-center gap-1 leading-none">
          <span className="text-md font-semibold">{project?.name}</span>
          <span className="flex items-baseline">
            <span className="text-xs">powered by</span>
            <span className="text-sm ml-1 font-medium tracking-widest">
              AJWAIN
            </span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces workspaces={project.workspaces} />
      </SidebarContent>
      <SidebarFooter className="my-2">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
