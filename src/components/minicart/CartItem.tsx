import { FaTrashAlt } from "react-icons/fa"
import Image from "next/image"
import { useCartStore } from "../../stores/useCartStore"
import { Product } from "../../types.d"

interface CartItemProps {
	product: Product;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
	const syncVariant = product.sync_variants[0]
	const syncProduct = product.sync_product
	const removeFromCart = useCartStore(state => state.removeFromCart)
	const updateQuantity = useCartStore(state => state.updateQuantity)

	const handleIncrement = () => {
		updateQuantity(product.id, product.quantity + 1)
	}

	const handleDecrement = () => {
		if (product.quantity > 1) {
			updateQuantity(product.id, product.quantity - 1)
		}
	}

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
					<div className='flex items-center'>
						<button onClick={handleDecrement} className='px-2 py-1 text-white bg-red-500 rounded'>-</button>
						<span className='mx-2'>Quantity: {product.quantity}</span>
						<button onClick={handleIncrement} className='px-2 py-1 text-white bg-green-500 rounded'>+</button>
					</div>
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