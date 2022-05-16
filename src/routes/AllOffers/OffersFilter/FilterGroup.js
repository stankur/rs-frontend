import React from "react";
import CheckableCollectionInput from "./CheckableCollectionInput/CheckableCollectionInput";
import IntervalInput from "./IntervalInput/IntervalInput";

import { startCase, cloneDeep } from "lodash";

function FilterGroup({ groupName, filterJSON, notify, filterOptions }) {
	const isRealObject = (JSON) => {
		return typeof JSON === "object" && !(JSON instanceof Array);
	};

	if (isRealObject(filterJSON)) {
		const isNotDefaultFilter = (subGroupToTest) => {
			return (
				subGroupToTest instanceof Object &&
				Object.keys(subGroupToTest).length === 2 &&
				Object.keys(subGroupToTest).includes("spec") &&
				Object.keys(subGroupToTest).includes("criteria")
			);
		};

		const isIntervalFilter = (subGroupToTest) => {
			return (
				isNotDefaultFilter(subGroupToTest) &&
				subGroupToTest["spec"] === "Interval"
			);
		};

		const isIncludesFilter = (subGroupToTest) => {
			return (
				isNotDefaultFilter(subGroupToTest) &&
				subGroupToTest["spec"] === "Includes"
			);
		};

		const getNotified = (updatedFilter, name) => {
			console.log(
				"FilterGroup with groupname of: " +
					groupName +
					" just got notified."
			);
			console.log("the subgroup name to change: " + name);
			console.log("the old filterJSON: " + JSON.stringify(filterJSON));
			const copyOfFilterJSON = cloneDeep(filterJSON);

			if (!Object.keys(filterJSON).includes(name)) {
				throw new Error("given name is not present in the filterJSON");
			}

			if (isIncludesFilter(copyOfFilterJSON[name])) {
				copyOfFilterJSON[name]["criteria"] = updatedFilter;
			} else {
				copyOfFilterJSON[name] = updatedFilter;
			}
			console.log(
				"the new filterJSON: " + JSON.stringify(copyOfFilterJSON)
			);
			return notify(copyOfFilterJSON, groupName);
		};

		return (
			<div>
				<div>{startCase(groupName)}</div>

				{Object.keys(filterJSON).map((subGroupName) => {
					const subGroup = filterJSON[subGroupName];
					const subGroupOptions = filterOptions[subGroupName];

					if (subGroup instanceof Array) {
						return (
							<CheckableCollectionInput
								inputName={subGroupName}
								notify={getNotified}
								options={subGroupOptions}
								criteria={subGroup}
								key={subGroupName}
							/>
						);
					}

					if (isIntervalFilter(subGroup)) {
						return (
							<IntervalInput
								inputName={subGroupName}
								notify={getNotified}
								interval={subGroup["criteria"]}
								key={subGroupName}
							/>
						);
					}

					if (isIncludesFilter(subGroup)) {
						return (
							<FilterGroup
								groupName={subGroupName}
								filterJSON={subGroup["criteria"]}
								notify={getNotified}
								filterOptions={subGroupOptions["criteria"]}
								key={subGroupName}
							/>
						);
					}

					if (subGroup instanceof Object) {
						return (
							<FilterGroup
								groupName={subGroupName}
								filterJSON={subGroup}
								notify={getNotified}
								filterOptions={subGroupOptions}
								key={subGroupName}
							/>
						);
					}

					throw new Error(
						"sub group of name: " +
							subGroupName +
							" is of invalid format!"
					);
				})}
			</div>
		);
	}
	throw new Error("filterJSON given is invalid!");
}

export default FilterGroup;
