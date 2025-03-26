"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateProfile } from "@/lib/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, DollarSign, Image, Info, MapPin, Music, Share, Users } from "lucide-react"

const profileFormSchema = z.object({
  venueName: z.string().min(2, { message: "Venue name must be at least 2 characters." }),
  venueLocation: z.string().min(2, { message: "Location is required." }),
  venueDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  musicGenres: z.string().min(2, { message: "At least one music genre is required." }),
  openTime: z.string(),
  closeTime: z.string(),
  minimumSpend: z.string().min(1, { message: "Minimum spend is required." }),
  totalCapacity: z.string().min(1, { message: "Total capacity is required." }),
  availableCapacity: z.string().min(1, { message: "Available capacity is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)

  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    venueName: "Skyline Lounge",
    venueLocation: "Rooftop • Downtown",
    venueDescription: "Experience nightlife from a new perspective at our exclusive rooftop venue featuring world-class DJs and premium bottle service.",
    musicGenres: "EDM, House",
    openTime: "22:00",
    closeTime: "04:00",
    minimumSpend: "500",
    totalCapacity: "250",
    availableCapacity: "25",
    email: "info@skylinelounge.com",
    phone: "(555) 123-4567",
    website: "www.skylinelounge.com",
    instagram: "@skylinelounge",
    facebook: "SkylineLounge",
    twitter: "@SkylineLounge",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    
    try {
      // Convert form data to match the Profile interface
      const profileData = {
        venueName: data.venueName,
        venueLocation: data.venueLocation,
        venueDescription: data.venueDescription,
        musicGenres: data.musicGenres.split(",").map(genre => genre.trim()),
        operatingHours: {
          openTime: data.openTime,
          closeTime: data.closeTime,
        },
        minimumSpend: parseInt(data.minimumSpend),
        capacity: {
          total: parseInt(data.totalCapacity),
          available: parseInt(data.availableCapacity),
        },
        contactInfo: {
          email: data.email,
          phone: data.phone,
          website: data.website,
        },
        socialMedia: {
          instagram: data.instagram,
          facebook: data.facebook,
          twitter: data.twitter,
        },
      }
      
      await updateProfile(profileData)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">
              <Info className="h-4 w-4 mr-2" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </TabsTrigger>
            <TabsTrigger value="details">
              <Clock className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="media">
              <Image className="h-4 w-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Share className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details about your venue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="venueName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter venue name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name that will be displayed on your venue card.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="venueDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter a description of your venue" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a brief description of your venue and what makes it special.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="musicGenres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Music Genres</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Music className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="EDM, House, Hip-Hop" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter music genres separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>
                  Enter your venue's location details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="venueLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Description</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Rooftop • Downtown" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        A short description of your venue's location (e.g., "Rooftop • Downtown").
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Venue Details</CardTitle>
                <CardDescription>
                  Enter operating hours, capacity, and pricing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="openTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opening Time</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input type="time" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="closeTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing Time</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input type="time" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="minimumSpend"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Spend ($)</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input type="number" min="0" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The minimum spend required for reservations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="totalCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Capacity</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" min="0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="availableCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Spots</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" min="0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>
                  Upload your venue logo and images
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-32 w-32 rounded-md border flex items-center justify-center bg-muted">
                      <Image className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 400x400px. Max file size: 5MB.
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-48 w-full rounded-md border flex items-center justify-center bg-muted">
                      <Image className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">Upload Cover Image</Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 1200x400px. Max file size: 10MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Enter contact details and social media links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="info@venue.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="www.venue.com" {...field} />
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-3">Social Media</h3>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="@venue" {...field} />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input placeholder="VenueName" {...field} />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="@venue" {...field} />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
