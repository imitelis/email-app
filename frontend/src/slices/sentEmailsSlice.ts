import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utils";
import { getSentEmails } from "../services/emails";

const initialState = {
  emails: [],
  status: "idle",
};

export const getEmailsSent = createAsyncThunk("email/sent", async () => {
  const token = getCookie("FakeEmailToken");
  return getSentEmails(token);
});


const emailsSentSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmailsSent.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getEmailsSent.fulfilled, (state, action) => {
      state.status = "idle";
      state.emails = action.payload;
    });
    builder.addCase(getEmailsSent.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const emailsSentReducer = emailsSentSlice.reducer;
