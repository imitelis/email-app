import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useCookies } from "react-cookie";

function MailComposer() {
  const [cookies] = useCookies(["EmailAppToken"]);
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${cookies.EmailAppToken}`);
    fetch(`${import.meta.env.VITE_BACK_URL}/emails/`, {
      method: "POST",
      headers,
      body: JSON.stringify(email),
    });
    setEmail({
      to: "",
      subject: "",
      body: "",
    });
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
      <Button variant="contained" type="submit" color="primary">
        Send
      </Button>
    </form>
  );
}

export default MailComposer;
