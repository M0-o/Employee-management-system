"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Settings2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

// Navigation items structure
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
  }
]

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
}

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const SupabaseAuthClient = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await SupabaseAuthClient.auth.getUser()

      if (error) {
        console.error("Error fetching user:", error)
        return null
      }
     
      return data.user
    }
    
    fetchUser()
      .then((userData) => {
        setUser(userData)
       
      })
      .catch((error) => {
        console.error("Error fetching user:", error)
      })
      
  }, [])

  const currentUser: UserProfile = user
    ? {
        name: user.user_metadata?.full_name || "User",
        email: user.email || "user@example.com",
        avatar: user.user_metadata?.avatar_url || "/avatars/default.png",
      }
    : { name: "Guest", email: "guest@example.com", avatar: "/avatars/default.png" }

  // Filter out the current path from navigation
  const navItems = navigationItems.filter(item => item.url !== pathname && !(pathname == "/"))

  

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/"><div className="font-bold text-xl">EMP</div></Link>
            <p></p>
            <nav>
              <ul className="flex space-x-4">
                {navItems.map((item) => (
                  <li key={item.url}>
                    <Link 
                      href={item.url} 
                      className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-accent text-sm font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 rounded-md p-1 hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:inline-block">{currentUser.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}