import { getAll } from "./apiHelper";

export async function getWarehousesApi(){
	return getAll('/warehouses');
}