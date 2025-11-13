'use client'

import tasksLight from './public/tasks-light.png'
import tasksDark from './public/tasks-dark.png'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function FeatureImages() {
  const { theme } = useTheme()

  return <Image src={theme === 'light' ? tasksLight : tasksDark} alt='' />
}
