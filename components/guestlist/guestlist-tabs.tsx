"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Search, Trash, UserCheck } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGuestlist } from "@/hooks/use-guestlist"
import { EditGuestlistEntryDialog } from "@/components/guestlist/edit-guestlist-entry-dialog"
import { DeleteGuestlistEntryDialog } from "@/components/guestlist/delete-guestlist-entry-dialog"
import { CheckInDialog } from "@/components/guestlist/check-in-dialog"
import type { GuestlistEntry } from "@/lib/types"

export default function GuestlistTabs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [promoterFilter, setPromoterFilter] = useState<string | null>(null)
  const [editingEntry, setEditingEntry] = useState<GuestlistEntry | null>(null)
  const [deletingEntry, setDeletingEntry] = useState<GuestlistEntry | null>(null)
  const [checkingInGuest, setCheckingInGuest] = useState<GuestlistEntry | null>(null)

  const { guestlist, promoters, isLoading } = useGuestlist()

  if (isLoading) {
    return <div>Loading guestlist...</div>
  }

  const pendingEntries = guestlist.filter((entry) => !entry.checkedIn)
  const checkedInEntries = guestlist.filter((entry) => entry.checkedIn)

  const filterEntries = (entries: GuestlistEntry[]) => {
    return entries.filter((entry) => {
      let matchesSearch = true
      let matchesPromoter = true

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        matchesSearch = entry.name.toLowerCase().includes(query)
      }

      if (promoterFilter) {
        matchesPromoter = entry.promoter === promoterFilter
      }

      return matchesSearch && matchesPromoter
    })
  }

  const filteredPending = filterEntries(pendingEntries)
  const filteredCheckedIn = filterEntries(checkedInEntries)

  return (
    <Card>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select
            value={promoterFilter || ""}
            onValueChange={(value) => setPromoterFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Promoters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Promoters</SelectItem>
              {promoters.map((promoter) => (
                <SelectItem key={promoter} value={promoter}>
                  {promoter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending ({pendingEntries.length})</TabsTrigger>
            <TabsTrigger value="checked-in">Checked In ({checkedInEntries.length})</TabsTrigger>
            <TabsTrigger value="all">All ({guestlist.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <GuestlistTable
              entries={filteredPending}
              onEdit={setEditingEntry}
              onDelete={setDeletingEntry}
              onCheckIn={setCheckingInGuest}
              showCheckIn={true}
            />
          </TabsContent>

          <TabsContent value="checked-in">
            <GuestlistTable
              entries={filteredCheckedIn}
              onEdit={setEditingEntry}
              onDelete={setDeletingEntry}
              onCheckIn={setCheckingInGuest}
              showCheckIn={false}
            />
          </TabsContent>

          <TabsContent value="all">
            <GuestlistTable
              entries={filterEntries(guestlist)}
              onEdit={setEditingEntry}
              onDelete={setDeletingEntry}
              onCheckIn={setCheckingInGuest}
              showCheckIn={true}
            />
          </TabsContent>
        </Tabs>
      </div>

      {editingEntry && (
        <EditGuestlistEntryDialog
          open={!!editingEntry}
          onOpenChange={(open) => !open && setEditingEntry(null)}
          entry={editingEntry}
        />
      )}

      {deletingEntry && (
        <DeleteGuestlistEntryDialog
          open={!!deletingEntry}
          onOpenChange={(open) => !open && setDeletingEntry(null)}
          entry={deletingEntry}
        />
      )}

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

interface GuestlistTableProps {
  entries: GuestlistEntry[]
  onEdit: (entry: GuestlistEntry) => void
  onDelete: (entry: GuestlistEntry) => void
  onCheckIn: (entry: GuestlistEntry) => void
  showCheckIn: boolean
}

function GuestlistTable({ entries, onEdit, onDelete, onCheckIn, showCheckIn }: GuestlistTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Promoter</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No guestlist entries found.
              </TableCell>
            </TableRow>
          ) : (
            entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">
                  {entry.name}
                  {entry.isVip && (
                    <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                      VIP
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {entry.size} {entry.size === 1 ? "person" : "people"}
                </TableCell>
                <TableCell>{entry.promoter}</TableCell>
                <TableCell>
                  <Badge className={entry.checkedIn ? "bg-green-500" : "bg-blue-500"}>
                    {entry.checkedIn ? "Checked In" : "Pending"}
                  </Badge>
                  {entry.checkedIn && entry.arrivalTime && (
                    <div className="text-xs text-muted-foreground mt-1">{entry.arrivalTime}</div>
                  )}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{entry.notes || "—"}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {showCheckIn && !entry.checkedIn && (
                        <DropdownMenuItem onClick={() => onCheckIn(entry)}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Check In
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onEdit(entry)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(entry)} className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
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
  )
}

