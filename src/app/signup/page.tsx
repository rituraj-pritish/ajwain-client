import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpForm from './sign-up-form';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <Card className='w-md mx-auto px-4 py-8 mt-16'>
      <CardHeader>
        <CardTitle className='mx-auto'>
          Get Started With Your Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className='flex-col'>
        <Button type='submit' className='w-full'>Create Project</Button>
      </CardFooter>
    </Card>
  )
}