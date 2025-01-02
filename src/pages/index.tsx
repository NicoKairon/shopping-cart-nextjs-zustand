import { useEffect, useState } from "react"

import Header from "@/components/ui/Header"
import Drawer from "@/components/ui/Drawer"
import Cart from "@/components/minicart/Cart"
import ProductList from "@/components/products/ProductList"

import { useProductsStore } from "@/stores/useProductsStore"
import NavBar from "@/components/ui/NavBar"

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
			{/* <Header onCartIconClick={handleCartIconClick} /> */}
			<NavBar />
			<Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
				<Cart />
			</Drawer>
			<main className='px-6 py-8 mx-auto'>
				{isLoading ? <div className='text-lg text-center'>Loading...</div> : <ProductList products={products} />}
			</main>
		</>
	)
}

export default Home;