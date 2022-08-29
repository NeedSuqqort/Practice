import { ICartActionModel, ICart } from './types';
import { ADD_TO_CART, DELETE_CART } from './actionTypes';

const initalState: ICart[] = [
];

const cartReducers = (state = initalState, action: ICartActionModel) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      // let existedIndex : number | -1 = state.findIndex((element) => element.id === payload.id)  // return -1 if no item exist in list
      // if(existedIndex===-1){                                                             
      //   console.log('alex add new item,name=',payload.name,'quantity=',payload.quantity)    
          return [...state, payload];
        // }     
        // else{
        //   console.log('alex change existed item,name=',payload.name,'quantity=',payload.quantity)
        //   state[existedIndex].quantity = payload.quantity;
        //   return[...state]
        // }


    case DELETE_CART:
      const { id } = payload;
      return state.filter((e) => e.id !== id);
    default:
      return state;
  }
};
export default cartReducers;