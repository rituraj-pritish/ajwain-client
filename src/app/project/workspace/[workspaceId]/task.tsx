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
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { getTask, updateTask } from './actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import TaskFormFields from './task-form-fields'
import TaskType, { TaskStatus } from '@/types/task.interface'
import ChangeStatus from './change-status'
import { Field } from '@/components/ui/field'

export const schema = z.object({
  title: z.string().min(1, 'Please enter task title'),
  description: z.string().optional(),
  date: z.string().optional().nullable(),
  memberIds: z.any(),
  status: z.enum(TaskStatus),
})

export default function Task() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()

  const [details, setDetails] = useState<TaskType | null>(null)

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
    if (taskId) getDetails(taskId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId])

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await updateTask({
        id: Number(taskId),
        ...values,
        date: 'date' in values ? values.date : undefined,
        memberIds: values.memberIds
          .map(({ id }: { id: string }) => id)
          .join(','),
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
      setDetails(null)
    }
  }

  if (!taskId) return null

  return (
    <Sheet open={!!taskId} onOpenChange={handleOpenChange}>
      <form id='create-task'>
        <SheetContent side='bottom'>
          <SheetHeader className='flex-row justify-between'>
            <SheetTitle>{details?.title}</SheetTitle>
            <span>
              <Controller
                name='status'
                control={form.control}
                render={({ field }) => {
                  return (
                    <Field className='mr-8'>
                      <ChangeStatus {...field} />
                    </Field>
                  )
                }}
              />
            </span>
          </SheetHeader>
          {/* @ts-expect-error lack of solution */}
          <TaskFormFields form={form} />
          <SheetFooter className='flex-row justify-end'>
            <Button
              type='submit'
              id='create-task'
              onClick={form.handleSubmit(handleSubmit)}
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting && <Spinner />}
              Update Task
            </Button>
            <SheetClose asChild>
              <Button variant='outline'>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  )
}
