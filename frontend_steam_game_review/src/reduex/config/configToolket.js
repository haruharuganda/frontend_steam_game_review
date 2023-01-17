import { configureStore } from "@reduxjs/toolkit";
import loginSignUp from "../modules/loginSignUp";
import comments from "../modules/commentsSlice";
import games from "../modules/gameInfoSlice";

const store = configureStore({
  reducer: { loginSignUp: loginSignUp, comments, games },
});

export default store;
