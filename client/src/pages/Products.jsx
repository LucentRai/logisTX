import ProductsTable from "../features/products/ProductsTable";
import AddProduct from "../features/products/AddProduct";

function Products(){
	return (
		<>
		<div className="d-flex justify-content-between align-items-end mb-2">
			<h1 className="h2 mb-0">Products</h1>
			<AddProduct />
		</div>
		<section className="section">
			<div className="row">
				<ProductsTable />
			</div>
		</section>
		</>
	);
}

export default Products;