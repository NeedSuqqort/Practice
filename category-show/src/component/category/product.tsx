import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./category.module.scss";
import { ICart } from "../../redux/types";
import { useDispatch } from 'react-redux';
import { addToCartAction,removeCartAction } from '../../redux/actions';

const init: ICart = {
  name: '',
  id: 0,
};


export const Product = (props: any) => {
  const [isPreviewShown, setIsPreviewShown] = useState<any>(false);
  const [isSelected, setIsSelected] = useState<any>(false);
  const [selectedItems, setSelectedItems] = props?.selecthook;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(init);

  useEffect(() => {
    if (selectedItems[props.index]) {
      setIsSelected(true);
    }



  }, []);

  const toggle_preview = () => {
    setIsPreviewShown(!isPreviewShown);
  };

  const select_item = async (e:any) => {
    e.preventDefault();
    console.log("item index = " + props.index);
    console.log("item name = " + props.item.name);
    setIsSelected(!isSelected);
    if (!isSelected) {
      setSelectedItems({ ...selectedItems, [props.index]: props.item.name });
      dispatch(addToCartAction({ ...state, name: props.item.name,id:props.index }));
      setState(init);
    } else {
      delete selectedItems[props.index];
      dispatch(dispatch(removeCartAction(props.item.name)));

    }
  };

  const toggle_details = (
    index: number,
    name: any,
    imageUrl: any,
    price: any,
    description: any
  ) => {
    console.log(JSON.stringify(selectedItems));
    window.localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

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
      className={`${
        isSelected ? styles.gridoxIsSelected : styles.gridboxIsNotSelected
      } ${
        isPreviewShown
          ? styles.gridboxIsPreviewed
          : styles.gridboxIsNotPreviewed
      } ${styles.gridbox}`}
      data-testid={`product-${props.index}`}
    >
      <div className={styles.productimage} id='image 1'>
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
              {isSelected ? "Cancel" : "Select"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
