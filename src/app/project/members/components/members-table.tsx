'use client'

import { snakeCaseToString, toSentenceCase } from '@/lib/utils'
import User from '@/types/user.interface'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import DataTable from '../../components/data-table'

interface Props {
  data: User[]
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => toSentenceCase(snakeCaseToString(row.getValue('role'))),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Added',
    cell: ({ row }) => {
      const date: string = row.getValue('createdAt')
      return dayjs(date).format('DD MMM YYYY')
    },
  },
]

export default function MembersTable({ data }: Props) {
  return <DataTable data={data} columns={columns} />
}
