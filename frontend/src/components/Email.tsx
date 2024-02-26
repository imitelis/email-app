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
      const paperHeight = paperRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      const newMaxHeight = windowHeight - 40; // Adjust as needed for margins
      if (paperHeight > newMaxHeight) {
        paperRef.current.style.maxHeight = `${newMaxHeight}px`;
      }
    }
  }, [body]);

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        margin: "20px",
        maxWidth: "100%",
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
