import { useDispatch, useSelector } from "react-redux";
import {ICart } from "../../redux/types";
import { removeCartAction } from "../../redux/actions";
import { IRootState } from "../../redux/store";

export const Cart = () => {
  const cart = useSelector((state: IRootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <div>Cart</div>
      {cart.map((item: ICart) => {
        const { name, id } = item;
        return (
          <tr key={name}>
            <td>{id}: </td>
            <td>{name}</td>

            <td
              onClick={() => dispatch(removeCartAction(name))}
              key={`delete-${name}`}
            >
              ❌
            </td>
          </tr>
        );
      })}
    </>
  );
};
