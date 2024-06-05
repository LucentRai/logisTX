import axios from "axios";

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

export async function getProducts(){
	try{
		const response = await axios.get('/products');
		return response.data;
	}
	catch(error){
		console.error(error);
	throw new Error('Error getting products');
	}
}