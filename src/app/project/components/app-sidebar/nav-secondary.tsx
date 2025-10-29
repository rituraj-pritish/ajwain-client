import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavSecondary() {
  const pathName = usePathname()
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key="members">
            <SidebarMenuButton asChild isActive={pathName === '/project/members'}>
              <Link href="/project/members">
                <Users />
                <span>Members</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
