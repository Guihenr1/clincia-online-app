import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom/extend-expect";

describe("Header", () => {
  const tab1: string = "Home";
  const tab2: string = "Privacy";
  const onClickMockTab1 = jest.fn();
  const onClickMockTab2 = jest.fn();
  const menu = [
    {
      text: tab1,
      onClick: () => onClickMockTab1(),
    },
    {
      text: tab2,
      onClick: () => onClickMockTab2(),
    },
  ];

  const handleClickLogout = jest.fn();

  test("renders the Header", () => {
    const { container } = render(
      <Header menu={menu} handleClickLogout={handleClickLogout} />
    );

    expect(screen.getByText(tab1)).toBeInTheDocument();
    expect(screen.getByText(tab1)).toHaveClass("Mui-selected");
    expect(screen.getByText(tab2)).not.toHaveClass("Mui-selected");

    expect(container).toMatchSnapshot();
  });

  test("call onClick", () => {
    render(<Header menu={menu} handleClickLogout={handleClickLogout} />);

    expect(screen.getByText(tab1)).toBeInTheDocument();
    expect(screen.getByText(tab1)).toHaveClass("Mui-selected");
    expect(screen.getByText(tab2)).not.toHaveClass("Mui-selected");

    fireEvent.click(screen.getByText(tab2));
    expect(screen.getByText(tab1)).not.toHaveClass("Mui-selected");
    expect(screen.getByText(tab2)).toHaveClass("Mui-selected");
    expect(onClickMockTab2).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText(tab1));
    expect(screen.getByText(tab1)).toHaveClass("Mui-selected");
    expect(screen.getByText(tab2)).not.toHaveClass("Mui-selected");
    expect(onClickMockTab1).toHaveBeenCalledTimes(1);
  });

  test("call logout", () => {
    render(<Header menu={menu} handleClickLogout={handleClickLogout} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClickLogout).toHaveBeenCalledTimes(1);
  });
});
