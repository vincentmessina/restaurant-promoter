"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Edit, Image, MapPin, Music } from "lucide-react"
import { getProfile } from "@/lib/data"
import { useEffect, useState } from "react"
import type { Profile } from "@/lib/types"

export default function ProfileSidebar() {
  const pathname = usePathname()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile()
        setProfile(profileData)
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="text-center py-4">
            <p className="text-muted-foreground">Profile not available</p>
            <Button asChild className="mt-2" variant="outline" size="sm">
              <Link href="/profile">
                <Edit className="mr-2 h-4 w-4" />
                Create Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            {profile.logoUrl ? (
              <img 
                src={profile.logoUrl} 
                alt={profile.venueName} 
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <Image className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          
          <h3 className="text-lg font-bold">{profile.venueName}</h3>
          
          <div className="w-full mt-4 space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{profile.venueLocation}</span>
            </div>
            
            <div className="flex items-start gap-2">
              <Music className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{profile.musicGenres.join(", ")}</span>
            </div>
            
            <div className="flex items-start gap-2">
              <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="text-sm">
                <div>{profile.operatingHours.openTime} - {profile.operatingHours.closeTime}</div>
                <div>Min: ${profile.minimumSpend}</div>
                <div>{profile.capacity.available} spots left</div>
              </div>
            </div>
          </div>
          
          <Button asChild className="w-full mt-4" variant="outline" size="sm">
            <Link href="/profile">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
