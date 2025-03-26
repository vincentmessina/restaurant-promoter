"use client"

import { useState, useEffect } from "react"
import type { BlockedDate } from "@/lib/types"
import { getBlockedDates } from "@/lib/data"

export function useBlockedDates() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchBlockedDates() {
      try {
        const data = await getBlockedDates()
        setBlockedDates(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch blocked dates"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlockedDates()
  }, [])

  return { blockedDates, isLoading, error }
}

