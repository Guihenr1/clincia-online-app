import { FC, ReactNode, useEffect, useState } from "react";
import useStyles from "./styles";
import { Box } from "@mui/material";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getRequest, deleteRequest } from "../../api/axios";
import Dialog from "../../components/Dialog/Dialog";

interface DoctorProps {}

const Doctor: FC<DoctorProps> = () => {
  const s = useStyles();
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    try {
      const doctors = await getRequest("medico/get-all");
      setRows(doctors?.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        const [openConfirmation, setOpenConfirmation] = useState(false);

        const handleEditClick = () => {
          console.log("Button clicked for row with id:", params.row.id);
        };

        const handleConfirmDelete = async () => {
          try {
            await deleteRequest(`medico/delete-medico/${params.row.id}`);
            fetchData();
          } catch (error) {
            console.log("ERROR", error);
          } finally {
            setOpenConfirmation(false);
          }
        };

        return (
          <>
            <Dialog
              title="Are you sure?"
              content="You won't be able to revert this"
              open={openConfirmation}
              handleConfirm={handleConfirmDelete}
              handleClose={() => setOpenConfirmation(false)}
            />
            <Button isIconButton onClick={handleEditClick} title="Edit">
              <EditIcon />
            </Button>
            <Button
              isIconButton
              onClick={() => setOpenConfirmation(true)}
              title="Delete"
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Box margin={5}>
      <Table columns={columns} rows={rows} />
    </Box>
  );
};

Doctor.defaultProps = {};

export default Doctor;
