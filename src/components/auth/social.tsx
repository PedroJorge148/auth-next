'use client'

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  function onClick(provider: 'google' | 'github') {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="flex items-center w-full gap-2">
      <Button 
        size="lg"
        variant="outline"
        onClick={() => onClick('google')}
        className="w-full"
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button 
        size="lg"
        variant="outline"
        onClick={() => onClick('github')}
        className="w-full"
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  )
}