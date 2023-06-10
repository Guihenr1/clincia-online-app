import { render, screen } from "@testing-library/react";
import Alert from "./Alert";
import "@testing-library/jest-dom/extend-expect";

interface severity {
  severity: "error" | "warning" | "info" | "success";
}

describe("Alert", () => {
  const children = "Lorem ipsum";
  let open = true;

  test("renders the Alert", () => {
    const { container } = render(<Alert children={children} open={open} />);

    expect(screen.getByText(children)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  const severities = ["success", "info", "warning", "error"];
  severities.forEach((severity) => {
    test(`renders ${severity} severity`, () => {
      const { getByRole } = render(
        <Alert
          open={open}
          severity={severity as "error" | "warning" | "info" | "success"}
          children={severity}
        />
      );

      const alertElement = getByRole("alert");
      expect(alertElement).toBeInTheDocument();
      expect(alertElement).toHaveTextContent(severity);
    });
  });
});
