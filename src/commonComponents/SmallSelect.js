import Select from "react-select";
import styled from "styled-components";

const SmallSelect = styled(Select).attrs(() => ({
	styles: {
		control: (base) => ({
			...base,
			border: "0 !important",
		}),
	},
}))`
	display: inline-block;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
`;

export default SmallSelect;
