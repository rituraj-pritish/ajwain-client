'use client'
import Task from '@/types/task.interface'
import DataTable from '../../components/data-table'
import { ColumnDef, Row } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { snakeCaseToString, toSentenceCase } from '@/lib/utils'

interface Props {
  tasks: Task[]
}

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('title')}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      toSentenceCase(snakeCaseToString(row.getValue('status'))),
  },
  {
    accessorKey: 'date',
    header: 'Deadline',
    cell: ({ row }) => {
      const date: string = row.getValue('date')
      if (!dayjs(date).isValid()) return '-'
      return dayjs(date).format('DD MMM YYYY')
    },
  },
]

export default function TasksTable({ tasks }: Props) {
  const setRowProps = (row: Row<Task>) => {
    function getClassName() {
      const status = row.original.status
      switch (status) {
        case 'PENDING':
          return 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800'
        case 'IN_PROGRESS':
          return 'bg-orange-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-orange-800'
        case 'COMPLETED':
          return 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800'
        default:
          return ''
      }
    }

    return {
      className: getClassName(),
    }
  }
  return <DataTable data={tasks} columns={columns} setRowProps={setRowProps} />
}
