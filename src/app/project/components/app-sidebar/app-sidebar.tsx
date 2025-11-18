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
import Loading from './loading'
import { useEffect, useState } from 'react'
import { getProjectDetails, getUserDetails } from '../../clientActions'
import useGlobalData from '../../useGlobalData'

interface Props {
  className?: string
}

export default function AppSidebar({ className }: Props) {
  const [details, setDetails] = useState<{
    project: Project | null
    user: User | null
  }>({
    project: null,
    user: null,
  })
  const { updateData } = useGlobalData()
  const [isLoading, setIsLoading] = useState(false)

  const getDetails = async () => {
    const userResponse = await getUserDetails()
    const userDetails = await userResponse.json()
    updateData('user', userDetails)

    const projectResponse = await getProjectDetails()
    const projectDetails = await projectResponse.json()

    setDetails({
      project: projectDetails,
      user: userDetails,
    })
  }

  const refetchProjectDetails = async () => {
    setIsLoading(true)
    const projectResponse = await getProjectDetails()
    const projectDetails = await projectResponse.json()

    setDetails((prevDetails) => ({
      ...prevDetails,
      project: projectDetails,
    }))
    setIsLoading(false)
  }

  useEffect(() => {
    getDetails()
  }, [])

  const { project, user } = details

  if (!project || !user) return <Loading />

  return (
    <Sidebar className={className}>
      <SidebarHeader className='flex flex-row my-0.5'>
        <div className='bg-sidebar-primary dark:bg-primary text-sidebar-primary-foreground dark:text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg'>
          {project?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className='flex flex-col justify-between gap-1 leading-none'>
          <span className='truncate text-md font-semibold'>
            {project?.name}
          </span>
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
        <NavWorkspaces
          isLoading={isLoading}
          workspaces={project.workspaces}
          refreshData={refetchProjectDetails}
        />
        <NavSecondary />
      </SidebarContent>
      <Separator />
      <SidebarFooter className='my-0.5'>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
