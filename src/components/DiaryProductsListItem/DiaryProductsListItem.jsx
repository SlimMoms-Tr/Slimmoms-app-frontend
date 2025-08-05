import styles from "./DiaryProductsListItem.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/day/day_operation";
import { date } from "../../redux/day/day_selector";

const DiaryProductsListItem = ({ product: { _id, title, weight, calories } }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(date);

  const handleClick = async () => {
    dispatch(deleteProduct({ date: currentDate, productId: _id }));
  };

  return (
    <li className={styles.item}>
      <div className={styles.productName}>{title}</div>
      <div className={styles.quantity}>{weight} g</div>
      <div className={styles.calories}>
        {calories} kcal
      </div>
      <div className={styles.action}>
        <CloseIcon
          className={styles.deleteIcon}
          onClick={handleClick}
        />
      </div>
    </li>
  );
};

export default DiaryProductsListItem;
