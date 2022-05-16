import React from "react";
import { startCase } from "lodash";
import CheckableInput from "./CheckableOptions";

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

	const AnyTag = function () {
		return <span style={{ backgroundColor: "gray" }}>Any</span>;
	};

	return (
		<div>
			<div>
				{startCase(inputName)}
				{checkedOptions.length === options.length && <AnyTag />}
			</div>
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
		</div>
	);
}

export default CheckableCollectionInput;
