"use client"

import { useState, useEffect } from "react"
import type { Table } from "@/lib/types"
import { getTables } from "@/lib/data"

export function useTables() {
  const [tables, setTables] = useState<Table[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTables() {
      try {
        const data = await getTables()
        setTables(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch tables"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchTables()
  }, [])

  return { tables, isLoading, error }
}

