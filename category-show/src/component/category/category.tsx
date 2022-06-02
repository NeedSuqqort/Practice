import { useEffect, useState, useCallback } from "react"; // let's also import Component
import axios from "axios";
import styles from "./category.module.scss";

export const Category = () => {
  const [data, setData] = useState<any>([]);

  const fetchMyAPI = useCallback(async () => {
    let response = await axios.get("/data/data.json");

    setData(response.data);
    console.log("call");
    console.log(data);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <ul className={styles.container}>
      {data?.products?.map((item: any, index: any) => {
        return (
          <li className={styles.gridbox} key={index}>
            <div>
              <div className={styles.productimage}>
                <img src={item?.variantOptions[0].mainImage?.url} />
              </div>
            </div>
            <div>
              <span>{item.name}</span>
            </div>
            <button>Preview</button>
            <button>Details</button>
          </li>
        );
      })}
    </ul>
  );
};
