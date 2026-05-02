import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import cartReducer from "../../utils/cartSlice";
import "@testing-library/jest-dom";

const buildStore = (preloadedState = {}) =>
  configureStore({ reducer: { cart: cartReducer }, preloadedState });

const renderCart = (store) =>
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Cart />
      </Provider>
    </BrowserRouter>
  );

describe("Cart Component", () => {
  it("should render empty cart message when cart has no items", () => {
    const store = buildStore({ cart: { items: [] } });
    renderCart(store);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("should show cart item when preloaded store has items", () => {
    const mockItem = {
      card: {
        info: {
          id: "item_001",
          name: "Classic Burger",
          price: 22900,
          defaultPrice: 22900,
          description: "A classic juicy burger",
          imageId: "test_img",
          isVeg: 0,
        },
      },
    };
    const store = buildStore({ cart: { items: [mockItem] } });
    renderCart(store);
    expect(screen.getByText("Classic Burger")).toBeInTheDocument();
  });

  it("should display total price for items in cart", () => {
    const mockItem = {
      card: {
        info: {
          id: "item_002",
          name: "Veggie Burger",
          price: 18900,
          defaultPrice: 18900,
          description: "A veggie burger",
          imageId: "test_img",
          isVeg: 1,
        },
      },
    };
    const store = buildStore({ cart: { items: [mockItem] } });
    renderCart(store);
    const priceElements = screen.getAllByText(/₹/);
    expect(priceElements.length).toBeGreaterThan(0);
  });
});
