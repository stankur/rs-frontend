import React from "react";
import { startCase } from "lodash";
import CheckableInput from "./CheckableOptions";

import styled from "styled-components";

const InputNameContainer = styled.div`
	margin-bottom: 5px;
	margin-top: 10px;
`;

const InputName = styled.span`
	font-family: sans-serif;
	font-weight: 500;
	padding: 5px;
	border-radius: 5px;
`;

const AnyTag = styled.span`
	background-color: #c3f9d7db;
	padding: 1px;
	border-radius: 1px;
	margin-left: 3px;
`;

const VerticalList = styled.div`
	display: flex;
	flex-direction: column;
`;

function CheckableCollectionInput({ inputName, notify, options, criteria }) {
	const checkedOptions = criteria;

	const getNotified = (checked, optionName) => {
		if (checked && !checkedOptions.includes(optionName)) {
			notify([...checkedOptions, optionName], inputName);
		}

		if (!checked && checkedOptions.includes(optionName)) {
			notify(
				checkedOptions.filter((option) => {
					return option !== optionName;
				}),
				inputName
			);
		}
	};

	return (
		<div>
			<InputNameContainer>
				<InputName>
					{startCase(inputName)}
					{checkedOptions.length === options.length && (
						<AnyTag>Any</AnyTag>
					)}
				</InputName>
			</InputNameContainer>
			<VerticalList>
				{options.map((option) => {
					return (
						<CheckableInput
							inputName={option}
							checked={checkedOptions.includes(option)}
							notify={getNotified}
							key={option}
						/>
					);
				})}
			</VerticalList>
		</div>
	);
}

export default CheckableCollectionInput;
