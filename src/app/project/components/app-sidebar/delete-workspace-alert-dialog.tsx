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
import { Item } from './nav-workspaces'
import { deleteWorkspace } from '../../clientActions'
import { useParams, useRouter } from 'next/navigation'

interface Props {
  workspace: Item | null
  isOpen: boolean
  onOpenChange: (state: boolean) => void
  refreshData: () => void
}

export default function DeleteWorkspaceAlertDialog({
  workspace,
  isOpen,
  onOpenChange,
  refreshData,
}: Props) {
  const { workspaceId } = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (!workspace) return null

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      await deleteWorkspace({
        id: workspace.id,
      })

      if (Number(workspaceId) === workspace.id) router.replace('/project')
      onOpenChange(false)
      refreshData()
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
