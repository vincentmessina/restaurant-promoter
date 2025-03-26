"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { AddReservationDialog } from "@/components/reservations/add-reservation-dialog"

export default function DashboardHeader() {
  const [date, setDate] = useState<Date>(new Date())
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your restaurant's reservations and tables.</p>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("justify-start text-left font-normal w-[240px]")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
          </PopoverContent>
        </Popover>

        <Button onClick={() => setIsAddReservationOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
      </div>

      <AddReservationDialog open={isAddReservationOpen} onOpenChange={setIsAddReservationOpen} />
    </div>
  )
}

