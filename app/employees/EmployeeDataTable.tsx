"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, Users } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Define the Employee type based on the SQL schema
export type Employee = {
  emp_id: number
  first_name: string
  last_name: string
  start_date: string
  exit_date: string | null
  supervisor: string | null
  email: string
  business_unit: string
  employee_status: string
  employee_type: string
  payzone: string
  employee_classification: string
  termination_type: string | null
  termination_description: string | null
  department_type: string | null
  division: string | null
  birthdate: string | null
  state: string | null
  job_function_desc: string | null
  gender_code: string | null
  location_code: number | null
  race: string | null
  marital_status: string | null
  performance_score: string | null
  current_employee_rating: number | null
  job_title_id: number | null
}

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "emp_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="pl-0">
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("emp_id")}</div>,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("first_name")}</div>,
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("last_name")}</div>,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("start_date"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "exit_date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Exit Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const exitDate = row.getValue("exit_date")
      if (!exitDate) return <div className="text-muted-foreground">-</div>
      const date = new Date(exitDate as string)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "supervisor",
    header: "Supervisor",
    cell: ({ row }) => <div>{row.getValue("supervisor") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "business_unit",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Business Unit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("business_unit")}</div>,
  },
  {
    accessorKey: "employee_status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("employee_status") as string
      return (
        <Badge variant={status === "Active" ? "default" : status === "Terminated" ? "destructive" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "employee_type",
    header: "Employee Type",
    cell: ({ row }) => <div>{row.getValue("employee_type")}</div>,
  },
  {
    accessorKey: "payzone",
    header: "Pay Zone",
    cell: ({ row }) => <div>{row.getValue("payzone")}</div>,
  },
  {
    accessorKey: "employee_classification",
    header: "Classification",
    cell: ({ row }) => <div>{row.getValue("employee_classification")}</div>,
  },
  {
    accessorKey: "termination_type",
    header: "Termination Type",
    cell: ({ row }) => (
      <div>{row.getValue("termination_type") || <span className="text-muted-foreground">-</span>}</div>
    ),
  },
  {
    accessorKey: "termination_description",
    header: "Termination Description",
    cell: ({ row }) => (
      <div>{row.getValue("termination_description") || <span className="text-muted-foreground">-</span>}</div>
    ),
  },
  {
    accessorKey: "department_type",
    header: "Department",
    cell: ({ row }) => <div>{row.getValue("department_type") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "division",
    header: "Division",
    cell: ({ row }) => <div>{row.getValue("division") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "birthdate",
    header: "Birthdate",
    cell: ({ row }) => {
      const birthdate = row.getValue("birthdate")
      if (!birthdate) return <div className="text-muted-foreground">-</div>
      const date = new Date(birthdate as string)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <div>{row.getValue("state") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "job_function_desc",
    header: "Job Function",
    cell: ({ row }) => (
      <div>{row.getValue("job_function_desc") || <span className="text-muted-foreground">-</span>}</div>
    ),
  },
  {
    accessorKey: "gender_code",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender_code") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "location_code",
    header: "Location Code",
    cell: ({ row }) => <div>{row.getValue("location_code") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "race",
    header: "Race",
    cell: ({ row }) => <div>{row.getValue("race") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "marital_status",
    header: "Marital Status",
    cell: ({ row }) => <div>{row.getValue("marital_status") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    accessorKey: "performance_score",
    header: "Performance Score",
    cell: ({ row }) => (
      <div>{row.getValue("performance_score") || <span className="text-muted-foreground">-</span>}</div>
    ),
  },
  {
    accessorKey: "current_employee_rating",
    header: "Employee Rating",
    cell: ({ row }) => (
      <div>{row.getValue("current_employee_rating") || <span className="text-muted-foreground">-</span>}</div>
    ),
  },
  {
    accessorKey: "job_title_id",
    header: "Job Title ID",
    cell: ({ row }) => <div>{row.getValue("job_title_id") || <span className="text-muted-foreground">-</span>}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const employee = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.emp_id.toString())}>
              Copy employee ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View employee details</DropdownMenuItem>
            <DropdownMenuItem>Edit employee</DropdownMenuItem>
            {employee.employee_status === "Active" && (
              <DropdownMenuItem className="text-destructive">Terminate employee</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

 interface EmployeeDataTableProps {
  data: Employee[]
}

export function EmployeeDataTable({ data }: EmployeeDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    // Hide some columns by default for better initial view
    termination_description: false,
    birthdate: false,
    gender_code: false,
    race: false,
    marital_status: false,
    location_code: false,
  })
  const [rowSelection, setRowSelection] = React.useState({})
  const [visibleCount, setVisibleCount] = React.useState(50)
  const router = useRouter()
  const pathname = usePathname()
  const currentPage = Number(pathname.split('/').pop()) || 1

  // Update: memoize visibleData to avoid unnecessary recalculations
  const visibleData = React.useMemo(() => data.slice(0, visibleCount), [data, visibleCount])

  const table = useReactTable({
    data: visibleData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold tracking-tight">Employees</h2>
            <Badge variant="outline" className="ml-2">
              {table.getFilteredRowModel().rows.length} total
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter by last name..."
                value={(table.getColumn("last_name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("last_name")?.setFilterValue(event.target.value)}
                className="pl-8 w-full md:w-[200px] lg:w-[250px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="h-[300px] overflow-y-auto">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => currentPage > 1 && router.push(`/employees/${currentPage - 1}`)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (visibleCount < data.length) {
                  setVisibleCount(Math.min(visibleCount + 50, data.length))
                } else {
                  router.push(`/employees/${currentPage + 1}`)
                }
              }}
            >
              {visibleCount < data.length ? "Load More" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

