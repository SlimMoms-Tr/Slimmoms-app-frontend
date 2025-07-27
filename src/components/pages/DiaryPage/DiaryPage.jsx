import { useState } from "react";
import Header from "../../Header/Header.jsx";
import DiaryDateCalender from "../../Diary/DiaryDateCalender.jsx";
import DiaryAddProductForm from "../../Diary/DiaryAddProductForm.jsx";
import DiaryProductsList from "../../Diary/DiaryProductsList.jsx";
import styles from "./DiaryPage.module.css";

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState("13.08.2023");
  const [products, setProducts] = useState([
    { id: 1, name: "Eggplant", grams: 100, calories: 320 },
    { id: 2, name: "Poultry meat", grams: 100, calories: 480 },
    { id: 3, name: "Bread", grams: 100, calories: 210 },
    { id: 4, name: "Nut", grams: 100, calories: 205 },
    { id: 5, name: "Pork meat", grams: 100, calories: 580 },
    { id: 6, name: "Potato", grams: 100, calories: 380 },
  ]);

  const [summary, setSummary] = useState({
    left: 625,
    consumed: 2175,
    dailyRate: 2800,
    percentage: 78
  });

  const [notRecommendedFoods] = useState([
    "Flour products",
    "Milk", 
    "Red meat",
    "Smoked meats"
  ]);

  const handleAddProduct = (newProduct) => {
    const product = {
      id: Date.now(),
      name: newProduct.name,
      grams: newProduct.grams,
      calories: newProduct.calories
    };
    setProducts([...products, product]);
    
    // Update summary
    const newConsumed = summary.consumed + newProduct.calories;
    const newLeft = summary.dailyRate - newConsumed;
    const newPercentage = Math.round((newConsumed / summary.dailyRate) * 100);
    
    setSummary({
      ...summary,
      consumed: newConsumed,
      left: newLeft,
      percentage: newPercentage
    });
  };

  const handleDeleteProduct = (productId) => {
    const productToDelete = products.find(p => p.id === productId);
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productId));
      
      // Update summary
      const newConsumed = summary.consumed - productToDelete.calories;
      const newLeft = summary.dailyRate - newConsumed;
      const newPercentage = Math.round((newConsumed / summary.dailyRate) * 100);
      
      setSummary({
        ...summary,
        consumed: newConsumed,
        left: newLeft,
        percentage: newPercentage
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Header />
        <div className={styles.content}>
          <DiaryDateCalender 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
          <DiaryAddProductForm onAddProduct={handleAddProduct} />
          <DiaryProductsList 
            products={products} 
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.summary}>
          <div className={styles.summaryHeader}>
            <h2 className={styles.summaryTitle}>
              Summary for {selectedDate}
            </h2>
            <div className={styles.leafIcon}>🍃</div>
          </div>
          <div className={styles.summaryStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Left</span>
              <span className={styles.statValue}>{summary.left} kcal</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Consumed</span>
              <span className={styles.statValue}>{summary.consumed} kcal</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Daily rate</span>
              <span className={styles.statValue}>{summary.dailyRate} kcal</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>n% of normal</span>
              <span className={styles.statValue}>{summary.percentage}%</span>
            </div>
          </div>
        </div>
        
        <div className={styles.recommendations}>
          <h3 className={styles.recommendationsTitle}>
            Food not recommended
          </h3>
          <ul className={styles.recommendationsList}>
            {notRecommendedFoods.map((food, index) => (
              <li key={index} className={styles.recommendationsItem}>
                {food}
              </li>
            ))}
          </ul>
          <div className={styles.decorativeLeaves}>
            <div className={styles.leaf}>🍃</div>
            <div className={styles.leaf}>🍃</div>
          </div>
        </div>
      </div>
    </div>
  );
}
