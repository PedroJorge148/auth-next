import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "./settings/navbar";
import { Toaster } from "sonner";

export default async function ProtectedLayout({ 
  children 
}: { 
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className="h-full w-full flex flex-col gap-10 items-center justify-center from-sky-400 to-blue-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]">
        <Navbar />
        {children}
        <Toaster  richColors closeButton />
      </div>
    </SessionProvider>
  )
}