import styled from "styled-components";
import SmallerInput from "./OffersFilter/IntervalInput/SmallerInput";

const ColoredInput = styled(SmallerInput)`
	border-width: 1px;
	border-style: solid;
	border-color: ${(props) => {
		if (props.error) {
			return "#f98080";
		}

		return "#68fee0";
	}};
	&:focus {
		outline: none !important;
	}
`;

export default ColoredInput;
