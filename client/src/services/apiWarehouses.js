import { getAll } from "./apiHelper";

export async function getAllWarehouses(){
	return getAll('/warehouses');
}