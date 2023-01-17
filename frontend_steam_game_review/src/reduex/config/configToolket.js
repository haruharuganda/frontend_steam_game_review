import { configureStore } from "@reduxjs/toolkit";
import loginSignUp from "../modules/loginSignUp";

const store = configureStore({
  reducer: { loginSignUp: loginSignUp },
});

export default store;
