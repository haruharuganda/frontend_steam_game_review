import { configureStore } from "@reduxjs/toolkit";
import loginSignUp from "../modules/loginSignUp";
import comments from "../modules/commentsSlice";
import mainSlice from "../modules/mainSlice";
const store = configureStore({
  reducer: { loginSignUp: loginSignUp, comments, mainSlice },
});

export default store;
