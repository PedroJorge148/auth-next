import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: 'Register'
}

export default function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}