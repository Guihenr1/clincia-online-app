import { fireEvent, render, screen } from "@testing-library/react";
import Dialog from "./Dialog";
import "@testing-library/jest-dom/extend-expect";

describe("Dialog", () => {
  const title = "Title of this";
  const content = "Text";
  const handleConfirm = () => {};
  const handleClose = () => {};

  test("renders the Dialog", () => {
    const { container } = render(
      <Dialog
        open={true}
        content={content}
        title={title}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
