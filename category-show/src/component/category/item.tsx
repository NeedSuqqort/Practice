import { useLocation, useNavigate } from "react-router-dom";
import styles from "./category.module.scss";

export const Item = () => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const toggle_back = () => {
    console.log("Go back to previous page");
    navigate(-1);
  };

  return (
    <div className={styles.item_container}>
      <div>{location.state.name}</div>
      <img className={styles.productimage} src={location.state.imageUrl} />
      <div>{location.state.price}</div>
      <div className={''}>
        <div dangerouslySetInnerHTML={{ __html: location.state.description }} />
      </div>
      <div>
        <button className={styles.button} onClick={toggle_back}>
          Back
        </button>
      </div>
    </div>
  );
};
