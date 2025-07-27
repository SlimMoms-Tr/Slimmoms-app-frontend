import styles from "./DiaryDateCalender.module.css";

export default function DiaryDateCalender({ selectedDate, onDateChange }) {
  return (
    <div className={styles.dateContainer}>
      <h2 className={styles.dateTitle}>{selectedDate}</h2>
      <div className={styles.calendarIcon}>📅</div>
    </div>
  );
}
