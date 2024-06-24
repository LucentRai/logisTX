import axios from "axios";
import { getAll } from "./apiHelper";

export async function createEditTransport(newTransport, id){
	let promise;

	if(id){
		promise = axios.patch(`/transports/${id}`, newTransport);
	}
	else{
		promise = axios.post('/transports', newTransport);
	}

	return promise.then(response => {
		return response.data;
	})
	.catch(error => {
		console.error(error);
		throw new Error('Error creating transport');
	});
}

export function getAllTransports(){
	return getAll('/transports');
}