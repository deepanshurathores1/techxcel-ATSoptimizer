import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // Ensure this import is correct
import { ResumeProvider } from "@/context/resume-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create ATS-friendly resumes with ease",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased overflow-x-hidden`}
        suppressHydrationWarning // Suppress hydration warnings for this element
      >
        <ResumeProvider>
          {children}
          <Toaster />
        </ResumeProvider>
      </body>
    </html>
  );
}