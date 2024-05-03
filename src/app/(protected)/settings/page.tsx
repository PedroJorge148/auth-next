'use client'

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"

export default function SettingsPage() {
  const user = useCurrentUser()

  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={() => logout()}>Sign out</button>
    </div>
  )
}