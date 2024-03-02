import { Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {  StateEmailView } from "../types/emails";
import { useNavigate } from "react-router-dom";


const Email: React.FC = () => {
  const paperRef = React.useRef<HTMLDivElement>(null);

  const email = useSelector((state:StateEmailView) => state.emailView.email);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!email?.uuid)navigate("/emails");
  }, [email, navigate]);
  console.log(email);
  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        margin: "20px",
        marginLeft: "auto", // This pushes the Paper to the left
        marginRight: "200px",
        maxWidth: "80%",
        height: "50vh", // This makes the Paper take up the full height of the view
        overflowY: "auto",
      }}
      ref={paperRef}
    >
      <Typography variant="h5">Subject: {email.subject}</Typography>
      <Typography variant="subtitle1">From: {email.sender.email}</Typography>
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        {email.body}
      </Typography>
    </Paper>
  );
};

export default Email;
