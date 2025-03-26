import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import BlockedDatesHeader from "@/components/blocked-dates/blocked-dates-header"
import BlockedDatesList from "@/components/blocked-dates/blocked-dates-list"
import BlockedDatesCalendar from "@/components/blocked-dates/blocked-dates-calendar"

export default function BlockedDatesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <BlockedDatesHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <BlockedDatesList />
          </Suspense>
        </div>

        <div>
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <BlockedDatesCalendar />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

