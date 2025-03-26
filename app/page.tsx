import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function Home() {
  redirect("/dashboard")

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

