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
import { checkInGuestlistEntry } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { GuestlistEntry } from "@/lib/types"

interface CheckInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entry: GuestlistEntry
}

export function CheckInDialog({ open, onOpenChange, entry }: CheckInDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Get current time in HH:MM format
  const currentTime = format(new Date(), "h:mm a")

  async function onCheckIn() {
    setIsSubmitting(true)

    try {
      await checkInGuestlistEntry(entry.id, currentTime)
      toast({
        title: "Guest checked in",
        description: `${entry.name} has been checked in at ${currentTime}.`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check in guest. Please try again.",
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
          <DialogTitle>Check In Guest</DialogTitle>
          <DialogDescription>
            Confirm check-in for {entry.name} and their group of {entry.size} {entry.size === 1 ? "person" : "people"}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{entry.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Group Size:</span>
              <span className="font-medium">
                {entry.size} {entry.size === 1 ? "person" : "people"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gender Split:</span>
              <span className="font-medium">
                {entry.maleCount}M / {entry.femaleCount}F
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Promoter:</span>
              <span className="font-medium">{entry.promoter}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium">{entry.isVip ? "VIP" : "Standard"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in Time:</span>
              <span className="font-medium">{currentTime}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onCheckIn} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Check In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

