import Image from "next/image"
import { useState, useEffect } from "react"
import { useCartStore } from "../../stores/useCartStore"
import { Product, ProductDetails, SyncProduct, SyncVariant } from "@/types.d"
import axios from "axios"

type Props = {
	product: Product
}



const ProductCard = ({ product }: Props) =>{
	const [productDetails, setProductDetails] = useState<ProductDetails>()

	const syncProduct: SyncVariant = productDetails?.sync_variants[0]

	const fetchProductDetails = async (id: number) => {
		try {
			const response = await axios.get(`/api/products/${id}`)
			setProductDetails(response.data.result)
		} catch (error) {
			console.error("Error fetching product details:", error)
		}
	}

	useEffect(() => {
		fetchProductDetails(product.id)
	}, [product.id])

	const addToCart = useCartStore(state => state.addToCart)

	return (
		<div className='flex flex-col justify-between p-4 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl '>
			<Image
				src={product.thumbnail_url}
				alt={product.name}
				width={100}
				height={100}
				className='object-contain w-full h-40'
				priority
			/>
			<div className='flex flex-col justify-between flex-1'>
				<h2 className='text-lg font-semibold'>{product.name}</h2>
					{productDetails && (
						<>
							<p className='text-gray-600'>{syncProduct.product.name}</p>
							<span className='font-semibold text-gray-800'>{syncProduct.currency} {syncProduct.retail_price}</span>
						</>
					)}
				<div className='flex items-center justify-between mt-4'>
					<button
						type='button'
						className='px-4 py-2 ml-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600'
						onClick={() => addToCart({ ...product, ...productDetails })}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard;