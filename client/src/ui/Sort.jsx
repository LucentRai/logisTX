import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sort({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sort = searchParams.get("sort") || "";

	function handleChange(e) {
		searchParams.set("sort", e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<Select options={options}
			type="white"
			value={sort}
			onChange={handleChange}
		/>
	);
}

Sort.propTypes = {
	options: PropTypes.array.isRequired,
};

export default Sort;	