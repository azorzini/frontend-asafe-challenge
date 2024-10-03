'use client';

import { useTheme } from 'next-themes';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  HeaderGroup,
  Row,
} from '@tanstack/react-table';
import useUsers from '@/app/hooks/useUsers';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
}

export default function UserTableClient({
  initialData,
  initialPageIndex,
  initialKeyword,
  pageCount: serverPageCount,
}: {
  initialData: User[];
  initialPageIndex: number;
  initialKeyword: string;
  pageCount: number;
}) {
  const { theme } = useTheme();

  const {
    data,
    loading,
    pageCount,
    pagination,
    setPagination,
    keyword,
    setKeyword,
  } = useUsers(initialData, initialPageIndex, initialKeyword, serverPageCount);

  const columns: ColumnDef<User>[] = [
    {
      header: 'Name',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      enableResizing: false,
      size: 150,
      minSize: 150,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    manualFiltering: true,
    state: {
      pagination,
      globalFilter: keyword,
    },
    onPaginationChange: (updater) => {
      setPagination((prev) => {
        const newPagination =
          typeof updater === 'function' ? updater(prev) : updater;
        return { ...newPagination, keyword: prev.keyword };
      });
    },
    onGlobalFilterChange: setKeyword,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500 p-4 rounded shadow">
      <div className="flex justify-between mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded transition-colors duration-500 text-black dark:text-white"
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<User>) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 text-left text-black dark:text-white"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-2 text-center text-black dark:text-white"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-2 text-center text-black dark:text-white"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row: Row<User>) => (
                <tr
                  key={row.original.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-2 text-black dark:text-white"
                      style={{ minWidth: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className={'text-black dark:text-white'}>
          Page {pagination.pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
