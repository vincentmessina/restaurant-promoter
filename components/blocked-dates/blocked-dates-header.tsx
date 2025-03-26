"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddBlockedDateDialog } from "@/components/blocked-dates/add-blocked-date-dialog"

export default function BlockedDatesHeader() {
  const [isAddBlockedDateOpen, setIsAddBlockedDateOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blocked Dates</h1>
        <p className="text-muted-foreground">Manage dates when reservations are not allowed.</p>
      </div>

      <Button onClick={() => setIsAddBlockedDateOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Block Date
      </Button>

      <AddBlockedDateDialog open={isAddBlockedDateOpen} onOpenChange={setIsAddBlockedDateOpen} />
    </div>
  )
}

