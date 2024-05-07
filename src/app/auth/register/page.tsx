import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Register'
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}