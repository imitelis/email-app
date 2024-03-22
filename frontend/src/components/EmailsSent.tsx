import { useSelector } from "react-redux";
import EmailList from "./EmailList.tsx";
import { RootState } from "../types/emails.ts";
import { getEmailsSent } from "../slices/sentEmailsSlice.ts";
import { emailsSearch, reset } from "../slices/searchSentEmailsSlice.ts";
import { useEffect } from "react";
import { getCookie } from "../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../slices/store";

const EmailsSent = () => {
  const emails = useSelector((state: RootState) => state.emailsSent.emails);
  const status = useSelector((state: RootState) => state.emailsSent.status);
  const searchedEmails = useSelector((state: RootState) => state.emailsSentSearch.emails);
  const searchedStatus = useSelector((state: RootState) => state.emailsSentSearch.status);
  const token = getCookie("FakeEmailToken");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmailsSent());
  }, []);

  const clearSearchedEmails = () => {
    dispatch(reset());
  };

  const handleSearchEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement)?.value;
    if (event.key === 'Enter' && token && inputValue !== '') {
      try {
        dispatch(emailsSearch(inputValue));
      } catch (error) {
        console.error(error)
      }
    }
  }


  return (
    <EmailList
      emails={emails}
      status={status}
      searchedEmails={searchedEmails}
      searchedStatus={searchedStatus}
      clearSearchedEmails={clearSearchedEmails}
      handleSearchEnter={handleSearchEnter}
    />
  );
};

export default EmailsSent;