import SocialButton from "./SocialButton";
import logo from "../assets/logo.avif";
import CssBaseline from "@mui/material/CssBaseline";

import { Container, Stack, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "#f8f9fa",
        color: "#495057",
        padding: "30px",
        zIndex: 3,
      }}
    >
      <Container maxWidth="xl">
        <CssBaseline />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent={{ xs: "center", md: "space-between" }}
          alignItems="center"
        >
          <img src={logo} alt="Logo" style={{ width: "200px" }} />
          <Typography variant="body1">
            Made with love{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            By home-group#7{" "}
            <span role="img" aria-label="technologist">
              🧑‍💻
            </span>{" "}
            for ver+ tech fellowship
          </Typography>
          <Stack direction="row" spacing={0}>
            <SocialButton
              label="GitHub"
              href="https://github.com/angelbrand1"
              buttonText="angelbrand1"
            >
              <GitHub />
            </SocialButton>
            <SocialButton
              label="GitHub"
              href="https://github.com/forgionyc"
              buttonText="forgionyc"
            >
              <GitHub />
            </SocialButton>
            <SocialButton
              label="GitHub"
              href="https://github.com/imitelis"
              buttonText="imitelis"
            >
              <GitHub />
            </SocialButton>
            <SocialButton
              label="GitHub"
              href="https://github.com/marlondot"
              buttonText="marlondot"
            >
              <GitHub />
            </SocialButton>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Footer;
