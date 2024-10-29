'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Typography from '@/components/typography';
import { Button } from './ui/button';
import { Input } from './input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  paginationSize?: number;
  noSearch?: boolean;
  regular?: boolean;
  hasFooter?: boolean;
  emptyNode?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  paginationSize,
  regular,
  noSearch,
  hasFooter,
  emptyNode,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: paginationSize || 10,
      },
    },
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <>
      <div className='flex items-center justify-between p-[20px]'>
        {!noSearch && (
          <div className='flex items-center gap-[6px]'>
            <Typography variant='body-1' className='text-base-black'>
              Show
            </Typography>

            {paginationSize && regular === false ? (
              <select
                className='w-[52px] rounded-[4px] border px-[8px] py-[4px] outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5].map((paginationSize) => (
                  <option key={paginationSize} value={paginationSize}>
                    {paginationSize}
                  </option>
                ))}
              </select>
            ) : paginationSize && regular ? (
              <select
                className='w-[52px] rounded-[4px] border px-[8px] py-[4px] outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[
                  paginationSize,
                  10,
                  50,
                  100,
                  150,
                  200,
                  250,
                  300,
                  350,
                  400,
                  450,
                  500,
                ].map((paginationSize) => (
                  <option key={paginationSize} value={paginationSize}>
                    {paginationSize}
                  </option>
                ))}
              </select>
            ) : (
              <select
                className='w-[52px] rounded-[4px] border px-[8px] py-[4px] outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map(
                  (paginationSize) => (
                    <option key={paginationSize} value={paginationSize}>
                      {paginationSize}
                    </option>
                  )
                )}
              </select>
            )}
            <Typography variant='body-1' className='text-base-black'>
              entries
            </Typography>
          </div>
        )}

        {!noSearch && (
          <div className='flex h-fit items-center gap-2'>
            <Typography variant='body-2' className='text-base-black'>
              Search:
            </Typography>

            <Input
              placeholder='Search'
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
              className='[&_input]:max-h-[36px]'
            />
          </div>
        )}
      </div>
      <div className=''>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='h-[59px] border-gray-550'
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='text-[15px] font-semibold '
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
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
                  className='border-gray-550'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className='h-24 text-center'
                >
                  {!emptyNode ? 'No results.' : emptyNode}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {hasFooter && (
        <div className='flex items-center justify-between px-[20px] py-6'>
          <Typography
            variant='body-1'
            fontWeight='semibold'
            className='text-gray-8'
          >
            Showing 1 to {table.getState().pagination.pageSize} of{' '}
            {table.getState().pagination.pageSize} entries
          </Typography>
          <div className=''>
            <div className='flex items-center'>
              <Button
                variant='outline'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                icon={{ icon: <ChevronLeft />, position: 'left' }}
                className='rounded-br-none rounded-tr-none border-r-0 border-gray-8'
              />
              {Array.from({ length: table.getPageCount() }, (_, index) => (
                <p
                  key={index}
                  className={`h-[40px] w-[40px] border border-gray-8 p-[12px] text-center text-[15px] leading-[18px] text-base-black ${
                    index === table.getState().pagination.pageIndex
                      ? 'bg-base-black text-base-white'
                      : 'cursor-pointer'
                  }`}
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </p>
              ))}
              <Button
                variant='outline'
                onClick={() => table.nextPage()}
                icon={{ icon: <ChevronRight />, position: 'left' }}
                disabled={!table.getCanNextPage()}
                className='rounded-bl-none rounded-tl-none border-l-0 border-gray-8'
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
