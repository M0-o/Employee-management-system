import {ColumnDef , 
  useReactTable ,  
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState ,
  ColumnFiltersState
} from "@tanstack/react-table"
import { Dispatch , SetStateAction  } from "react"
import {defaultVisibility} from "@/components/data-table/config/column-visibility"

export const tableModel = <TData , TValue>(
  data: TData[], 
  columns:ColumnDef<TData , TValue>[] , 
  sorting: SortingState , 
  columnFilters: ColumnFiltersState ,
  columnVisibility: Record<string , boolean> ,
  setSorting: Dispatch<SetStateAction<SortingState>> ,
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>> ,
  setColumnVisibility: Dispatch<SetStateAction<typeof defaultVisibility >> ,
) => { 

  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

}