import { useState } from "react";
import Header from "../../Header/Header.jsx";
import DailyCaloriesForm from "../../DailyCalories/DailyCaloriesForm.jsx";
import Modal from "../../Modal/Modal.jsx";
import styles from "./CalculatorPage.module.css";

export default function CalculatorPage() {
  const [showModal, setShowModal] = useState(false);
  const [calorieResult, setCalorieResult] = useState({
    dailyCalories: 2800,
    notRecommendedFoods: [
      "Flour products",
      "Milk",
      "Red meat",
      "Smoked meats"
    ]
  });

  const handleFormSubmit = (formData) => {
    console.log("Calculator Form Data:", formData);
    // Burada API çağrısı yapılacak ve sonuç alınacak
    setShowModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Header />
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
        <DailyCaloriesForm onSubmit={handleFormSubmit} />
      </div>
      <div className={styles.right}>
        <div className={styles.decorativeElements}>
          <div className={styles.banana}></div>
          <div className={styles.strawberry}></div>
          <div className={styles.leaves}>
            <div className={styles.leaf}></div>
            <div className={styles.leaf}></div>
            <div className={styles.leaf}></div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              Your recommended daily calorie intake is
            </h2>
            <div className={styles.calorieValue}>
              {calorieResult.dailyCalories} <span className={styles.unit}>ккал</span>
            </div>
            <div className={styles.separator}></div>
            <h3 className={styles.foodTitle}>Foods you should not eat</h3>
            <ol className={styles.foodList}>
              {calorieResult.notRecommendedFoods.map((food, index) => (
                <li key={index} className={styles.foodItem}>
                  {food}
                </li>
              ))}
            </ol>
            <button 
              className={styles.modalButton}
              onClick={() => setShowModal(false)}
            >
              Start losing weight
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
