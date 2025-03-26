import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import ReservationsList from "@/components/reservations/reservations-list"
import UpcomingReservations from "@/components/dashboard/upcoming-reservations"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />

      <Suspense
        fallback={
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Today's Reservations</h2>
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <ReservationsList limit={5} />
          </Suspense>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Upcoming</h2>
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <UpcomingReservations />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

