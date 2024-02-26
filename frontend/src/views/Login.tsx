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
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hooks";

import axios from "axios";

import loginService from "../services/login";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["EmailAppToken"]);
  // const [userEmailCookie, setUserEmailCookie] = useCookies(["EmailAppEmail"]);
  // const [userNameCookie, setUserNameCookie] = useCookies(["EmailAppEmail"]); <- only grab first name

  const handleLogin = async () => {
    // Reset error state
    setError("");
    // This is only a basic validation of inputs. Improve this as needed.
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }
    if (email && password) {
      const url = "http://0.0.0.0:8000/api/login/";

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      console.log(email, password);

      const data = {
        email: email,
        password: password
      }

      try {
        const response = await axios.post(url, { email, password }, config);
        console.log("Login successful:", response.data);
        setCookie("EmailAppToken", response.data.access_token, {
          path: "/",
          sameSite: "none",
          secure: true,
        });

        const newData = {
          email: response.data.email,
          full_name: response.data.full_name, // <- full_name.split(" ")[0]
        };
        // Stringify the JSON data before storing it in localStorage
        localStorage.setItem("EmailAppUser", JSON.stringify(newData));

        // Redirect or perform other actions upon successful login
      } catch (error) {
        console.error("Login failed:", error);
        setError("Failed to login. Please try again."); // Set error message
      }
    } else {
      // Show an error message.
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
      </Container>
    </>
  );
};

export default Login;
