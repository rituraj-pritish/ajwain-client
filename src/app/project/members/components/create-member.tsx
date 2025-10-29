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
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createMember } from '../clientActions'

interface Props {}

export const schema = z.object({
  name: z.string().min(4, 'Name must me greater than 3 characters long'),
  email: z.email('Please enter valid email'),
  password: z.string().min(6, 'Minimum 6 characters long'),
  role: z.string(),
})

export default function CreateMember(props: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'MEMBER',
    },
  })

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await createMember(values)
      const data = await response.json()

      if (!response.ok && data.error) throw data
      router.refresh()
      setIsOpen(false)
      form.reset()
      toast.success(`${values.name} member created successfully.`)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleOpenChange = (state: boolean) => {
    if (!state) form.reset()
    setIsOpen(state)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Create Member</Button>
      </SheetTrigger>
      <form id="create-member">
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Create Member</SheetTitle>
          </SheetHeader>
          <FieldGroup className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input {...field} placeholder="Enter member name" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input {...field} placeholder="Enter member email" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input {...field} placeholder="Enter member password" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => {
                return (
                  <Field>
                    <FieldLabel>Role</FieldLabel>
                    <Select defaultValue="MEMBER">
                      <SelectTrigger>
                        <SelectValue {...field} placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PROJECT_ADMIN">
                          PROJECT ADMIN
                        </SelectItem>
                        <SelectItem value="MEMBER">MEMBER</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )
              }}
            />
          </FieldGroup>
          <SheetFooter className="flex-row justify-end">
            <Button
              id="create-member"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {form.formState.isSubmitting && <Spinner />}
              Create Member
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
