"use client"

import { useState, useEffect } from "react"
import type { Guest } from "@/lib/types"
import { getGuests } from "@/lib/data"

export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchGuests() {
      try {
        const data = await getGuests()
        setGuests(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch guests"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchGuests()
  }, [])

  return { guests, isLoading, error }
}

