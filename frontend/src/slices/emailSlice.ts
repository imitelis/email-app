import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utils";
import axios from "axios";

const initialState = {
  emails: [],
  status: "idle",
};

export const getEmails = createAsyncThunk("email/inbox", async () => {
  const token = getCookie("EmailAppToken");
  const res = await axios.get("http://0.0.0.0:8000/api/emails/inbox", {
    headers: {
      Accept: "application/json",
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

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
