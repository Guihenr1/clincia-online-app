import { FC, ReactNode } from "react";
import useStyles from "./styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface TableProps {
  columns: GridColDef[];
  rows: Object[];
}

const Table: FC<TableProps> = ({ rows, columns }) => {
  const s = useStyles();

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        columnVisibilityModel={{
          id: false,
        }}
      />
    </div>
  );
};

Table.defaultProps = {};

export default Table;
