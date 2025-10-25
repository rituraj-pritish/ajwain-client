import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './app-sidebar';
import { getProjectDetails, getUserDetails } from './actions/serverActions';

export default async function Page() {
  const projectResponse = await getProjectDetails();
  const projectDetails = await projectResponse.json();

  const userResponse = await getUserDetails();
  const userDetails = await userResponse.json();

  return (
    <SidebarProvider>
      <AppSidebar project={projectDetails} user={userDetails} />
      <SidebarInset>
        
      </SidebarInset>
    </SidebarProvider>
  )
}