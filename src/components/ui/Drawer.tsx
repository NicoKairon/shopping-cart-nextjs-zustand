"use client"

import React from "react"
import Image from "next/image"
import { X } from 'lucide-react'
import {
	Sheet,
	SheetContent,
	SheetHeader,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type CartItem = {
	id: string
	name: string
	price: number
	size: string
	image: string
	quantity: number
	currency: string
}

type CartDrawerProps = {
	items?: CartItem[]
	onRemove?: (id: string) => void
	onClose?: () => void
	open?: boolean
}

const CartDrawer = ({
	items = [],
	onRemove = () => {},
	onClose = () => {},
	open = false
}: CartDrawerProps) => {
	const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

	return (
		<Sheet open={open} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-md">
				<SheetHeader className="flex justify-end">
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full"
						onClick={onClose}
					>
						<X className="w-4 h-4" />
						<span className="sr-only">Close cart</span>
					</Button>
				</SheetHeader>
				<ScrollArea className="h-[calc(100vh-12rem)] pr-4">
					{items.map((item) => (
						<div key={item.id} className="flex gap-4 py-4">
							<div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded aspect-square">
								<Image
									src={item.image}
									alt={item.name}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex flex-col justify-center flex-1">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="text-sm font-medium">
											{item.quantity}x {item.name}
										</h3>
										<p className="mt-1 text-sm text-gray-500">{item.size}</p>
									</div>
									<p className="text-sm font-medium">
										{item.currency}{(item.price * item.quantity).toFixed(2)}
									</p>
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-0 rounded-full"
									onClick={() => onRemove(item.id)}
								>
									<X className="w-4 h-4" />
									<span className="sr-only">Remove {item.name}</span>
								</Button>
							</div>
						</div>
					))}
				</ScrollArea>
				<div className="pt-6 space-y-4">
					<div className="flex items-center justify-between text-sm">
						<span>Subtotal:</span>
						<span className="font-medium">€{subtotal.toFixed(2)}</span>
					</div>
					<div className="flex flex-col gap-2">
						<Button
							variant="default"
							size="lg"
							className="bg-[#02052D] hover:bg-[#02052D]/90"
						>
							Check out
						</Button>
						<Button
							variant="ghost"
							size="lg"
							className="text-[#02052D]"
							onClick={onClose}
						>
							Continue shopping
						</Button>
					</div>
					<Button
						variant="link"
						className="w-full text-[#02052D]"
					>
						View my cart
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default CartDrawer