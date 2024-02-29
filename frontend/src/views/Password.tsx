import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useAppDispatch } from "../hooks/redux-hooks";
//import { signup } from "../slices/authSlice";
import { validEmail } from "../utils";

import NavBar from "../components/NavBar";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';

const Password = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!email || !cellphone || !password || !newPassword) {
      setError("Please fill all the required fields*.");
      return;
    }

    if (
      email.length < 8 ||
      cellphone.length < 8 ||
      password.length < 8 ||
      newPassword.length < 8
    ) {
      setError("All fields must be at least 8 characters long.");
      return;
    }
    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password == newPassword) {
      setError("Passwords are the same.");
      return;
    }

    if (isNaN(Number(cellphone))) {
      setError("Cellphone must be numbers only.");
      return;
    }

    if (email && cellphone && password && newPassword) {
      try {
        /*
        await dispatch(
          signup({
            full_name,
            email,
            password,
            cellphone,
          }),
        ).unwrap();
        */
        setSuccess("Account created successfully");
        setLoading(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (e) {
        setError(e as string);
        console.error(e);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <KeyIcon />
          </Avatar>
          <Typography variant="h5">Update password</Typography>
          {error && (
            <Alert
              variant="filled"
              severity="error"
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" onClose={() => setSuccess("")}>
              {success}
            </Alert>
          )}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cellphone"
                  label="Cellphone"
                  type="cellphone"
                  id="cellphone"
                  value={cellphone}
                  onChange={(e) => setCellphone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Update
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account? <Link to="/login">Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </>
  );
};

export default Password;
