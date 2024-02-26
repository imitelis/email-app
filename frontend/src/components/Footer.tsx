import { Container, Stack, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import React from "react";
import logo from "../assets/logo.avif";

const SocialButton = ({
  children,
  label,
  href,
  buttonText,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
  buttonText: string;
}) => {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition: "background 0.3s ease",
        marginRight: "1px",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Typography variant="body1" style={{ marginRight: "8px" }}>
        {buttonText}
      </Typography>
      <span
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </span>
      <span style={{ visibility: "hidden" }}>{label}</span>
    </a>
  );
};

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
      }}
    >
      <Container maxWidth="xl">
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
