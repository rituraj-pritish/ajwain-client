import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import useGlobalData from '../../useGlobalData'
import { getInitials } from '@/lib/utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentType from '@/types/comment.interface'

dayjs.extend(relativeTime)

export default function Comment({ userId, content, createdAt }: CommentType) {
  const { users } = useGlobalData()

  const user = users.find(({ id }) => id === userId)!
  return (
    <div>
      <span className='flex gap-2 items-center mb-2'>
        <Avatar className='h-8 w-6=8 rounded-full'>
          <AvatarFallback className='text-sm rounded-lg'>
            {user.name && getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className='text-secondary-foreground'>{user.name}</span>
        <span className='text-secondary-foreground text-xs ml-10'>
          {dayjs(createdAt).fromNow()}
        </span>
      </span>

      <span className='ml-4'>{content}</span>
    </div>
  )
}
