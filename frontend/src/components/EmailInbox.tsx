import { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEmails } from "../slices/emailSlice";
import { AppDispatch } from "../slices/store";
import { EmailInboxRow, RootState } from "../types/emails";

const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);

  date.setHours(date.getHours() - 5);

  return date.toLocaleDateString(
    undefined,
    options as Intl.DateTimeFormatOptions,
  );
};
const handleClick = () => {
  console.log("click");
};
const EmailRow = ({ email }: { email: EmailInboxRow }) => {
  const [checked, setChecked] = useState(false);
  const { sender, subject, sent_date } = email;

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <ListItem
        onClick={handleClick}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0f0f0",
          padding: "12px 0",
        }}
      >
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
          color="primary"
        />
        <ListItemText
          primary={
            <Typography variant="subtitle1">{sender.full_name}</Typography>
          }
        />
        <ListItemText
          primary={<Typography variant="body1">{subject}</Typography>}
        />
        <ListItemText
          primary={
            <Typography variant="body1">{formatDate(sent_date)}</Typography>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};

const EmailList = () => {
  const emails = useSelector((state: RootState) => state.emails.emails);
  const status = useSelector((state: RootState) => state.emails.status);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmails());
  }, [dispatch]);

  return status == "loading" ? (
    <p>Loading...</p>
  ) : status == "failed" ? (
    <p>Failed to load emails</p>
  ) : (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {emails.map((email: EmailInboxRow) => (
        <EmailRow key={email?.uuid} email={email} />
      ))}
    </List>
  );
};

export default EmailList;
