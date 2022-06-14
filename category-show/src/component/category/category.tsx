import { useEffect, useState, useCallback } from "react"; // let's also import Component
import axios from "axios";
import styles from "./category.module.scss";
import {Product} from "./product";
import { Cart } from "../cart/cart";


export const Category = () => {
  const [data, setData] = useState<any>([]);
 
  const fetchMyAPI = useCallback(async () => {
    console.log("fetch data...");
    let response = await axios.get("/data/data.json");
    setData(response.data);
    console.log(data);
    console.log("fetch ended");
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <>
    <ul className={styles.container} data-testid="category-1">
      {data?.products?.map((item: any, index: any) => {
        return (
          <li key={index}>
            <Product item={item} index={index} />
          </li>
        );
      })}
    </ul>
    <Cart/>
    </>
  );
};
