import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://623440526d5465eaa516a80a.mockapi.io/THIEU";

export const getProduct = createAsyncThunk("todo/api", async () => {
  const res = await axios.get(url);
  return res.data;
});

export const getProduct2 = createAsyncThunk("todo/api2", async (vl) => {
  return vl;
});

const TodoSlice = createSlice({
  name: "Todo",
  initialState: {
    Product: [],
    Product2: [],
    NumBerOfPages: 5,
    newPage: 1,
    dataUser: [],
    logIn: false,
  },

  reducers: {
    SearchProduct: (state, action) => {
      let page = state.NumBerOfPages;
      let item = state.NumBerOfPages * state.newPage;
      if (action.payload.length > 0) {
        state.Product2 = [...state.Product].filter((x) =>
          x.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
      if (action.payload.length === 0) {
        state.Product2 = [...state.Product].slice(item - page, item);
      }
    },
    MinMax: (state, action) => {
      state.Product2 = [...state.Product].filter(
        (x) => x.price > action.payload[0] && x.price < action.payload[1]
      );
    },
    CollectionOpen1: (state, action) => {
      state.Product2 = [...state.Product].filter(
        (x) => x.Collection === action.payload
      );
    },
    CollectionOpen2: (state, action) => {
      state.Product2 = [...state.Product].filter(
        (x) => x.color === action.payload
      );
    },
    CollectionOpen3: (state, action) => {
      state.Product2 = [...state.Product].filter(
        (x) => x.category === action.payload
      );
    },
    NexPage: (state, action) => {
      // page là số phần tử mặc định hiển thị trên 1 trang
      let page = state.NumBerOfPages;
      // item là số phần tử hiển thị trang  * với số trang
      let item = state.NumBerOfPages * action.payload;
      //  điểm bắt đầu là số phần tử nhân với số trang - đi trang hiện tại và kết thúc là số phần tử nhân với số trang
      state.Product2 = [...state.Product].slice(item - page, item);
      state.newPage = action.payload;
    },
    // login
    DataLogin: (state, action) => {
      state.dataUser = action.payload;
    },
    OnlogIn: (state, action) => {
      state.logIn = action.payload;
    },
    LogOut: (state, action) => {
      state.dataUser = state.dataUser.unshift();
      state.logIn = !state.logIn;
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => {
      // console.log("Done");
      state.Product = action.payload;
    },
    [getProduct2.fulfilled]: (state, action) => {
      // console.log("Done");
      state.Product2 = action.payload;
    },
  },
});

const TodoReduce = TodoSlice.reducer;
// ==== todos lay tu store
export const listProduct = (state) => state.todos.Product;
export const listProduct2 = (state) => state.todos.Product2;
export const DataUserLongIn = (state) => state.todos.dataUser;
export const LogInUser = (state) => state.todos.logIn;

export const {
  SearchProduct,
  MinMax,
  CollectionOpen1,
  CollectionOpen2,
  CollectionOpen3,
  NexPage,
  DataLogin,
  OnlogIn,
  LogOut,
} = TodoSlice.actions;

export default TodoReduce;
