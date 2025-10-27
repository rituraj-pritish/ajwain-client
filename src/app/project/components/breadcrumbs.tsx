'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useEffect, useState } from 'react'
import { getWorkspace } from '../actions/clientActions'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function BreadcrumbsHeader() {
  const { workspaceId } = useParams()
  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getDetails = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await getWorkspace({
        id,
      })
      const details = await response.json()
      setDetails(details)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDetails(workspaceId)
  }, [workspaceId])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href={`/project/workspace/${workspaceId}`}>
              {details?.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Inbox</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
