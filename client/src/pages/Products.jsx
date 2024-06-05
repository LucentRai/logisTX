import { useQuery } from "@tanstack/react-query";

import ProductsTable from "../features/products/ProductsTable";
import AddProduct from "../features/products/AddProduct";
import { getProducts } from "../services/apiProducts";


function Products(){
	const {
		data: {documents: products} = {},
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts
	});


	return (
		<>
		<div className="d-flex justify-content-between align-items-end mb-2">
			<h1 className="h2 mb-0">Products</h1>
			<AddProduct />
		</div>
		<section className="section">
			<div className="row">
				<ProductsTable data={products} />
			</div>
		</section>
		</>
	);
}

export default Products;