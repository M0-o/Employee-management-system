"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  Users,
} from "lucide-react"
import { UserResponse } from "@supabase/supabase-js"
import { NavMain } from "@/components/nav/main"
import { NavProjects } from "@/components/nav/projects"
import { NavUser } from "@/components/nav/user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {createClient} from "@/lib/supabase/client"
import { usePathname } from "next/navigation"


// This is navigation data structure
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: false,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
    isActive: false,
    items: [
      {
        title: "All Employees",
        url: "/employees",
      },
      {
        title: "Add Employee",
        url: "/employees/add",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
    isActive: false,
    items: [
      {
        title: "General",
        url: "/settings/general",
      },
      {
        title: "Team",
        url: "/settings/team",
      },
      {
        title: "Billing",
        url: "/settings/billing",
      },
    ],
  },
];

// Sample projects data - you can replace with actual data
const projectsData = [
  {
    name: "Design Engineering",
    url: "/projects/design",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "/projects/sales",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "/projects/travel",
    icon: Map,
  },
];

const SupabaseAuthClient = createClient()
export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const [user, setUser] = React.useState<UserResponse | null>(null)
const pathname = usePathname()

React.useEffect(() => {
  const fetchUser = async () => {
    const user = await SupabaseAuthClient.auth.getUser()
    return user ;
  }
  
  fetchUser()
    .then((user) => {
      setUser(user)
    })
    .catch((error) => {
      console.error("Error fetching user:", error)
    })

}, [])

  // Process navigation items based on current path
  const processedNavItems = React.useMemo(() => {
    // First, mark the active item based on current path
    return navigationItems
      .map(item => {
        // Don't include the item if the URL exactly matches the current path
        if (item.url === pathname) {
          return null;
        }
        
        // Check if this is the active parent item
        const isActive = pathname.startsWith(item.url);
        
        // Process sub-items if they exist
        const filteredItems = item.items?.filter(subItem => 
          subItem.url !== pathname
        );
        
        // Return modified item with active state
        return {
          ...item,
          isActive,
          items: filteredItems,
        };
      })
      .filter(Boolean) as typeof navigationItems; // Type assertion to fix TypeScript error
  }, [pathname]);

  if (!user) {
    return <div>Loading...</div>
  }
  
  const currentUser = user.data.user
    ? {
        name: user.data.user.user_metadata?.full_name || "Default Name",
        email: user.data.user.email || "default@example.com",
        avatar: user.data.user.user_metadata?.avatar_url || "/avatars/default.png",
      }
    : { name: "Default User", email: "default@example.com", avatar: "/avatars/default.png" };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={processedNavItems} />
        <NavProjects projects={projectsData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
