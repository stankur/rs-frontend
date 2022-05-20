import styled from "styled-components";

const HighlightedText = styled.span`
	display: inline-flex;
	padding: 5px;

	background-color: ${(props) => {
		return props.backgroundColor;
	}};
	border-radius: 5px;

	font-weight: bold;
`;

export default HighlightedText;
