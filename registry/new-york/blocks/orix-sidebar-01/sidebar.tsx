"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
  active?: boolean
}

interface SidebarProps {
  items?: NavItem[]
  onNavigate?: (href: string) => void
}

export function Sidebar({ items = [], onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  const defaultItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Analytics", href: "/analytics" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" },
  ]

  const navItems = items.length > 0 ? items : defaultItems

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-card border-r transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {isOpen && <h2 className="font-bold text-lg">Menu</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onNavigate?.(item.href)}
            >
              {isOpen ? item.label : item.label.charAt(0)}
            </Button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <Separator className="mb-4" />
          {isOpen && (
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold">User</p>
              <p>user@example.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground mt-2">
            This is a sidebar component. Click the menu icon to toggle it.
          </p>
        </div>
      </div>
    </div>
  )
}
