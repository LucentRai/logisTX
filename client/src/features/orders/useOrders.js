import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../services/apiOrders';

export function useOrders(){
	const {
		isLoading,
		data: {documents: orders} = {},
		error,
	} = useQuery({
		queryKey: ['orders'],
		queryFn: getAllOrders,
	});

	return {
		count: orders ? orders.length : 0,
		isLoading,
		orders,
		error
	};
}