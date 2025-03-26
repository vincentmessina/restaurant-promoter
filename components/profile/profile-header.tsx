"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Save } from "lucide-react"

export default function ProfileHeader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Venue Profile</h1>
          <p className="text-muted-foreground">
            Manage your venue information and appearance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Profile Preview</h2>
            <p className="text-sm text-muted-foreground">
              This is how your venue will appear to users
            </p>
          </div>
          <div className="mt-4 rounded-lg border overflow-hidden">
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
              <div className="text-muted-foreground">Venue Image</div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">Skyline Lounge</h3>
                  <p className="text-sm text-muted-foreground">Rooftop • Downtown</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">4.8</span>
                  <span className="ml-1">★</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center text-sm">
                  <span>EDM, House</span>
                </div>
                <div className="flex items-center text-sm">
                  <span>Min: $500</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center text-sm">
                  <span>10:00 PM - 4:00 AM</span>
                </div>
                <div className="flex items-center text-sm">
                  <span>25 spots left</span>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
