"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Icons from "../global/icons"
import Wrapper from "../global/wrapper"
import { Button } from "../ui/button"
import MobileMenu from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"
import { UserCircle } from "lucide-react"

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Build", href: "/form" },
  { name: "Analyse", href: "/analyse" },
  { name: "FAQ", href: "/faq" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
]

const Nav2 = () => {
  const router = useRouter(); // ✅ Fix: Define router

  return (
    <header className="sticky top-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50">
      <Wrapper className="h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Icons.icon className="w-6" />
            <span className="text-xl font-semibold hidden lg:block">ATSOptimizer</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ name, href }) => (
              <Link key={href} href={href} className="text-sm font-medium hover:text-blue-500 transition">
                {name}
              </Link>
            ))}
          </nav>

          {/* Right-side Icons & Profile Button */}
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => router.push("/profile")}>
              <UserCircle className="mr-2 h-4 w-4" />
              My Profile
            </Button>
            <MobileMenu />
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default Nav2;
