"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"

interface PerformanceData {
  performance_score: string
  number_of_employees: number
  percentage: number
}

interface DepartmentPerformance {
  group_: string
  average_rating: number
}



interface PerformanceMetricsProps {
  performanceData: PerformanceData[]
  departmentPerformance: DepartmentPerformance[]
  averageRating: number
  className?: string
}

export default function PerformanceMetrics({
  performanceData,
  departmentPerformance,
  averageRating ,
  className,
}: PerformanceMetricsProps) {
  // Chart config
  const chartConfig: ChartConfig = {
    average: {
      label: "Average Rating",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card className={cn("col-span-full lg:col-span-2", className)}>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Employee performance ratings </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">By Department</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {performanceData.map((item) => (
                <div key={item.performance_score} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.performance_score}</span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <Progress
                    value={item.percentage}
                    className={
                      item.performance_score === "Exceeds"
                        ? "bg-muted [&>div]:bg-green-500"
                        : item.performance_score === "Needs Improvement"
                          ? "bg-muted [&>div]:bg-red-500"
                          : "bg-muted [&>div]:bg-blue-500"
                    }
                  />
                  <p className="text-xs text-muted-foreground">{item.number_of_employees} employees</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border p-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium">Average Performance Rating</h4>
                <div className="mt-1 flex items-baseline">
                  <div className="text-3xl font-bold">{averageRating}</div>
                  <div className="ml-2 text-sm text-muted-foreground">out of 5.0</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">1.0</span>
                  <span className="text-sm">5.0</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(averageRating / 5) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Average</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="departments">
            <div className="space-y-4">
              <div className=" w-full overflow-hidden">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer  width="100%" height="100%">
                    <BarChart data={departmentPerformance}>
                      <XAxis
                        dataKey="group_"
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                        tickFormatter={(value) => value.split(" ")[0]}
                      />
                      <YAxis tickLine={false} axisLine={false} fontSize={12} tickCount={6} domain={[0, 5]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="average_rating" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Department Performance</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {departmentPerformance.map((dept) => (
                    <div
                      key={dept.group_}
                      className="flex items-center justify-between space-x-2 rounded-md border p-3 transition-colors hover:bg-muted/50"
                    >
                      <span className="text-sm font-medium">{dept.group_}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{dept.average_rating.toFixed(2)}</span>
                        <span className="ml-1 text-xs text-muted-foreground">/5.0</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        
        </Tabs>
      </CardContent>
    </Card>
  )
}

