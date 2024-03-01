import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utils";
import { getInboxEmails } from "../services/emails";

const initialState = {
  emails: [],
  status: "idle",
};

export const getEmails = createAsyncThunk("email/inbox", async () => {
  const token = getCookie("FakeEmailToken");
  return getInboxEmails(token);
});

/*
export const newEmail = createAsyncThunk("/emails", async () => {
  const token = getCookie("FakeEmailToken");
  return getInboxEmails(token, email: emailCompose);
});
*/

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmails.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getEmails.fulfilled, (state, action) => {
      state.status = "idle";
      state.emails = action.payload;
    });
    builder.addCase(getEmails.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const emailsReducer = emailsSlice.reducer;
