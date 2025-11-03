'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Board from '@/types/board.interface'
import Workspace from '@/types/workspace.interface'

interface Props {
  workspace?: Workspace
  board?: Board
}

export default function BreadcrumbsHeader({ board, workspace }: Props) {
  if (workspace) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className='hidden md:block' data-testid='breadcrumb'>
            {workspace.name}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='hidden md:block' data-testid='breadcrumb'>
          {board?.workspace?.name}
        </BreadcrumbItem>
        <BreadcrumbSeparator className='hidden md:block' />
        <BreadcrumbItem>
          <BreadcrumbPage>{board?.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
