import React from "react";

import { Typography } from "@mui/material";

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

export default SocialButton;
