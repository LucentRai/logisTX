import axios from "axios";
import { getAll } from "./apiHelper";

export async function createEditProduct(newProduct, id){
	let promise;

	if(id){
		promise = axios.patch(`/products/${id}`, newProduct);
	}
	else{
		promise = axios.post('/products', newProduct);
	}

	return promise.then(response => {
		return response.data;
	})
	.catch(error => {
		console.error(error);
		throw new Error('Error creating product');
	});
}

export function getAllProducts(){
	return getAll('/products');
}