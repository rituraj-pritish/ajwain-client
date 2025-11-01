import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn, snakeCaseToString, toSentenceCase } from '@/lib/utils'
import { TaskStatus } from '@/types/task.interface'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function ChangeStatus({ value, onChange }: Props) {
  const statusOptions = Object.values(TaskStatus)

  const selectedOptionIndex = statusOptions.findIndex((val) => val === value)
  const nextOption = statusOptions[selectedOptionIndex + 1]
  const prevOption = statusOptions[selectedOptionIndex - 1]

  const isNextDisabled = !nextOption
  const isPrevDisabled = !prevOption

  const handleNext = () => onChange(nextOption)
  const handlePrev = () => onChange(prevOption)

  function getClassName() {
    switch (value) {
      case 'PENDING':
        return 'border-gray-500 text-gray-500 dark:border-gray-300 dark:text-gray-300'
      case 'IN_PROGRESS':
        return 'border-orange-500 text-orange-500 dark:border-orange-300 dark:text-orange-300'
      case 'COMPLETED':
        return 'border-emerald-500 text-emerald-500 dark:border-emerald-300 dark:text-emerald-300'
      default:
        return ''
    }
  }

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild disabled={isPrevDisabled}>
          <Button
            variant="outline"
            disabled={isPrevDisabled}
            className='border-r-0'
            onClick={handlePrev}
          >
            <ArrowLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{prevOption && toSentenceCase(snakeCaseToString(prevOption))}</p>
        </TooltipContent>
      </Tooltip>
      <Separator orientation="vertical" />
      <Button
        variant="outline"
        className={cn('pointer-events-none !border-l w-[110px]', getClassName())}
      >
        {value && toSentenceCase(snakeCaseToString(value))}
      </Button>
      <Separator orientation="vertical" />
      <Tooltip>
        <TooltipTrigger asChild disabled={isNextDisabled}>
          <Button
            variant="outline"
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            <ArrowRight />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{nextOption && toSentenceCase(snakeCaseToString(nextOption))}</p>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  )
}
