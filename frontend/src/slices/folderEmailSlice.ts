import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utils";
import { getFolderEmails } from "../services/emails";

const initialState = {
  emails: [],
  status: "idle",
};

export const getEmailsFolder = createAsyncThunk("email/sent/folder", async (folderId: number) => {
  const token = getCookie("FakeEmailToken");
  return getFolderEmails(token, folderId);
});


const emailsFolderSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmailsFolder.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getEmailsFolder.fulfilled, (state, action) => {
      state.status = "idle";
      state.emails = action.payload;
    });
    builder.addCase(getEmailsFolder.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const emailsFolderReducer = emailsFolderSlice.reducer;
