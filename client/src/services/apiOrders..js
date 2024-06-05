import axios from "axios";

export async function getAllOrders(){
	return axios.get('/orders')
		.then(response => {
			return response.data;
		})
		.catch(() => {
			throw new Error('Error getting orders');
		});
}