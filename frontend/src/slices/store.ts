import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import { emailsReducer } from "./emailSlice";
import { emailsSentReducer } from "./sentEmailsSlice";
import { emailViewReducer } from "./emailViewSlice";
import { emailsSearchReducer } from "./searchEmailsSlice";

const store = configureStore({
  reducer: {
    emails: emailsReducer,
    emailsSent: emailsSentReducer,
    emailsSearch: emailsSearchReducer,
    emailsSentSearch: emailsSearchReducer,
    auth: authReducer,
    user: userReducer,
    emailView: emailViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
