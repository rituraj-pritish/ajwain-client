import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './components/app-sidebar/app-sidebar'
import { getProjectDetails, getUserDetails } from './actions'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const projectResponse = await getProjectDetails()
  const projectDetails = await projectResponse.json()

  const userResponse = await getUserDetails()
  const userDetails = await userResponse.json()
  return (
    <SidebarProvider>
      <AppSidebar project={projectDetails} user={userDetails} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
