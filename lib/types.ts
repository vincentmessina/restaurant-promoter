export interface Reservation {
  id: string
  guestName: string
  date: string
  time: string
  guestCount: number
  tableNumber: number
  status: string
  specialRequests?: string
  isVip: boolean
  promoterId?: string
  promoterName?: string
}

export interface Table {
  id: string
  number: number
  capacity: number
  status: "available" | "occupied" | "reserved"
}

export interface BlockedDate {
  id: string
  date: string
  allDay: boolean
  startTime?: string
  endTime?: string
  reason: string
}

export interface Guest {
  id: string
  name: string
  email: string
  phone: string
  isVip: boolean
  isActive: boolean
  notes?: string
}

export interface GuestlistEntry {
  id: string
  name: string
  size: number
  maleCount: number
  femaleCount: number
  promoter: string
  isVip: boolean
  checkedIn: boolean
  arrivalTime?: string
  notes?: string
}

export interface ReservationStats {
  todayReservations: number
  todayReservationsChange: number
  availableTables: number
  totalTables: number
  expectedGuests: number
  expectedGuestsChange: number
  vipGuests: number
  vipGuestsPercentage: number
}

export interface Profile {
  id: string
  venueName: string
  venueLocation: string
  venueDescription: string
  musicGenres: string[]
  operatingHours: {
    openTime: string
    closeTime: string
  }
  minimumSpend: number
  capacity: {
    total: number
    available: number
  }
  logoUrl: string
  contactInfo: {
    email: string
    phone: string
    website?: string
  }
  socialMedia: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
}

