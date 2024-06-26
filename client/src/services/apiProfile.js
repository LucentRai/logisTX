import { patchData } from "./apiHelper";

export async function updateProfile(id, data){
	console.log(id, data);
	return patchData(`/users/${id}`, data);
}