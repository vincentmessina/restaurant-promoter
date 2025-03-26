"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteGuestlistEntry } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { GuestlistEntry } from "@/lib/types"

interface DeleteGuestlistEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entry: GuestlistEntry
}

export function DeleteGuestlistEntryDialog({ open, onOpenChange, entry }: DeleteGuestlistEntryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function onDelete() {
    setIsSubmitting(true)

    try {
      await deleteGuestlistEntry(entry.id)
      toast({
        title: "Entry deleted",
        description: `${entry.name} has been removed from the guestlist.`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete guestlist entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Guestlist Entry</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {entry.name} from the guestlist? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

