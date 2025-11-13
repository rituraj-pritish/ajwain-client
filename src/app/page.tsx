import ThemeToggle from './components/theme-toggle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Logo from './components/logo'
import { Separator } from '@/components/ui/separator'
import FeatureImages from './feature-images'

export default async function Page() {
  return (
    <section className='relative flex flex-col'>
      <header className='fixed top-0 left-0 right-0 w-full flex items-center justify-between p-4 max-w-5xl mx-auto backdrop-blur-sm z-50'>
        <span>
          <Logo />
        </span>
        <span className='flex items-center gap-4'>
          <Link href='/signin'>
            <Button variant='outline'>Sign In</Button>
          </Link>
          <Link href='/signup'>
            <Button>Get Started</Button>
          </Link>
          <Separator
            orientation='vertical'
            className='data-[orientation=vertical]:h-4'
          />
          <ThemeToggle />
        </span>
      </header>

      <div className='grow flex flex-col items-center justify-center mx-auto my-40 px-4'>
        <h1 className='text-6xl font-medium leading-[80px] w-fit text-center'>
          One tool to{' '}
          <span className='underline underline-offset-8'>manage</span>
          <br /> project and your team
        </h1>
        <Link href='/signup'>
          <Button size='lg' className='w-60 mt-6 font-bold'>
            Start for Free
          </Button>
        </Link>
      </div>

      <div className='container p-4 max-w-5xl mx-auto'>
        <div className='border rounded'>
          <FeatureImages />
        </div>
      </div>

      <p className='p-4 text-center text-secondary-foreground'>
        &copy; {new Date().getFullYear()} AJWAIN
      </p>
    </section>
  )
}
