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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addGuestlistEntry } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import { useGuestlist } from "@/hooks/use-guestlist"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  size: z.coerce.number().min(1, {
    message: "Group size must be at least 1.",
  }),
  maleCount: z.coerce.number().min(0, {
    message: "Male count must be at least 0.",
  }),
  femaleCount: z.coerce.number().min(0, {
    message: "Female count must be at least 0.",
  }),
  promoter: z.string({
    required_error: "Please select a promoter.",
  }),
  isVip: z.boolean().default(false),
  notes: z.string().optional(),
})

interface AddGuestlistEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddGuestlistEntryDialog({ open, onOpenChange }: AddGuestlistEntryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { promoters } = useGuestlist()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      size: 1,
      maleCount: 0,
      femaleCount: 0,
      promoter: "",
      isVip: false,
      notes: "",
    },
  })

  const watchSize = form.watch("size")
  const watchMaleCount = form.watch("maleCount")
  const watchFemaleCount = form.watch("femaleCount")

  // Validate that male + female count equals total size
  const totalCount = watchMaleCount + watchFemaleCount
  const countError =
    totalCount !== watchSize ? `Male + female count (${totalCount}) must equal group size (${watchSize})` : null

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (countError) {
      toast({
        title: "Validation Error",
        description: countError,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await addGuestlistEntry(values)
      toast({
        title: "Guest added",
        description: `${values.name} has been added to the guestlist.`,
      })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add guest to guestlist. Please try again.",
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
          <DialogTitle>Add to Guestlist</DialogTitle>
          <DialogDescription>Add a new entry to your nightclub's guestlist.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Size</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maleCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Males</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="femaleCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Females</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {countError && <div className="text-sm font-medium text-destructive">{countError}</div>}

            <FormField
              control={form.control}
              name="promoter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promoter</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a promoter" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {promoters.map((promoter) => (
                        <SelectItem key={promoter} value={promoter}>
                          {promoter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <FormLabel>VIP Guest</FormLabel>
                    <FormDescription>Mark this guest as a VIP for special treatment.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any special notes about this guest..." className="resize-none" {...field} />
                  </FormControl>
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
                Add to Guestlist
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

