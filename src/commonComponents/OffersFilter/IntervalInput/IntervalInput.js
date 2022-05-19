import React from "react";
import { startCase } from "lodash";

import Comparator from "./Comparator";
import NumberHolder from "./NumberHolder";

import styled from "styled-components";

const InputName = styled.div`
	font-family: sans-serif;
	margin-bottom: 5px;
	margin-top: 10px;
`;

function IntervalInput({ inputName, notify, interval }) {
	console.log(
		"IntervalInput asked to be created with interval of: " + interval
	);
	const isPositiveInteger = (number) => {
		return Number.isInteger(number) && number > 0;
	};

	const parseInterval = () => {
		const isValidIntervalArray = (interval) => {
			return (
				interval instanceof Array &&
				interval.length === 2 &&
				isPositiveInteger(interval[0]) &&
				((isPositiveInteger(interval[1]) &&
					interval[0] <= interval[1]) ||
					interval[1] === "Infinity")
			);
		};

		if (isValidIntervalArray(interval)) {
			const lower = interval[0];
			const higher = interval[1];

			console.log("IntervalInput decides that ");

			if (lower === higher) {
				console.log("number is: " + lower);
				return { number: lower, comparator: "=" };
			}

			if (higher === "Infinity") {
				console.log("number is: " + lower);
				return { number: lower, comparator: "≥" };
			}

			console.log("number is: " + higher);
			return { number: higher, comparator: "≤" };
		}

		throw new Error("interval given invalid!");
	};

	const convertToInterval = (comparator, number) => {
		if (isPositiveInteger(number)) {
			if (comparator === "=") {
				return [number, number];
			}

			if (comparator === "≤") {
				return [1, number];
			}

			if (comparator === "≥") {
				return [number, "Infinity"];
			}

			throw new Error("comparator given not valid");
		}

		throw new Error("number not positive integer");
	};

	const updateFilter = (interval) => {
		return {
			spec: "Interval",
			criteria: interval,
		};
	};

	const changeComparator = (newComparator) => {
		notify(
			updateFilter(
				convertToInterval(newComparator, parseInterval().number)
			),
			inputName
		);
	};

	const changeNumber = (newNumber) => {
		console.log(
			"IntervalInput tried to call notify with new filter of: " +
				JSON.stringify(
					updateFilter(
						convertToInterval(parseInterval().comparator, newNumber)
					)
				)
		);
		console.log(
			"IntervalInput tried to call notify with new number of: " +
				newNumber
		);

		notify(
			updateFilter(
				convertToInterval(parseInterval().comparator, newNumber)
			),
			inputName
		);
	};

	console.log("number given to NumberHolder: " + parseInterval().number);
	return (
		<div>
			<InputName>{startCase(inputName)}</InputName>

			<Comparator
				notify={changeComparator}
				comparator={parseInterval().comparator}
			/>
			<NumberHolder
				notify={changeNumber}
				number={parseInterval().number}
			/>
		</div>
	);
}

export default IntervalInput;
