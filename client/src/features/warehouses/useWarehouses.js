import { useQuery } from '@tanstack/react-query';
import { getAllWarehouses } from '../../services/apiWarehouses';

export function useWarehouses(){
	const {
		isLoading,
		data: {documents: warehouses} = {},
		error,
	} = useQuery({
		queryKey: ['warehouses'],
		queryFn: () => getAllWarehouses()
	});

	return {
		count: warehouses ? warehouses.length : 0,
		isLoading,
		warehouses,
		error
	};
}