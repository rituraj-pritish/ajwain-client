import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { SubItem } from './nav-workspaces'
import { deleteBoard } from '../../clientActions'

interface Props {
  board: SubItem | null
  isOpen: boolean
  onOpenChange: (state: boolean) => void
}

export default function DeleteBoardAlertDialog({
  board,
  isOpen,
  onOpenChange,
}: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (!board) return null

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteBoard(board.id)
      onOpenChange(false)
      router.refresh()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Board &quot;{board?.name}&quot;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this{' '}
            <b>board</b> and all related <b>tasks</b> and remove data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading && <Spinner />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
