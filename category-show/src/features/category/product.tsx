import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./category.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, removeCartAction } from "../../redux/actions";
import { IRootState } from "../../redux/store";


export const Product = (props: any) => {
  const [isPreviewShown, setIsPreviewShown] = useState<any>(false);
  const [isSelected, setIsSelected] = useState<any>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: IRootState) => state.cart);

  useEffect(() => {
    if (cart.find((item) => item.id === props.index)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [cart]);

  const handleChange = (event: any) => {
      setQuantity(event.target.value)
  }

  const toggle_preview = () => {
    setIsPreviewShown(!isPreviewShown);
  };

  const select_item = async (e: any) => {
    e.preventDefault();
      dispatch(
        addToCartAction({ name: props.item.name, id: props.index, quantity: quantity })
      );
  };

  const deselect_item = async (e: any) => {
    e.preventDefault();
        dispatch(removeCartAction(props.item.name));

  };




  const toggle_details = (
    index: number,
    name: any,
    imageUrl: any,
    price: any,
    description: any
  ) => {
    console.log(`[details] click item ${index} details`);
    navigate("/item", {
      replace: false,
      state: {
        name: name,
        imageUrl: imageUrl,
        price: price,
        description: description,
      },
    });
  };

  return (
    <div
      className={`${isSelected ? styles.gridoxIsSelected : styles.gridboxIsNotSelected
        } ${isPreviewShown
          ? styles.gridboxIsPreviewed
          : styles.gridboxIsNotPreviewed
        } ${styles.gridbox}`}
      data-testid={`product-${props.index}`}
    >
      <div className={styles.productimage} id="image 1">
        <img alt="product" src={props.item?.variantOptions[0].mainImage?.url} />
      </div>
      <div>
        <span>{props.item.name}</span>
      </div>
      <div className={styles.buttonlist}>
        <button className={styles.button} onClick={(e) => toggle_preview()}>
          Preview
        </button>
        <button
          className={styles.button}
          onClick={(e) =>
            toggle_details(
              props.index,
              props.item?.name,
              props.item?.variantOptions[0].mainImage?.url,
              props.item?.price?.formattedValue,
              props.item?.description
            )
          }
        >
          Details
        </button>
      </div>
      {isPreviewShown && (
        <div>
          <div>{props.item?.code}</div>
          <div>{props.item?.price?.formattedValue}</div>
          <div className={styles.buttonlist}>
            <button className={styles.button} onClick={(e) => select_item(e)}>
              Add
            </button>
            <button className={styles.button} onClick={(e) => deselect_item(e)}>
              Cancel
            </button>
            <label>
              Quantity:
              <input type="number" value={quantity} onChange={handleChange} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
