import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile as updateProfileApi } from "../../services/apiProfile";
import { toast } from "react-hot-toast";

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	const { mutate: updateProfile, isLoading: isEditing } = useMutation({
		mutationFn: ({ id, newProfile }) => updateProfileApi(id, newProfile),
		onSuccess: () => {
			toast.success("User Profile successfully updated");
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isEditing, updateProfile };
}