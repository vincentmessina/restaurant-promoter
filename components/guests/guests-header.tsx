"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddGuestDialog } from "@/components/guests/add-guest-dialog"

export default function GuestsHeader() {
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guests</h1>
        <p className="text-muted-foreground">Manage your restaurant's guest list.</p>
      </div>

      <Button onClick={() => setIsAddGuestOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Guest
      </Button>

      <AddGuestDialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen} />
    </div>
  )
}

