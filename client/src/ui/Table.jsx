import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const TableContext = createContext();

function TableContextProvider({children}) {
	const [numberOfColumns, setNumberOfColumns] = useState(0);

	return (
		<TableContext.Provider value={{numberOfColumns, setNumberOfColumns}}>
			{children}
		</TableContext.Provider>
	);
}

TableContextProvider.propTypes = {
	children: PropTypes.node.isRequired
};

function Table({children}){

	return (
		<TableContextProvider>
			<table className="table table-striped">
				{children}
			</table>
		</TableContextProvider>
	);
}

Table.propTypes = {
	children: PropTypes.node.isRequired
};

function Head({columns}){
	const {setNumberOfColumns} = useContext(TableContext);
	setNumberOfColumns(columns.length);

	return (
		<thead className="table-primary">
			<tr>
				{columns.map((column, index) => (
					<td key={index}>{column}</td>
				))}
			</tr>
		</thead>
	);
}

Head.propTypes = {
	columns: PropTypes.array.isRequired
};

function Body({data}){
	const {numberOfColumns} = useContext(TableContext);

	if(!data.length){
		return <tbody><tr><td colSpan={numberOfColumns} className="display-4 p-2 text-center">No Data</td></tr></tbody>;
	}

	return (
		<tbody>
			{data.map((row, i) => (
				<tr key={i}>
					<td>{i + 1}</td>
					{Object.values(row).map((value, j) => (
						<td key={j}>{value}</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

Body.propTypes = {
	data: PropTypes.array.isRequired,
};

Table.Head = Head;
Table.Body = Body;

export default Table;