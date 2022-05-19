import React, { useState } from "react";
import styled from "styled-components";

const SmallerInput = styled.input`
	width: 25px;
`;

function NumberHolder({ notify, number }) {
	console.log("number received by NumberHolder: " + number);
	const [display, setDisplay] = useState(number);
	const notifyNewNumber = (event) => {
		if (event.target.value === "") {
			return setDisplay("");
		}

		const newNumber = parseInt(event.target.value);

		console.log("Parsed new number: " + newNumber);

		if (
			!isNaN(newNumber) &&
			Number.isInteger(newNumber) &&
			newNumber >= 1
		) {
			console.log(
				"NumberHolder tried to call the notify new number function with value of: " +
					newNumber
			);
			setDisplay(newNumber);
			return notify(newNumber);
		}

		console.log("I didn't call the notify new number");
	};
	console.log("display: " + display);

	return (
		<SmallerInput type="text" value={display} onChange={notifyNewNumber} />
	);
}

export default NumberHolder;
