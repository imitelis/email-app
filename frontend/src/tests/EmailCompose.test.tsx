import "@testing-library/jest-dom/jest-globals";

import { expect, describe, it } from "@jest/globals";
import { render, fireEvent, screen } from "@testing-library/react";

import store from "../slices/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import EmailCompose from "../components/EmailCompose";

describe("EmailCompose component", () => {
  it("renders email compose form fields and handles input changes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <EmailCompose />
        </MemoryRouter>
      </Provider>,
    );

    const sendElement = screen.getAllByText("Send");
    const toFieldInput = screen.getByRole("textbox", { name: "To" });
    const subjectFieldInput = screen.getByRole("textbox", { name: "Subject" });
    const bodyFieldInput = screen.getByRole("textbox", { name: "Body" });

    expect(sendElement.length).toBe(1);
    expect(toFieldInput).toBeInTheDocument();
    expect(subjectFieldInput).toBeInTheDocument();
    expect(bodyFieldInput).toBeInTheDocument();

    fireEvent.change(toFieldInput, { target: { value: "john@example.com" } });
    fireEvent.change(subjectFieldInput, {
      target: { value: "Urgent: Testing Required" },
    });
    fireEvent.change(bodyFieldInput, {
      target: { value: "I hope this email finds you well." },
    });

    expect(toFieldInput).toHaveValue("john@example.com");
    expect(subjectFieldInput).toHaveValue("Urgent: Testing Required");
    expect(bodyFieldInput).toHaveValue("I hope this email finds you well.");
  });
});
