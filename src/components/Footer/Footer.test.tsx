import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom/extend-expect";

describe("Footer", () => {
  test("renders the Footer", () => {
    const { container } = render(<Footer />);

    expect(screen.getByText("@2023 Clinica Online")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
