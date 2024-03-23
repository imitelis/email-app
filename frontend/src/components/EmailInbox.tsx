import { useSelector } from "react-redux";
import EmailList from "./EmailList.tsx";
import { RootState } from "../types/emails.ts";
import { getEmails } from "../slices/emailSlice";
import { emailsSearch, reset } from "../slices/searchEmailsSlice";
import { useEffect } from "react";
import { getCookie } from "../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../slices/store";

const EmailInbox = () => {
  const emails = useSelector((state: RootState) => state.emails.emails);
  const status = useSelector((state: RootState) => state.emails.status);
  const searchedEmails = useSelector((state: RootState) => state.emailsSearch.emails);
  const searchedStatus = useSelector((state: RootState) => state.emailsSearch.status);
  const token = getCookie("FakeEmailToken");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmails());
    dispatch(reset());
  }, [dispatch]);

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
      isSentPage={false}
    />
  );
};

export default EmailInbox;