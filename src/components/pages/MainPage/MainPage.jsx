import Header from "../../Header/Header.jsx";
import DailyCaloriesForm from "../../DailyCalories/DailyCaloriesForm.jsx";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Header />
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
        <DailyCaloriesForm />
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
