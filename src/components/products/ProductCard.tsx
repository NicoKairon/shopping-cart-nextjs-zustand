import Image from "next/image"

import { useCartStore } from "../../stores/useCartStore"

import { Product } from "@/types.d"

interface Props {
	product: Product
}

export default function ProductCard({ product }: Props) {
	console.log('product', product)
	const PRINTFUL_API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API_KEY;

	const addToCart = useCartStore(state => state.addToCart)

	return (
		<div className='flex flex-col justify-between p-4 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl '>
			<Image
				src={product.thumbnail_url}
				alt={product.name}
				width={100}
				height={100}
				className='object-contain w-full h-40'
			/>
			<div className='flex flex-col justify-between flex-1'>
				<h2 className='text-lg font-semibold'>{product.name}</h2>
				<p className='flex-1 text-gray-600'>{product.name}</p>
				<div className='flex items-center justify-between mt-4'>
					{/* <span className='font-semibold text-gray-800'>${product}</span> */}
					<button
						type='button'
						className='px-4 py-2 ml-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600'
						onClick={() => addToCart(product)}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	)
}
