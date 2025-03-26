"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddReservationDialog } from "@/components/reservations/add-reservation-dialog"

export default function ReservationsHeader() {
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <p className="text-muted-foreground">Manage your restaurant's reservations.</p>
      </div>

      <Button onClick={() => setIsAddReservationOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        New Reservation
      </Button>

      <AddReservationDialog open={isAddReservationOpen} onOpenChange={setIsAddReservationOpen} />
    </div>
  )
}

