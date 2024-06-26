import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";

export function useProducts(){
	const {
		data: {documents: products} = {},
		error,
		isLoading
	} = useQuery({
		queryKey: ['products'],
		queryFn: getAllProducts
	});

	return {
		count: products? products.length : 0,
		error,
		isLoading,
		products,
	};
}