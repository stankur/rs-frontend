import React from "react";

import StyleableSmallSelect from "../../StyleableSmallSelect";

function Comparator({ notify, comparator, backgroundColor }) {
	const notifyNewComparator = (newOption) => {
		notify(newOption.value);
	};

	const options = ["≤", "=", "≥"].map((value) => ({ value, label: value }));
	return (
		<StyleableSmallSelect
			backgroundColor={backgroundColor}
			value={{ value: comparator, label: comparator }}
			onChange={notifyNewComparator}
			options={options}
		/>
	);
}

export default Comparator;
