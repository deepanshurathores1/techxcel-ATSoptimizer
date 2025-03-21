import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading, subheading } from "../constants/fonts"; // Ensure fonts are correctly imported
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/marketing/theme-provider";
import type React from "react";

export const metadata = generateMetadata(); // Ensure this is correctly implemented

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased overflow-x-hidden !scrollbar-hide",
          base.variable,
          heading.variable,
          subheading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors theme="dark" position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}