import React from "react";

import StyleableSmallSelect from "../../StyleableSmallSelect";

function Comparator({ notify, comparator, backgroundColor }) {
	const notifyNewComparator = (newOption) => {
		console.log("I tried to call the notify new comparator");
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
