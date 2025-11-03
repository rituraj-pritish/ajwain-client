'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  Table as TableType,
  useReactTable,
} from '@tanstack/react-table'

interface PropsWithTable<TData> {
  data?: never
  columns?: never
  setRowProps?: (row: Row<TData>) => object
  table: TableType<TData>
}

interface PropsWithoutTable<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  setRowProps?: (row: Row<TData>) => object
  table?: never
}

export default function DataTable<TData, TValue>({
  data = [],
  columns = [],
  setRowProps = () => ({}),
  table: tableProp,
}: PropsWithoutTable<TData, TValue> | PropsWithTable<TData>) {
  const tableLocal = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const table = tableProp || tableLocal

  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                {...setRowProps(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
