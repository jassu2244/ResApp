import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "./mocks/mockResListData.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

const renderBody = () =>
  act(async () => render(<BrowserRouter><Body /></BrowserRouter>));

describe("Search & Filter — Integration Tests", () => {
  it("should render 5 restaurant cards on initial load", async () => {
    await renderBody();
    const cards = screen.getAllByTestId("restaurant-card");
    expect(cards.length).toBe(5);
  });

  it("should filter cards when searching for 'burger'", async () => {
    await renderBody();

    const allCards = screen.getAllByTestId("restaurant-card");
    expect(allCards.length).toBe(5);

    const searchInput = screen.getByPlaceholderText(/search restaurants/i);
    const searchBtn = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchInput, { target: { value: "burger" } });
    fireEvent.click(searchBtn);

    const filtered = screen.getAllByTestId("restaurant-card");
    expect(filtered.length).toBe(1);
    expect(screen.getByText("Burger King")).toBeInTheDocument();
  });

  it("should show only top-rated restaurants (avgRating > 4) on filter", async () => {
    await renderBody();

    const topRatedBtn = screen.getByRole("button", { name: /top rated/i });
    fireEvent.click(topRatedBtn);

    const cards = screen.getAllByTestId("restaurant-card");
    expect(cards.length).toBe(3);
  });

  it("should toggle top-rated filter off when clicked twice", async () => {
    await renderBody();

    const topRatedBtn = screen.getByRole("button", { name: /top rated/i });
    fireEvent.click(topRatedBtn);
    fireEvent.click(topRatedBtn);

    const cards = screen.getAllByTestId("restaurant-card");
    expect(cards.length).toBe(5);
  });

  it("should show no results message for unmatched search", async () => {
    await renderBody();

    const searchInput = screen.getByPlaceholderText(/search restaurants/i);
    fireEvent.change(searchInput, { target: { value: "zzz_no_match_zzz" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText(/no restaurants found/i)).toBeInTheDocument();
  });
});
