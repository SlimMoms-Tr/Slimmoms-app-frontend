import styles from "./DiaryProductsListItem.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/day/day_operation";
import { date } from "../../redux/day/day_selector";

const DiaryProductsListItem = ({ product: { _id, title, weight, kcal } }) => {
  const dispatch = useDispatch();
  const currentDate = useSelector(date);

  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0]; 

  const handleClick = async () => {
    if (currentDate === today) {
      dispatch(deleteProduct({ date: currentDate, productId: _id }));
    }
  };

  const disabledIcon = currentDate === today ? null : styles.disabled;

  return (
    <>
      <li className={styles.item}>
        <div className={styles.name}>{title}</div>
        <div className={styles.weight}>{weight} g</div>
        <div className={styles.calories}>
          {kcal} <span>kcal</span>
        </div>
        <CloseIcon
          className={`${styles.icon} ${disabledIcon}`}
          onClick={handleClick}
        />
      </li>
    </>
  );
};

export default DiaryProductsListItem;
