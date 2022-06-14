import { ICart } from './types';
import { ADD_TO_CART, DELETE_CART } from './actionTypes';

export const addToCartAction = (user: ICart) => {
  return {
    type: ADD_TO_CART,
    payload: user,
  };
};

export const removeCartAction = (name: string) => {
  return { type: DELETE_CART, payload: { name } };
};