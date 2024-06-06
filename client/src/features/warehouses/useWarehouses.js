import { useQuery } from '@tanstack/react-query';
import { getWarehousesApi } from '../../services/apiWarehouses';

export function useWarehouses(){
	const {
		isLoading,
		data: {documents: warehouses} = {},
		error,
	} = useQuery({
		queryKey: ['warehouses'],
		queryFn: () => getWarehousesApi()
	});

	return {isLoading, warehouses, error};
}