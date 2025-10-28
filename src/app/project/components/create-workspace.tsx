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
import { createWorkspace } from '../actions/clientActions'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

interface Props {
  isOpen: boolean
  onOpenChange: (state: boolean) => void
}

const schema = z.object({
  name: z.string().min(4, 'Name must me greater than 3 characters long'),
})

export default function AddWorkspace({ isOpen, onOpenChange }: Props) {
  const router = useRouter()
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await createWorkspace(values)
      const data = await response.json()

      if (!response.ok && data.error) throw data
      router.refresh()
      onOpenChange(false)
      toast.success(`${values.name} created successfully.`)
    } catch (error: any) {
      if (error.message) {
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
      <form id="create-workspace">
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Create Workspace</SheetTitle>
          </SheetHeader>
          <FieldGroup className="px-4 grid grid-cols-3 gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input {...field} placeholder="Enter workspace name" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
          <SheetFooter className="flex-row justify-end">
            <Button
              type="submit"
              id="create-workspace"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {form.formState.isSubmitting && <Spinner />}
              Create Workspace
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  )
}
