import { getOrderById } from "../../services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export function useOrder(orderId){
	const {
		data: {document: order} = {},
		error,
		isLoading
	} = useQuery({
		queryKey: ['order'],
		queryFn: () => getOrderById(orderId),
		retry: false
	});

	return {
		count: order ? order.length : 0,
		error,
		isLoading,
		order
	};
}