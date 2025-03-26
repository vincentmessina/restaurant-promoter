"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Edit, MoreHorizontal, Search, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useReservations } from "@/hooks/use-reservations"
import { EditReservationDialog } from "@/components/reservations/edit-reservation-dialog"
import { CancelReservationDialog } from "@/components/reservations/cancel-reservation-dialog"

interface ReservationsListProps {
  limit?: number
}

export default function ReservationsList({ limit }: ReservationsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<Date | null>(null)
  const [editingReservation, setEditingReservation] = useState<string | null>(null)
  const [cancelingReservation, setCancelingReservation] = useState<string | null>(null)

  const { reservations, isLoading } = useReservations()

  const filteredReservations = reservations
    .filter((reservation) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return reservation.guestName.toLowerCase().includes(query) || reservation.tableNumber.toString().includes(query)
      }
      return true
    })
    .filter((reservation) => {
      // Status filter
      if (statusFilter && statusFilter !== "all") {
        return reservation.status === statusFilter
      }
      return true
    })
    .filter((reservation) => {
      // Date filter
      if (dateFilter) {
        return format(new Date(reservation.date), "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd")
      }
      return true
    })
    .slice(0, limit || reservations.length)

  if (isLoading) {
    return <div>Loading reservations...</div>
  }

  const getReservationById = (id: string) => {
    return reservations.find((r) => r.id === id) || null
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or table..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[240px] justify-start text-left font-normal",
                !dateFilter && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dateFilter || undefined} onSelect={setDateFilter} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No reservations found.
                </TableCell>
              </TableRow>
            ) : (
              filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">
                    {reservation.guestName}
                    {reservation.isVip && (
                      <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                        VIP
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(reservation.date), "MMM d, yyyy")}
                    <br />
                    <span className="text-muted-foreground">{reservation.time}</span>
                  </TableCell>
                  <TableCell>Table {reservation.tableNumber}</TableCell>
                  <TableCell>{reservation.guestCount}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        reservation.status === "confirmed" && "bg-green-500",
                        reservation.status === "pending" && "bg-yellow-500",
                        reservation.status === "canceled" && "bg-red-500",
                      )}
                    >
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingReservation(reservation.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setCancelingReservation(reservation.id)}
                          className="text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingReservation && (
        <EditReservationDialog
          open={!!editingReservation}
          onOpenChange={(open) => !open && setEditingReservation(null)}
          reservation={getReservationById(editingReservation)}
        />
      )}

      {cancelingReservation && (
        <CancelReservationDialog
          open={!!cancelingReservation}
          onOpenChange={(open) => !open && setCancelingReservation(null)}
          reservationId={cancelingReservation}
          reservationName={getReservationById(cancelingReservation)?.guestName || ""}
        />
      )}
    </div>
  )
}

