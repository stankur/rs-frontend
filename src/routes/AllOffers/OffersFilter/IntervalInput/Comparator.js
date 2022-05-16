import React from "react";

function Comparator({ notify, comparator }) {
    const notifyNewComparator = (event) => {
        console.log("I tried to call the notify new comparator")
		notify(event.target.value);
	};
	return (
		<select value={comparator} onChange={notifyNewComparator}>
			<option value="≤">≤</option>
			<option value="=">=</option>
			<option value="≥">≥</option>
		</select>
	);
}

export default Comparator;
