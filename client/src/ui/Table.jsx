import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const TableContext = createContext();

function Table({children}){
	const [numberOfColumns, setNumberOfColumns] = useState(0);

	return (
		<TableContext.Provider value={{numberOfColumns, setNumberOfColumns}}>
			<table className="table table-striped table-hover">
				{children}
			</table>
		</TableContext.Provider>
	);
}

Table.propTypes = {
	children: PropTypes.node.isRequired
};

function Head({columns}){
	const {setNumberOfColumns} = useContext(TableContext);

	useEffect(() => {
		setNumberOfColumns(columns.length + 1);
	}, [setNumberOfColumns, columns]);

	return (
		<thead className="table-primary fw-bold">
			<tr>
				<td>S.N.</td>
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

function Body({data, render, onRowClick}){
	const {numberOfColumns} = useContext(TableContext);

	if(!data.length){
		return <tbody><tr><td colSpan={numberOfColumns} className="display-4 p-2 text-center">No Data</td></tr></tbody>;
	}

	return (
		<tbody>
			{data.map((row, i) => (
				<tr key={i} onClick={() => onRowClick(row._id)}>
					<td>{i + 1}</td>
					{render(row)}
				</tr>
			))}
		</tbody>
	);
}

Body.propTypes = {
	data: PropTypes.array,
	render: PropTypes.func.isRequired,
	onRowClick: PropTypes.func
};

Table.Head = Head;
Table.Body = Body;

export default Table;