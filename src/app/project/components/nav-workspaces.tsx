import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Workspace from '@/types/workspace.interface'
import { ChevronRight, MoreHorizontal, Plus } from 'lucide-react'
import AddWorkspace from './add-workspace'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DeleteWorkspaceAlertDialog from './delete-workspace-alert-dialog'
import './nav-workspaces.css'
import { usePathname } from 'next/navigation'

interface Props {
  workspaces: Workspace[]
}

export default function NavWorkspaces({ workspaces }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)

  const pathName = usePathname()

  const items = workspaces?.map(({ id, name }) => ({
    id,
    title: name,
    url: `project/workspace/${id}`,
    items: [],
  }))

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
        <SidebarGroupAction onClick={() => setIsSheetOpen(true)}>
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Plus size={14} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Workspace</p>
            </TooltipContent>
          </Tooltip>
        </SidebarGroupAction>
        <SidebarMenu>
          {items?.map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem className="menu-item">
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="menu-trigger">
                    <SidebarMenuAction>
                      <MoreHorizontal />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedWorkspace(item)
                        setIsAlertOpen(true)
                      }}
                    >
                      <span>Delete Workspace</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <AddWorkspace isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
      <DeleteWorkspaceAlertDialog
        workspace={selectedWorkspace}
        isOpen={isAlertOpen}
        onOpenChange={() => {
          setIsAlertOpen(false)
          setSelectedWorkspace(null)
        }}
      />
    </>
  )
}
