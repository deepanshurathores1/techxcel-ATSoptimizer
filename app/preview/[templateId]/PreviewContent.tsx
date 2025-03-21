"use client"

import { useRef, useEffect, useState, useCallback, useMemo } from "react"
// ...existing imports...

export default function PreviewContent({ templateId }: { templateId: string }) {
  // ...existing component code from PreviewPage...
  // Move all the existing code except the templates object here
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return null on server-side and first render
  }

  return (
    // ...existing JSX...
  )
}