'use client'
import { Button } from '@/components/ui/button';
import useTheme, { Theme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      {theme === Theme.DARK ? <Sun/> : <Moon/>}
    </Button>
  )
}