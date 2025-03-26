"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronDown, ChevronUp, Download, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReservations } from "@/hooks/use-reservations"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ReservationsByPromoterProps {
  limit?: number
}

export default function ReservationsByPromoter({ limit }: ReservationsByPromoterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<Date | null>(null)
  const [promoterFilter, setPromoterFilter] = useState<string | null>(null)
  
  const { reservations, isLoading } = useReservations()

  // Group reservations by promoter
  const reservationsByPromoter = useMemo(() => {
    const filtered = reservations
      .filter((reservation) => {
        // Search filter (searches promoter name or guest name)
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return (
            (reservation.promoterName?.toLowerCase().includes(query) || false) || 
            reservation.guestName.toLowerCase().includes(query)
          )
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
      .filter((reservation) => {
        // Promoter filter
        if (promoterFilter && promoterFilter !== "all") {
          return reservation.promoterId === promoterFilter
        }
        return true
      })

    // Group by promoter
    const grouped = filtered.reduce((acc, reservation) => {
      const promoterId = reservation.promoterId || "none"
      const promoterName = reservation.promoterName || "No Promoter"
      
      if (!acc[promoterId]) {
        acc[promoterId] = {
          id: promoterId,
          name: promoterName,
          reservations: [],
          totalGuests: 0,
          confirmedReservations: 0,
          pendingReservations: 0,
          canceledReservations: 0,
          vipGuests: 0
        }
      }
      
      acc[promoterId].reservations.push(reservation)
      acc[promoterId].totalGuests += reservation.guestCount
      
      if (reservation.status === "confirmed") {
        acc[promoterId].confirmedReservations += 1
      } else if (reservation.status === "pending") {
        acc[promoterId].pendingReservations += 1
      } else if (reservation.status === "canceled") {
        acc[promoterId].canceledReservations += 1
      }
      
      if (reservation.isVip) {
        acc[promoterId].vipGuests += 1
      }
      
      return acc
    }, {} as Record<string, {
      id: string
      name: string
      reservations: typeof reservations
      totalGuests: number
      confirmedReservations: number
      pendingReservations: number
      canceledReservations: number
      vipGuests: number
    }>)
    
    return Object.values(grouped).sort((a, b) => b.totalGuests - a.totalGuests)
  }, [reservations, searchQuery, statusFilter, dateFilter, promoterFilter])

  // Get unique promoters for filter dropdown
  const promoters = useMemo(() => {
    const uniquePromoters = new Map()
    
    reservations.forEach(reservation => {
      if (reservation.promoterId && reservation.promoterName) {
        uniquePromoters.set(reservation.promoterId, reservation.promoterName)
      }
    })
    
    return Array.from(uniquePromoters.entries()).map(([id, name]) => ({
      id,
      name
    }))
  }, [reservations])

  // Function to export data as CSV
  const exportToCSV = () => {
    // Create CSV content
    let csvContent = "Promoter,Total Reservations,Total Guests,Confirmed,Pending,Canceled,VIP Guests\n"
    
    reservationsByPromoter.forEach(promoter => {
      const totalReservations = promoter.reservations.length
      csvContent += `"${promoter.name}",${totalReservations},${promoter.totalGuests},${promoter.confirmedReservations},${promoter.pendingReservations},${promoter.canceledReservations},${promoter.vipGuests}\n`
    })
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `reservations-by-promoter-${format(new Date(), 'yyyy-MM-dd')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (isLoading) {
    return <div>Loading reservations...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by promoter or guest name..."
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

        <Select value={promoterFilter || ""} onValueChange={(value) => setPromoterFilter(value === "all" ? null : value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Promoter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Promoters</SelectItem>
            {promoters.map((promoter) => (
              <SelectItem key={promoter.id} value={promoter.id}>
                {promoter.name}
              </SelectItem>
            ))}
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
            <Calendar mode="single" selected={dateFilter || undefined} onSelect={(date) => date ? setDateFilter(date) : setDateFilter(null)} initialFocus />
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {reservationsByPromoter.length === 0 ? (
        <div className="rounded-md border p-8 text-center">
          No reservations found.
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Reservations by Promoter</CardTitle>
              <CardDescription>
                Showing {reservationsByPromoter.length} promoters with a total of {reservationsByPromoter.reduce((sum, p) => sum + p.totalGuests, 0)} guests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Promoter</TableHead>
                    <TableHead>Total Reservations</TableHead>
                    <TableHead>Total Guests</TableHead>
                    <TableHead>Confirmed</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Canceled</TableHead>
                    <TableHead>VIP Guests</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservationsByPromoter.map((promoter) => (
                    <TableRow key={promoter.id}>
                      <TableCell className="font-medium">{promoter.name}</TableCell>
                      <TableCell>{promoter.reservations.length}</TableCell>
                      <TableCell>{promoter.totalGuests}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          {promoter.confirmedReservations}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          {promoter.pendingReservations}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          {promoter.canceledReservations}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">
                          {promoter.vipGuests}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Accordion type="multiple" className="w-full">
            {reservationsByPromoter.map((promoter) => (
              <AccordionItem key={promoter.id} value={promoter.id}>
                <AccordionTrigger className="px-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="font-medium">{promoter.name}</div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {promoter.reservations.length} reservations
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {promoter.totalGuests} guests
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Guest</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Table</TableHead>
                          <TableHead>Guests</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {promoter.reservations.map((reservation) => (
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}
