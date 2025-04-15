"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

async function getData() {
  const supabase = createClient()
  const { data: chartData } = await supabase.rpc("get_employee_start_exit_counts")
  return chartData
}

const chartConfig = {
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

interface ChartDataItem {
  date: string
  [key: string]: any
}

export default function HireChart() {
  const [timeRange, setTimeRange] = React.useState("183d")
  const [chartData, setChartData] = React.useState<ChartDataItem[]>([])

  React.useEffect(() => {
    getData().then((data) => {
      setChartData(data)
    })
  }, [])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date(chartData[chartData.length - 1]?.date || new Date())
    let daysToSubtract = 365
    if (timeRange === "183d") {
      daysToSubtract = 183
    } else if (timeRange === "92d") {
      daysToSubtract = 92
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card >
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Hiring and layoff trends</CardTitle>
          <CardDescription>Showing hires vs layoffs over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="365d" className="rounded-lg">
              last year
            </SelectItem>
            <SelectItem value="183d" className="rounded-lg">
              last 6 months
            </SelectItem>
            <SelectItem value="92d" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillHires" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-hires)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-hires)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillTerminations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-terminations)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-terminations)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="terminations"
              type="natural"
              fill="url(#fillTerminations)"
              stroke="var(--color-terminations)"
              stackId="a"
            />
            <Area dataKey="hires" type="natural" fill="url(#fillHires)" stroke="var(--color-hires)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

