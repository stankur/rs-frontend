import React from "react";
import { startCase } from "lodash";

import styled from "styled-components";

const GroupTitleContainer = styled.div`
	margin-bottom: 5px;

	font-family: sans-serif;
	font-weight: bold;
`;

const GroupTitle = styled.span`
	background-color: ${(props) => {
		return props.backgroundColor;
	}};
	white-space: nowrap;
	padding: 5px;
	border-radius: 5px;
`;

const ToggleDisplay = styled.span`
	background-color: ${(props) => {
		return props.toggleIconColor;
	}};
	padding: 2px;
	border-radius: 3px;
`;

function ExpandableTitle({
	isDetailsDisplayed,
	changeIsDisplayed,
	groupName,
	backgroundColor,
	toggleIconColor,
}) {
	return (
		<GroupTitleContainer>
			<GroupTitle backgroundColor={backgroundColor}>
				{startCase(groupName)}
				{"\u00A0"}
				<ToggleDisplay toggleIconColor={toggleIconColor} onClick={changeIsDisplayed}>
					{isDetailsDisplayed ? "↖" : "↘"}
				</ToggleDisplay>
			</GroupTitle>
		</GroupTitleContainer>
	);
}

export default ExpandableTitle;
