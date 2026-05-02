import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page", () => {
  test("should render the Contact heading", () => {
    render(<Contact />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  test("should render the Send Message button", () => {
    render(<Contact />);
    const btn = screen.getByRole("button", { name: /send message/i });
    expect(btn).toBeInTheDocument();
  });

  test("should render the name input field", () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText(/your name/i);
    expect(nameInput).toBeInTheDocument();
  });

  test("should render at least 2 text input boxes", () => {
    render(<Contact />);
    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes.length).toBeGreaterThanOrEqual(2);
  });

  test("should show success message after submitting valid form", () => {
    render(<Contact />);
    fireEvent.change(screen.getByPlaceholderText(/your name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), {
      target: { value: "Hello there!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
  });
});
