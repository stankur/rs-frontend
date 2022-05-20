import React from "react";

import ContainerDiv from "./ContainerDiv";
import styled from "styled-components";

const AdditionalInformationBox = styled.span`
	font-family: sans-serif;
`;

function AdditionalInformation({ text }) {
	return (
		<ContainerDiv>
			<AdditionalInformationBox>{text}</AdditionalInformationBox>
		</ContainerDiv>
	);
}

export default AdditionalInformation;