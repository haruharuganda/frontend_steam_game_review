import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import axios from "axios";

const initialState = {
  userInfo: [
    {
      userId: "",
      password: "",
      email: "",
    },
  ],
  error: null,
  isLoading: false,
};

//DB에서 데이터 받아오기
//로그인 POST요청
export const __postLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await axiosInstance.post(`/login`, payload);
      // axios.then((res) => {
      //   sessionStorage.setItem("access_token", res.headers.access_token);
      //   sessionStorage.setItem("refresh_token", res.headers.refresh_token);
      //   return res;
      // });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const __signUp = createAsyncThunk(
  "signUp",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.post(`/api/auth/signup`, payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //에러
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __idCheck = createAsyncThunk(
  "idCheck",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.post(`/signup`, payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //에러 메세지
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//리덕스
export const loginSignUp = createSlice({
  name: "loginSignUp",
  initialState,
  reducers: {},
  extraReducers: {
    //로그인
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      //state.isLogin = true;
      //sessionStorage.setItem("userinfo", JSON.stringify(action.payload));
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //회원가입
    [__signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.signUp.push(action.payload);
    },
    [__signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //아이디중복확인
    [__idCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__idCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.signup.push(action.payload);
    },
    [__idCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(action.payload);
    },
  },
});

export default loginSignUp.reducer;
