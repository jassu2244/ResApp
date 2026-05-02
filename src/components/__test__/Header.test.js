import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const renderHeader = () =>
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

it("should render the ResApp logo", () => {
  renderHeader();
  expect(screen.getByText("ResApp")).toBeInTheDocument();
});

it("should render Cart button with 0 item count", () => {
  renderHeader();
  const cartBtn = screen.getByRole("button", { name: /cart/i });
  expect(cartBtn).toBeInTheDocument();
  expect(cartBtn).toHaveTextContent("0");
});

it("should render theme toggle button", () => {
  renderHeader();
  const themeBtn = screen.getByRole("button", { name: /toggle theme/i });
  expect(themeBtn).toBeInTheDocument();
});

it("should toggle theme icon when theme button is clicked", () => {
  renderHeader();
  const themeBtn = screen.getByRole("button", { name: /toggle theme/i });
  const initialText = themeBtn.textContent;
  fireEvent.click(themeBtn);
  expect(themeBtn.textContent).not.toBe(initialText);
});

it("should render all navigation links", () => {
  renderHeader();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Contact")).toBeInTheDocument();
  expect(screen.getByText("Grocery")).toBeInTheDocument();
});
