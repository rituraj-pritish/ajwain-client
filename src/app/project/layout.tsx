import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getProjectDetails, getUserDetails } from './actions/serverActions'
import AppSidebar from './components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import BreadcrumbsHeader from './components/breadcrumbs-header'

export default async function Layout({ children }) {
  const projectResponse = await getProjectDetails()
  const projectDetails = await projectResponse.json()

  const userResponse = await getUserDetails()
  const userDetails = await userResponse.json()

  return (
    <SidebarProvider>
      <AppSidebar project={projectDetails} user={userDetails} />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <BreadcrumbsHeader />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
