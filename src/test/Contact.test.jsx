import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Contact from "../pages/Contact";

describe("Contact", () => {
  it("validates input and confirms a valid submission", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/enter your name/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^name/i), "Kala");
    await user.type(screen.getByLabelText(/^email/i), "kala@example.com");
    await user.type(
      screen.getByLabelText(/^message/i),
      "I would like help selecting a costume.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /message has been received/i,
    );
  });
});
