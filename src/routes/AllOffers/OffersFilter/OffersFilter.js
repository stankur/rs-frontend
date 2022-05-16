import React, { useState } from "react";
import FilterGroup from "./FilterGroup";
import { cloneDeep } from "lodash";

import { getFilterOptions } from "../../../mockData";

function OffersFilter() {
	const options = { filter: getFilterOptions() };
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

	return (
		<form>
			<FilterGroup
				groupName=""
				filterJSON={filterJSON}
				filterOptions={options}
				notify={getNotified}
			/>
		</form>
	);
}

export default OffersFilter;
