import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IntervalInput from "../IntervalInput";

let container = null;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("renders the right value for ≤", () => {
	const mockNotify = jest.fn();

	render(
		<IntervalInput
			inputName="floor"
			notify={mockNotify}
			interval={[1, 2]}
		/>,
		container
	);

	expect(screen.getByRole("combobox")).toHaveValue("≤");
	expect(screen.getByRole("textbox")).toHaveValue("2");
});

it("renders the right value for =", () => {
	const mockNotify = jest.fn();

	render(
		<IntervalInput
			inputName="Floor"
			notify={mockNotify}
			interval={[4, 4]}
		/>,
		container
	);

	expect(screen.getByRole("combobox")).toHaveValue("=");
	expect(screen.getByRole("textbox")).toHaveValue("4");
});

it("renders the right value for ≥", () => {
	const mockNotify = jest.fn();

	render(
		<IntervalInput
			inputName="floor"
			notify={mockNotify}
			interval={[9, "Infinity"]}
		/>,
		container
	);

	expect(screen.getByRole("combobox")).toHaveValue("≥");
	expect(screen.getByRole("textbox")).toHaveValue("9");
});

it("calls notify with the right value for ≤", async () => {
	const mockNotify = jest.fn();

	render(
		<IntervalInput
			inputName="floor"
			notify={mockNotify}
			interval={[1, 2]}
		/>,
		container
	);

	await userEvent.type(screen.getByRole("textbox"), "6");

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual({
		spec: "Interval",
		criteria: [1, 26],
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("floor");
});
