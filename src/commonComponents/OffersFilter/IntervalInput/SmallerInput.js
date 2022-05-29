import styled from "styled-components";

const SmallerInput = styled.input`
	padding: 11px;
	outline: none ;
	border: 0 ;
	display: inline-block;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	background-color: ${(props) => props.backgroundColor};

	flex-grow: 1;
`;

export default SmallerInput;