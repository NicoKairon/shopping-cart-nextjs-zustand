import { useEffect, useState } from "react"

import Header from "@/components/ui/Header"
import Drawer from "@/components/ui/Drawer"
import Cart from "@/components/minicart/Cart"
import ProductList from "@/components/products/ProductList"

import { useProductsStore } from "@/stores/useProductsStore"

const Home = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const { products, isLoading, error, fetchData } = useProductsStore()

	useEffect(() => {
		fetchData()
	}, [fetchData])

	const handleCartIconClick = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}
	const PRINTFUL_API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API_KEY;
	console.log(PRINTFUL_API_KEY)

	return (
		<>
			<Header onCartIconClick={handleCartIconClick} />
			<Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
				<Cart />
			</Drawer>
			<main className='container px-4 py-8 mx-auto md:w-10/12'>
				{isLoading ? <div className='text-lg text-center'>Loading...</div> : <ProductList products={products} />}
			</main>
		</>
	)
}

export default Home;