import { useQuery } from '@tanstack/react-query';
import { getAllTransports } from '../../services/apiTransports';

export function useTransports(){
	const {
		isLoading,
		data: {documents: transports} = {},
		error,
	} = useQuery({
		queryKey: ['transports'],
		queryFn: () => getAllTransports()
	});

	return {count: transports.length, isLoading, transports, error};
}