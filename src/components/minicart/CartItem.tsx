import { FaTrashAlt } from "react-icons/fa"

import { Product, ProductDetails } from "../../types.d"
import Image from "next/image"
import { useCartStore } from "../../stores/useCartStore"

type Props = {
	product: ProductDetails
}

const CartItem = ({ product }: Props) => {
	console.log('product:', product)
	const syncVariant = product.sync_variants[0]
	const syncProduct = product.sync_product
	const removeFromCart = useCartStore(state => state.removeFromCart)

	return (
		<li className='flex items-center justify-between gap-4 p-4 mb-2 shadow-md'>
			<div className='flex items-center'>
				<Image
					src={syncProduct.thumbnail_url}
					alt={syncProduct.name}
					width={100}
					height={100}
					className='w-10 h-10 mr-4 rounded-full'
				/>
				<div className='flex flex-col'>
					<span className='flex-1 font-bold'>{syncProduct.name}</span>
					<span className='font-bold text-gray-600'>{syncVariant.currency} {syncVariant.retail_price}</span>
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

export default CartItem