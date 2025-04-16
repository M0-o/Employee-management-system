"use client"

import * as GrowthTrends from "./imports"

interface GrowthTrendsProps {
  growthData: GrowthTrends.growthDataItem[] | null
}

export default function GrowthTrendsChart({growthData}: GrowthTrendsProps) {

  const [timeRange, setTimeRange] = GrowthTrends.useState("183d")
  const filteredData = GrowthTrends.filterGrowthData(growthData, timeRange);

  return (
    <GrowthTrends.Card >
      <GrowthTrends.CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <GrowthTrends.CardTitle>Hiring and layoff trends</GrowthTrends.CardTitle>
          <GrowthTrends.CardDescription>Showing hires vs layoffs over time</GrowthTrends.CardDescription>
        </div>
        <GrowthTrends.Select value={timeRange} onValueChange={setTimeRange}>
          <GrowthTrends.SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <GrowthTrends.SelectValue placeholder="Last 3 months" />
          </GrowthTrends.SelectTrigger>
          <GrowthTrends.SelectContent className="rounded-xl">
            <GrowthTrends.SelectItem value="365d" className="rounded-lg">
              last year
            </GrowthTrends.SelectItem>
            <GrowthTrends.SelectItem value="183d" className="rounded-lg">
              last 6 months
            </GrowthTrends.SelectItem>
            <GrowthTrends.SelectItem value="92d" className="rounded-lg">
              Last 3 months
            </GrowthTrends.SelectItem>
          </GrowthTrends.SelectContent>
        </GrowthTrends.Select>
      </GrowthTrends.CardHeader>
      <GrowthTrends.CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <GrowthTrends.ChartContainer config={GrowthTrends.chartConfig} className="aspect-auto h-[250px] w-full">
          <GrowthTrends.AreaChart data={filteredData}>
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
            <GrowthTrends.CartesianGrid vertical={false} />
            <GrowthTrends.XAxis
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
            <GrowthTrends.ChartTooltip
              cursor={false}
              content={
                <GrowthTrends.ChartTooltipContent
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
            <GrowthTrends.Area
              dataKey="terminations"
              type="natural"
              fill="url(#fillTerminations)"
              stroke="var(--color-terminations)"
              stackId="a"
            />
            <GrowthTrends.Area dataKey="hires" type="natural" fill="url(#fillHires)" stroke="var(--color-hires)" stackId="a" />
            <GrowthTrends.ChartLegend content={<GrowthTrends.ChartLegendContent />} />
          </GrowthTrends.AreaChart>
        </GrowthTrends.ChartContainer>
      </GrowthTrends.CardContent>
    </GrowthTrends.Card>
  )
}

