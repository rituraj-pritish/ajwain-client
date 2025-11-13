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
import { createWorkspace, updateWorkspace } from '../../clientActions'
import { useEffect } from 'react'
import { Item } from './nav-workspaces'

interface Props {
  workspace: Item | null
  isOpen: boolean
  onOpenChange: (state: boolean) => void
  refreshData: () => void
}

const schema = z.object({
  name: z.string().min(4, 'Name must me greater than 3 characters long'),
})

export default function AddAndRenameWorkspace({
  workspace,
  isOpen,
  onOpenChange,
  refreshData,
}: Props) {
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    form.reset({ name: workspace?.name || '' })
    // eslint-disable-next-line
  }, [workspace])

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = workspace
        ? await updateWorkspace({ ...values, id: Number(workspace.id) })
        : await createWorkspace(values)
      const data = await response.json()

      if (!response.ok && data.error) throw data
      refreshData()
      onOpenChange(false)
      toast.success(
        `${values.name} ${workspace ? 'updated' : 'created'} successfully.`,
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
      <form id='add-workspace-form'>
        <SheetContent side='bottom'>
          <SheetHeader>
            <SheetTitle>{workspace ? 'Rename' : 'Add'} Workspace</SheetTitle>
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
                      placeholder='Enter workspace name'
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
              id='add-workspace-form'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
              data-testid='add-workspace-form-submit-button'
            >
              {form.formState.isSubmitting && <Spinner />}
              {workspace ? 'Update' : 'Add'} Workspace
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
