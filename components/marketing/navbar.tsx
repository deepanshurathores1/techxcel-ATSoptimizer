"use client"

import { useEffect, useState } from "react"
import { NAV_LINKS } from "@/constants"
import Link from "next/link"
import Icons from "../global/icons"
import Wrapper from "../global/wrapper"
import { Button } from "../ui/button"
import MobileMenu from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"

const Navbar = () => {
  // Handle hydration issues with a client-side check
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <header className="sticky top-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50">
      <Wrapper className="h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="flex items-center gap-2 cursor-pointer">
                <Icons.icon className="w-6" />
                <span className="text-xl font-semibold hidden lg:block">ATSOptimizer</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-4">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <li key={index} className="text-sm font-medium link">
                  <Link href={`/${link.name.toLowerCase()}`} passHref className="hover:text-blue-500 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right-side Icons & Buttons */}
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="hidden lg:flex gap-4">
              <Link href="/login" passHref>
                <Button variant="outline" className="rounded-lg border-gray-500 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-6 py-2">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button variant="blue" className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-md">
                  Sign Up
                </Button>
              </Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default Navbar
