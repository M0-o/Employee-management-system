import { QUERIES } from "@/Data/queries";
import * as Dashboard from "./imports";

export default async function Page() {

  const supabase = await Dashboard.createClient();
  const performanceDataResponse = await supabase.rpc("performance_score_percentage")
  if (performanceDataResponse.error) {
    console.error("Error fetching performance data:", performanceDataResponse.error)
  }
  const performanceData = performanceDataResponse.data
  
  
  const departmentPerformance = await QUERIES.getPerformanceRatingByDepartment()
 
  
  const averageRatingResponse = await supabase.rpc("employee_rating_average") 
  if (averageRatingResponse.error) {
    console.error("Error fetching average rating:", averageRatingResponse.error)
  }

  const averageRating = averageRatingResponse.data

// finish extracting all the queries , and add a promise.all where usable . text wife

  
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

              <Dashboard.PerformanceMetrics  performanceData={performanceData} departmentPerformance={departmentPerformance} averageRating={averageRating}/>
            </div>
            
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" > 
            <div className="container mx-auto py-10">
            

            <Dashboard.HireChart/>
             </div>
            </div>
        </div>
      </Dashboard.SidebarInset>
    </Dashboard.SidebarProvider>
  )
}