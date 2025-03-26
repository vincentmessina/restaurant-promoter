import type { BlockedDate, Guest, GuestlistEntry, Profile, Reservation, ReservationStats, Table } from "./types"

// Mock data for reservations
const reservations: Reservation[] = [
  {
    id: "1",
    guestName: "John Smith",
    date: "2025-03-18",
    time: "19:00",
    guestCount: 4,
    tableNumber: 5,
    status: "confirmed",
    specialRequests: "Window seat preferred",
    isVip: true,
    promoterId: "p1",
    promoterName: "Mike Davis",
  },
  {
    id: "2",
    guestName: "Emily Johnson",
    date: "2025-03-18",
    time: "20:00",
    guestCount: 2,
    tableNumber: 3,
    status: "confirmed",
    isVip: false,
    promoterId: "p1",
    promoterName: "Mike Davis",
  },
  {
    id: "3",
    guestName: "Michael Brown",
    date: "2025-03-19",
    time: "18:30",
    guestCount: 6,
    tableNumber: 10,
    status: "pending",
    specialRequests: "Birthday celebration",
    isVip: false,
    promoterId: "p2",
    promoterName: "Sarah Jones",
  },
  {
    id: "4",
    guestName: "Sarah Davis",
    date: "2025-03-19",
    time: "19:30",
    guestCount: 3,
    tableNumber: 7,
    status: "confirmed",
    isVip: false,
    promoterId: "p2",
    promoterName: "Sarah Jones",
  },
  {
    id: "5",
    guestName: "Robert Wilson",
    date: "2025-03-20",
    time: "20:30",
    guestCount: 2,
    tableNumber: 2,
    status: "canceled",
    specialRequests: "Allergic to nuts",
    isVip: true,
    promoterId: "p3",
    promoterName: "Chris Wilson",
  },
  {
    id: "6",
    guestName: "Jennifer Lee",
    date: "2025-03-20",
    time: "18:00",
    guestCount: 4,
    tableNumber: 8,
    status: "confirmed",
    isVip: false,
    promoterId: "p3",
    promoterName: "Chris Wilson",
  },
  {
    id: "7",
    guestName: "David Martinez",
    date: "2025-03-21",
    time: "19:00",
    guestCount: 5,
    tableNumber: 9,
    status: "confirmed",
    specialRequests: "Celebrating anniversary",
    isVip: true,
    promoterId: "p1",
    promoterName: "Mike Davis",
  },
  {
    id: "8",
    guestName: "Lisa Anderson",
    date: "2025-03-21",
    time: "20:00",
    guestCount: 2,
    tableNumber: 4,
    status: "pending",
    isVip: false,
    promoterId: "p2",
    promoterName: "Sarah Jones",
  },
]

// Mock data for tables - updated for nightclub layout
const tables: Table[] = [
  // VIP tables around DJ
  { id: "vip-1", number: 1, capacity: 6, status: "reserved" },
  { id: "vip-2", number: 2, capacity: 6, status: "occupied" },
  { id: "vip-3", number: 3, capacity: 6, status: "available" },
  { id: "vip-4", number: 4, capacity: 6, status: "reserved" },

  // Top bar seating
  { id: "tb-1", number: 5, capacity: 2, status: "available" },
  { id: "tb-2", number: 6, capacity: 2, status: "occupied" },
  { id: "tb-3", number: 7, capacity: 2, status: "available" },
  { id: "tb-4", number: 8, capacity: 2, status: "reserved" },
  { id: "tb-5", number: 9, capacity: 2, status: "available" },
  { id: "tb-6", number: 10, capacity: 2, status: "occupied" },
  { id: "tb-7", number: 11, capacity: 2, status: "available" },

  // Bottom bar seating
  { id: "bb-1", number: 12, capacity: 2, status: "available" },
  { id: "bb-2", number: 13, capacity: 2, status: "occupied" },
  { id: "bb-3", number: 14, capacity: 2, status: "reserved" },
  { id: "bb-4", number: 15, capacity: 2, status: "available" },
  { id: "bb-5", number: 16, capacity: 2, status: "occupied" },
  { id: "bb-6", number: 17, capacity: 2, status: "reserved" },
  { id: "bb-7", number: 18, capacity: 2, status: "available" },

  // Left wall seating
  { id: "lw-1", number: 19, capacity: 2, status: "available" },
  { id: "lw-2", number: 20, capacity: 2, status: "occupied" },
  { id: "lw-3", number: 21, capacity: 2, status: "reserved" },
  { id: "lw-4", number: 22, capacity: 2, status: "available" },
  { id: "lw-5", number: 23, capacity: 2, status: "occupied" },
  { id: "lw-6", number: 24, capacity: 2, status: "reserved" },

  // Right wall booths
  { id: "rb-1", number: 25, capacity: 4, status: "available" },
  { id: "rb-2", number: 26, capacity: 4, status: "occupied" },
  { id: "rb-3", number: 27, capacity: 4, status: "reserved" },
  { id: "rb-4", number: 28, capacity: 4, status: "available" },
]

// Mock data for blocked dates
const blockedDates: BlockedDate[] = [
  {
    id: "1",
    date: "2025-03-25",
    allDay: true,
    reason: "private_event",
  },
  {
    id: "2",
    date: "2025-04-01",
    allDay: false,
    startTime: "18:00",
    endTime: "21:00",
    reason: "maintenance",
  },
  {
    id: "3",
    date: "2025-04-15",
    allDay: true,
    reason: "holiday",
  },
]

// Mock data for guests
const guests: Guest[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    isVip: true,
    isActive: true,
    notes: "Prefers window seating, allergic to shellfish",
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "(555) 234-5678",
    isVip: false,
    isActive: true,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    isVip: false,
    isActive: true,
    notes: "Celebrates birthday in March",
  },
  {
    id: "4",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    phone: "(555) 456-7890",
    isVip: false,
    isActive: true,
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "(555) 567-8901",
    isVip: true,
    isActive: true,
    notes: "Allergic to nuts",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "(555) 678-9012",
    isVip: false,
    isActive: false,
  },
  {
    id: "7",
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "(555) 789-0123",
    isVip: true,
    isActive: true,
    notes: "Anniversary in April",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "(555) 890-1234",
    isVip: false,
    isActive: true,
  },
]

// Mock data for guestlist
const guestlist: GuestlistEntry[] = [
  {
    id: "1",
    name: "Alex Johnson",
    size: 4,
    maleCount: 2,
    femaleCount: 2,
    promoter: "Mike Davis",
    isVip: true,
    checkedIn: true,
    arrivalTime: "10:30 PM",
    notes: "Birthday celebration",
  },
  {
    id: "2",
    name: "Jessica Smith",
    size: 3,
    maleCount: 1,
    femaleCount: 2,
    promoter: "Mike Davis",
    isVip: false,
    checkedIn: true,
    arrivalTime: "11:15 PM",
  },
  {
    id: "3",
    name: "Ryan Williams",
    size: 2,
    maleCount: 1,
    femaleCount: 1,
    promoter: "Sarah Jones",
    isVip: false,
    checkedIn: false,
  },
  {
    id: "4",
    name: "Sophia Garcia",
    size: 6,
    maleCount: 3,
    femaleCount: 3,
    promoter: "Sarah Jones",
    isVip: true,
    checkedIn: false,
    notes: "Regular VIP guests",
  },
  {
    id: "5",
    name: "Daniel Brown",
    size: 2,
    maleCount: 2,
    femaleCount: 0,
    promoter: "Chris Wilson",
    isVip: false,
    checkedIn: true,
    arrivalTime: "10:45 PM",
  },
  {
    id: "6",
    name: "Emma Martinez",
    size: 5,
    maleCount: 2,
    femaleCount: 3,
    promoter: "Chris Wilson",
    isVip: false,
    checkedIn: false,
  },
  {
    id: "7",
    name: "Tyler Robinson",
    size: 8,
    maleCount: 4,
    femaleCount: 4,
    promoter: "Mike Davis",
    isVip: true,
    checkedIn: false,
    notes: "Bachelor party",
  },
  {
    id: "8",
    name: "Olivia Lee",
    size: 4,
    maleCount: 0,
    femaleCount: 4,
    promoter: "Sarah Jones",
    isVip: false,
    checkedIn: true,
    arrivalTime: "11:30 PM",
  },
]

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all reservations
export async function getReservations(): Promise<Reservation[]> {
  await delay(500) // Simulate API delay
  return [...reservations]
}

// Get upcoming reservations
export async function getUpcomingReservations(): Promise<Reservation[]> {
  await delay(500) // Simulate API delay
  return reservations
    .filter((r) => r.status !== "canceled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
}

// Get reservation stats
export async function getReservationStats(): Promise<ReservationStats> {
  await delay(500) // Simulate API delay

  const todayReservations = reservations.filter((r) => r.date === "2025-03-18" && r.status !== "canceled").length

  const availableTables = tables.filter((t) => t.status === "available").length

  const expectedGuests = reservations
    .filter((r) => r.date === "2025-03-18" && r.status !== "canceled")
    .reduce((sum, r) => sum + r.guestCount, 0)

  const vipGuests = reservations
    .filter((r) => r.date === "2025-03-18" && r.status !== "canceled" && r.isVip)
    .reduce((sum, r) => sum + r.guestCount, 0)

  return {
    todayReservations,
    todayReservationsChange: 15,
    availableTables,
    totalTables: tables.length,
    expectedGuests,
    expectedGuestsChange: 8,
    vipGuests,
    vipGuestsPercentage: Math.round((vipGuests / expectedGuests) * 100),
  }
}

// Get all tables
export async function getTables(): Promise<Table[]> {
  await delay(500) // Simulate API delay
  return [...tables]
}

// Get all blocked dates
export async function getBlockedDates(): Promise<BlockedDate[]> {
  await delay(500) // Simulate API delay
  return [...blockedDates]
}

// Get all guests
export async function getGuests(): Promise<Guest[]> {
  await delay(500) // Simulate API delay
  return [...guests]
}

// Get all guestlist entries
export async function getGuestlist(): Promise<GuestlistEntry[]> {
  await delay(500) // Simulate API delay
  return [...guestlist]
}

// Mock data for venue profile
const profile: Profile = {
  id: "venue-1",
  venueName: "Skyline Lounge",
  venueLocation: "Rooftop • Downtown",
  venueDescription: "Experience nightlife from a new perspective at our exclusive rooftop venue featuring world-class DJs and premium bottle service.",
  musicGenres: ["EDM", "House"],
  operatingHours: {
    openTime: "10:00 PM",
    closeTime: "4:00 AM"
  },
  minimumSpend: 500,
  capacity: {
    total: 250,
    available: 25
  },
  logoUrl: "/images/logo.png",
  contactInfo: {
    email: "info@skylinelounge.com",
    phone: "(555) 123-4567",
    website: "www.skylinelounge.com"
  },
  socialMedia: {
    instagram: "@skylinelounge",
    facebook: "SkylineLounge",
    twitter: "@SkylineLounge"
  }
}

// Get profile data
export async function getProfile(): Promise<Profile> {
  await delay(300) // Simulate API delay
  return {...profile}
}

