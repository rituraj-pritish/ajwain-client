'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Controller, useForm } from 'react-hook-form';
import { signUp } from './actions';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../logo';
import ThemeToggle from '../theme-toggle';

const schema = z.object({
  projectName: z.string().min(1, 'Please enter project name'),
  name: z.string().min(1, 'Please enter user name'),
  email: z.email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      projectName: "",
      name: "",
      email: "",
      password: ""
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await signUp(values);
      toast.success(`${values.projectName} has been created.`)
      router.replace('/dashboard')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='relative mt-16'>
      <Logo/>
      <span className='absolute right-[calc(50vw-182px)] top-0'>
        <ThemeToggle/>
      </span>
    <form id='sign-up-form' onSubmit={form.handleSubmit(handleSubmit)}>
      <Card className='w-md mx-auto px-4 py-8 mt-6'>
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
                      type='password'
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
          <FieldDescription className="px-6 pt-6 text-center">
              Already have an account? <Link href="/signin">Sign in</Link>
          </FieldDescription>
        </CardFooter>
      </Card>
    </form>
    </div>
  )
}
