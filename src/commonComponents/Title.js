import HighlightedText from "./OfferPanel/HighlightedText";
import styled from "styled-components"

const Title = styled(HighlightedText)`
	display: inline-flex;
	flex-direction: column;
	gap: 9px;

	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

export default Title;
