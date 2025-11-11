import {
  Item,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'
import Notification from '@/types/notification.interface'
import Link from 'next/link'
import React from 'react'

export default function NotificationItems({
  items,
}: {
  items: Notification[]
}) {
  if (items.length === 0)
    return (
      <p className='h-full flex items-center justify-center'>
        No notifications yet
      </p>
    )

  return (
    <ItemGroup>
      {items.map((item, index) => (
        <React.Fragment key={item.id.toString()}>
          <Link
            href={`/project/workspace/${item.workspaceId}/board/${item.boardId}?taskId=${item.taskId}`}
          >
            <Item className='flex flex-col items-start px-4 py-2 gap-1 hover:bg-gray-100 dark:hover:bg-gray-950'>
              <ItemTitle>Added to Task</ItemTitle>
              <ItemDescription>
                You were <b>added</b> to <b>{item.taskTitle}</b> in
                <br />
                {item.boardName} -&gt; {item.workspaceName}
              </ItemDescription>
            </Item>
          </Link>
          {index !== items.length - 1 && <ItemSeparator />}
        </React.Fragment>
      ))}
    </ItemGroup>
  )
}
