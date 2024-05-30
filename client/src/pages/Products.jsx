import { PlusSquareFill } from "react-bootstrap-icons";
import styled from "styled-components";

import ProductsTable from "../features/products/ProductsTable";

const AddIcon = styled(PlusSquareFill)`
	font-size: 1.8rem;
	color: var(--bs-info);
	transition: color 0.2s;

	&:hover {
		color: var(--bs-primary);
	}
`;

function Products(){
	const data = [];
	
	return (
		<>
		<div className="d-flex justify-content-between align-items-center">
			<h1 className="h2">Products</h1>
			<a href="/products/add">
				<AddIcon />
			</a>
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