import React from "react";
import Select from "react-select";

import styled from "styled-components";

import { startCase } from "lodash";

const Container = styled.div`
	display: inline-flex;
	flex-direction: column;

	gap: 7px;

	font-family: sans-serif;
`;

const InputTitle = styled.span`
	font-family: sans-serif;
`;

const SmallSelect = styled(Select).attrs((props) => ({
	styles: {
		control: (base) => ({
			...base,
			border: "0 !important",
			backgroundColor: props.backgroundColor,
		}),
		multiValueLabel: (base) => ({
			...base,
			backgroundColor: props.selectedLabelBackgroundColor,
		}),
		multiValueRemove: (base) => ({
			...base,
			backgroundColor: props.selectedLabelBackgroundColor,
		}),
	},
}))`
	display: inline-block;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
`;

function SelectableCollection({
	inputName,
	notify,
	options,
	criteria,
	backgroundColor,
	selectedLabelBackgroundColor,
}) {
	const mapToOptions = (criteria) => {
		if (criteria.length === options.length || criteria.length === 0) {
			return [{ value: "Anything would do", label: "Anything would do" }];
		}
		return criteria.map((value) => ({ value, label: value }));
	};

	const mapFromOptions = (options) => {
		return options
			.map((option) => option.value)
			.filter((value) => value !== "Anything would do");
	};

	const inputOptions = options.map((value) => ({ value, label: value }));

	return (
		<Container>
			<label htmlFor={inputName}>
				<InputTitle>{startCase(inputName) + ":"}</InputTitle>
			</label>
			<SmallSelect
				backgroundColor={backgroundColor}
				selectedLabelBackgroundColor={selectedLabelBackgroundColor}
				value={mapToOptions(criteria)}
				id={inputName}
				name={inputName}
				options={inputOptions}
				onChange={(newOptions) => {
					if (
						(newOptions.length === 1 &&
							newOptions[0].value === "Anything would do") ||
						newOptions.length === 0
					) {
						return notify(options, inputName);
					}

					return notify(mapFromOptions(newOptions), inputName);
				}}
				isSearchable={false}
				isMulti
			/>
		</Container>
	);
}

export default SelectableCollection;
