import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from "../slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Backdrop, CircularProgress } from "@mui/material";

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["EmailAppToken"]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    if (email && email.length < 8) {
      setError("Email must be at least 8 characters long.");
      return;
    }

    if (password && password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // This is only a basic validation of inputs. Improve this as needed.
    if (email && password) {
      setLoading(true);
      try {
        const resultAction = await dispatch(login({ email, password }));
        console.log(resultAction)
        const userData = unwrapResult(resultAction);
        setCookie("EmailAppToken", userData.access_token, {
          path: "/",
          sameSite: "none",
          secure: true,
        });
        setLoading(false);
      } catch (e) {
        setError(e as string); // Explicitly type the argument as string
        console.error(e);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </>
  );
};

export default Login;
