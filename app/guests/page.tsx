import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import GuestsHeader from "@/components/guests/guests-header"
import GuestsList from "@/components/guests/guests-list"

export default function GuestsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <GuestsHeader />

      <Suspense
        fallback={
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <GuestsList />
      </Suspense>
    </div>
  )
}

