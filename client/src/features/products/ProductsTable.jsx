import Table from "../../ui/Table";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import SpinnerFullPage from "../../ui/SpinnerFullPage";


function ProductsTable(){
	const {
		data: {documents: products} = {},
		isLoading
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts
	});

	if(isLoading){
		return <SpinnerFullPage />;
	}

	function render(row){
		return (
			<>
				<td>{row.name}</td>
				<td>{row.price}</td>
				<td>{row.stockQuantity}</td>
				{/* <td><img src={`/img/products/${row.imgUrl[0]}`} alt={row.name} style={{borderRadius: 'var(--bs-border-radius)', width: '80px', height: 'auto'}} /></td> */}
				<td>{row.weight}</td>
				<td>{row.dimensions.reduce((acc, cur) => acc * cur, 1)}</td>
			</>
		);
	}

	return (
		<Table>
			<Table.Head columns={["Name", "Price", "Stock", "Weight", "Volume"]} />
			<Table.Body
				data={products}
				render={render}/>
		</Table>
	);
}

export default ProductsTable;