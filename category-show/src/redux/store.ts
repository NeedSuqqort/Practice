import { combineReducers, createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from "redux-devtools-extension";
import { ICart } from "./types";
import userReducers from "./reducer";
const reducers = combineReducers({ cart: userReducers });
export const store = createStore(reducers, composeWithDevTools());


// export const store = configureStore({
//   reducer: reducers,
//   enhancers:[composeWithDevTools()]
// });



export interface IRootState {
  cart: ICart[];
}
