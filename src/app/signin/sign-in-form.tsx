'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { signIn } from './actions';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../logo';

const schema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

export default function SignInForm() {
  const router = useRouter();
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await signIn(values);
      toast.success('Sign In successfull')
      router.replace('/dashboard')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className='mt-16'>
      <Logo />
      <form id='sign-in-form' onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className='w-md mx-auto px-4 py-8 mt-6'>
          <CardHeader>
            <CardTitle className='mx-auto'>
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
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
            <Button className='w-full' type='submit' id='sign-in-form' disabled={!form.formState.isValid || form.formState.isSubmitting} >
              {form.formState.isSubmitting && <Spinner/>}
              Sign In
            </Button>
            <FieldDescription className="px-6 pt-6 text-center">
              Start a new project <Link href="/signup">Sign up</Link>
            </FieldDescription>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
