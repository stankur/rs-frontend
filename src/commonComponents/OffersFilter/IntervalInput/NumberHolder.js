import React, { useState } from "react";

import SmallerInput from "./SmallerInput";

function NumberHolder({ notify, number, backgroundColor }) {
	const [display, setDisplay] = useState(number);
	const notifyNewNumber = (event) => {
		if (event.target.value === "") {
			return setDisplay("");
		}

		const newNumber = parseInt(event.target.value);

		if (
			!isNaN(newNumber) &&
			Number.isInteger(newNumber) &&
			newNumber >= 1
		) {
			setDisplay(newNumber);
			return notify(newNumber);
		}
	};
	return (
		<SmallerInput
			backgroundColor={backgroundColor}
			type="text"
			value={display}
			onChange={notifyNewNumber}
		/>
	);
}

export default NumberHolder;
