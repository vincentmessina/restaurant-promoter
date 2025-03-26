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
import { deleteGuest } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { Guest } from "@/lib/types"

interface DeleteGuestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  guest: Guest
}

export function DeleteGuestDialog({ open, onOpenChange, guest }: DeleteGuestDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function onDelete() {
    setIsSubmitting(true)

    try {
      await deleteGuest(guest.id)
      toast({
        title: "Guest deleted",
        description: `${guest.name} has been removed from the guest list.`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete guest. Please try again.",
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
          <DialogTitle>Delete Guest</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {guest.name} from the guest list? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Guest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

