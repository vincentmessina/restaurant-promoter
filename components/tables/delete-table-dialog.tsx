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
import { deleteTable } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { Table } from "@/lib/types"

interface DeleteTableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table
}

export function DeleteTableDialog({ open, onOpenChange, table }: DeleteTableDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function onDelete() {
    setIsSubmitting(true)

    try {
      await deleteTable(table.id)
      toast({
        title: "Table deleted",
        description: `Table ${table.number} has been deleted.`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete table. Please try again.",
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
          <DialogTitle>Delete Table</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete Table {table.number}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete Table
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

