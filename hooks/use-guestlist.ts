"use client"

import { useState, useEffect } from "react"
import type { GuestlistEntry } from "@/lib/types"
import { getGuestlist } from "@/lib/data"

export function useGuestlist() {
  const [guestlist, setGuestlist] = useState<GuestlistEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Get unique promoters from the guestlist
  const promoters = [...new Set(guestlist.map((entry) => entry.promoter))].sort()

  useEffect(() => {
    async function fetchGuestlist() {
      try {
        const data = await getGuestlist()
        setGuestlist(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch guestlist"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchGuestlist()
  }, [])

  return { guestlist, promoters, isLoading, error }
}

