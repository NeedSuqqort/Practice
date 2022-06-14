import { combineReducers, createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from "redux-devtools-extension";
import { ICart } from "./types";
import userReducers from "./reducer";
import reduxThunk from "redux-thunk"

const middleware = [
    reduxThunk,
];

// const reducers = combineReducers({ cart: userReducers });
// export const store = createStore(reducers, composeWithDevTools(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ));

const reducers = combineReducers({ cart: userReducers });
export const store = configureStore({
  reducer: reducers,
  middleware:middleware
});



export interface IRootState {
  cart: ICart[];
}
