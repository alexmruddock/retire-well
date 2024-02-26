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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Navbar />
          <div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
