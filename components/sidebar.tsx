"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Building, ChefHat, ClipboardCheck, ClipboardList, LayoutDashboard, LogOut, Settings, Users, XCircle } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/reservations",
      icon: ClipboardList,
      label: "Reservations",
    },
    {
      href: "/tables",
      icon: ChefHat,
      label: "Tables",
    },
    {
      href: "/guestlist",
      icon: ClipboardCheck,
      label: "Guestlist",
    },
    {
      href: "/blocked-dates",
      icon: XCircle,
      label: "Blocked Dates",
    },
    {
      href: "/guests",
      icon: Users,
      label: "Guests",
    },
    {
      href: "/profile",
      icon: Building,
      label: "Profile",
    },
  ]

  return (
    <div className="flex flex-col h-full w-64 bg-card border-r">
      <div className="p-4 flex flex-col items-center">
        <Link href="/dashboard" className="flex items-center justify-center mb-2">
          <img src="/images/logo.png" alt="ResoConnect" className="h-14 w-auto" />
        </Link>
        <h1 className="text-xl font-bold text-center">ResoConnect</h1>
        <p className="text-xs text-muted-foreground text-center">Nightclub Management</p>
      </div>

      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                pathname === route.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-3 mt-auto border-t">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-destructive">
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}

