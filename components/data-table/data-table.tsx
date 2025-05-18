"use client"
import Link from "next/link"
import * as Table from "./imports"
import {useState} from "react"


interface DataTableProps<TData, TValue> {
  columns: Table.ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  
    const [sorting, setSorting] = useState<Table.SortingState>([])
    const [columnFilters, setColumnFilters] = useState<Table.ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<Table.VisibilityState>(Table.defaultVisibility)
    
  const table = Table.tableModel<TData , TValue>(  
    data,   
    columns,   
    sorting,  
    columnFilters,
    columnVisibility, 
    setSorting , 
    setColumnFilters , 
    setColumnVisibility )
  
  return (
    <div>
         <div className="flex items-center py-4">
        <Table.Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
         <Table.DropdownMenu>
          <Table.DropdownMenuTrigger asChild>
            <Table.Button variant="outline" className="ml-auto">
              Columns
            </Table.Button>
          </Table.DropdownMenuTrigger>
          <Table.DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <Table.DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </Table.DropdownMenuCheckboxItem>
                )
              })}
          </Table.DropdownMenuContent>
        </Table.DropdownMenu>
        <Table.Button><Link href="/employees/add">Add employee</Link></Table.Button>
      </div>
    <div className="rounded-md border ">
      <Table.Table>
        <Table.TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : Table.flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.TableHead>
                )
              })}
            </Table.TableRow>
          ))}
        </Table.TableHeader>
        <Table.TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.TableCell key={cell.id}>
                    {Table.flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.TableCell>
                ))}
              </Table.TableRow>
            ))
          ) : (
            <Table.TableRow>
              <Table.TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </Table.TableCell>
            </Table.TableRow>
          )}
        </Table.TableBody>
      </Table.Table>
    </div>

      <Table.DataTablePagination table={table} />
    </div>
  )
}
