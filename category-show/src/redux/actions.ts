import { ICart } from './types';
import { ADD_TO_CART, DELETE_CART } from './actionTypes';

export const addToCartAction = (item: ICart) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeCartAction = (id: string) => {
  return { type: DELETE_CART, payload: { id } };
};