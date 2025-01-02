import CartItem from "./CartItem"

import { useCartStore } from "../../stores/useCartStore"

import useFromStore from "../../hooks/useFromStore"

const Cart = () => {
	const cart = useFromStore(useCartStore, state => state.cart)
	console.log('cart:', cart)

	let total = 0
	if (cart) {
		total = cart.reduce((acc, product) => {
			console.log('Product:', product);
			const variant = product.sync_variants[0];
			const price = typeof variant.retail_price === 'number' ? variant.retail_price : parseFloat(variant.retail_price);
			const quantity = typeof product.quantity === 'number' ? product.quantity : parseFloat(product.quantity);
			console.log(`Calculating: ${price} * ${quantity}`);
			return acc + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
		}, 0)
	}

	return (
		<section>
			<h3 className='mb-4 text-2xl font-bold'>Shopping Cart</h3>
			<ul>
				{cart?.map(product => (
					<CartItem key={product.id} product={product} />
				))}
			</ul>
			<div className='flex items-center justify-between mt-4'>
				<span className='text-lg font-bold'>Total:</span>
				<span className='text-xl font-bold'>${total.toFixed(2)}</span>
			</div>
		</section>
	)
}

export default Cart
