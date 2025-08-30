'use client'
import { Button } from '@/components/ui/button'
import { signOut } from "next-auth/react"

export const PageBase = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      Dashboard
    </div>
  )
}
