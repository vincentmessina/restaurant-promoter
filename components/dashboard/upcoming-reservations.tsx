import { format } from "date-fns"
import { getUpcomingReservations } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default async function UpcomingReservations() {
  const reservations = await getUpcomingReservations()

  if (reservations.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No upcoming reservations</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{reservation.guestName}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(reservation.date), "MMM d")} • {reservation.time}
                </p>
                <p className="text-sm">
                  Table {reservation.tableNumber} • {reservation.guestCount} guests
                </p>
              </div>
              <Badge
                className={cn(
                  reservation.status === "confirmed" && "bg-green-500",
                  reservation.status === "pending" && "bg-yellow-500",
                  reservation.status === "canceled" && "bg-red-500",
                )}
              >
                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

