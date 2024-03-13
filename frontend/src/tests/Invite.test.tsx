import "@testing-library/jest-dom/jest-globals";

import { expect, describe, it } from "@jest/globals";
import { render, fireEvent, screen } from "@testing-library/react";

import store from "../slices/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import Invite from "../views/Invite";

describe("Invite view", () => {
  it("renders invite form fields and handles input changes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Invite />
        </MemoryRouter>
      </Provider>,
    );

    const InviteElements = screen.getAllByText("Invite");
    const emailFieldInput = screen.getByRole("textbox", { name: "Email" });

    expect(InviteElements.length).toBe(2);
    expect(emailFieldInput).toBeInTheDocument();

    fireEvent.change(emailFieldInput, {
      target: { value: "john@example.com" },
    });

    expect(emailFieldInput).toHaveValue("john@example.com");
  });
});
