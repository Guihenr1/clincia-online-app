import { FC, useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Box,
  Button,
  Container,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { postRequest } from "../../api/axios";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const s = useStyles();
  const { login, user, redirect } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (user?.token) redirect();

    setLoading(false);
  }, [user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const obj = {
        email: userName,
        password: password,
      };
      const response = await postRequest("usuario/login", obj);
      login({ token: response.data.accessToken });
    } catch (error) {
      setIncorrect(true);
    }
  };

  return (
    <>
      {loading ? (
        <Box className={s.classes.login}>
          <CircularProgress />
        </Box>
      ) : (
        <Container
          component="main"
          maxWidth="xs"
          className={s.classes.container}
        >
          <Box className={s.classes.box}>
            <Box>
              <img className={s.classes.logo} src="logo.png" alt="logo" />
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                error={incorrect}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={incorrect}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

Login.defaultProps = {};

export default Login;
