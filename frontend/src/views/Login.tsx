import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../slices/authSlice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { validEmail } from "../utils";

import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  CircularProgress,
  Box,
  Backdrop,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["FakeEmailToken"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    if (email && email.length < 8 && password && password.length < 8) {
      setError("Email and password must be at least 8 characters long.");
      return;
    }

    if (email && email.length < 8) {
      setError("Email must be at least 8 characters long.");
      return;
    }

    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password && password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (email && password) {
      setLoading(true);
      try {
        const resultAction = await dispatch(login({ email, password }));
        const userData = unwrapResult(resultAction);
        if (userData) {
          setCookie("FakeEmailToken", userData.access_token, {
            path: "/",
            sameSite: "none",
            secure: true,
          });
          navigate("/emails");
        }
      } catch (e: unknown) {
        console.error(e);
        if (e === 401) {
          setError("Invalid credentials. Please try again.");
        }
        if (e === 404) {
          setError("User not found. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Login</Typography>
            {error && (
              <Alert
                variant="filled"
                severity="error"
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
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
                id="loginButton"
              >
                Login
              </Button>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </Box>
    </>
  );
};

export default Login;
