import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";

import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          The page you requested may have been removed or does not exist. Please
          check the URL or go back to the{" "}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            homepage
          </Link>
          .
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{ marginTop: 2 }}
        >
          Homepage
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
