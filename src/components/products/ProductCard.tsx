"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCartStore } from "../../stores/useCartStore"
import { Product, ProductDetails, SyncVariant } from "@/types.d"
import axios from "axios"

interface ProductCardProps {
	product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
	// STATE
	const [productDetails, setProductDetails] = useState<ProductDetails>()

	// STORE
	const addToCart = useCartStore(state => state.addToCart)

	// EFFECTS
	useEffect(() => {
		fetchProductDetails(product.id)
	}, [product.id])

	// METHODS
	const fetchProductDetails = async (id: number) => {
		try {
			const response = await axios.get(`/api/products/${id}`)
			const productDetails = response.data.result

			if (productDetails.sync_variants) {
				productDetails.sync_variants = productDetails.sync_variants.map((variant: SyncVariant) => ({
					...variant,
					retail_price: typeof variant.retail_price === 'string'
					? parseFloat(variant.retail_price)
					: variant.retail_price
				}))
			}

			setProductDetails(productDetails)
		} catch (error) {
			console.error("Error fetching product details:", error)
		}
	}

	// VARS
	const syncProduct: SyncVariant | undefined = productDetails?.sync_variants[0]

	return (
		<div className="relative group">
			<div className="relative overflow-hidden bg-gray-100 aspect-square">
				<Image
					src={product.thumbnail_url}
					alt={product.name}
					fill
					className="object-cover"
					sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-end gap-4 transition-opacity opacity-0 bg-white/60 group-hover:opacity-100">
				{/* <div className="flex gap-2">
						{product.sizes.map((size) => (
							<Button
								key={size}
								variant="outline"
								size="sm"
								className={`h-8 w-8 p-0 bg-white hover:bg-white ${
									selectedSize === size ? 'bg-[#02052D] text-white hover:bg-[#02052D]' : ''
								}`}
								onClick={() => setSelectedSize(size)}
							>
								{size}
							</Button>
						))}
					</div> */}
					<Button
						variant="default"
						size="lg"
						className="bg-[#02052D] hover:bg-[#02052D]/90 w-[calc(100%-2rem)]"
						onClick={() => addToCart({ ...product, ...productDetails })}
					>
						Add to cart
					</Button>
				</div>
			</div>
			<div className="mt-4">
				<h3 className="text-sm font-medium">{product.name}</h3>
				{syncProduct && (
					<div className="flex gap-2 mt-1">
						{/* <span className="text-sm text-gray-500 line-through">
							{syncProduct.currency}{syncProduct.retail_price.toFixed(2)}
						</span> */}
						<span className="text-sm font-medium text-red-600">
							{syncProduct.currency}{syncProduct.retail_price.toFixed(2)}
						</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductCard;