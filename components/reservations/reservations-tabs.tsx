"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservationsList from "@/components/reservations/reservations-list"
import ReservationsByPromoter from "@/components/reservations/reservations-by-promoter"

export default function ReservationsTabs() {
  const [activeTab, setActiveTab] = useState("list")

  return (
    <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="list">All Reservations</TabsTrigger>
        <TabsTrigger value="by-promoter">By Promoter</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <ReservationsList />
      </TabsContent>
      <TabsContent value="by-promoter">
        <ReservationsByPromoter />
      </TabsContent>
    </Tabs>
  )
}
