"use client"

import { useState } from "react"
import { format } from "date-fns"
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
import { deleteBlockedDate } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { BlockedDate } from "@/lib/types"

interface DeleteBlockedDateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  blockedDate: BlockedDate
}

export function DeleteBlockedDateDialog({ open, onOpenChange, blockedDate }: DeleteBlockedDateDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function onDelete() {
    setIsSubmitting(true)

    try {
      await deleteBlockedDate(blockedDate.id)
      toast({
        title: "Blocked date removed",
        description: `${format(new Date(blockedDate.date), "MMMM d, yyyy")} is no longer blocked.`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove blocked date. Please try again.",
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
          <DialogTitle>Remove Blocked Date</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove the block for {format(new Date(blockedDate.date), "MMMM d, yyyy")}? This
            will allow reservations for this date.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Remove Block
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

