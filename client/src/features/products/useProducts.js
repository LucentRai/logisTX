import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiProducts";

export function useProducts(){
	const {
		data: {documents: products} = {},
		isLoading
	} = useQuery({
		queryKey: ['products'],
		queryFn: getAllProducts
	});

	console.log(products);

	return {count: products.length, products, isLoading};
}