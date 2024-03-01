import { useState } from "react";
import { Link } from "react-router-dom";
import { InviteEmail } from "../services/invite";
import { validEmail } from "../utils";

import NavBar from "../components/NavBar";

import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
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

const Invite = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      setError("Please provide email.");
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

    if (email) {
      setLoading(true);
      try {
        await InviteEmail(email);
        setLoading(false);
        setSuccess("Invitation sent successfully");

      } catch (e: unknown) {
        console.error(e);
        if (e) {
          setError("Something wrong happened. Please try again.");
        }        
        setLoading(false);
      }
    }
  };

  return (
    <>
      <NavBar />
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
              <MobileScreenShareIcon />
            </Avatar>
            <Typography variant="h5">Invite</Typography>
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
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Invite
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

export default Invite;
