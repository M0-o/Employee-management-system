"use client";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal , ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
        accessorKey: "emp_id",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Employee ID
                <ArrowUpDown className="ml-2 h-4 w-1" />
              </Button>
            )
          },
      
    },
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Start Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "exit_date",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Exit Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
    },
    {
        accessorKey: "supervisor",
        header: "Supervisor",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "business_unit",
        header: "Business Unit",
    },
    {
        accessorKey: "employee_status",
        header: "Employee Status",
    },
    {
        accessorKey: "employee_type",
        header: "Employee Type",
    },
    {
        accessorKey: "payzone",
        header: "Payzone",
    },
    {
        accessorKey: "employee_classification",
        header: "Employee Classification",
    },
    {
        accessorKey: "termination_type",
        header: "Termination Type",
    },
    {
        accessorKey: "termination_description",
        header: "Termination Description",
    },
    {
        accessorKey: "department_type",
        header: "Department Type",
    },
    {
        accessorKey: "division",
        header: "Division",
    },
    {
        accessorKey: "birthdate",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Birth Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "job_function_desc",
        header: "Job Function Desc",
    },
    {
        accessorKey: "gender_code",
        header: "Gender Code",
    },
    {
        accessorKey: "location_code",
        header: "Location Code",
    },
    {
        accessorKey: "race",
        header: "Race",
    },
    {
        accessorKey: "marital_status",
        header: "Marital Status",
    },
    {
        accessorKey: "performance_score",
        header: "Performance Score",
    },
    {
        accessorKey: "current_employee_rating",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Current Rating
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "job_title_id",
        header: "Job Title Id",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const employee = row.original
          const router = useRouter();
     
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
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(employee.emp_id +'')}>
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(`employees/${employee.emp_id}`)}>View Employee </DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
