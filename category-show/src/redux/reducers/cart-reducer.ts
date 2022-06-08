import {ActionType} from "../reducers/cart-types"
import {Action} from "../reducers/cart-action"

const INITIAL_STATE = 0;

const reducer = (state: number = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.DEPOSIT:
      return state + action.payload;
    case ActionType.WITHDRAW:
      return state - action.payload;
    case ActionType.BANKRUPT:
      return 0;
    default:
      state;
  }
};

export default reducer;
