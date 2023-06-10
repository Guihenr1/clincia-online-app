import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Modal from "./Modal";
import "@testing-library/jest-dom/extend-expect";

describe("Modal", () => {
  let open = true;
  const onClickClose = jest.fn();
  const children = "test";

  test("renders the Modal", () => {
    const { container } = render(
      <Modal open={open} handleClose={onClickClose}>
        {children}
      </Modal>
    );

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("not renders the Modal", async () => {
    render(
      <Modal open={false} handleClose={onClickClose}>
        {children}
      </Modal>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    });
  });
});
