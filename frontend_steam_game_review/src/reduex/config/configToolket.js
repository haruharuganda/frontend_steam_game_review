import { configureStore } from "@reduxjs/toolkit";
import loginSignUp from "../modules/loginSignUp";
import comments from "../modules/commentsSlice";

const store = configureStore({
  reducer: { loginSignUp: loginSignUp, comments },
});

export default store;
