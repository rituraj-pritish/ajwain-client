'use client'
import { Input } from '@/components/ui/input'
import AddTask from './add-task'
import TaskType, { TaskStatus } from '@/types/task.interface'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { snakeCaseToString, toSentenceCase } from '@/lib/utils'
import dayjs from 'dayjs'
import TaskActions from './task-actions'
import { DataTablePagination } from '../../components/data-table-pagination'
import { Row } from '@tanstack/react-table'
import { usePathname } from 'next/navigation'
import DataTable from '../../components/data-table'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import Task from './task'

const columns: ColumnDef<TaskType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <div className='font-medium'>{row.getValue('title')}</div>
    },
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-center'>Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue('status')

      function getClassName() {
        switch (status) {
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
        <div className='text-center'>
          <Badge variant='outline' className={getClassName()}>
            {toSentenceCase(snakeCaseToString(status))}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: () => <div className='text-center'>Date</div>,
    cell: ({ row }) => {
      const date: string = row.getValue('date')
      const isCompleted = row.getValue('status') === TaskStatus.COMPLETED

      if (!dayjs(date).isValid()) return <div className='text-center'>-</div>

      const isOverdue = dayjs(date).isBefore(new Date(), 'day') && !isCompleted

      return (
        <div className='text-center'>
          {dayjs(date).format('DD MMM YYYY')}
          {isOverdue && (
            <Badge variant='destructive' className='ml-2'>
              Overdue
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original
      return <TaskActions task={task} />
    },
  },
]

export default function TasksTable({ tasks }: { tasks: TaskType[] }) {
  const [rowSelection, setRowSelection] = useState({})

  const pathName = usePathname()

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const setRowProps = (row: Row<TaskType>) => {
    const taskId = row.original.id

    return {
      className: 'cursor-pointer',
      onClick: () =>
        window.history.replaceState(null, '', `${pathName}?taskId=${taskId}`),
    }
  }

  return (
    <>
      <div className='flex mb-4'>
        <Input
          className='mr-4'
          placeholder='Search by title...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
        />
        <AddTask />
      </div>
      <DataTable table={table} setRowProps={setRowProps} />
      <div className='mt-4'>
        <DataTablePagination table={table} />
      </div>
      <Task />
    </>
  )
}
