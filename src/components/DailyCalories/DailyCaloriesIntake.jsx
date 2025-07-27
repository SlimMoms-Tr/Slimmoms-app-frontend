import styles from './DailyCalorieIntake.module.css';

export default function DailyCalorieIntake({ calorie, onClose }) {
  return (
    <div className={styles.dailyCalorieIntake}>
      <h2 className={styles.title}>Your Daily Calorie Needs</h2>
      <p className={styles.value}>{Math.round(calorie)} kcal</p>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
}