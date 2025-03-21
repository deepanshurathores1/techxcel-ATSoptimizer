import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            ResumeBuilder
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/analyze">Analyze Resume</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/build">Build Resume</Link>
                </Button>
              </li>
            </ul>
          </nav>
          <Button>Sign In</Button>
        </div>
      </div>
    </header>
  )
}

