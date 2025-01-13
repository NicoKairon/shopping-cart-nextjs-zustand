import React from "react"
import { FiShoppingCart } from "react-icons/fi"

import { useCartStore } from "../../stores/useCartStore"

import useFromStore from "@/hooks/useFromStore"

interface Props {
	onCartIconClick: () => void
}

export default function Header({ onCartIconClick }: Props) {
	const cart = useFromStore(useCartStore, state => state.cart)

	return (
		<header className='sticky top-0 z-10 flex items-center justify-between py-4 text-white bg-gray-900 h-14'>
			<nav className='container flex justify-between px-4 mx-auto md:w-10/12'>
				<span className='text-lg font-semibold'>My E-commerce</span>
				<div className='relative'>
					<button
						type='button'
						title='Mini Cart'
						className='flex items-center text-xl text-white'
						onClick={onCartIconClick}
					>
						<FiShoppingCart />
						<div className='w-5 h-5 -ml-1 text-sm text-white bg-blue-700 rounded-full'>{cart?.length}</div>
					</button>
				</div>
			</nav>
		</header>
	)
}
