import React from "react";
import { startCase } from "lodash";

function CheckableInput({ inputName, checked, notify }) {
	function toggleCheck() {
		notify(!checked, inputName);
	}
	return (
		<label>
			<input
				type="checkbox"
				defaultChecked={checked}
				onChange={toggleCheck}
			/>
			{startCase(inputName)}
		</label>
	);
}

export default CheckableInput;
