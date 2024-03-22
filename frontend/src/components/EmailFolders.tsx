import { useSelector } from "react-redux";
import EmailList from "./EmailList.tsx";
import { RootState } from "../types/emails.ts";
import { getEmailsFolder } from "../slices/folderEmailSlice.ts";
import { emailsFolderSearch, reset } from "../slices/searchFolderEmailSlice.ts";
import { useEffect } from "react";
import { getCookie } from "../utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../slices/store";

interface Props {
    folderId: number;
}

const EmailFolders = (props: Props) => {
  const { folderId } = props;
  const emails = useSelector((state: RootState) => state.emailsFolder.emails);
  const status = useSelector((state: RootState) => state.emailsFolder.status);
  const searchedEmails = useSelector((state: RootState) => state.emailsFolderSearch.emails);
  const searchedStatus = useSelector((state: RootState) => state.emailsFolderSearch.status);
  const token = getCookie("FakeEmailToken");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmailsFolder(folderId));
    dispatch(reset());
  }, [folderId]);

  const clearSearchedEmails = () => {
    dispatch(reset());
  };

  const handleSearchEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement)?.value;
    if (event.key === 'Enter' && token && inputValue !== '') {
      try {
        dispatch(emailsFolderSearch({query:inputValue, folderId:folderId}));
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

export default EmailFolders;