import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../utils";
import { searchFolderEmails } from "../services/emails";

const initialState = {
  emails: [],
  status: "idle",
};

export const emailsFolderSearch = createAsyncThunk("emails/inbox/search", async ({ query, folderId }: { query: string, folderId: number }) => {
    const token = getCookie("FakeEmailToken");
    return searchFolderEmails(token, query, folderId);
});  
  

const emailsFolderSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    reset(state) {
        state.emails = [];
        state.status = "idle";
      },
  },
  extraReducers: (builder) => {
    builder.addCase(emailsFolderSearch.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(emailsFolderSearch.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
            state.status = "notFound";
          } else {
            state.status = "idle";
            state.emails = action.payload;
          }
    });
    builder.addCase(emailsFolderSearch.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const emailsFolderSearchReducer = emailsFolderSlice.reducer;
export const { reset } = emailsFolderSlice.actions;