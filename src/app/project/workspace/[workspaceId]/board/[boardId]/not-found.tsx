import Header from '@/app/project/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Header></Header>
      <div className='container p-4 mx-auto text-center'>
        <p className='mb-2'>The resource you are looking for does not exist.</p>
        <Link href='/project'>
          <Button>Go to Home</Button>
        </Link>
      </div>
    </>
  )
}
