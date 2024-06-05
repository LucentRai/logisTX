import { getAll } from "./apiHelper";

export async function getCustomers(){
	return getAll('/customers');
}