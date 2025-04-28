import { QUERIES } from "@/data/queries";
import * as Dashboard from "./imports";

//import Component from "@/components/charts/employee-distribution/employee-distribution-by-gender";
export default async function Page() {
  
  const performanceDataPromise =  QUERIES.getPerformanceScoresPercentages();
  const departmentPerformancePromise =  QUERIES.getPerformanceRatingByDepartment()
  const employeeAverageRatingPromise = QUERIES.getEmployeeRatingAverage() ;
  const growthDataPromise = QUERIES.getGrowthTrends() ;
  const employeeDistributionByGenderPromise = QUERIES.getEmployeeDistributionByGender() ;

const [performanceData , 
  departmentPerformance ,
   employeeAverageRating,
  growthData ,
employeeDistributionByGender] = await Promise.all([performanceDataPromise , departmentPerformancePromise , employeeAverageRatingPromise , growthDataPromise , employeeDistributionByGenderPromise])
  
  return (
    <Dashboard.SidebarProvider>
      <Dashboard.AppSidebar />
      <Dashboard.SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Dashboard.SidebarTrigger className="-ml-1" />
            <Dashboard.Separator orientation="vertical" className="mr-2 h-4" />
            <Dashboard.Breadcrumb>
              <Dashboard.BreadcrumbList>
                <Dashboard.BreadcrumbItem className="hidden md:block">
                  <Dashboard.BreadcrumbLink href="#">
                  <Dashboard.ThemeSwitcher />
                    Building Your Application
                  </Dashboard.BreadcrumbLink>
                </Dashboard.BreadcrumbItem>
                <Dashboard.BreadcrumbSeparator className="hidden md:block" />
                <Dashboard.BreadcrumbItem>
                  <Dashboard.BreadcrumbPage>Data Fetching</Dashboard.BreadcrumbPage>
                </Dashboard.BreadcrumbItem>
              </Dashboard.BreadcrumbList>
            </Dashboard.Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="col-span-2">

              <Dashboard.PerformanceMetrics  performanceData={performanceData} departmentPerformance={departmentPerformance} averageRating={employeeAverageRating}/>
            </div>

          <Dashboard.EmployeeDistributionByGender distribution={employeeDistributionByGender}/> 

            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" > 
            <div className="container mx-auto py-10">
            

            <Dashboard.GrowthTrendsChart growthData={growthData}/>
             </div>
            </div>
        </div>
      </Dashboard.SidebarInset>
    </Dashboard.SidebarProvider>
  )
}