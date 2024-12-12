import { FaTrashAlt } from "react-icons/fa"

import { Product } from "../../types.d"
import Image from "next/image"
import { useCartStore } from "../../stores/useCartStore"

type Props = {
	product: Product
}

export default function CartItem({ product }: Props) {
	const removeFromCart = useCartStore(state => state.removeFromCart)

	return (
		<li className='flex items-center justify-between gap-4 p-4 mb-2 shadow-md'>
			<div className='flex items-center'>
				<Image
					src={product.thumbnail}
					alt={product.title}
					width={100}
					height={100}
					className='w-10 h-10 mr-4 rounded-full'
				/>
				<div className='flex flex-col'>
					<span className='flex-1 font-bold'>{product.title}</span>
					<span className='font-bold text-gray-600'>${product.price}</span>
					<span>Quantity: {product.quantity}</span>
				</div>
			</div>
			<div>
				<button
					title='Remove Item'
					className='ml-4 text-red-500 hover:text-red-600'
					onClick={() => removeFromCart(product)}
				>
					<FaTrashAlt size={18} />
				</button>
			</div>
		</li>
	)
}
