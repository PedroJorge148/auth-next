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
      <div className="h-full from-sky-400 to-blue-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] overflow-y-auto">
        <div className="flex flex-col py-4 gap-10 items-center justify-center">
          <Navbar />
          {children}
          <Toaster  richColors closeButton />
        </div>
      </div>
    </SessionProvider>
  )
}