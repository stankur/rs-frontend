import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NumberHolder from "../NumberHolder";

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

it("doesen't call notify when resulting text is empty string", async () => {
	const mockNotify = jest.fn();

	render(<NumberHolder notify={mockNotify} number={5} />, container);

	await userEvent.clear(screen.getByRole("textbox"));

	expect(mockNotify.mock.calls.length).toEqual(0);
});

it("calls notify properly resulting text is a normal number", async () => {
	const mockNotify = jest.fn();

	render(<NumberHolder notify={mockNotify} number={5} />, container);

	await userEvent.type(screen.getByRole("textbox"), "6");

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual(56);
});

it("calls notify properly after erasing and then typing a number", async () => {
	const mockNotify = jest.fn();

	render(<NumberHolder notify={mockNotify} number={5} />, container);

	await userEvent.clear(screen.getByRole("textbox"));

	await userEvent.type(screen.getByRole("textbox"), "6");

	expect(mockNotify.mock.calls.length).toEqual(1);
	expect(mockNotify.mock.calls[0][0]).toEqual(6);
});
