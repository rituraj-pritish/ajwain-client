import ThemeToggle from './components/theme-toggle'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Page() {
  return (
    <div>
      <ThemeToggle />
      <Link href="/signup">
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}
