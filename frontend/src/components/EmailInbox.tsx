import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmails } from "../slices/emailSlice";
import { AppDispatch } from "../slices/store";
import { searchEmails } from "../services/emails";
import SearchInput from "./SearchInput";

import { getCookie, folderDict } from "../utils";
import { EmailInboxRow, RootState } from "../types/emails";
import { patchFolderEmail } from "../services/emails";

import {
  Alert,
  List,
  Typography,
  Button,
  Select,
  Grid,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import EmailRow from "./EmailRow";

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
  const [filteredEmails, setFilterdEmails] = useState(emails)
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


  const handleSearchEnter = async (event: KeyboardEvent) => {
    const inputValue = event.target?.value
    if (event.key === 'Enter' && token && inputValue !== ''){

      try {
        const res = await searchEmails(token, inputValue)      
        setFilterdEmails(res)
      } catch (error) {
        console.error(error)
      }
    }
  }
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
          <SearchInput placeholder="Search" onEnterUp={handleSearchEnter} />
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
      ) : filteredEmails.length !== 0 ? (
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
      ) : <p>No emails found</p>}
    </>
  );
};

export default EmailList;
