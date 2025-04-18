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
} from "lucide-react"
import { UserResponse } from "@supabase/supabase-js"
import { NavMain } from "@/components/nav/main"
import { NavProjects } from "@/components/nav/projects"
import { NavUser } from "@/components/nav/user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {createClient} from "@/lib/supabase/client"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "idk",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

const SupabaseAuthClient = createClient()
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const [user, setUser] = React.useState<UserResponse | null>(null)
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
  if (!user) {
    return <div>Loading...</div>
  }
  console.log(user.data.user)
  const currentUser = user.data.user
    ? {
        name: user.data.user.user_metadata?.full_name || "Default Name",
        email: user.data.user.email || "default@example.com",
        avatar: user.data.user.user_metadata?.avatar_url || "/avatars/default.png",
      }
    : data.user;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarFooter>
        <NavUser user={ currentUser } />
      </SidebarFooter>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={ currentUser } />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
