import { Button } from "../ui/button"
import ProductCard from "./ProductCard"

import { Product } from "@/types.d"

interface Props {
	products: Product[]
}

export default function ProductList({ products }: Props) {
	return (
    <div className="px-4 py-8 md:px-6 lg:px-2">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">T-SHIRTS</h1>
        <Button
          variant="default"
          className="bg-[#02052D] hover:bg-[#02052D]/90"
        >
          Filter and sort
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
