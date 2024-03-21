import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StateEmailView } from "../types/emails";

import { folderDict } from "../utils";
import { Button, Paper, Typography } from "@mui/material";

const Email: React.FC = () => {
  const paperRef = React.useRef<HTMLDivElement>(null);

  const email = useSelector((state: StateEmailView) => state.emailView.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email?.uuid) navigate("/emails");
  }, [email, navigate]);

  const handleBack = () => {
    navigate("/emails");
  };

  if(!email.uuid) return (<div></div>);

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        margin: "20px",
        marginLeft: "auto",
        marginRight: "200px",
        maxWidth: "80%",
        height: "50vh",
        overflowY: "auto",
      }}
      ref={paperRef}
    >
      <Typography variant="h5">Subject: {email.subject}</Typography>
      <Typography variant="subtitle1">From: {email.sender.email}</Typography>
      <Typography variant="subtitle1">
        Folder: {folderDict[email.recipient_folder]}
      </Typography>
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        {email.body}
      </Typography>
      <Button
        fullWidth
        size="small"
        variant="contained"
        style={{ margin: "12px", width: "100px" }}
        onClick={handleBack}
      >
        Back
      </Button>
    </Paper>
  );
};

export default Email;
