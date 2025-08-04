import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDay } from "../../redux/day/day_operation";
import { getUserId } from "../../redux/user/user_selector";

import styles from "./DateForm.module.css";

import { ReactComponent as CalendarIcon } from "../../images/bg-pictures/mobile/calender-1.svg";

const DateForm = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const userId = useSelector(getUserId);

  const isoDateTime = new Date(
    new Date(startDate).getTime() -
      new Date(startDate).getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    dispatch(getDay({ userId, date: isoDateTime }));
  }, [dispatch, startDate, isoDateTime, userId]);

  const handleDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dateInputContainer}>
        <input
          type="date"
          value={startDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
          className={styles.dateInput}
        />
        <CalendarIcon
          alt="Select date on calendar"
          title="Click to select date"
          width="18px"
          height="20px"
          className={styles.icon}
          onClick={() =>
            document.querySelector(`.${styles.dateInput}`).showPicker()
          }
        />
      </div>
      <span className={styles.dateDisplay}>
        {formatDateForDisplay(startDate)}
      </span>
    </div>
  );
};

export default DateForm;
