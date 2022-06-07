import { useEffect, useState, useCallback } from "react"; // let's also import Component
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./category.module.scss";

export const Category = () => {
  const [data, setData] = useState<any>([]);
  const [isPreviewShown, setIsPreviewShown] = useState<any>({});
  const [isDetailShown, setIsDetailShown] = useState<any>({});
  const [isSelected, setIsSelected] = useState<any>({});
  const navigate = useNavigate();
  const fetchMyAPI = useCallback(async () => {
    console.log("fetch data...");
    let response = await axios.get("/data/data.json");
    setData(response.data);
    console.log(data);
    console.log("fetch ended");
  }, []);

  useEffect(() => {
    fetchMyAPI();
    if (window.localStorage.getItem("isSelected")) {
      setIsSelected(JSON.parse(window.localStorage.getItem("isSelected")!));
    }
  },[]);

  const toggle_preview = (index: number) => {
    setIsPreviewShown({ ...isPreviewShown, [index]: !isPreviewShown[index] });
    console.log(
      `[preview] click item ${index} preview, status=${isPreviewShown[index]}`
    );
  };

  const toggle_details = (
    index: number,
    name: any,
    imageUrl: any,
    price: any,
    description: any
  ) => {
    window.localStorage.setItem("isSelected", JSON.stringify(isSelected));
    setIsDetailShown({ ...isDetailShown, [index]: !isDetailShown[index] });
    console.log(
      `[details] click item ${index} details, status=${isDetailShown[index]}`
    );
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

  const select_item = (index: number) => {
    setIsSelected({ ...isSelected, [index]: !isSelected[index] });
    console.log(
      `[select] click item ${index} select, before status=${isSelected[index]}`
    );
  };

  return (
    <ul className={styles.container}>
      {data?.products?.map((item: any, index: any) => {
        return (
          <li
            className={`${
              isSelected[index]
                ? styles.gridoxIsSelected
                : styles.gridboxIsNotSelected
            } ${
              isPreviewShown[index]
                ? styles.gridboxIsPreviewed
                : styles.gridboxIsNotPreviewed
            } ${styles.gridbox}`}
            key={index}
          >
              <div className={styles.productimage}>
                <img
                  alt="product"
                  src={item?.variantOptions[0].mainImage?.url}
                />
              </div>
            <div>
              <span>{item.name}</span>
            </div>
            <div className={styles.buttonlist}>
              <button
                className={styles.button}
                onClick={(e) => toggle_preview(index)}
              >
                Preview
              </button>
              <button
                className={styles.button}
                onClick={(e) =>
                  toggle_details(
                    index,
                    item?.name,
                    item?.variantOptions[0].mainImage?.url,
                    item?.price?.formattedValue,
                    item?.description
                  )
                }
              >
                Details
              </button>
            </div>
            {isPreviewShown[index] && (
              <div>
                <div>{item?.code}</div>
                <div>{item?.price?.formattedValue}</div>
                <div className={styles.buttonlist}>
                  <button
                    className={styles.button}
                    onClick={(e) => select_item(index)}
                  >
                    {isSelected[index] ? "Cancel" : "Select"}
                  </button>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};