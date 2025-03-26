"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddGuestlistEntryDialog } from "@/components/guestlist/add-guestlist-entry-dialog"

export default function GuestlistHeader() {
  const [isAddGuestlistEntryOpen, setIsAddGuestlistEntryOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guestlist</h1>
        <p className="text-muted-foreground">Manage your nightclub's guestlist and check-ins.</p>
      </div>

      <Button onClick={() => setIsAddGuestlistEntryOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add to Guestlist
      </Button>

      <AddGuestlistEntryDialog open={isAddGuestlistEntryOpen} onOpenChange={setIsAddGuestlistEntryOpen} />
    </div>
  )
}

