import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utils";
import { searchEmails } from "../services/emails";

const initialState = {
  emails: [],
  status: "idle",
};

export const emailsSearch = createAsyncThunk("emails/inbox/search", async (query: string) => {
  const token = getCookie("FakeEmailToken");
  return searchEmails(token, query);
});
  

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    reset(state) {
        state.emails = [];
        state.status = "idle";
      },
  },
  extraReducers: (builder) => {
    builder.addCase(emailsSearch.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(emailsSearch.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
            state.status = "notFound";
          } else {
            state.status = "idle";
            state.emails = action.payload;
          }
    });
    builder.addCase(emailsSearch.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const emailsSearchReducer = emailsSlice.reducer;
export const { reset } = emailsSlice.actions;