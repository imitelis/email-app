import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import { emailsReducer } from "./emailSlice";
import { emailViewReducer } from "./emailViewSlice";

const store = configureStore({
  reducer: {
    emails: emailsReducer,
    auth: authReducer,
    user: userReducer,
    emailView: emailViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
