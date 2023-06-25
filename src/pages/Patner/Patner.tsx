import { FC, useState, useEffect, FormEvent, MouseEvent } from "react";
import useStyles from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { getRequest, postRequest, patchRequest } from "../../api/axios";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { Box, Grid, TextField } from "@mui/material";
import Table from "../../components/Table";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";

interface PatnerProps {
  id: string;
  nome: string;
  apiKey: string;
}

const Patner: FC = () => {
  const { user } = useAuth();
  const s = useStyles();
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [patnerData, setPatnerData] = useState<PatnerProps>({
    id: "",
    nome: "",
    apiKey: "",
  });
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
    if (openModal) {
      setPatnerData({
        id: "",
        nome: "",
        apiKey: "",
      });
    }
  }, [openModal]);

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${user?.token}`,
    };

    try {
      const patner = await getRequest("parceiro/get-all", headers);
      setRows(patner?.data);
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

    try {
      await postRequest(`parceiro/add-parceiro`, patnerData, headers);
      fetchData();
    } catch (error: any) {
      configAlert(
        error[0]?.response ?? "Ocorreu um erro consulte o administrador",
        "error"
      );
    }

    setOpenModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "apiKey", headerName: "Key", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: any) => {
        const handleUpdateKeyClick = async (
          e: MouseEvent<HTMLButtonElement>
        ) => {
          e.preventDefault();

          const headers = {
            Authorization: `Bearer ${user?.token}`,
          };

          try {
            await patchRequest(
              `parceiro/update-apikey/${params.row.id}`,
              null,
              headers
            );
            await fetchData();

            configAlert("Api Key atualizada com sucesso", "success");
          } catch (error: any) {
            configAlert(
              error[0]?.response ?? "Ocorreu um erro consulte o administrador",
              "error"
            );
          }
        };

        return (
          <>
            <Button
              isIconButton
              onClick={handleUpdateKeyClick}
              title="Update api key"
            >
              <EnhancedEncryptionIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const handleEditAdd = () => {
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
        title={"Add Patner"}
        handleSubmit={handleSubmit}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={patnerData?.nome}
              onChange={(e) =>
                setPatnerData({
                  ...patnerData,
                  nome: e.target.value,
                } as PatnerProps)
              }
              fullWidth
            />
          </Grid>
        </Grid>
      </Modal>
      <Box margin={5}>
        <Box className={s.classes.add}>
          <Button onClick={handleEditAdd}>Add Patner</Button>
        </Box>
        <Table columns={columns} rows={rows} />
      </Box>
    </>
  );
};

Patner.defaultProps = {};

export default Patner;
