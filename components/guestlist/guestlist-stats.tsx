"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGuestlist } from "@/hooks/use-guestlist"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"

export default function GuestlistStats() {
  const { guestlist, promoters, isLoading } = useGuestlist()

  if (isLoading) {
    return <div>Loading stats...</div>
  }

  // Calculate stats
  const totalGuests = guestlist.reduce((sum, entry) => sum + entry.size, 0)
  const checkedInGuests = guestlist.filter((entry) => entry.checkedIn).reduce((sum, entry) => sum + entry.size, 0)
  const pendingGuests = totalGuests - checkedInGuests

  const maleCount = guestlist.reduce((sum, entry) => sum + entry.maleCount, 0)
  const femaleCount = guestlist.reduce((sum, entry) => sum + entry.femaleCount, 0)

  const vipCount = guestlist.filter((entry) => entry.isVip).reduce((sum, entry) => sum + entry.size, 0)

  // Promoter performance data
  const promoterData = promoters
    .map((promoter) => {
      const promoterEntries = guestlist.filter((entry) => entry.promoter === promoter)
      const totalSize = promoterEntries.reduce((sum, entry) => sum + entry.size, 0)
      const checkedInSize = promoterEntries
        .filter((entry) => entry.checkedIn)
        .reduce((sum, entry) => sum + entry.size, 0)

      return {
        name: promoter,
        total: totalSize,
        checkedIn: checkedInSize,
      }
    })
    .sort((a, b) => b.total - a.total)

  // Gender ratio data
  const genderData = [
    { name: "Male", value: maleCount },
    { name: "Female", value: femaleCount },
  ]

  const COLORS = ["#0088FE", "#FF8042"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Guestlist Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Guests</p>
              <p className="text-2xl font-bold">{totalGuests}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Checked In</p>
              <p className="text-2xl font-bold">{checkedInGuests}</p>
              <p className="text-xs text-muted-foreground">
                {totalGuests > 0 ? Math.round((checkedInGuests / totalGuests) * 100) : 0}% arrival rate
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">VIP Guests</p>
              <p className="text-2xl font-bold">{vipCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Gender Ratio</p>
              <p className="text-2xl font-bold">
                {maleCount}:{femaleCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Promoter Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={promoterData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" name="Total" />
              <Bar dataKey="checkedIn" fill="#82ca9d" name="Checked In" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

