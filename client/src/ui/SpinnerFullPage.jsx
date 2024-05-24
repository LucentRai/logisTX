import Spinner from "./Spinner";
import styled from "styled-components";

const StyledSpinner = styled.div`
	margin: 2.5rem;
	height: calc(100vh - 5rem);
	backdrop-filter: blur(8px);
	background-color: rgba(255, 255, 255, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function SpinnerFullPage() {
	return (
		<StyledSpinner width={5}>
			<Spinner />
		</StyledSpinner>
	);
}

export default SpinnerFullPage;
