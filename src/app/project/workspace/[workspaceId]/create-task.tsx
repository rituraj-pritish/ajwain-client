'use client'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
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
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { createTask } from './actions'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import UserSelector from './user-selector'

const schema = z.object({
  title: z.string().min(1, 'Please enter task title'),
  description: z.string().optional(),
  date: z.date().optional(),
  memberIds: z.array(z.number()).optional(),
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

  const handleSubmit = async (values) => {
    try {
      const response = await createTask({
        ...values,
        workspaceId: Number(workspaceId),
        date: values.date ? new Date(values.date).toISOString() : null,
        memberIds: values.memberIds.join(','),
      })
      const data = await response.json()

      if (!response.ok && data.error) throw data
      router.refresh()
      setIsOpen(false)
      form.reset()
      toast.success('Task created successfully.')
    } catch (error) {
      console.log('err', error)
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
        <Button>Create Task</Button>
      </SheetTrigger>
      <form id="create-task">
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Create Task</SheetTitle>
          </SheetHeader>
          <FieldGroup className="px-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input {...field} placeholder="Enter task title" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
            <span className="flex gap-4">
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        {...field}
                        className="h-full"
                        placeholder="Enter task description"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )
                }}
              />
              <span className="w-70">
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel>Date</FieldLabel>
                        <Calendar
                          {...field}
                          mode="single"
                          defaultMonth={new Date()}
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout={'dropdown'}
                          className="rounded-lg border shadow-sm"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )
                  }}
                />
              </span>
            </span>
            <Controller
              name="memberIds"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Assign Members</FieldLabel>
                    <UserSelector
                      onChange={(users) =>
                        field.onChange(users.map(({ id }) => id))
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
          <SheetFooter className="flex-row justify-end">
            <Button
              type="submit"
              id="create-task"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={form.formState.isSubmitting}
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
