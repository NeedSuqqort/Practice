import { useDispatch, useSelector } from "react-redux";
import { ICart } from "../../redux/types";
import { removeCartAction } from "../../redux/actions";
import { IRootState } from "../../redux/store";

export const Cart = () => {
  const cart = useSelector((state: IRootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <div>Cart</div>
      <table>
        <tbody>
          {cart.map((item: ICart) => {
            const { name, id } = item;
            return (
              <tr key={id}>
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
        </tbody>
      </table>
    </>
  );
};
