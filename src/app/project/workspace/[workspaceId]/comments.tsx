import { Button } from '@/components/ui/button'
import {
  Mention,
  MentionContent,
  MentionInput,
  MentionItem,
} from '@/components/ui/mention'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { createComment, getComments } from './actions'
import { useSearchParams } from 'next/navigation'
import Comment from './comment'
import { Spinner } from '@/components/ui/spinner'
import useGlobalData from '../../useGlobalData'
import CommentType from '@/types/comment.interface'
import { Skeleton } from '@/components/ui/skeleton'

export default function Comments() {
  const { users } = useGlobalData()
  const params = useSearchParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState<CommentType[]>([])
  const [value, setValue] = useState('')

  const taskId = params.get('taskId')

  const getDetails = async () => {
    setIsLoading(true)
    try {
      const res = await getComments(taskId!)
      const data = await res.json()
      setComments(data)
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  const handleComment = async () => {
    setIsSubmitting(true)
    try {
      const res = await createComment({
        taskId: Number(taskId),
        content: value,
      })
      const data = await res.json()
      setValue('')

      setComments((prevData) => [...prevData, data])
    } catch {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ScrollArea className='h-[calc(60vh-96px)] max-h-[70vh]'>
        {isLoading && (
          <span className='p-4 flex flex-col gap-4'>
            <span className='flex flex-col gap-2'>
              <Skeleton className='h-8 w-120' />
              <Skeleton className='h-16 w-full' />
            </span>
            <span className='flex flex-col gap-2'>
              <Skeleton className='h-8 w-120' />
              <Skeleton className='h-16 w-full' />
            </span>
          </span>
        )}

        {comments.length === 0 && !isLoading && (
          <p className='p-4 mt-8 text-center text-secondary-foreground'>
            No comments yet
          </p>
        )}

        <div className='p-4 flex flex-col gap-4'>
          {comments.map((comment) => (
            <Comment key={comment.id.toString()} {...comment} />
          ))}
        </div>
      </ScrollArea>
      <span className='flex p-4 gap-4 items-end'>
        <Mention
          className='grow-1'
          inputValue={value}
          onInputValueChange={setValue}
        >
          <MentionInput placeholder='Type @ to mention someone...' asChild>
            <Textarea value={value} />
          </MentionInput>
          <MentionContent>
            {users.map((user) => (
              <MentionItem key={user.id} value={user.name}>
                <span className='text-sm'>{user.name}</span>
                <span className='text-muted-foreground text-xs'>
                  {user.email}
                </span>
              </MentionItem>
            ))}
          </MentionContent>
        </Mention>
        <Button disabled={isSubmitting || !value} onClick={handleComment}>
          {isSubmitting && <Spinner />}
          Comment
        </Button>
      </span>
    </>
  )
}
