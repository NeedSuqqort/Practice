import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ICart } from './types';
import userReducers from './reducer';
const reducers = combineReducers({ cart: userReducers });
export const store = createStore(reducers, composeWithDevTools());

export interface IRootState {
  cart: ICart[];
}