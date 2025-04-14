import HireChart from "@/components/hire-chart"
import { AppSidebar } from "@/components/app-sidebar"
import  PerformanceMetrics  from "@/components/performance_metrics"
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
import {ThemeSwitcher} from "@/components/theme-switcher"


export {HireChart,
 AppSidebar,
  PerformanceMetrics ,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator ,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
 createClient ,
 ThemeSwitcher}