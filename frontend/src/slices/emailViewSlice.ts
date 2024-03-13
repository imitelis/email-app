import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmailInboxRow } from "../types/emails";

const initialState = {
  email: {},
  status: "idle",
};

export const getEmailsView = createAsyncThunk(
  "email/view",
  async (email: EmailInboxRow) => {
    return email;
  },
);

const emailViewSlice = createSlice({
  name: "emailView",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmailsView.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getEmailsView.fulfilled, (state, action) => {
      state.status = "idle";
      state.email = action.payload;
    });
    builder.addCase(getEmailsView.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const emailViewReducer = emailViewSlice.reducer;
