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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Comments from './comments'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

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
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    const res = await getTask({ id })
    const data = await res.json()

    form.reset({
      ...data,
      memberIds: data.members,
    })
    setDetails(data)
    setIsLoading(false)
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
      window.history.replaceState(null, '', pathName)
      setDetails(null)
    }
  }

  if (!taskId) return null

  return (
    <Sheet open={!!taskId} onOpenChange={handleOpenChange}>
      <Tabs defaultValue='task'>
        <form id='update-task'>
          <SheetContent side='bottom'>
            <SheetHeader className='flex-row justify-between'>
              <SheetTitle>
                {isLoading ? <Skeleton className='h-8 w-40' /> : details?.title}
              </SheetTitle>
              <span>
                {isLoading ? (
                  <Skeleton className='h-8 w-40 mr-8' />
                ) : (
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
                )}
              </span>
            </SheetHeader>

            <TabsContent value='task'>
              <ScrollArea className='h-[60vh] max-h-[70vh]'>
                {isLoading ? (
                  <span className='px-4 grid grid-cols-24 gap-8'>
                    <Skeleton className='h-12 col-span-24 md:col-span-15 lg:col-span-17 xl:col-span-18' />
                    <Skeleton className='col-span-12 order-4 md:order-none md:col-span-9 lg:col-span-7 xl:col-span-6 w-full' />
                    <Skeleton className='h-60 md:h-[unset] col-span-24 md:col-span-15 lg:col-span-17 xl:col-span-18' />
                    <Skeleton className='h-100 col-span-12 md:col-span-9 lg:col-span-7 xl:col-span-6' />
                  </span>
                ) : (
                  //  @ts-expect-error lack of solution
                  <TaskFormFields form={form} />
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value='comments'>
              <Comments />
            </TabsContent>

            <SheetFooter className='flex-row justify-between'>
              {isLoading ? (
                <Skeleton className='h-8 w-40' />
              ) : (
                <TabsList>
                  <TabsTrigger value='task'>Task</TabsTrigger>
                  <TabsTrigger value='comments'>Comments</TabsTrigger>
                </TabsList>
              )}
              <span className='flex gap-4'>
                <Button
                  type='submit'
                  id='update-task'
                  onClick={form.handleSubmit(handleSubmit)}
                  disabled={
                    form.formState.isSubmitting || !form.formState.isDirty
                  }
                >
                  {form.formState.isSubmitting && <Spinner />}
                  Update Task
                </Button>
                <SheetClose asChild>
                  <Button variant='outline'>Close</Button>
                </SheetClose>
              </span>
            </SheetFooter>
          </SheetContent>
        </form>
      </Tabs>
    </Sheet>
  )
}
