import { createSlice } from "@reduxjs/toolkit";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
const ListCart = createSlice({
  name: "Cart",
  initialState: {
    itemCart: [],
    ProductFirebase: [],
    User: [],
    userApp: [],
  },

  reducers: {
    GetItemFirebase: (state, action) => {
      state.ProductFirebase = action.payload;
    },
    AddItemFirebase: (state, action) => {
      state.itemCart = [];
    },
    addCart: (state, action) => {
      // them key vao objec
      const item = { ...action.payload, type: 1, id: uuidv4() };
      const itemCart = { ...item, itemmoney: action.payload.price };
      if (!state.itemCart.find((x) => x.name === action.payload.name)) {
        state.itemCart = [...state.itemCart, itemCart];
      }
      localStorage.setItem("item", JSON.stringify(state.itemCart));
    },
    DeleteCart: (state, action) => {
      state.itemCart = state.itemCart.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("item", JSON.stringify(state.itemCart));
    },
    UpdateMoney: (state, action) => {
      state.itemCart.map((x) => {
        if (x.id === action.payload) {
          x.type = x.type += 1;
          x.itemmoney = x.type * x.price;
        }
      });
      localStorage.setItem("item", JSON.stringify(state.itemCart));
    },
    smallMoney: (state, action) => {
      state.itemCart.map((x) => {
        if (x.id === action.payload) {
          if (x.type > 0) {
            x.type = x.type -= 1;
            x.itemmoney = x.type * x.price;
          }
        }
      });
      localStorage.setItem("item", JSON.stringify(state.itemCart));
    },

    UserFirebase: (state, action) => {
      state.User = action.payload;
    },
    DeleteHitory: (state, action) => {
      console.log(state.ProductFirebase);
      state.ProductFirebase = state.ProductFirebase.filter(
        (x) => x.id !== action.payload
      );
      console.log(action.payload);
      console.log(state.User[0].email);
      const db = getFirestore();
      const docRef2 = doc(db, "users", state.User[0].email);
      setDoc(docRef2, {
        data: state.ProductFirebase,
      });
    },
    setLocaStore: (state, action) => {
      state.itemCart = action.payload;
    },
    setUserApp: (state, action) => {
      state.userApp = action.payload;

      localStorage.setItem("user", JSON.stringify(state.userApp));
    },
    getUerApp: (state, action) => {
      state.userApp = action.payload;
    },
  },

  extraReducers: {},
});
const Product = ListCart.reducer;
export const listProductCart = (state) => state.todoCart.itemCart;
export const DataFirebaserCart = (state) => state.todoCart.ProductFirebase;
export const dataUserApp = (state) => state.todoCart.userApp;
export const {
  addCart,
  DeleteCart,
  UpdateMoney,
  smallMoney,
  GetItemFirebase,
  AddItemFirebase,
  UserFirebase,
  DeleteHitory,
  setLocaStore,
  setUserApp,
  getUerApp,
} = ListCart.actions;
export default Product;
