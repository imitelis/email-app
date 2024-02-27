import { Paper, Typography } from "@mui/material";
import React from "react";

type EmailProps = {
  sender: string;
  subject: string;
  body: string;
};

const Email: React.FC<EmailProps> = ({ sender, subject, body }) => {
  const paperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (paperRef.current) {
      const windowHeight = window.innerHeight;
      paperRef.current.style.maxHeight = `${windowHeight}px`;
    }
  }, [body]);

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
      <Typography variant="h5">Subject: {subject}</Typography>
      <Typography variant="subtitle1">From: {sender}</Typography>
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        {body}
      </Typography>
    </Paper>
  );
};

export default Email;
