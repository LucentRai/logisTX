import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import Sort from '../../ui/Sort';

function OrdersTableOperations(){

	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: "all", label: "All" },
					{ value: "fulfilled", label: "Fulfilled" },
					{ value: "onRoute", label: "On Route" },
				]}
			/>

			<Sort
				options={[
					{ value: "startDate-desc", label: "Sort by date (recent first)" },
					{ value: "startDate-asc", label: "Sort by date (earlier first)" },
					{
						value: "totalPrice-desc",
						label: "Sort by amount (high first)",
					},
					{ value: "totalPrice-asc", label: "Sort by amount (low first)" },
				]}
			/>
		</TableOperations>
	);
}

export default OrdersTableOperations;