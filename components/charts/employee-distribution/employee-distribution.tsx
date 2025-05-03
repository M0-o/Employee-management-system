"use client"
import * as EmployeeDistribution from "./imports"



interface genderDistributionPieChartData extends EmployeeDistribution.employeeDistributionByGender  {
    fill ?: string ;
}
interface raceDistributionPieChartData extends EmployeeDistribution.employeeDistributionByRace  {
  fill ?: string ;
}

interface employeeDistributionByGenderProps {
    genderDistribution: genderDistributionPieChartData[] | null;
    raceDistribution: raceDistributionPieChartData[] |  null;
}

export default function EmployeeDistributionByGender({genderDistribution , raceDistribution}: employeeDistributionByGenderProps) {
  
  if (!genderDistribution || !raceDistribution) {
    return <div>Loading...</div>
  }
    const totalEmployees = genderDistribution.reduce((acc, item) => acc + item.number, 0);
    genderDistribution.forEach((item) =>  item["fill"] = `var(--color-${item.gender})` )
    raceDistribution.forEach((item) =>  item["fill"] = `var(--color-${item.race})` )

  return (
    <EmployeeDistribution.Card className="flex flex-col">
      <EmployeeDistribution.CardHeader className="items-center pb-0">
        <EmployeeDistribution.CardTitle>Employee distribution </EmployeeDistribution.CardTitle>
        <EmployeeDistribution.CardDescription>January - June 2024</EmployeeDistribution.CardDescription>
      </EmployeeDistribution.CardHeader>
      <EmployeeDistribution.CardContent className="flex-1 pb-0">
         <EmployeeDistribution.Tabs defaultValue="gender" className="space-y-4">
                  <EmployeeDistribution.TabsList className="grid w-full grid-cols-2">
                    <EmployeeDistribution.TabsTrigger value="gender">by gender</EmployeeDistribution.TabsTrigger>
                    <EmployeeDistribution.TabsTrigger value="race">by race</EmployeeDistribution.TabsTrigger>
                   
                  </EmployeeDistribution.TabsList>
        <EmployeeDistribution.TabsContent value="gender" className="space-y-4">

        <EmployeeDistribution.ChartContainer
          config={EmployeeDistribution.genderChartConfig as EmployeeDistribution.ChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <EmployeeDistribution.PieChart>
            <EmployeeDistribution.ChartTooltip
              cursor={false}
              content={<EmployeeDistribution.ChartTooltipContent hideLabel />}
            />
            <EmployeeDistribution.Pie
              data={genderDistribution}
              dataKey="number"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <EmployeeDistribution.Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEmployees.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Employees
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </EmployeeDistribution.Pie>
            <EmployeeDistribution.Legend />
          </EmployeeDistribution.PieChart>
        </EmployeeDistribution.ChartContainer>
        </EmployeeDistribution.TabsContent>
        <EmployeeDistribution.TabsContent value="race" className="space-y-4">

        <EmployeeDistribution.ChartContainer
          config={EmployeeDistribution.raceChartConfig as EmployeeDistribution.ChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <EmployeeDistribution.PieChart>
            <EmployeeDistribution.ChartTooltip
              cursor={false}
              content={<EmployeeDistribution.ChartTooltipContent hideLabel />}
            />
            <EmployeeDistribution.Pie
              data={raceDistribution}
              dataKey="number"
              nameKey="race"
              innerRadius={60}
              strokeWidth={5}
            >
              <EmployeeDistribution.Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEmployees.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Employees
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </EmployeeDistribution.Pie>
            <EmployeeDistribution.Legend />
          </EmployeeDistribution.PieChart>
        </EmployeeDistribution.ChartContainer>
        </EmployeeDistribution.TabsContent>
        </EmployeeDistribution.Tabs >
      </EmployeeDistribution.CardContent>
      <EmployeeDistribution.CardFooter className="flex-col gap-2 text-sm">
      
        <div className="leading-none text-muted-foreground">
          Showing employees distribution
        </div>
      </EmployeeDistribution.CardFooter>
    </EmployeeDistribution.Card>
  )
}
