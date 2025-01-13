import { create } from "zustand"

import { Product } from "../types"
import axios from "axios"

type State = {
	products: Product[]
	isLoading: boolean
	error: unknown
}

type Actions = {
	fetchData: () => Promise<void>
}

const INITIAL_STATE: State = {
	products: [],
	isLoading: false,
	error: null,
}

export const useProductsStore = create<State & Actions>(set => ({
	products: INITIAL_STATE.products,
	isLoading: INITIAL_STATE.isLoading,
	error: INITIAL_STATE.error,
	fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get("/api/products/fetchProducts"); // Adjust to match the fixed route
      console.log("Fetched products:", response.data.result);
      set({ products: response.data.result, isLoading: false }); // Ensure this matches Printful's response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching products from Printful:", error.response?.data || error.message);
      } else {
        console.error("Error fetching products from Printful:", error);
      }
      set({ error, isLoading: false });
    }
  },
}))
