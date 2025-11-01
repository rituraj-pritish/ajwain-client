import Task, { TaskStatus } from '@/types/task.interface'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { deleteTask, updateTaskStatus } from './actions'
import { snakeCaseToString, toSentenceCase } from '@/lib/utils'

export default function TaskActions({ task }: { task: Task }) {
  const router = useRouter()

  const statusOptions = Object.values(TaskStatus)

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    try {
      await deleteTask({ id: task.id })
      router.refresh()
      toast.success('Deleted task')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleUpdate = async (status: TaskStatus) => {
    try {
      await updateTaskStatus({ id: task.id, status })
      router.refresh()
      toast.success('Updated task status')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            navigator.clipboard
              .writeText(task.id.toString())
              .then(() => toast.success('Copied id to clipboard!'))
          }}
        >
          Copy task ID
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            navigator.clipboard
              .writeText(`${document.location.href}?taskId=${task.id}`)
              .then(() => toast.success('Copied link to clipboard!'))
          }}
        >
          Copy task Link
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger onClick={(e) => e.stopPropagation()}>
            Update Status
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent onClick={(e) => e.stopPropagation()}>
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  disabled={task.status === option}
                  onClick={() => handleUpdate(option)}
                >
                  {toSentenceCase(snakeCaseToString(option))}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
