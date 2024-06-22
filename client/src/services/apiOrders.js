import { getAll } from "./apiHelper";

export async function getAllOrders(){
	return getAll('/orders');
}

export async function getOrderById(id){
	return getAll(`/orders/${id}`);
}