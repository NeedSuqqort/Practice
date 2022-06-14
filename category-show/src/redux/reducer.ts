import { ICartActionModel, ICart } from './types';
import { ADD_TO_CART, DELETE_CART } from './actionTypes';

const initalState: ICart[] = [
];

const userReducers = (state = initalState, action: ICartActionModel) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      return [...state, payload];
    case DELETE_CART:
      const { name } = payload;
      return state.filter((e) => e.name !== name);
    default:
      return state;
  }
};
export default userReducers;