import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Item, SubItem } from './nav-workspaces'
import { createBoard, updateBoard } from '../../clientActions'

interface Props {
  workspace: Item | null
  board: SubItem | null
  isOpen: boolean
  onOpenChange: (state: boolean) => void
}

const schema = z.object({
  name: z.string().min(4, 'Name must me greater than 3 characters long'),
})

export default function AddAndRenameBoard({
  workspace,
  board,
  isOpen,
  onOpenChange,
}: Props) {
  const router = useRouter()
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    form.reset({ name: board?.name || '' })
    // eslint-disable-next-line
  }, [board])

  if (!workspace) return null

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = board
        ? await updateBoard({ ...values, id: Number(board.id) })
        : await createBoard({ ...values, workspaceId: workspace.id })
      const data = await response.json()

      if (!response.ok && data.error) throw data
      router.refresh()
      onOpenChange(false)
      toast.success(
        `${values.name} ${board ? 'updated' : 'created'} successfully.`,
      )
    } catch (error: any) {
      if (error && error.message) {
        return form.setError('name', {
          message: error.message,
        })
      }
      toast.error('Something went wrong. Please try again.')
    }
  }

  const handleOpenChange = (state: boolean) => {
    if (!state) form.reset()
    onOpenChange(state)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <form id='add-and-update-board-form'>
        <SheetContent side='bottom'>
          <SheetHeader>
            <SheetTitle>{board ? 'Rename' : 'Add'} Board</SheetTitle>
          </SheetHeader>
          <FieldGroup className='px-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder='Enter board name'
                      data-testid='name'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
          <SheetFooter className='flex-row justify-end'>
            <Button
              type='submit'
              id='add-and-update-board-form'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
              data-testid='add-and-update-board-form-submit-button'
            >
              {form.formState.isSubmitting && <Spinner />}
              {board ? 'Update' : 'Add'} Board
            </Button>
            <SheetClose asChild>
              <Button variant='outline'>Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  )
}
