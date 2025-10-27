import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getProjectDetails, getUserDetails } from './actions/serverActions'
import AppSidebar from './components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import BreadcrumbsHeader from './components/breadcrumbs'
import Header from './components/header'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const projectResponse = await getProjectDetails()
  const projectDetails = await projectResponse.json()

  const userResponse = await getUserDetails()
  const userDetails = await userResponse.json()

  return (
    <SidebarProvider>
      <AppSidebar project={projectDetails} user={userDetails} />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
