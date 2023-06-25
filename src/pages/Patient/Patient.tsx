import { FC, FormEvent, useEffect, useState } from "react";
import useStyles from "./styles";
import { useAuth } from "../../hooks/useAuth";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/axios";
import Modal from "../../components/Modal";
import Button from "../../components/Button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import { DoctorProps } from "../Doctor/Doctor";

interface PatientProps {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  medicoId: string;
}

const Patient: FC = () => {
  const { user } = useAuth();
  const s = useStyles();
  const [add, setAdd] = useState(true);
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [patientData, setPatientData] = useState<PatientProps>({
    id: "",
    cpf: "",
    telefone: "",
    medicoId: "",
    nome: "",
  });
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState(
    "success" as "success" | "error" | "warning" | "info" | undefined
  );
  const [alertText, setAlertText] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [doctors, setDoctors] = useState<DoctorProps[]>([
    {
      crm: "",
      especialidade: "",
      id: "",
      nome: "",
      ufCrm: "SP",
    },
  ]);

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
      setPatientData({
        id: "",
        cpf: "",
        telefone: "",
        medicoId: "",
        nome: "",
      });
    }
  }, [openModal]);

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };

    try {
      const patients = await getRequest("paciente/get-all", headers);
      setRows(patients?.data);
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

  const fetchDoctorData = async () => {
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };

    try {
      const doctors = await getRequest("medico/get-all", headers);
      setDoctors(doctors?.data);
    } catch (error: any) {
      configAlert(
        error[0]?.response ?? "Ocorreu um erro consulte o administrador",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };
    if (add) {
      try {
        await postRequest(`paciente/add-paciente`, patientData, headers);
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
          `paciente/update-paciente/${patientData?.id}`,
          patientData,
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
    { field: "cpf", headerName: "CPF", flex: 1 },
    { field: "telefone", headerName: "Telefone", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: any) => {
        const handleEditClick = () => {
          setAdd(false);
          setPatientData(params.row);
          setOpenModal(true);
        };

        const handleConfirmDelete = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const headers = {
            Authorization: `Bearer ${user?.token}`,
          };

          try {
            await deleteRequest(
              `paciente/delete-paciente/${params.row.id}`,
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
        title={`${add ? "Add" : "Edit"} Patient`}
        handleSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              variant="outlined"
              value={patientData?.nome}
              onChange={(e) =>
                setPatientData({
                  ...patientData,
                  nome: e.target.value,
                } as PatientProps)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="string"
              label="CPF"
              variant="outlined"
              value={patientData?.cpf}
              onChange={(e) =>
                setPatientData({
                  ...patientData,
                  cpf: String(e.target.value),
                } as PatientProps)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="string"
              label="Telefone"
              variant="outlined"
              value={patientData?.telefone}
              onChange={(e) =>
                setPatientData({
                  ...patientData,
                  telefone: String(e.target.value),
                } as PatientProps)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="select-state-crm">Medico</InputLabel>
              <Select
                id="select-state-crm"
                label="State CRM"
                value={patientData?.medicoId}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    medicoId: e.target.value,
                  } as PatientProps)
                }
              >
                {doctors.map((doctor, i) => (
                  <MenuItem key={i} value={doctor.id}>
                    {doctor.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Modal>
      <Box margin={5}>
        <Box className={s.classes.add}>
          <Button onClick={handleEditAdd}>Add Patient</Button>
        </Box>
        <Table columns={columns} rows={rows} />
      </Box>
    </>
  );
};

Patient.defaultProps = {};

export default Patient;
