import { getAll } from "./apiHelper";

export async function getAllOrders(){
	return getAll('/orders');
}