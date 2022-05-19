import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Comparator from "../Comparator";

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

it("renders the right information (comparator = ≥)", () => {
	const mockNotify = jest.fn();

	render(<Comparator notify={mockNotify} comparator="≥" />, container);

	expect(screen.getByRole("combobox")).toHaveValue("≥");
});

it("renders the right information (comparator = =)", () => {
	const mockNotify = jest.fn();

	render(<Comparator notify={mockNotify} comparator="=" />, container);

	expect(screen.getByRole("combobox")).toHaveValue("=");
});

it("renders the right information (comparator = ≤)", () => {
	const mockNotify = jest.fn();

	render(<Comparator notify={mockNotify} comparator="≤" />, container);

	expect(screen.getByRole("combobox")).toHaveValue("≤");
});

it("calls right on change of comparator", () => {
	const mockNotify = jest.fn();

	render(<Comparator notify={mockNotify} comparator="≤" />, container);

	userEvent.selectOptions(
		screen.getByRole("combobox"),
		screen.getByRole("option", { name: "≥" })
	);

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual("≥");
});
