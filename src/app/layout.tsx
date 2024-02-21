import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import Navbar from "@/app/components/navbar";

export const metadata: Metadata = {
  title: "RetireWell",
  description: "Vertical SaaS for assisted living facilities.",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )} >
          <Navbar />
          <div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
