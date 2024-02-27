import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../services/api-client";
import { getCookie } from "../utils";
import axios from "axios";

const initialState = {
    emails: [],
    status: 'idle',
}

export interface Email {
    uuid: string;
    sender: {
        uuid: string;
        full_name: string;
        email: string;
    };
    recipient: {
        uuid: string;
        full_name: string;
        email: string;
    };
    subject: string;
    body: string;
    sent_date: Date;
    read_date: Date;
    recipient_folder: number;
}

interface EmailState {
    emails: Email[];
    status: 'idle' | 'loading' | 'failed';
}
export const getEmails = createAsyncThunk(
    'email/inbox',
    async () => {
        const token = getCookie('EmailAppToken');
        const res = await axios.get('http://0.0.0.0:8000/api/emails/inbox',{headers: {
            "Accept": "application/json",
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
            }   
        });
        console.log("res",res);
        return res.data;
    },
  )

const emailsSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
      // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(getEmails.rejected, (state) => {
        state.status = 'failed';
      });
        builder.addCase(getEmails.fulfilled, (state, action) => {
            state.status = 'idle';
            state.emails = action.payload;
        });
      builder.addCase(getEmails.pending, (state) => { state.status = 'loading' });
    
    },
  })

  export const emailsReducer = emailsSlice.reducer;