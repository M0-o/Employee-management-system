"use client"

import * as Performance from "./imports"
import { useEffect, useState } from "react" 
interface PerformanceMetricsProps {
  performanceData: Performance.PerformanceData[] | null;
  departmentPerformance: Performance.DepartmentPerformance[] | null;
  payzonePerformance: Performance.payzonePerformance[] | null;
  averageRating: number | null;
  className?: string
}

export default function PerformanceMetrics({
  performanceData,
  departmentPerformance,
  payzonePerformance,
  averageRating,
  className,
}: PerformanceMetricsProps) {
 
  if (!performanceData || !departmentPerformance || averageRating === null || !payzonePerformance) {
    return <div>Loading...</div>
  }
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])
  const animationDuration = 2500

  return (
    <Performance.Card className={Performance.cn("col-span-full lg:col-span-2", className)}>
      <Performance.CardHeader>
        <Performance.CardTitle>Performance Metrics</Performance.CardTitle>
        <Performance.CardDescription>Employee performance ratings </Performance.CardDescription>
      </Performance.CardHeader>
      <Performance.CardContent>
        <Performance.Tabs defaultValue="overview" className="space-y-4">
          <Performance.TabsList className="grid w-full grid-cols-3">
            <Performance.TabsTrigger value="overview">Overview</Performance.TabsTrigger>
            <Performance.TabsTrigger value="departments">By Department</Performance.TabsTrigger>
            <Performance.TabsTrigger value="payzones">By Payzone</Performance.TabsTrigger>
          </Performance.TabsList>
          <Performance.TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
            {performanceData.map((item) => (
          <div key={item.performance_score} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.performance_score}</span>
              <span className="text-sm font-medium">{item.percentage}%</span>
            </div>
            <Performance.Progress
              value={isAnimating ? item.percentage : 0}
              className={
                item.performance_score === "Exceeds"
                  ? `bg-muted [&>div]:bg-green-500 [&>div]:transition-all [&>div]:duration-[${animationDuration}ms] [&>div]:ease-out`
                  : item.performance_score === "Needs Improvement"
                    ? `bg-muted [&>div]:bg-red-500 [&>div]:transition-all [&>div]:duration-[${animationDuration}ms] [&>div]:ease-out`
                    : `bg-muted [&>div]:bg-blue-500 [&>div]:transition-all [&>div]:duration-[${animationDuration}ms] [&>div]:ease-out`
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
          <Performance.Progress
            value={isAnimating ? (averageRating / 5) * 100 : 0}
            className={`bg-muted [&>div]:bg-primary [&>div]:transition-all [&>div]:duration-[${animationDuration}ms] [&>div]:ease-out`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Poor</span>
            <span>Average</span>
            <span>Excellent</span>
                </div>
              </div>
            </div>
          </Performance.TabsContent>
          <Performance.TabsContent value="departments">
            <div className="space-y-4">
              <div className=" w-full overflow-hidden">
                <Performance.ChartContainer config={Performance.chartConfig}>
                  <Performance.ResponsiveContainer width="100%" height="100%">
                    <Performance.BarChart data={departmentPerformance}>
                      <Performance.XAxis
                        dataKey="group_"
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                        tickFormatter={(value) => value.split(" ")[0]}
                      />
                      <Performance.YAxis tickLine={false} axisLine={false} fontSize={12} tickCount={6} domain={[0, 4]} />
                      <Performance.ChartTooltip content={<Performance.ChartTooltipContent />} />
                      <Performance.Bar dataKey="average_rating" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </Performance.BarChart>
                  </Performance.ResponsiveContainer>
                </Performance.ChartContainer>
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
          </Performance.TabsContent>
          <Performance.TabsContent value="payzones">
            <div className="space-y-4">
              <div className=" w-full overflow-hidden">
                <Performance.ChartContainer config={Performance.chartConfig}>
                  <Performance.ResponsiveContainer width="100%" height="100%">
                    <Performance.BarChart data={payzonePerformance}>
                      <Performance.XAxis
                        dataKey="group_"
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                        tickFormatter={(value) => value.split(" ")[0]}
                      />
                      <Performance.YAxis tickLine={false} axisLine={false} fontSize={12} tickCount={6} domain={[0, 4]} />
                      <Performance.ChartTooltip content={<Performance.ChartTooltipContent />} />
                      <Performance.Bar dataKey="average_rating" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    </Performance.BarChart>
                  </Performance.ResponsiveContainer>
                </Performance.ChartContainer>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Payzone Performance</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {payzonePerformance.map((dept) => (
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
          </Performance.TabsContent>
        </Performance.Tabs>
      </Performance.CardContent>
    </Performance.Card>
  )
}

