import { fireEvent, render, screen } from "@testing-library/react";
import Table from "./Table";
import "@testing-library/jest-dom/extend-expect";

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "firstName", headerName: "First name", flex: 1 },
  { field: "lastName", headerName: "Last name", flex: 1 },
  {
    field: "age",
    headerName: "Age",
    flex: 1,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

describe("Table", () => {
  test("renders the Table", () => {
    const { container } = render(<Table columns={columns} rows={rows} />);

    expect(screen.getByText("Snow")).toBeInTheDocument();
    expect(screen.getByText("First name")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
