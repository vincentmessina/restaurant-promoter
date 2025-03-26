"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useBlockedDates } from "@/hooks/use-blocked-dates"
import { EditBlockedDateDialog } from "@/components/blocked-dates/edit-blocked-date-dialog"
import { DeleteBlockedDateDialog } from "@/components/blocked-dates/delete-blocked-date-dialog"
import type { BlockedDate } from "@/lib/types"

export default function BlockedDatesList() {
  const [editingBlockedDate, setEditingBlockedDate] = useState<BlockedDate | null>(null)
  const [deletingBlockedDate, setDeletingBlockedDate] = useState<BlockedDate | null>(null)

  const { blockedDates, isLoading } = useBlockedDates()

  if (isLoading) {
    return <div>Loading blocked dates...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time Range</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blockedDates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No blocked dates found.
              </TableCell>
            </TableRow>
          ) : (
            blockedDates.map((blockedDate) => (
              <TableRow key={blockedDate.id}>
                <TableCell className="font-medium">{format(new Date(blockedDate.date), "MMMM d, yyyy")}</TableCell>
                <TableCell>
                  {blockedDate.allDay ? "All Day" : `${blockedDate.startTime} - ${blockedDate.endTime}`}
                </TableCell>
                <TableCell>{blockedDate.reason}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingBlockedDate(blockedDate)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingBlockedDate(blockedDate)}
                        className="text-destructive"
                      >
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

      {editingBlockedDate && (
        <EditBlockedDateDialog
          open={!!editingBlockedDate}
          onOpenChange={(open) => !open && setEditingBlockedDate(null)}
          blockedDate={editingBlockedDate}
        />
      )}

      {deletingBlockedDate && (
        <DeleteBlockedDateDialog
          open={!!deletingBlockedDate}
          onOpenChange={(open) => !open && setDeletingBlockedDate(null)}
          blockedDate={deletingBlockedDate}
        />
      )}
    </div>
  )
}

