"use client"

import { Suspense, useState } from "react"
import { Loader2 } from "lucide-react"
import TablesHeader from "@/components/tables/tables-header"
import TablesGrid from "@/components/tables/tables-grid"
import TablesGridView from "@/components/tables/tables-grid-view"

export default function TablesPage() {
  const [view, setView] = useState<"map" | "grid">("map")

  return (
    <div className="flex flex-col gap-6 p-6">
      <TablesHeader view={view} setView={setView} />

      <div className="w-full">
        <Suspense
          fallback={
            <div className="flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          {view === "map" ? <TablesGrid /> : <TablesGridView />}
        </Suspense>
      </div>
    </div>
  )
}

