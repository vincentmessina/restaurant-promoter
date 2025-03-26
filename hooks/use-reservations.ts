"use client"

import { useState, useEffect } from "react"
import type { Reservation } from "@/lib/types"
import { getReservations } from "@/lib/data"

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await getReservations()
        setReservations(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch reservations"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservations()
  }, [])

  return { reservations, isLoading, error }
}

