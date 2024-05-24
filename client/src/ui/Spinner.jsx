import PropTypes from 'prop-types';

function Spinner({width = 3}) {
	return (
		<div className="spinner-border text-primary" style={{width: `${width}rem`, height: `${width}rem`}} role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);
}

Spinner.propTypes = {
	width: PropTypes.string,
};

export default Spinner;