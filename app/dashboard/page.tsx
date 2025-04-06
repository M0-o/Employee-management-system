
import HireChart from "@/app/dashboard/hire-chart"
import { AppSidebar } from "@/components/app-sidebar"
import  PerformanceMetrics  from "@/app/dashboard/performance_metrics"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createClient } from "@/utils/supabase/server";


export default async function Page() {
  const supabase = await createClient();
  const performanceDataResponse = await supabase.rpc("performance_score_percentage")
  if (performanceDataResponse.error) {
    console.error("Error fetching performance data:", performanceDataResponse.error)
  }
  const performanceData = performanceDataResponse.data
  const departmentPerformanceResponse = await supabase.rpc("performance_rating_average_by_param",{param:"department_type"})
  const departmentPerformance = departmentPerformanceResponse.data
  if (departmentPerformanceResponse.error) {
    console.error("Error fetching department performance:", departmentPerformanceResponse.error)
  }
  
  const averageRatingResponse = await supabase.rpc("employee_rating_average") 
  if (averageRatingResponse.error) {
    console.error("Error fetching average rating:", averageRatingResponse.error)
  }

  const averageRating = averageRatingResponse.data

  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="col-span-2">

              <PerformanceMetrics  performanceData={performanceData} departmentPerformance={departmentPerformance} averageRating={averageRating}/>
            </div>
            
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" > 
            <div className="container mx-auto py-10">
            

            <HireChart/>
             </div>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}