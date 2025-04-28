import type { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
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