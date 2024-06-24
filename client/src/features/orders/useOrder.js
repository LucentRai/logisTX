import { getOrderById } from "../../services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrder(orderId){
	const {
		data: {document} = {},
		error,
		isLoading
	} = useQuery({
		queryKey: ['order'],
		queryFn: () => getOrderById(orderId),
		retry: false
	});


	return { isLoading, error, order: document, count: document.length};
}