'use client'

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Controller, useForm } from 'react-hook-form';

export default function SignUpForm() {
  const form = useForm({
    defaultValues: {
      projectName: "",
      name: "",
      email: "",
      password: ""
    },
  })

  return (
    <form>
      <FieldGroup>
        <Controller
          name='projectName'
          control={form.control}
          render={({ field }) => {
            return (
              <Field>
                <FieldLabel>
                  Project Name
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='Enter project name'
                />
              </Field>
            )
          }}
        />
        <Separator className='border-1'/>
        <Controller
          name='name'
          control={form.control}
          render={({ field }) => {
            return (
              <Field>
                <FieldLabel>
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='Enter user name'
                />
              </Field>
            )
          }}
        />
        <Controller
          name='email'
          control={form.control}
          render={({ field }) => {
            return (
              <Field>
                <FieldLabel>
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='Enter user email'
                />
              </Field>
            )
          }}
        />
        <Controller
          name='password'
          control={form.control}
          render={({ field }) => {
            return (
              <Field>
                <FieldLabel>
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  placeholder='Enter user password'
                />
              </Field>
            )
          }}
        />
      </FieldGroup>
    </form>
  )
}
