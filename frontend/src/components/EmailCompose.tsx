import { useState } from "react";

import "./Email.css";
function MailComposer() {
  console.log(import.meta.env);
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    fetch(`${import.meta.env.VITE_BACK_URL}/emails`, {
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
    <form className="mail-composer " onSubmit={handleSubmit}>
      <div>
        <label>To:</label>
        <input
          type="email"
          name="to"
          value={email.to}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={email.subject}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          name="body"
          value={email.body}
          /* onChange={handleChange} */
          required
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default MailComposer;
