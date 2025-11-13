import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from './components/app-sidebar/app-sidebar'
import { getProjectDetails } from './actions'

export async function generateMetadata() {
  const projectResponse = await getProjectDetails()
  const projectDetails = await projectResponse.json()

  return {
    title: projectDetails.name,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
