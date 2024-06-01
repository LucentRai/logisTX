import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditProduct } from "../../services/apiProducts";


export function useCreateProduct(){
	const queryClient = useQueryClient();

	const {mutate: createProduct, isLoading: isCreating, isSuccess} = useMutation({
		mutationFn: createEditProduct,
		onSuccess: () => {
			toast.success('Product added successfully');
			queryClient.invalidateQueries('products');
		},
		onError: err => toast.error(err.message)
	});

	return {createProduct, isCreating, isSuccess};
}