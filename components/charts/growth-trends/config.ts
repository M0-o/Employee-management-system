import type { ChartConfig } from "@/components/ui/chart"

export const chartConfig = {
  visitors: {
    label: "Employees",
  },
  hires: {
    label: "Hires",
    color: "hsl(var(--chart-1))",
  },
  terminations: {
    label: "Terminations",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig