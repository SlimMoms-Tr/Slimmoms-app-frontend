import { useSelector } from "react-redux";
import DiaryProductsListItem from "../DiaryProductsListItem/DiaryProductsListItem.jsx";

import { eatenProducts } from "../../redux/day/day_selector";

import styles from "./DiaryProductsList.module.css";

const DiaryProductsList = () => {
  const products = useSelector(eatenProducts);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.productColumn}>Product Name</div>
        <div className={styles.quantityColumn}>Quantity</div>
        <div className={styles.caloriesColumn}>Calories</div>
        <div className={styles.actionColumn}></div>
      </div>
      <ul className={styles.container}>
        {products.length > 0
          ? products.map((product) => (
            <DiaryProductsListItem key={product._id} product={product} />
          ))
          : (
            <li className={styles.emptyMessage}>
              No products added yet. Add your first product above!
            </li>
          )}
      </ul>
    </div>
  );
};

export default DiaryProductsList;
