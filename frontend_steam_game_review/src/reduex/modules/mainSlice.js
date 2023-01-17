import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../share/request";
import axios from "axios";

const initialState = {
  gameList: [],
  isLoading: false,
  error: null,
};

//DB에서 데이터 받아오기
export const __getGameList = createAsyncThunk(
  "getTodoList",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:3001/Post");
      console.log("getTodoList ");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.fulfillWithValue(error);
    }
  }
);

// //DB에 데이터 추가
// export const __postTodoList = createAsyncThunk(
//   "postTodoList",
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await axios.post("http://localhost:3001/todos", payload);
//       console.log("getTodoList ");
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.fulfillWithValue(error);
//     }
//   }
// );

// //DB 데이터 삭제
// export const __deleteTodoList = createAsyncThunk(
//   "deleteTodoList",
//   async (payload, thunkAPI) => {
//     try {
//       console.log(payload);
//       const { data } = await axios.delete(
//         `http://localhost:3001/todos/${payload}`
//       );
//       console.log("deleteTodoList ");

//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.fulfillWithValue(error);
//     }
//   }
// );

//리덕스
const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},

  extraReducers: {
    //get
    [__getGameList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getGameList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.gameList = action.payload;
    },
    [__getGameList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // //post
    // [__postTodoList.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__postTodoList.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.todos = [...state.todos, action.payload];
    // },
    // [__postTodoList.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    // //delete
    // [__deleteTodoList.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__deleteTodoList.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.todos = state.todos.filter((list) => list.id !== action.payload);
    // },
    // [__deleteTodoList.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export default mainSlice.reducer;
