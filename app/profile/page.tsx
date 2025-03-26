import { Metadata } from "next"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileForm from "@/components/profile/profile-form"

export const metadata: Metadata = {
  title: "Profile | ResoConnect",
  description: "Manage your venue profile",
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <ProfileHeader />
      <ProfileForm />
    </div>
  )
}
