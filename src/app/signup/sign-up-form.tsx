'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Controller, useForm } from 'react-hook-form';
import { signUp } from './actions';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';

const schema = z.object({
  projectName: z.string().min(1, 'Please enter project name'),
  name: z.string().min(1, 'Please enter user name'),
  email: z.email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

export default function SignUpForm() {
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      projectName: "",
      name: "",
      email: "",
      password: ""
    },
  })

  const handleSubmit = async (values) => {
    await signUp(values)
  }

  return (
    <form id='sign-up-form' onSubmit={form.handleSubmit(handleSubmit)}>
      <Card className='w-md mx-auto px-4 py-8 mt-16'>
        <CardHeader>
          <CardTitle className='mx-auto'>
            Get Started With Your Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name='projectName'
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>
                      Project Name
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder='Enter project name'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
            <Separator className='border-1'/>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder='Enter user name'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder='Enter user email'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder='Enter user password'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className='flex-col'>
          <Button className='w-full' type='submit' id='sign-up-form' disabled={!form.formState.isValid || form.formState.isSubmitting} >
            {form.formState.isSubmitting && <Spinner/>}
            Create Project
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
