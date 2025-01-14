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
import { useCartStore } from "../../stores/useCartStore"

type CartDrawerProps = {
	onRemove?: (id: string) => void;
	onClose?: () => void;
	open?: boolean;
};

const CartDrawer = (props: CartDrawerProps) => {
	// PROPS
	const { onRemove = () => {}, onClose = () => {}, open = false } = props

	// STORE
	const cart = useCartStore(state => state.cart)
	const removeFromCart = useCartStore(state => state.removeFromCart)

	// METHODS
	const subtotal = cart.reduce((total, product) => {
		const variant = product.sync_variants[0];
		const price = typeof variant.retail_price === 'number' ? variant.retail_price : parseFloat(variant.retail_price);
		const quantity = typeof product.quantity === 'number' ? product.quantity : parseFloat(product.quantity);
		return total + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
	}, 0)

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
					{cart.map((product) => (
						<div key={product.id} className="flex gap-4 py-4">
							<div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded aspect-square">
								<Image
									src={product.sync_product.thumbnail_url}
									alt={product.sync_product.name}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex flex-col justify-center flex-1">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="text-sm font-medium">
											{product.quantity}x {product.sync_product.name}
										</h3>
										<p className="mt-1 text-sm text-gray-500">{product.sync_variants[0].size || "Default Size"}</p>
									</div>
									<p className="text-sm font-medium">
										{product.sync_variants[0].currency}{(product.sync_variants[0].retail_price * product.quantity).toFixed(2)}
									</p>
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-0 rounded-full"
									onClick={() => removeFromCart(product)}
								>
									<X className="w-4 h-4" />
									<span className="sr-only">Remove {product.sync_product.name}</span>
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