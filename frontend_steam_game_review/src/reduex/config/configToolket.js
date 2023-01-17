import { configureStore } from "@reduxjs/toolkit";
import loginSignUp from "../modules/loginSignUp";
import comments from "../modules/commentsSlice";
import mainSlice from "../modules/mainSlice";
import games from "../modules/gameInfoSlice";

const store = configureStore({
  reducer: { loginSignUp: loginSignUp, comments, games, mainSlice },

});

export default store;
