export interface Product {
	id: number;
	price: number;
	quantity: number;
	sync_variants: Array<{
		currency: string;
		retail_price: number;
		// Add any other properties that are part of the sync_variant
	}>;
	sync_product: {
		thumbnail_url: string;
		name: string;
		// Add any other properties that are part of the sync_product
	};
	external_id: string;
	is_ignored: boolean;
	name: string;
	synced: boolean;
	thumbnail_url: string;
	// Add any other properties that are part of the Product type
}

type ProductDetails = {
	sync_product: SyncProduct;
	sync_variants: SyncVariant[];
}

type SyncVariant = {
	availability_status: string;
	color: string;
	currency: string;
	external_id: string;
	files: Array<{ url: string; type: string }>;
	id: number;
	is_ignored: boolean;
	main_category_id: number;
	name: string;
	options: Array<{ name: string; value: string }>;
	product: {
		variant_id: number;
		product_id: number;
		image: string;
		name: string;
	};
	retail_price: number;
	size: string;
	sku: string;
	sync_product_id: number;
	synced: boolean;
	variant_id: number;
	warehouse_product_id: number | null;
	warehouse_product_variant_id: number | null;
};

type SyncProduct = {
	external_id: string;
	id: number;
	is_ignored: boolean;
	name: string;
	synced: number;
	thumbnail_url: string;
	variants: number;
	price: number;
	description: string;
	sync_variants: SyncVariant[];
};

export type { Product, ProductDetails, SyncProduct, SyncVariant }
