import axios from "axios";

export async function getAll(url){
	try{
		const response = await axios.get(url);
		return response.data;
	}
	catch(error){
		console.error(error);
		throw new Error(`Error getting data from ${url}`);
	}
}

export async function patchData(url, data) {
		try {
				const response = await axios.patch(url, data);
				return response.data;
		} catch (error) {
				console.error(error);
				throw new Error(`Error patching data to ${url}`);
		}
}