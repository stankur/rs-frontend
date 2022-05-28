import React, { useState } from "react";
import FilterGroup from "./FilterGroup";
import { cloneDeep } from "lodash";

import { getFilterOptions } from "../../mockData";

function OffersFilter({ sendFilter }) {
	const options = getFilterOptions();
	const [filterJSON, setfilterJSON] = useState(options);

	const getNotified = (updatedFilter, name) => {
		const copyOfFilterJSON = cloneDeep(filterJSON);
		copyOfFilterJSON[name] = updatedFilter;
		console.log(
			"OffersFilter just got notified with a new JSONFilter value of: " +
				JSON.stringify(updatedFilter)
		);
		console.log(
			"old filterJSON value of OffersFilter: " +
				JSON.stringify(filterJSON)
		);
		console.log(
			"new filterJSON value of OffersFilter: " +
				JSON.stringify(copyOfFilterJSON)
		);
		setfilterJSON(updatedFilter);
	};

    const handleApply = () => sendFilter(filterJSON)

	return (
		<form>
			<span>
				<FilterGroup
					groupName="filter"
					filterJSON={filterJSON}
					filterOptions={options}
					notify={getNotified}
					main={true}
					handleApply={handleApply}
				/>
			</span>
		</form>
	);
}

export default OffersFilter;
