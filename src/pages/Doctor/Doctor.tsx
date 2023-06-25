import { FC, FormEvent, useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getRequest,
  deleteRequest,
  putRequest,
  postRequest,
} from "../../api/axios";
import Modal from "../../components/Modal/Modal";
import { states } from "../../constants/states";
import { useAuth } from "../../hooks/useAuth";
import Alert from "../../components/Alert/Alert";

export interface DoctorProps {
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
  const { user } = useAuth();
  const s = useStyles();
  const [add, setAdd] = useState(true);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorProps>({
    crm: "",
    especialidade: "",
    id: "",
    nome: "",
    ufCrm: "SP",
  });
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState(
    "success" as "success" | "error" | "warning" | "info" | undefined
  );
  const [alertText, setAlertText] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const configAlert = (
    text: string,
    alertSeverity: "success" | "error" | "warning" | "info" | undefined
  ) => {
    setAlertSeverity(alertSeverity);
    setAlertText(text);
    setOpenAlert(true);

    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (openModal && add) {
      setDoctorData({
        crm: "",
        especialidade: "",
        id: "",
        nome: "",
        ufCrm: "SP",
      });
    }
  }, [openModal]);

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };

    try {
      const doctors = await getRequest("medico/get-all", headers);
      setRows(doctors?.data);
    } catch (error: any) {
      configAlert(
        error[0]?.response ?? "Ocorreu um erro consulte o administrador",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };
    if (add) {
      try {
        await postRequest(`medico/add-medico`, doctorData, headers);
        fetchData();
      } catch (error: any) {
        configAlert(
          error[0]?.response ?? "Ocorreu um erro consulte o administrador",
          "error"
        );
      }
    } else {
      try {
        await putRequest(
          `medico/update-medico/${doctorData?.id}`,
          doctorData,
          headers
        );
        fetchData();
      } catch (error: any) {
        configAlert(
          error[0]?.response ?? "Ocorreu um erro consulte o administrador",
          "error"
        );
      }
    }

    setOpenModal(false);
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
        const handleEditClick = () => {
          setAdd(false);
          setDoctorData(params.row);
          setOpenModal(true);
        };

        const handleConfirmDelete = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const headers = {
            Authorization: `Bearer ${user?.token}`,
          };

          try {
            await deleteRequest(
              `medico/delete-medico/${params.row.id}`,
              headers
            );
            fetchData();
          } catch (error: any) {
            configAlert(
              error[0]?.response ?? "Ocorreu um erro consulte o administrador",
              "error"
            );
          } finally {
            setOpenModalDelete(false);
          }
        };

        return (
          <>
            <Modal
              open={openModalDelete}
              handleClose={() => setOpenModalDelete(false)}
              title="Delete Doctor"
              handleSubmit={handleConfirmDelete}
            >
              <Typography variant="body1">Are you sure?</Typography>
            </Modal>
            <Button isIconButton onClick={handleEditClick} title="Edit">
              <EditIcon />
            </Button>
            <Button
              isIconButton
              onClick={() => setOpenModalDelete(true)}
              title="Delete"
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const handleEditAdd = () => {
    setAdd(true);
    setOpenModal(true);
  };

  return (
    <>
      <Alert
        className={s.classes.alert}
        open={openAlert}
        children={alertText}
        severity={alertSeverity}
      />
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title={`${add ? "Add" : "Edit"} Doctor`}
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
      <Box margin={5}>
        <Box className={s.classes.add}>
          <Button onClick={handleEditAdd}>Add Doctor</Button>
        </Box>
        <Table columns={columns} rows={rows} />
      </Box>
    </>
  );
};

Doctor.defaultProps = {};

export default Doctor;
