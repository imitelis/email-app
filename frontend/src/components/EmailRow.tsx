import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../utils";
import { AppDispatch } from "../slices/store";
import { EmailInboxRow } from "../types/emails";
import { getEmailsView } from "../slices/emailViewSlice";

import {
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Checkbox,
} from "@mui/material";

const EmailRow = ({
  email,
  isSelected,
  onSelectEmail,
}: {
  email: EmailInboxRow;
  isSelected: boolean;
  onSelectEmail: (uuid: string) => void;
}) => {
  const { sender, subject, sent_date } = email;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const handleCheckboxChange = () => {
    onSelectEmail(email.uuid);
  };

  const handleClick = (email: EmailInboxRow) => {
    dispatch(getEmailsView(email));
    setTimeout(() => {
      navigate("/emails/view");
    }, 100);
  };

  return (
    <>
      <ListItem
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0f0f0",
          padding: "12px 0",
          cursor: "pointer",
          backgroundColor: isSelected
            ? "#f0f8ff"
            : email.read_date
              ? "#E8E8E8"
              : "transparent",
        }}
      >
        <Checkbox
          checked={isSelected}
          onChange={handleCheckboxChange}
          color="primary"
        />
        <ListItemText
          onClick={() => handleClick(email)}
          primary={
            <Typography variant="subtitle1">{sender.full_name}</Typography>
          }
        />
        <ListItemText
          onClick={() => handleClick(email)}
          primary={<Typography variant="body1">{subject}</Typography>}
        />
        <ListItemText
          onClick={() => handleClick(email)}
          primary={
            <Typography variant="body1">{formatDate(sent_date)}</Typography>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default EmailRow;
