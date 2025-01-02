"use client"

import Link from "next/link"
import { Search, User, ShoppingBag } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-6 border-b">
      <div className="flex items-center space-x-8">
        <Link
          href="/winter-sale"
          className="text-sm transition-colors hover:text-gray-600"
        >
          WINTER SALE
        </Link>
        <Link
          href="/shop"
          className="text-sm transition-colors hover:text-gray-600"
        >
          SHOP
        </Link>
        <Link
          href="/about"
          className="text-sm transition-colors hover:text-gray-600"
        >
          ABOUT
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-sm">
              EN
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Français</DropdownMenuItem>
            <DropdownMenuItem>Deutsch</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5" />
          <span className="sr-only">Search</span>
        </Button>

        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
          <span className="sr-only">Account</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="sr-only">Shopping cart</span>
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 -mt-1 -mr-1 text-xs text-white bg-black rounded-full">
            0
          </span>
        </Button>
      </div>
    </nav>
  )
}

export default NavBar;