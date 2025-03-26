"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBlockedDates } from "@/hooks/use-blocked-dates"

export default function BlockedDatesCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { blockedDates } = useBlockedDates()

  // Convert blocked dates to Date objects for the calendar
  const blockedDatesArray = blockedDates.map((blockedDate) => new Date(blockedDate.date))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar View</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => {
            // Check if the date is in the blockedDatesArray
            return blockedDatesArray.some(
              (blockedDate) => format(blockedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
            )
          }}
          modifiers={{
            blocked: blockedDatesArray,
          }}
          modifiersStyles={{
            blocked: {
              backgroundColor: "rgb(239 68 68 / 0.1)",
              color: "rgb(239 68 68)",
              fontWeight: "bold",
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

