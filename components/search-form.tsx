"use client"

import type React from "react" // Import React
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SearchForm({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form className={cn("relative", className)} {...props}>
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder="Search..." className="pl-8 bg-background/60 backdrop-blur-sm" />
    </form>
  )
}

