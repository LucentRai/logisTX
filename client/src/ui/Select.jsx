import PropTypes from 'prop-types';

function Select({label, options, value, onChange, props}){

	return (
		<select className="form-select" aria-label={label} onChange={onChange} {...props} value={value}>
			{options.map((option, index) => (
				<option key={index} value={option.value}>{option.label}</option>
			))}
		</select>
	);
}

Select.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	props: PropTypes.object,
};

export default Select;