import DiaryProductsListItem from "./DiaryProductsListItem.jsx";
import styles from "./DiaryProductsList.module.css";

export default function DiaryProductsList({ products, onDeleteProduct }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerCell}>Product name</div>
        <div className={styles.headerCell}>Grams</div>
        <div className={styles.headerCell}>Kcal</div>
        <div className={styles.headerCell}></div>
      </div>
      <div className={styles.list}>
        {products.map((product) => (
          <DiaryProductsListItem
            key={product.id}
            product={product}
            onDelete={() => onDeleteProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
