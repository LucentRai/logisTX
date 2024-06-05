import axios from "axios";

export async function getAllOrders(){
	try{
		const response = await axios.get('/orders');
		return response.data;
	}
	catch(error){
		console.error(error);
		throw new Error('Error getting orders');
	}
}