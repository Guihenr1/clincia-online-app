import { FC, ReactNode } from "react";
import useStyles from "./styles";
import { Box } from "@mui/material";
import Base from "../Base/Base";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface DoctorProps {}

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "nome", headerName: "Nome", flex: 1 },
  { field: "crm", headerName: "CRM", flex: 1 },
  { field: "ufCrm", headerName: "UF CRM", flex: 0.5 },
  { field: "especialidade", headerName: "Especialidade", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: (params: any) => {
      const handleButtonClick = () => {
        console.log("Button clicked for row with id:", params.row.id);
      };

      return (
        <>
          <Button isIconButton onClick={handleButtonClick} title="Edit">
            <EditIcon />
          </Button>
          <Button isIconButton onClick={handleButtonClick} title="Delete">
            <DeleteIcon />
          </Button>
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    nome: "Guilherme",
    crm: 2154,
    ufCrm: "SP",
    especialidade: "Dermatologia",
  },
  {
    id: 2,
    nome: "Henrique",
    crm: 7452,
    ufCrm: "AM",
    especialidade: "Pediatria",
  },
];

const Doctor: FC<DoctorProps> = () => {
  const s = useStyles();

  return (
    <Box margin={5}>
      <Table columns={columns} rows={rows} />
    </Box>
  );
};

Doctor.defaultProps = {};

export default Doctor;
