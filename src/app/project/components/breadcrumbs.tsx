'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import Workspace from '@/types/workspace.interface'

interface Props {
  workspace: Workspace
}

export default function BreadcrumbsHeader({ workspace }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          {/* <BreadcrumbLink asChild> */}
          {/* <Link href={`/project/workspace/${workspaceId}`}> */}
          {workspace?.name}
          {/* </Link> */}
          {/* </BreadcrumbLink> */}
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Inbox</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
