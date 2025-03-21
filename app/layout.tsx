import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading, subheading } from "../constants/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/marketing/theme-provider";
import { ResumeProvider } from "@/context/resume-context"; // Import ResumeProvider
import type React from "react";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased overflow-x-hidden !scrollbar-hide",
          base.variable,
          heading.variable,
          subheading.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResumeProvider> {/* Wrap children with ResumeProvider */}
            <Toaster richColors theme="dark" position="top-right" />
            {children}
          </ResumeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}