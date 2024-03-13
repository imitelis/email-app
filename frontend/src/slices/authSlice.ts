import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../services/api-client";

import { LoginCompose, SignUpCompose } from "../types/sessions";
import { UserBasicInfo } from "../types/users";
import { AuthApiState } from "../types/apis";
import { AxiosError } from "axios";

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem("FakeEmailUser")
    ? JSON.parse(localStorage.getItem("FakeEmailUser") as string)
    : null,
  userProfileData: undefined,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "login",
  async (data: LoginCompose, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/login", data);
      const resData = response.data;
      const newData = {
        email: response.data.email,
        name: response.data.full_name.split(" ")[0],
      };
      localStorage.setItem("FakeEmailUser", JSON.stringify(newData));
      return resData;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.status === 401) {
        return thunkAPI.rejectWithValue(error.response.status);
      }
    }
  },
);

export const signup = createAsyncThunk(
  "signup",
  async (data: SignUpCompose) => {
    const response = await axiosInstance.post("/signup", data);
    const resData = response.data;
    return resData;
  },
);

// export const getUser = createAsyncThunk(
//   "users/profile",
//   async (userId: string) => {
//     const response = await axiosInstance.get(`/users/${userId}`);
//     return response.data;
//   },
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearBasicUserInfo: (state) => {
      state.basicUserInfo = null;
    },
  },
  extraReducers: (builder) => {
    const pendingCase = (state: AuthApiState) => {
      state.status = "loading";
      state.error = null;
    };

    const fulfilledCase = (
      state: AuthApiState,
      action: PayloadAction<UserBasicInfo>,
    ) => {
      state.status = "idle";
      state.basicUserInfo = action.payload;
    };

    const rejectedCase = (state: AuthApiState) => {
      state.status = "failed";
      state.error = "Something went wrong";
    };

    /*
    const rejectedCase = (state: AuthApiState, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload || 'Something went wrong';
    };
    */

    builder
      .addCase(login.pending, pendingCase)
      .addCase(login.fulfilled, fulfilledCase)
      .addCase(login.rejected, rejectedCase);
  },
});

export const { clearBasicUserInfo } = authSlice.actions;

export default authSlice.reducer;
