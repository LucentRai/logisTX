import { useQuery } from '@tanstack/react-query';
import { getAllTransports } from '../../services/apiTransports';

export function useTransports(){
	const {
		isLoading,
		data: {documents: transports} = {},
		error,
	} = useQuery({
		queryKey: ['transports'],
		queryFn: getAllTransports,
		enabled: true
	});

	return {
		count: transports ? transports.length : 0,
		isLoading,
		transports,
		error
	};
}