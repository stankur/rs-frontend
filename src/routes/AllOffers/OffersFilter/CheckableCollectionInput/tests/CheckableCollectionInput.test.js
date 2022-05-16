import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CheckableCollectionInput from "../CheckableCollectionInput";

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

it("renders correctly when all options are checked", () => {
	const mockNotify = jest.fn();

	render(
		<CheckableCollectionInput
			inputName="residenceArea"
			notify={mockNotify}
			options={["OC", "TP", "PV", "PC", "MD"]}
			criteria={["OC", "TP", "PV", "PC", "MD"]}
		/>,
		container
	);

	expect(screen.getByText("Any")).toBeInTheDocument();

	expect(screen.getByLabelText("OC").checked).toBe(true);
	expect(screen.getByLabelText("TP").checked).toBe(true);
	expect(screen.getByLabelText("PV").checked).toBe(true);
	expect(screen.getByLabelText("PC").checked).toBe(true);
	expect(screen.getByLabelText("MD").checked).toBe(true);
});

it("renders correct information when some options are not checked", () => {
	const mockNotify = jest.fn();

	render(
		<CheckableCollectionInput
			inputName="residenceArea"
			notify={mockNotify}
			options={["OC", "TP", "PV", "PC", "MD"]}
			criteria={["OC", "TP", "PV"]}
		/>,
		container
	);

	expect(screen.queryByText("Any")).not.toBeInTheDocument();

	expect(screen.getByLabelText("OC").checked).toBe(true);
	expect(screen.getByLabelText("TP").checked).toBe(true);
	expect(screen.getByLabelText("PV").checked).toBe(true);

	expect(screen.getByLabelText("PC").checked).toBe(false);
	expect(screen.getByLabelText("MD").checked).toBe(false);
});

it("calls notify correctly on change of a checked box from unchecked", () => {
	const mockNotify = jest.fn();

	render(
		<CheckableCollectionInput
			inputName="residenceArea"
			notify={mockNotify}
			options={["OC", "TP", "PV", "PC", "MD"]}
			criteria={["OC", "TP", "PV"]}
		/>,
		container
	);

	userEvent.click(screen.getByLabelText("MD"));

	expect(screen.queryByText("Any")).not.toBeInTheDocument();

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual(["OC", "TP", "PV", "MD"]);
	expect(mockNotify.mock.calls[0][1]).toEqual("residenceArea");
});

it("calls notify correctly on change of a checked box from checked", () => {
	const mockNotify = jest.fn();

	render(
		<CheckableCollectionInput
			inputName="residenceArea"
			notify={mockNotify}
			options={["OC", "TP", "PV", "PC", "MD"]}
			criteria={["OC", "TP", "PV"]}
		/>,
		container
	);

	userEvent.click(screen.getByLabelText("PV"));

	expect(screen.queryByText("Any")).not.toBeInTheDocument();

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual(["OC", "TP"]);
	expect(mockNotify.mock.calls[0][1]).toEqual("residenceArea");
});
