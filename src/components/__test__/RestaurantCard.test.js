import { render, screen } from "@testing-library/react";
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";
import MOCK_DATA from "./mocks/resCardMock.json";
import "@testing-library/jest-dom";

describe("RestaurantCard Component", () => {
  it("should render restaurant name from props", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
    const name = screen.getByText("McDonald's");
    expect(name).toBeInTheDocument();
  });

  it("should render restaurant rating", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
    expect(screen.getByText(/4\.4/)).toBeInTheDocument();
  });

  it("should render cost for two", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
    expect(screen.getByText(/₹400 for two/)).toBeInTheDocument();
  });

  it("should render delivery time", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
    expect(screen.getByText(/30 min/)).toBeInTheDocument();
  });

  it("should render an image with restaurant name as alt text", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
    const img = screen.getByAltText("McDonald's");
    expect(img).toBeInTheDocument();
  });

  it("should render the data-testid attribute", () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
    expect(screen.getByTestId("restaurant-card")).toBeInTheDocument();
  });

  it("should wrap with withPromotedLabel HOC without crashing", () => {
    const WrappedCard = withPromotedLabel(RestaurantCard);
    render(<WrappedCard resData={MOCK_DATA} />);
    expect(screen.getByText("McDonald's")).toBeInTheDocument();
  });
});
