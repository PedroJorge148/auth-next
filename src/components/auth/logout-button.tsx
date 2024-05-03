'use client'

import { logout } from "@/actions/logout"

interface LogoutButtonProps {
  children?: React.ReactNode
}

export function LogoutButton({ children }: LogoutButtonProps) {
  function onClick() {
    logout()
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}