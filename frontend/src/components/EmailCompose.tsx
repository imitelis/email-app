import { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { postNewEmail } from "../services/emails";

function MailComposer() {
  const [cookies] = useCookies(["FakeEmailToken"]);
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
    /*
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${cookies.FakeEmailToken}`);
    fetch(`${import.meta.env.VITE_BACK_URL}/emails/`, {
      method: "POST",
      headers,
      body: JSON.stringify(email),
    });
    
    */
    const myEmail = {
      to: email.to,
      subject: email.subject,
      body: email.body
    }
    console.log(myEmail)
    
    const myToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTI2NTMwNiwianRpIjoiNDI4ZjQxNTQtYzMxNS00NDA4LTgzMzctZTBhOTQ3Y2YwNjg3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImRzYWF2ZWRyYUB1bmFsLmVkdS5jbyIsIm5iZiI6MTcwOTI2NTMwNiwiY3NyZiI6ImM5ZWU3Yjc1LTg3Y2MtNGNlYi05OGJhLTgxZjY2MjViYzhiZSJ9.SPGfUSdTH0IoOVvynRhC-hFuSFN4ZESduzv75JyzjZ8`
    postNewEmail(myToken, myEmail);
    /*
    setEmail({
      to: "",
      subject: "",
      body: "",
    });
    */
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
