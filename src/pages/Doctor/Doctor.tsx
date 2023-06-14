import { FC, FormEvent, useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getRequest, deleteRequest, putRequest } from "../../api/axios";
import Dialog from "../../components/Dialog/Dialog";
import Modal from "../../components/Modal/Modal";
import { states } from "../../constants/states";

interface DoctorProps {
  crm: string;
  especialidade: string;
  id: string;
  nome: string;
  ufCrm:
    | "AC"
    | "AL"
    | "AP"
    | "AM"
    | "BA"
    | "CE"
    | "DF"
    | "ES"
    | "GO"
    | "MA"
    | "MT"
    | "MS"
    | "MG"
    | "PA"
    | "PB"
    | "PR"
    | "PE"
    | "PI"
    | "RJ"
    | "RN"
    | "RS"
    | "RO"
    | "RR"
    | "SC"
    | "SP"
    | "SE"
    | "TO";
}

const Doctor: FC = () => {
  const s = useStyles();
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorProps>();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await putRequest(`medico/update-medico/${doctorData?.id}`, doctorData);
      fetchData();
      setOpenModal(false);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

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
          setDoctorData(params.row);
          setOpenModal(true);
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
            <Modal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              title="Edit Doctor"
              handleSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    value={doctorData?.nome}
                    onChange={(e) =>
                      setDoctorData({
                        ...doctorData,
                        nome: e.target.value,
                      } as DoctorProps)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    label="CRM"
                    variant="outlined"
                    value={doctorData?.crm}
                    onChange={(e) =>
                      setDoctorData({
                        ...doctorData,
                        crm: String(e.target.value),
                      } as DoctorProps)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Specialty"
                    variant="outlined"
                    value={doctorData?.especialidade}
                    onChange={(e) =>
                      setDoctorData({
                        ...doctorData,
                        especialidade: e.target.value,
                      } as DoctorProps)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-state-crm">State CRM</InputLabel>
                    <Select
                      id="select-state-crm"
                      label="State CRM"
                      value={doctorData?.ufCrm}
                      onChange={(e) =>
                        setDoctorData({
                          ...doctorData,
                          ufCrm: e.target.value,
                        } as DoctorProps)
                      }
                    >
                      {states.map((state, i) => (
                        <MenuItem key={i} value={state.acronym}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Modal>
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
