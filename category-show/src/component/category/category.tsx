import { useEffect, useState, useCallback } from "react"; // let's also import Component
import axios from "axios";
import styles from "./category.module.scss";
import {Product} from "./product";

export const Category = () => {
  const [data, setData] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>({});
  const selecthook = [selectedItems, setSelectedItems];

  const fetchMyAPI = useCallback(async () => {
    console.log("fetch data...");
    let response = await axios.get("/data/data.json");
    setData(response.data);
    console.log(data);
    console.log("fetch ended");
  }, []);

  useEffect(() => {
    fetchMyAPI();
    if (window.localStorage.getItem("selectedItems")) {
      setSelectedItems(
        JSON.parse(window.localStorage.getItem("selectedItems")!)
      );
    }
  }, []);

  return (
    <ul className={styles.container} data-testid="category-1">
      {data?.products?.map((item: any, index: any) => {
        return (
          <li key={index}>
            <Product item={item} index={index} selecthook={selecthook} />
          </li>
        );
      })}
    </ul>
  );
};
