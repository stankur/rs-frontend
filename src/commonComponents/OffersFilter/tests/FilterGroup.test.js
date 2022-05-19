import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FilterGroup from "../FilterGroup";
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

it("renders correct for a filter with one default filter", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{ numberOfPeople: [1, 2] }}
			notify={mockNotify}
			filterOptions={{ numberOfPeople: [1, 2] }}
		/>,
		container
	);

	expect(screen.getByText("Filter")).toBeInTheDocument();
	expect(screen.getByText("Number Of People")).toBeInTheDocument();

	expect(screen.getByLabelText("1")).toBeInTheDocument();
	expect(screen.getByLabelText("2")).toBeInTheDocument();
});

it("renders correct for a filter with one interval filter", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				numberOfPeople: { spec: "Interval", criteria: [1, 2] },
			}}
			notify={mockNotify}
			filterOptions={{
				numberOfPeople: { spec: "Interval", criteria: [1, 2] },
			}}
		/>,
		container
	);

	expect(screen.getByText("Filter")).toBeInTheDocument();
	expect(screen.getByText("Number Of People")).toBeInTheDocument();

	expect(screen.getByRole("combobox")).toBeInTheDocument();
	expect(screen.getByRole("textbox")).toBeInTheDocument();
});

it("renders correct for a filter with one includes filter", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				rooms: {
					spec: "Includes",
					criteria: {
						residenceArea: ["OC"],
					},
				},
			}}
			notify={mockNotify}
			filterOptions={{
				rooms: {
					spec: "Includes",
					criteria: {
						residenceArea: ["OC", "PV"],
					},
				},
			}}
		/>,
		container
	);

	expect(screen.getByText("Filter")).toBeInTheDocument();
	expect(screen.getByText("Residence Area")).toBeInTheDocument();

	expect(screen.getByLabelText("OC")).toBeInTheDocument();
	expect(screen.getByLabelText("OC").checked).toBe(true);

	expect(screen.getByLabelText("PV")).toBeInTheDocument();
	expect(screen.getByLabelText("PV").checked).toBe(false);
});

it("renders correct for a filter with one nested filter", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				generalInfo: {
					room: ["Shared"],
				},
			}}
			notify={mockNotify}
			filterOptions={{
				generalInfo: {
					room: ["Shared", "Single", "Studio"],
				},
			}}
		/>,
		container
	);

	expect(screen.getByText("Filter")).toBeInTheDocument();
	expect(screen.getByText("General Info")).toBeInTheDocument();
	expect(screen.getByText("Room")).toBeInTheDocument();

	expect(screen.getByLabelText("Shared")).toBeInTheDocument();
	expect(screen.getByLabelText("Single")).toBeInTheDocument();
	expect(screen.getByLabelText("Studio")).toBeInTheDocument();

	expect(screen.getByLabelText("Shared").checked).toBe(true);
	expect(screen.getByLabelText("Single").checked).toBe(false);
	expect(screen.getByLabelText("Studio").checked).toBe(false);
});

it("calls notify correctly for a filter with one default filter on change of value", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{ numberOfPeople: [1, 2] }}
			notify={mockNotify}
			filterOptions={{ numberOfPeople: [1, 2] }}
		/>,
		container
	);

	userEvent.click(screen.getByLabelText("1"));

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual({
		numberOfPeople: [2],
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("filter");
});

it("calls notify correctly for a filter with one interval filter on change of value (1)", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				numberOfPeople: { spec: "Interval", criteria: [1, 2] },
			}}
			notify={mockNotify}
			filterOptions={{
				numberOfPeople: { spec: "Interval", criteria: [1, 2] },
			}}
		/>,
		container
	);
	userEvent.clear(screen.getByRole("textbox"));
	userEvent.type(screen.getByRole("textbox"), "9");

	expect(mockNotify.mock.calls.length).toEqual(1);

	expect(mockNotify.mock.calls[0][0]).toEqual({
		numberOfPeople: { spec: "Interval", criteria: [1, 9] },
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("filter");
});

it("calls notify correctly for a filter with one interval filter on change of value (2)", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				numberOfPeople: { spec: "Interval", criteria: [1, 2] },
			}}
			notify={mockNotify}
			filterOptions={{
				numberOfPeople: { spec: "Interval", criteria: [1, 2] },
			}}
			rooms
		/>,
		container
	);

	userEvent.selectOptions(
		screen.getByRole("combobox"),
		screen.getByRole("option", { name: "≥" })
	);

	expect(mockNotify.mock.calls.length).toEqual(1);

	expect(mockNotify.mock.calls[0][0]).toEqual({
		numberOfPeople: { spec: "Interval", criteria: [2, "Infinity"] },
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("filter");
});

it("calls notify correctly for a filter with one includes filter on change of value", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				rooms: {
					spec: "Includes",
					criteria: {
						residenceArea: ["OC"],
					},
				},
			}}
			notify={mockNotify}
			filterOptions={{
				rooms: {
					spec: "Includes",
					criteria: {
						residenceArea: ["OC", "PV"],
					},
				},
			}}
		/>,
		container
	);

	userEvent.click(screen.getByLabelText("PV"));
	expect(screen.queryByText("Any")).not.toBeInTheDocument();

	expect(mockNotify.mock.calls.length).toEqual(1);

	expect(mockNotify.mock.calls[0][0]).toEqual({
		rooms: {
			spec: "Includes",
			criteria: {
				residenceArea: ["OC", "PV"],
			},
		},
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("filter");
});

it("calls notify correctly for a filter with one nested filter on change of value (1)", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				generalInfo: {
					room: ["Shared"],
				},
			}}
			notify={mockNotify}
			filterOptions={{
				generalInfo: {
					room: ["Shared", "Single", "Studio"],
				},
			}}
		/>,
		container
	);

	userEvent.click(screen.getByLabelText("Studio"));
	expect(screen.queryByText("Any")).not.toBeInTheDocument();

	expect(mockNotify.mock.calls.length).toEqual(1);

	expect(mockNotify.mock.calls[0][0]).toEqual({
		generalInfo: {
			room: ["Shared", "Studio"],
		},
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("filter");
});

it("calls notify correctly for a filter with one nested filter on change of value (2)", () => {
	const mockNotify = jest.fn();

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={{
				generalInfo: {
					room: ["Shared", "Single"],
				},
			}}
			notify={mockNotify}
			filterOptions={{
				generalInfo: {
					room: ["Shared", "Single", "Studio"],
				},
			}}
		/>,
		container
	);

	userEvent.click(screen.getByLabelText("Studio"));

	expect(mockNotify.mock.calls.length).toEqual(1);

	expect(mockNotify.mock.calls[0][0]).toEqual({
		generalInfo: {
			room: ["Shared", "Single", "Studio"],
		},
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("filter");
});

it("calls notify correctly for a filter with combined filters on change of value", () => {
	const mockNotify = jest.fn();
	const options = {
		rooms: {
			spec: "Includes",
			criteria: {
				residenceArea: [
					"Orchard Commons",
					"Ponderosa Commons",
					"Place Vanier",
				],
				floor: {
					spec: "Interval",
					criteria: [1, "Infinity"],
				},
			},
		},
	};

	const filterJSON = {
		rooms: {
			spec: "Includes",
			criteria: {
				residenceArea: [
					"Orchard Commons",
					"Ponderosa Commons",
					"Place Vanier",
				],
				floor: {
					spec: "Interval",
					criteria: [1, "Infinity"],
				},
			},
		},
	};

	render(
		<FilterGroup
			groupName="filter"
			filterJSON={filterJSON}
			filterOptions={options}
			notify={mockNotify}
		/>,
		container
	);

	userEvent.clear(screen.getByRole("textbox"));
	userEvent.type(screen.getByRole("textbox"), "2");

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual({
		rooms: {
			spec: "Includes",
			criteria: {
				residenceArea: [
					"Orchard Commons",
					"Ponderosa Commons",
					"Place Vanier",
				],
				floor: {
					spec: "Interval",
					criteria: [2, "Infinity"],
				},
			},
		},
	});
	expect(mockNotify.mock.calls[0][1]).toEqual("filter");
});
