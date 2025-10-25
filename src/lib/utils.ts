import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(str: string) {
  return str.split(' ').slice(0, 1).map(item => item.charAt(0)).join('')
}