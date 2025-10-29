'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { createTask } from './actions'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import TaskFormFields from './task-form-fields'

export const schema = z.object({
  title: z.string().min(1, 'Please enter task title'),
  description: z.string().optional(),
  date: z.string().optional(),
  memberIds: z.array(z.object()),
})

export default function CreateTask() {
  const { workspaceId } = useParams()
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      memberIds: [],
    },
  })

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await createTask({
        ...values,
        workspaceId: Number(workspaceId),
        date: values.date,
        memberIds: values.memberIds.map(({ id }) => id).join(','),
      })
      const data = await response.json()

      if (!response.ok && data.error) throw data
      router.refresh()
      setIsOpen(false)
      form.reset()
      toast.success('Task created successfully.')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleOpenChange = (state: boolean) => {
    if (!state) form.reset()
    setIsOpen(state)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button data-testid="create-task-button">Create Task</Button>
      </SheetTrigger>
      <form id="create-task">
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Create Task</SheetTitle>
          </SheetHeader>
          <TaskFormFields form={form} />
          <SheetFooter className="flex-row justify-end">
            <Button
              type="submit"
              id="create-task"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={form.formState.isSubmitting}
              data-testid="create-task-form-button"
            >
              {form.formState.isSubmitting && <Spinner />}
              Create Task
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  )
}
