import PropTypes from 'prop-types';
import {useContext, useReducer} from 'react';

import styles from './SortArrow.module.scss';

function SortArrow({TableContext}) {
	const {sortBy} = useContext(TableContext);

	const defaultArrow = {
		asc: null,
		upArrow: 'bi bi-caret-up',
		downArrow: 'bi bi-caret-down',
	};

	const [arrow, dispatch] = useReducer((state, action) => {
		switch(action.type) {
			case 'asc':
				if(state.asc) return defaultArrow;

				return {
					asc: true,
					upArrow: 'bi bi-caret-up-fill',
					downArrow: 'bi bi-caret-down',
				};

			case 'desc':
				if(state.asc === false) return defaultArrow; // should compare with false because it can be null

				return {
					asc: false,
					upArrow: 'bi bi-caret-up',
					downArrow: 'bi bi-caret-down-fill',
				};

			default:
				return defaultArrow;
		}
	}, defaultArrow);

	return (
		<div className={"d-flex flex-column " + styles["sort-arrow"]}>
			{/* <i value="up-icon" className={upArrow} onClick={e => handleToggle(e)}></i> */}
			{/* <i value="down-icon" className={downArrow} onClick={e => handleToggle(e)}></i> */}

			<i className={arrow.upArrow} title="Sort in Ascending Order" onClick={() => dispatch({type: 'asc'})}></i>
			<i className={arrow.downArrow} title="Sort in Descending Order" onClick={() => dispatch({type: 'desc'})}></i>
		</div>
	);
}


SortArrow.propTypes = {
	TableContext: PropTypes.object.isRequired
};

export default SortArrow;