import { configureStore } from "@reduxjs/toolkit";
import TodoReduce from "./Reducer";
import Product from "./ReducerCart";

const store = configureStore({
  reducer: {
    todos: TodoReduce,
    todoCart: Product,
  },
});

export default store;
