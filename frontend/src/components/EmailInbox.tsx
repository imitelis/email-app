import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmails } from "../slices/emailSlice";
import { AppDispatch } from "../slices/store";

import SearchInput from "./SearchInput";

import { getCookie, folderDict, formatDate } from "../utils";
import { EmailInboxRow, RootState } from "../types/emails";
import { patchFolderEmail } from "../services/emails";

import {
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Checkbox,
  Button,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getEmailsView } from "../slices/emailViewSlice";

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

const EmailList = () => {
  const emails = useSelector((state: RootState) => state.emails.emails);
  const status = useSelector((state: RootState) => state.emails.status);
  const dispatch: AppDispatch = useDispatch();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<number>(0);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const token = getCookie("FakeEmailToken");

  const handleSelectEmail = (uuid: string) => {
    setSelectedEmail(uuid === selectedEmail ? null : uuid);
  };

  useEffect(() => {
    dispatch(getEmails());
  }, [dispatch]);

  useEffect(() => {
    setIsEmailSelected(selectedEmail !== null);
  }, [selectedEmail, isEmailSelected]);

  useEffect(() => {
    dispatch(getEmails());
  }, [dispatch]);
  const filteredEmails = emails.filter((email: EmailInboxRow) =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeFolder = (event: SelectChangeEvent<number>) => {
    setSelectedFolder(Number(event.target.value));
  };

  const handleMoveEmail = async () => {
    if (token && selectedEmail && selectedFolder) {
      try {
        const updatedFolder = {
          recipient_folder: selectedFolder,
        };
        await patchFolderEmail(token, selectedEmail, updatedFolder);
        // console.log(selectedEmail);
        // console.log(selectedFolder);
        setSuccess("Email moved successfully");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        // console.log(e)
        setError("Something wrong happened. Please try again.");
      }
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <SearchInput placeholder="Search" onChange={handleSearchChange} />
        </Grid>
        {isEmailSelected && (
          <>
            <Grid item>
              <Typography variant="body2" color="textSecondary">
                Move to:
              </Typography>
            </Grid>
            <Grid item>
              <Select
                value={selectedFolder}
                onChange={handleChangeFolder}
                variant="outlined"
                size="small"
                style={{ width: "120px" }}
              >
                {Object.entries(folderDict).map(([key, value]) => (
                  <MenuItem key={key} value={parseInt(key)}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                size="small"
                variant="contained"
                style={{ margin: "12px", width: "100px" }}
                onClick={handleMoveEmail}
              >
                Move
              </Button>
            </Grid>
            <Grid item>
              {error && (
                <Alert
                  variant="filled"
                  severity="error"
                  onClose={() => setError("")}
                >
                  {error}
                </Alert>
              )}
            </Grid>
            <Grid item>
              {success && (
                <Alert severity="success" onClose={() => setSuccess("")}>
                  {success}
                </Alert>
              )}
            </Grid>
          </>
        )}
      </Grid>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Failed to load emails</p>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {filteredEmails.map((email: EmailInboxRow) => (
            <EmailRow
              key={email.uuid}
              email={email}
              isSelected={selectedEmail === email.uuid}
              onSelectEmail={handleSelectEmail}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default EmailList;
