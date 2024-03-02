import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { postNewEmail } from "../services/emails";
import { validEmail } from "../utils/validEmail";

function MailComposer() {
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const myEmail = {
      to: email.to,
      subject: email.subject,
      body: email.body,
    };
    console.log(myEmail);

    const myToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2NTMwNiwianRpIjoiNDI4ZjQxNTQtYzMxNS00NDA4LTgzMzctZTBhOTQ3Y2YwNjg3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImRzYWF2ZWRyYUB1bmFsLmVkdS5jbyIsIm5iZiI6MTcwOTI2NTMwNiwiY3NyZiI6ImM5ZWU3Yjc1LTg3Y2MtNGNlYi05OGJhLTgxZjY2MjViYzhiZSJ9.SPGfUSdTH0IoOVvynRhC-hFuSFN4ZESduzv75JyzjZ8`;
    if (!email.to || !email.subject || !email.body) {
      setError("Please fill all the required fields*.");
      return;
    }

    if (!validEmail(email.to)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (email.to && email.subject && email.body) {
      try {
        postNewEmail(myToken, myEmail);
        setEmail({ to: "", subject: "", body: "" });
        setSuccess("Email sent successfully!");
      } catch (error) {
        setError("Error sending email");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        label="To"
        type="email"
        name="to"
        value={email.to}
        onChange={handleChange}
        required
      />
      <TextField
        label="Subject"
        type="text"
        name="subject"
        value={email.subject}
        onChange={handleChange}
        required
      />
      <TextField
        label="Body"
        name="body"
        value={email.body}
        onChange={handleChange}
        required
        multiline
        rows={4}
      />
      <Button id="sendEmail" variant="contained" type="submit" color="primary">
        Send
      </Button>
      {error && (
        <Alert variant="filled" severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}
    </form>
  );
}

export default MailComposer;
