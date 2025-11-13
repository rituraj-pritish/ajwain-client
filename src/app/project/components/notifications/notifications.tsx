'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import NotificationItems from './notification-items'
import Notification, {
  NotificationStatus,
} from '@/types/notification.interface'
import { Skeleton } from '@/components/ui/skeleton'

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getNotifications = async () => {
    const res = await fetch('/api/notifications', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()

    setNotifications(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getNotifications()

    const eventSource = new EventSource('/api/notifications/stream')

    eventSource.onmessage = ({ data }) => {
      setNotifications((prevData) => [JSON.parse(data), ...prevData])
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const unreadNotifications = notifications.filter(
    ({ status }) => status === NotificationStatus.UNREAD,
  )
  const archivedNotifications = notifications.filter(
    ({ status }) => status === NotificationStatus.ARCHIVED,
  )

  if (isLoading) return <Skeleton className='h-9 w-9' />

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='relative' variant='outline' size='icon'>
          {unreadNotifications.length > 0 && (
            <Badge className='absolute -top-2 -left-2'>
              {unreadNotifications.length}
            </Badge>
          )}
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='h-160 w-100 -translate-x-4 p-0'>
        <Tabs className='h-full'>
          <span className='p-4 pb-0'>
            <TabsList>
              <TabsTrigger value='unread'>Unread</TabsTrigger>
              <TabsTrigger value='archived'>Archived</TabsTrigger>
            </TabsList>
          </span>
          <TabsContent className='overflow-auto' value='unread'>
            <NotificationItems items={unreadNotifications} />
          </TabsContent>
          <TabsContent className='overflow-auto' value='archived'>
            <NotificationItems items={archivedNotifications} />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
