import { QUERIES } from "@/data/queries"
import * as Dashboard from "./imports"

export default async function Page() {
  const performanceDataPromise = QUERIES.getPerformanceScoresPercentages()
  const departmentPerformancePromise = QUERIES.getPerformanceRatingByDepartment()
  const employeeAverageRatingPromise = QUERIES.getEmployeeRatingAverage()
  const growthDataPromise = QUERIES.getGrowthTrends()
  const employeeDistributionByGenderPromise = QUERIES.getEmployeeDistributionByGender()
  const payzonePerformancePromise = QUERIES.getPerformanceRatingByPayZone();

  const [performanceData, departmentPerformance, employeeAverageRating, growthData, employeeDistributionByGender , payzonePerformance] =
    await Promise.all([
      performanceDataPromise,
      departmentPerformancePromise,
      employeeAverageRatingPromise,
      growthDataPromise,
      employeeDistributionByGenderPromise,
      payzonePerformancePromise
    ])

  return (
    <div className="container mx-auto py-6 ">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">HR Analytics Dashboard</h1>
        <Dashboard.ThemeSwitcher />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Metrics Card - Takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2 bg-card rounded-lg  shadow-sm">
         
          <div className="p-6">
            <Dashboard.PerformanceMetrics
              performanceData={performanceData}
              departmentPerformance={departmentPerformance}
              payzonePerformance={payzonePerformance}
              averageRating={employeeAverageRating}
            />
          </div>
        </div>

        {/* Employee Distribution Card - Takes 1/3 of the width on large screens */}
        <div className="bg-card rounded-lg  shadow-sm">
          
          <div className="p-6">
            <Dashboard.EmployeeDistributionByGender distribution={employeeDistributionByGender} />
          </div>
        </div>

        {/* Growth Trends Card - Full width */}
        <div className="lg:col-span-3 bg-card rounded-lg  shadow-sm">
          
          <div className="p-6">
            <Dashboard.GrowthTrendsChart growthData={growthData} />
          </div>
        </div>
      </div>

      {/* Dashboard Footer */}
      <div className="text-sm text-muted-foreground text-right">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}
