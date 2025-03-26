import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import GuestlistHeader from "@/components/guestlist/guestlist-header"
import GuestlistTabs from "@/components/guestlist/guestlist-tabs"
import GuestlistStats from "@/components/guestlist/guestlist-stats"

export default function GuestlistPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <GuestlistHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <GuestlistStats />
          </Suspense>
        </div>

        <div className="lg:col-span-3">
          <Suspense
            fallback={
              <div className="flex justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <GuestlistTabs />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

