import ProductsTable from "../features/products/ProductsTable";
import AddProduct from "../features/products/AddProduct";


function Products(){
	const data = [];

	return (
		<>
		<div className="d-flex justify-content-between align-items-center">
			<h1 className="h2">Products</h1>
			<AddProduct />
		</div>
		<section className="section">
			<div className="row">
				<ProductsTable data={data} />
			</div>
		</section>
		</>
	);
}

export default Products;