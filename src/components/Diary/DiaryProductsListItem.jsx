import styles from "./DiaryProductsListItem.module.css";

export default function DiaryProductsListItem({ product, onDelete }) {
  return (
    <div className={styles.item}>
      <div className={styles.cell}>{product.name}</div>
      <div className={styles.cell}>{product.grams} g</div>
      <div className={styles.cell}>{product.calories} kcal</div>
      <div className={styles.cell}>
        <button className={styles.deleteButton} onClick={onDelete}>
          ×
        </button>
      </div>
    </div>
  );
}
