import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import MemberSelector from './member-selector'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Controller, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { schema as createSchema } from './add-task'
import { useEffect, useState } from 'react'
import { getUsers } from './actions'
import { Badge } from '@/components/ui/badge'
import { TaskStatus } from '@/types/task.interface'
import dayjs from 'dayjs'
import { schema as updateSchema } from './task'

interface Props {
  form: UseFormReturn<
    z.infer<typeof createSchema> | z.infer<typeof updateSchema>
  >
}

export default function TaskFormFields({ form }: Props) {
  const [details, setDetails] = useState({
    users: [],
  })

  const getUsersDetails = async () => {
    const res = await getUsers()
    const data = await res.json()

    setDetails({
      users: data,
    })
  }

  useEffect(() => {
    getUsersDetails()
  }, [])

  return (
    <ScrollArea className='h-[60vh] max-h-[70vh]'>
      <FieldGroup className='px-4 grid grid-cols-24'>
        <Controller
          name='title'
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field className='col-span-24 md:col-span-15 lg:col-span-17 xl:col-span-18'>
                <FieldLabel>Title</FieldLabel>
                <Input
                  {...field}
                  autoFocus
                  placeholder='Enter task title'
                  data-testid='title'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
        <Controller
          name='memberIds'
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field className='col-span-12 order-4 md:order-none md:col-span-9 lg:col-span-7 xl:col-span-6 w-full'>
                <FieldLabel>Assign Members</FieldLabel>
                <MemberSelector
                  users={details.users}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
        <Controller
          name='description'
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field className='h-60 md:h-[unset] col-span-24 md:col-span-15 lg:col-span-17 xl:col-span-18'>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...field}
                  className='h-full'
                  placeholder='Enter task description'
                  data-testid='description'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
        <Controller
          name='date'
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field className='col-span-12 md:col-span-9 lg:col-span-7 xl:col-span-6'>
                <FieldLabel className='flex justify-between'>
                  Date
                  {(() => {
                    const values = form.getValues()
                    const status = 'status' in values && values.status
                    const isOverdue = dayjs(field.value).isBefore(
                      new Date(),
                      'day',
                    )

                    if (isOverdue && status !== TaskStatus.COMPLETED) {
                      return <Badge variant='destructive'>Overdue</Badge>
                    }

                    return null
                  })()}
                </FieldLabel>
                <Calendar
                  className='rounded-lg border shadow-sm'
                  {...field}
                  mode='single'
                  disabled={{
                    before: new Date(),
                  }}
                  defaultMonth={new Date()}
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString())}
                  captionLayout={'dropdown'}
                  data-testid='date'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
      </FieldGroup>
    </ScrollArea>
  )
}
