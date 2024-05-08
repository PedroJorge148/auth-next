import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Auth Next',
    default: 'Auth Next',
  },
  description: 'A simple authentication service with Auth Next v5!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
    <head />
    <body
      className={cn(
        'min-h-screen bg-background font-sans antialiased overflow-hidden',
        fontSans.variable
      )}
    >{children}</body>
    </html>
  );
}
