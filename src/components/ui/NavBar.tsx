"use client"

import Link from "next/link"
import { Menu, Search, User, ShoppingBag } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FiShoppingCart } from "react-icons/fi"
import { useCartStore } from "../../stores/useCartStore"

interface Props {
  onCartIconClick: () => void
}

const NavBar = ({ onCartIconClick }: Props) => {
  const cart = useCartStore(state => state.cart)

  return (
    <nav className="flex items-center justify-between h-16 px-4 border-b lg:px-6">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="mr-4">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col mt-4 space-y-4">
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
          </SheetContent>
        </Sheet>

        <div className="hidden lg:flex lg:items-center lg:space-x-8">
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
      </div>

      <div className="absolute flex flex-col items-center -translate-x-1/2 left-1/2 lg:static lg:transform-none">
        <Link href="/" className="text-xl font-semibold">
          ERSTWHILE
        </Link>
        <span className="text-[10px] tracking-wider">SPORT LOVING GOODS</span>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden lg:inline-flex">
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

        <Button variant="ghost" size="icon" className="hidden lg:inline-flex">
          <Search className="w-5 h-5" />
          <span className="sr-only">Search</span>
        </Button>

        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
          <span className="sr-only">Account</span>
        </Button>

        <button
          type='button'
          title='Mini Cart'
          className='flex items-center text-xl'
          onClick={onCartIconClick}
        >
          <FiShoppingCart />
          <div className='w-4 h-4 -mt-4 -ml-1 text-xs text-white bg-blue-700 rounded-full'>{cart?.length}</div>
        </button>
      </div>
    </nav>
  )
}

export default NavBar;