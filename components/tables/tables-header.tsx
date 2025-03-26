"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Grid, MapPin, Plus } from "lucide-react"
import { AddTableDialog } from "@/components/tables/add-table-dialog"

export default function TablesHeader({
  view,
  setView,
}: { view: "map" | "grid"; setView: (view: "map" | "grid") => void }) {
  const [isAddTableOpen, setIsAddTableOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Floor Plan</h1>
        <p className="text-muted-foreground">Manage your nightclub's tables and seating.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-secondary rounded-lg p-1 flex">
          <Button
            variant={view === "map" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("map")}
            className="rounded-r-none"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Floor Plan
          </Button>
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("grid")}
            className="rounded-l-none"
          >
            <Grid className="mr-2 h-4 w-4" />
            Grid View
          </Button>
        </div>

        <Button onClick={() => setIsAddTableOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Table
        </Button>
      </div>

      <AddTableDialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen} />
    </div>
  )
}

