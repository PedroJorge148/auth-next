'use client'

import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog'
import { LoginForm } from "@/components/auth/login-form"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export function LoginButton({
  children,
  asChild,
  mode = 'redirect',
}: LoginButtonProps) {
  const router = useRouter()
  
  function onClick() {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}