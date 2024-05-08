import Link from "next/link";
import { Poppins } from 'next/font/google'
import { LoginButton } from '@/components/auth/login-button';
import { sourceCode } from "@/components/site";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center from-sky-400 to-blue-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]">
      <div className="space-y-6 text-center text-white">
        <h1 className={cn(
          "text-6xl font-semibold  drop-shadow-md",
          font.className
        )}>
          🔐 Auth
        </h1>
        <p className="text-lg">A simple authentication service</p>
        <Link
          href={sourceCode}
          target="_blank"
          rel="noreferrer noopener"
          className="text-xs text-right font-extrabold cursor-pointer drop-shadow-xl"
        >
            Source Code
          </Link>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
