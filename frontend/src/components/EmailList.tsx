import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import EmailRow from "./EmailRow";

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

import { getCookie, folderDict } from "../utils";
import { EmailInboxRow } from "../types/emails";
import { patchFolderEmail } from "../services/emails";

interface Props {
    emails: EmailInboxRow[];
    status: string;
    searchedEmails: EmailInboxRow[];
    searchedStatus: string;
    clearSearchedEmails : () => void;
    handleSearchEnter : (event: React.KeyboardEvent<HTMLInputElement>) => void;
    isSentPage: boolean;
}

const EmailList = (props: Props) => {
  const {
    emails,
    status,
    searchedEmails,
    searchedStatus,
    clearSearchedEmails,
    handleSearchEnter,
    isSentPage,
  } = props;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<number>(0);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const token = getCookie("FakeEmailToken");

  const handleSelectEmail = (uuid: string) => {
    if(isSentPage) return;
    setSelectedEmail(uuid === selectedEmail? null : uuid);
  };

  useEffect(() => {
    setIsEmailSelected(selectedEmail !== null);
  }, [selectedEmail]);

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
        setSuccess("Email moved successfully");
      } catch (e: unknown) {
        setError("Something wrong happened. Please try again.");
      }
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <SearchInput
            placeholder="Search"
            onEnterUp={handleSearchEnter}
            onClear={clearSearchedEmails}
          />
        </Grid>
        { isEmailSelected && (
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
      {status === "loading" || searchedStatus === "loading" ? (
        <p>Loading...</p>
      ) : searchedStatus === "notFound" ? (
        <p>No emails found</p>
      ) : status === "failed" || searchedStatus === "failed" ? (
        <p>Failed to load emails</p>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {searchedEmails.length !== 0 ? (
            searchedEmails.map((email: EmailInboxRow) => (
              <EmailRow
                key={email.uuid}
                email={email}
                isSelected={selectedEmail === email.uuid}
                isSentPage={isSentPage}
                onSelectEmail={handleSelectEmail}
              />
            ))
          ) : (
            emails.map((email: EmailInboxRow) => (
              <EmailRow
                key={email.uuid}
                email={email}
                isSelected={selectedEmail === email.uuid}
                isSentPage={isSentPage}
                onSelectEmail={handleSelectEmail}
              />
            ))
          )}
        </List>
      )}
    </>
  );
};

export default EmailList;
