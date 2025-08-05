import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDay } from "../../redux/day/day_operation";
import { setDate } from "../../redux/day/day-reducer";
import { getUserId } from "../../redux/user/user_selector";
import { getIsAuthenticated } from "../../redux/auth/auth_selector";
import { date } from "../../redux/day/day_selector";

import styles from "./DateForm.module.css";

import calendarIcon from "../../images/bg/mobile/calender.svg";

const DateForm = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(date);
  const userId = useSelector(getUserId);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const [startDate, setStartDate] = useState(
    currentDate || new Date().toISOString().split("T")[0]
  );


  useEffect(() => {
    if (currentDate && currentDate !== startDate) {
      setStartDate(currentDate);
    }
  }, [currentDate, startDate]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setStartDate(newDate);
    
    dispatch(setDate(newDate));
    
    if (isAuthenticated && userId && localStorage.getItem("accessToken")) {
      dispatch(getDay({ userId, date: newDate }));
    }
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric",
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dateContainer}>
        <span className={styles.dateDisplay}>
          {formatDateForDisplay(startDate)}
        </span>
        <img
          src={calendarIcon}
          alt="Select date on calendar"
          title="Click to select date"
          width="18"
          height="20"
          className={styles.calendarIcon}
          onClick={() =>
            document.querySelector(`.${styles.dateInput}`).showPicker()
          }
        />
      </div>
      <input
        type="date"
        value={startDate}
        onChange={handleDateChange}
        max={new Date().toISOString().split("T")[0]}
        className={styles.dateInput}
      />
    </div>
  );
};

export default DateForm;
