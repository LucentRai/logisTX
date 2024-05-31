import axios from "axios";

export async function createEditProduct(newProduct, id){
	let promise;

	if(id){
		promise = axios.patch(`/products/${id}`, newProduct);
	}
	else{
		promise = axios.post('/products', newProduct);
	}

	promise.then(response => {
		console.log(response);
		return response.data;
	})
	.catch(error => {
		console.error(error);
		throw new Error('Error creating product');
	});
}

export async function getProducts(){
	return axios.get('/products')
		.then(response => {
			return response.data;
		})
		.catch(() => {
			throw new Error('Error getting products');
		});
}