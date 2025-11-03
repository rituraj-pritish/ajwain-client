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

interface BoardProp {
  workspace: never
  board: Board
}

interface WorkspaceProp {
  workspace: Workspace
  board: never
}

export default function BreadcrumbsHeader(props: BoardProp | WorkspaceProp) {
  if ('workspace' in props) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block" data-testid="breadcrumb">
            {props.workspace.name}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block" data-testid="breadcrumb">
          {props?.board?.workspace?.name}
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{props?.board?.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
