import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App";

function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Natya Boutique", () => {
  it("renders the main shopping experience", () => {
    renderApp();

    expect(
      screen.getByRole("heading", {
        name: /traditional dance costumes & accessories/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /shop costumes/i }),
    ).toHaveAttribute("href", "/browse");
  });

  it("filters products and explains an empty result", async () => {
    const user = userEvent.setup();
    renderApp("/browse");

    const browsePage = within(screen.getByRole("main"));
    await user.type(
      browsePage.getByPlaceholderText(/search by product or category/i),
      "not-a-product",
    );
    await user.click(browsePage.getByRole("button", { name: /^search$/i }));

    expect(
      screen.getByRole("heading", { name: /product not found/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not-a-product/i)).toBeInTheDocument();
  });

  it("adds an item, safely bounds quantity, and calculates currency", async () => {
    const user = userEvent.setup();
    renderApp("/browse");

    const firstCard = screen.getAllByRole("article")[0];
    await user.click(
      within(firstCard).getByRole("button", { name: /add to cart/i }),
    );
    await user.click(screen.getByRole("link", { name: /view cart/i }));

    const quantity = screen.getByRole("spinbutton");
    fireEvent.change(quantity, { target: { value: "500" } });
    expect(quantity).toHaveValue(99);
    expect(screen.getByText(/total: \$\d+\.\d{2}/i)).toBeInTheDocument();
  });

  it("validates every checkout field with actionable messages", async () => {
    const user = userEvent.setup();
    renderApp("/browse");

    await user.click(
      screen.getAllByRole("button", { name: /add to cart/i })[0],
    );
    await user.click(screen.getByRole("link", { name: /view cart/i }));
    await user.click(
      screen.getByRole("link", { name: /proceed to checkout/i }),
    );
    await user.click(screen.getByRole("button", { name: /place order/i }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Address is required.")).toBeInTheDocument();
    expect(screen.getByText("Select a payment method.")).toBeInTheDocument();
  });

  it("handles an invalid product route without crashing", () => {
    renderApp("/product/99999");

    expect(
      screen.getByRole("heading", { name: /product not found/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to browse/i }),
    ).toBeInTheDocument();
  });
});
