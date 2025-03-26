"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addTable } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  number: z.coerce.number().min(1, {
    message: "Table number must be at least 1.",
  }),
  capacity: z.coerce
    .number()
    .min(1, {
      message: "Capacity must be at least 1.",
    })
    .max(20, {
      message: "Maximum capacity is 20.",
    }),
  location: z.enum(["vip", "bar", "booth", "standard"], {
    required_error: "Please select a table location.",
  }),
  isVip: z.boolean().default(false),
})

interface AddTableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTableDialog({ open, onOpenChange }: AddTableDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: 1,
      capacity: 4,
      location: "standard",
      isVip: false,
    },
  })

  const watchIsVip = form.watch("isVip")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Generate a unique ID based on location and number
      const tableId = values.isVip
        ? `vip-${values.number}`
        : values.location === "bar"
          ? `bb-${values.number}`
          : values.location === "booth"
            ? `rb-${values.number}`
            : `tb-${values.number}`

      await addTable({
        ...values,
        id: tableId,
        status: "available",
      })

      toast({
        title: "Table added",
        description: `${values.isVip ? "VIP " : ""}Table ${values.number} has been added.`,
      })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add table. Please try again.",
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
          <DialogTitle>Add New Table</DialogTitle>
          <DialogDescription>Add a new table to your nightclub floor plan.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Number</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seating Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={20} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVip"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>VIP Table</FormLabel>
                    <FormDescription>Mark this as a VIP table</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {watchIsVip ? (
                        <SelectItem value="vip">VIP Section</SelectItem>
                      ) : (
                        <>
                          <SelectItem value="standard">Standard Area</SelectItem>
                          <SelectItem value="bar">Bar Area</SelectItem>
                          <SelectItem value="booth">Wall Booth</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Table
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

