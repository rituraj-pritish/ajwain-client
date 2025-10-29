'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { getTask, updateTask } from './actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import TaskFormFields from './task-form-fields'
import TaskType from '@/types/task.interface'

export const schema = z.object({
  title: z.string().min(1, 'Please enter task title'),
  description: z.string().optional(),
  date: z.string().optional(),
  memberIds: z.array(z.object()),
})

export default function Task() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [details, setDetails] = useState<TaskType | object>({})

  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      memberIds: [],
    },
  })

  const taskId = searchParams.get('taskId')

  const getDetails = async (id: string) => {
    const res = await getTask({ id })
    const data = await res.json()

    form.reset({
      ...data,
      memberIds: data.members,
    })
    setDetails(data)
  }

  useEffect(() => {
    setIsOpen(!!taskId)
    if (taskId) getDetails(taskId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId])

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await updateTask({
        id: Number(taskId),
        ...values,
        date: values.date,
        memberIds: values.memberIds.map(({ id }) => id).join(','),
      })
      const data = await response.json()

      if (!response.ok && data.error) throw data
      router.refresh()
      form.reset({ ...data, memberIds: data.members })
      toast.success('Task updated successfully.')
    } catch (error) {
      console.log('err', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleOpenChange = (state: boolean) => {
    if (!state) {
      form.reset()
      router.replace(pathName)
      setDetails({})
    }
    setIsOpen(state)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <form id="create-task">
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>{details?.title}</SheetTitle>
          </SheetHeader>
          <TaskFormFields form={form} />
          <SheetFooter className="flex-row justify-end">
            <Button
              type="submit"
              id="create-task"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting && <Spinner />}
              Update Task
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  )
}
