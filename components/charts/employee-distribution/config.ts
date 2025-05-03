import type { ChartConfig } from "@/components/ui/chart";

export const genderChartConfig = {
    Employees: {
      label: "employees",
    },
    Male: {
        label: "Male",
        color: "hsl(var(--chart-1))", 
      },
      Female: {
        label: "Female",
        color: "hsl(var(--chart-5))", 
      },
    
  } satisfies ChartConfig


  export const raceChartConfig = {
    Employees: {
      label: "employees",
    },
    White: {
        label: "White",
        color: "hsl(var(--chart-1))", 
      },
      Black: {
        label: "Black",
        color: "hsl(var(--chart-5))", 
      },
      Asian: {
        label: "Asian",
        color: "hsl(var(--chart-3))", 
      },
      Hispanic: {
        label: "Hispanic",
        color: "hsl(var(--chart-4))", 
      },
      Other : {
        label: "Other",
        color: "hsl(var(--chart-2))", 
      }
    
  } satisfies ChartConfig