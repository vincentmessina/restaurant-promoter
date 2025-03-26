import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import ReservationsHeader from "@/components/reservations/reservations-header"
import ReservationsTabs from "@/components/reservations/reservations-tabs"

export default function ReservationsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <ReservationsHeader />

      <Suspense
        fallback={
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <ReservationsTabs />
      </Suspense>
    </div>
  )
}

