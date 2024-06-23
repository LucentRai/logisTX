import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditTransport } from "../../services/apiTransports";


export function useCreateTransport(){
	const queryClient = useQueryClient();

	const {mutate: createTransport, isPending: isCreating, isSuccess} = useMutation({
		mutationFn: createEditTransport,
		onSuccess: () => {
			toast.success('Transport added successfully');
			queryClient.invalidateQueries('transports');
		},
		onError: err => toast.error(err.message)
	});

	return {createTransport, isCreating, isSuccess};
}