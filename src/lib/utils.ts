import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(str: string) {
  return str
    .split(' ')
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join('')
}

export function snakeCaseToString(snakeCaseString: string) {
  const spacedString = snakeCaseString.replace(/_/g, ' ')

  return spacedString
}
