import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import BugReportIcon from "@mui/icons-material/BugReport";
import "@testing-library/jest-dom/extend-expect";

describe("Button", () => {
  test("renders the button", () => {
    const buttonText = "Click me";
    const { container } = render(<Button>{buttonText}</Button>);

    expect(
      screen.getByRole("button", { name: `${buttonText}` })
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders icon button", () => {
    const title = "test";
    const { container } = render(
      <Button title={title} isIconButton>
        <BugReportIcon />
      </Button>
    );

    expect(screen.getByTestId("BugReportIcon")).toBeInTheDocument();
    expect(screen.getByTitle(title)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("calls onClick function when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick function when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={onClickMock}>
        Click me
      </Button>
    );
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  test("must apply the default variant", () => {
    const buttonText = "Click me";
    render(<Button>{buttonText}</Button>);

    expect(screen.getByRole("button")).toHaveClass("MuiButton-contained");
  });

  test("must apply the correct variant", () => {
    const variants = ["contained", "outlined", "text"];

    variants.forEach((variant) => {
      render(
        <Button variant={variant as "contained" | "outlined" | "text"}>
          {variant}
        </Button>
      );

      expect(screen.getByText(`${variant}`)).toHaveClass(
        `MuiButton-${variant}`
      );
    });
  });
});
