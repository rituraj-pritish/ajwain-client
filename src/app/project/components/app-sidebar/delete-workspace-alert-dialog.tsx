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
import { Item } from './nav-workspaces'
import { deleteWorkspace } from '../../clientActions'

interface Props {
  workspace: Item | null
  isOpen: boolean
  onOpenChange: (state: boolean) => void
}

export default function DeleteWorkspaceAlertDialog({
  workspace,
  isOpen,
  onOpenChange,
}: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (!workspace) return null

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteWorkspace({
        id: workspace.id,
      })
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
            Delete Workspace &quot;{workspace?.name}&quot;?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this{' '}
            <b>workspace</b> and all related <b>boards</b> and remove data from
            our servers.
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
