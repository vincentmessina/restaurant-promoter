"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, MoreHorizontal, Search, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useGuests } from "@/hooks/use-guests"
import { EditGuestDialog } from "@/components/guests/edit-guest-dialog"
import { DeleteGuestDialog } from "@/components/guests/delete-guest-dialog"
import type { Guest } from "@/lib/types"

export default function GuestsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)
  const [deletingGuest, setDeletingGuest] = useState<Guest | null>(null)

  const { guests, isLoading } = useGuests()

  const filteredGuests = guests.filter((guest) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        guest.name.toLowerCase().includes(query) ||
        guest.email.toLowerCase().includes(query) ||
        guest.phone.includes(query)
      )
    }
    return true
  })

  if (isLoading) {
    return <div>Loading guests...</div>
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search guests..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No guests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">
                    {guest.name}
                    {guest.isVip && (
                      <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                        VIP
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>
                    <Badge className={guest.isActive ? "bg-green-500" : "bg-gray-500"}>
                      {guest.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{guest.notes || "—"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingGuest(guest)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeletingGuest(guest)} className="text-destructive">
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

      {editingGuest && (
        <EditGuestDialog
          open={!!editingGuest}
          onOpenChange={(open) => !open && setEditingGuest(null)}
          guest={editingGuest}
        />
      )}

      {deletingGuest && (
        <DeleteGuestDialog
          open={!!deletingGuest}
          onOpenChange={(open) => !open && setDeletingGuest(null)}
          guest={deletingGuest}
        />
      )}
    </div>
  )
}

