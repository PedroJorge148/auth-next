'use client'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export function Social() {

  function onClick(provider: 'google' | 'github') {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
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