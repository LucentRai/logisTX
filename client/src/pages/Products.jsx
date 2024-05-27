import ProductsTable from "../features/products/ProductsTable";


function Products(){
	const data = [];
	
	return (
		<>
		<h1 className="h2">Products</h1>
		<section className="section">
			<div className="row">
				<ProductsTable data={data} />
			</div>
		</section>
		</>
	);
}

export default Products;