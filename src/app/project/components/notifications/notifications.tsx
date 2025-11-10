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

const getNotifications = async (setState: (data: Notification[]) => void) => {
  const res = await fetch('/api/notifications', {
    method: 'GET',
    credentials: 'include',
  })
  const data = await res.json()
  setState(data)
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    getNotifications(setNotifications)

    const eventSource = new EventSource('/api/notifications/stream')

    eventSource.onmessage = ({ data }) => {
      setNotifications((prevData) => [data, ...prevData])
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
          <TabsContent value='unread'>
            <NotificationItems items={unreadNotifications} />
          </TabsContent>
          <TabsContent value='archived'>
            <NotificationItems items={archivedNotifications} />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
