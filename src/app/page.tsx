import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Link href='/signup'>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
