"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronRight, Plus, Search, UserCheck } from "lucide-react"
import { useGuestlist } from "@/hooks/use-guestlist"
import { AddGuestlistEntryDialog } from "@/components/guestlist/add-guestlist-entry-dialog"
import { CheckInDialog } from "@/components/guestlist/check-in-dialog"
import type { GuestlistEntry } from "@/lib/types"

export default function GuestlistWidget() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddGuestlistEntryOpen, setIsAddGuestlistEntryOpen] = useState(false)
  const [checkingInGuest, setCheckingInGuest] = useState<GuestlistEntry | null>(null)
  const { guestlist, isLoading } = useGuestlist()

  if (isLoading) {
    return <div>Loading guestlist...</div>
  }

  const pendingGuests = guestlist.filter((entry) => !entry.checkedIn)
  const filteredGuests = pendingGuests
    .filter((entry) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return entry.name.toLowerCase().includes(query)
      }
      return true
    })
    .slice(0, 5)

  const totalPending = pendingGuests.length
  const totalCheckedIn = guestlist.filter((entry) => entry.checkedIn).length

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex justify-between items-center">
          Guestlist
          <Badge variant="secondary" className="ml-2">
            {totalCheckedIn}/{guestlist.length} Arrived
          </Badge>
        </CardTitle>
        <CardDescription>Quick check-in for guestlist entries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guestlist..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {searchQuery ? "No matching guests found" : "No pending guests"}
            </div>
          ) : (
            filteredGuests.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                <div>
                  <div className="font-medium">{entry.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {entry.size} {entry.size === 1 ? "person" : "people"} • {entry.promoter}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setCheckingInGuest(entry)} className="h-8 w-8 p-0">
                  <UserCheck className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" onClick={() => setIsAddGuestlistEntryOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Guest
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/guestlist">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>

      <AddGuestlistEntryDialog open={isAddGuestlistEntryOpen} onOpenChange={setIsAddGuestlistEntryOpen} />

      {checkingInGuest && (
        <CheckInDialog
          open={!!checkingInGuest}
          onOpenChange={(open) => !open && setCheckingInGuest(null)}
          entry={checkingInGuest}
        />
      )}
    </Card>
  )
}

