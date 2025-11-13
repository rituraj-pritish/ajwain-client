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
import AddAndRenameWorkspace from './add-and-rename-workspace'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DeleteWorkspaceAlertDialog from './delete-workspace-alert-dialog'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import AddAndRenameBoard from './add-and-rename-board'
import DeleteBoardAlertDialog from './delete-board-alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  isLoading: boolean
  workspaces: Workspace[]
  refreshData: () => void
}

export type SubItem = Omit<Item, 'items'>

export interface Item {
  id: number
  name: string
  url: string
  isActive: boolean
  items: Omit<Item, 'items'>[]
}

export enum OPEN_TYPES {
  ADD_WORKSPACE = 'ADD_WORKSPACE',
  RENAME_WORKSPACE = 'RENAME_WORKSPACE',
  DELETE_WORKSPACE = 'DELTE_WORKSPACE',
  ADD_BOARD = 'ADD_BOARD',
  RENAME_BOARD = 'RENAME_BOARD',
  DELETE_BOARD = 'DELTE_BOARD',
}

export default function NavWorkspaces({
  isLoading,
  workspaces,
  refreshData,
}: Props) {
  const router = useRouter()
  const [openType, setOpenType] = useState<OPEN_TYPES | null>(null)
  const [selectedWorkspace, setSelectedWorkspace] = useState<Item | null>(null)
  const [selectedBoard, setSelectedBoard] = useState<SubItem | null>(null)

  const pathName = usePathname()

  const items: Item[] = workspaces?.map(({ id, name, boards }) => ({
    id,
    name,
    url: `/project/workspace/${id}`,
    isActive: pathName.includes(`/project/workspace/${id}`),
    items: boards.map((board) => ({
      id: board.id,
      name: board.name,
      url: `/project/workspace/${id}/board/${board.id}`,
      isActive: pathName === `/project/workspace/${id}/board/${board.id}`,
    })),
  }))

  if (isLoading)
    return (
      <SidebarGroup className='gap-2'>
        <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
      </SidebarGroup>
    )

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
        <SidebarGroupAction
          onClick={() => setOpenType(OPEN_TYPES.ADD_WORKSPACE)}
          data-testid='add-workspace-button'
        >
          <Tooltip>
            <TooltipTrigger asChild className='cursor-pointer'>
              <Plus size={14} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Workspace</p>
            </TooltipContent>
          </Tooltip>
        </SidebarGroupAction>
        <SidebarMenu>
          {items?.map((item) => (
            <Collapsible
              className='group/collapsible'
              key={item.id}
              asChild
              defaultOpen={item.isActive}
              data-testid='nav-workspace-collapsible'
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  isActive={item.isActive}
                >
                  <span>{item.name}</span>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className='p-0.5 mr-5.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-950'
                    data-testid='workspace-menu-trigger'
                  >
                    <SidebarMenuAction>
                      <MoreHorizontal />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='right' align='start'>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedWorkspace(item)
                        setOpenType(OPEN_TYPES.ADD_BOARD)
                      }}
                      data-testid='add-board-button'
                    >
                      <span>Add Board</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedWorkspace(item)
                        setOpenType(OPEN_TYPES.RENAME_WORKSPACE)
                      }}
                    >
                      <span>Rename Workspace</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant='destructive'
                      onClick={() => {
                        setSelectedWorkspace(item)
                        setOpenType(OPEN_TYPES.DELETE_WORKSPACE)
                      }}
                    >
                      <span>Delete Workspace</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {item.items?.length ? (
                  <>
                    <SidebarMenuAction
                      asChild
                      data-testid='nav-workspace-collapsible-trigger'
                    >
                      <CollapsibleTrigger>
                        <ChevronRight className='group-data-[state=open]/collapsible:rotate-90' />
                        <span className='sr-only'>Toggle</span>
                      </CollapsibleTrigger>
                    </SidebarMenuAction>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                            >
                              <Link
                                href={subItem.url}
                                data-testid='nav-board-link'
                              >
                                <span
                                  className={
                                    subItem.isActive ? 'font-semibold' : ''
                                  }
                                >
                                  {subItem.name}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                className='p-0.5 top-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-950'
                              >
                                <SidebarMenuAction>
                                  <MoreHorizontal />
                                </SidebarMenuAction>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side='right' align='start'>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedWorkspace(item)
                                    setSelectedBoard(subItem)
                                    setOpenType(OPEN_TYPES.RENAME_BOARD)
                                  }}
                                >
                                  <span>Rename Board</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  variant='destructive'
                                  onClick={() => {
                                    setSelectedWorkspace(item)
                                    setSelectedBoard(subItem)
                                    setOpenType(OPEN_TYPES.DELETE_BOARD)
                                  }}
                                >
                                  <span>Delete Board</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

      <AddAndRenameWorkspace
        workspace={selectedWorkspace}
        isOpen={
          !!(
            openType &&
            [OPEN_TYPES.ADD_WORKSPACE, OPEN_TYPES.RENAME_WORKSPACE].includes(
              openType,
            )
          )
        }
        onOpenChange={() => {
          setOpenType(null)
          setSelectedWorkspace(null)
        }}
        refreshData={() => {
          router.refresh()
          refreshData()
        }}
      />
      <DeleteWorkspaceAlertDialog
        workspace={selectedWorkspace}
        isOpen={openType === OPEN_TYPES.DELETE_WORKSPACE}
        onOpenChange={() => {
          setOpenType(null)
          setSelectedWorkspace(null)
        }}
        refreshData={refreshData}
      />

      <AddAndRenameBoard
        workspace={selectedWorkspace}
        board={selectedBoard}
        isOpen={
          !!(
            openType &&
            [OPEN_TYPES.ADD_BOARD, OPEN_TYPES.RENAME_BOARD].includes(openType)
          )
        }
        onOpenChange={() => {
          setOpenType(null)
          setSelectedWorkspace(null)
          setSelectedBoard(null)
        }}
        refreshData={() => {
          router.refresh()
          refreshData()
        }}
      />
      <DeleteBoardAlertDialog
        board={selectedBoard}
        isOpen={openType === OPEN_TYPES.DELETE_BOARD}
        onOpenChange={() => {
          setOpenType(null)
          setSelectedBoard(null)
        }}
        refreshData={refreshData}
      />
    </>
  )
}
