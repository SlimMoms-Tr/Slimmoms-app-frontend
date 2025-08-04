import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Header from "../../components/Header/Header.jsx";
import DateForm from "../../components/DateForm/DateForm.jsx";
import DiaryAddProductForm from "../../components/DiaryAddProductForm/DiaryAddProductForm.jsx";
import RightSideBar from "../../components/RightSideBar/RightSideBar.jsx";
import DiaryProductsList from "../../components/DiaryProductsList/DiaryProductsList.jsx";
import Button from "../../components/Button/Button.jsx";
import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Loader from "../../components/Loader/Loader.jsx";

import { getUserInfo } from "../../redux/user/user_operation";
import { getNotAllowedProductsAll } from "../../redux/user/user_selector";
import {
  getKcalLeft,
  getKcalConsumed,
  getDailyRate,
  getPercentsOfDailyRate,
  date,
  getLoading,
} from "../../redux/day/day_selector";

import { motivation } from "../../utils/motivation";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const dispatch = useDispatch();

  const kcalLeft = useSelector(getKcalLeft);
  const kcalConsumed = useSelector(getKcalConsumed);
  const dailyRate = useSelector(getDailyRate);
  const percentsOfDailyRate = useSelector(getPercentsOfDailyRate);
  const notAllowedProductsAll = useSelector(getNotAllowedProductsAll);

  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0]; 
  const currentDate = useSelector(date); 

  const isLoading = useSelector(getLoading); 

  const [mobileFormIsVisible, setMobileFormIsVisible] = useState(false);
  const handleClick = () => {
    setMobileFormIsVisible((prev) => !prev);
  };

  useEffect(() => {
    document.title = "Diary | SlimMom";
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (kcalLeft < 0 && currentDate === today) {
      toast.warn(
        `🐷 ${motivation[Math.floor(Math.random() * motivation.length)]}`
      );
    }
  }, [kcalLeft, today, currentDate]); 

  return (
    <>
      <Header coloredBg />
      <div className={styles.flexBox}>
        {!mobileFormIsVisible ? (
          <>
            <div className={styles.exampleBox}>
              <DateForm />
              <div className={styles.isHidddenMobile}>
                <DiaryAddProductForm />
              </div>

              <DiaryProductsList />
              <div className={styles.isHidddenTablet}>
                <Button
                  customType="primary"
                  className="small"
                  onClick={handleClick}
                  disabled={currentDate !== today}
                >
                  <AddIcon />
                </Button>
              </div>
              {!dailyRate ? (
                <h3 className={styles.notification}>
                  To add products to the list - fill out the form on the
                  Calculator page
                </h3>
              ) : (
                ""
              )}
            </div>
            <RightSideBar
              kcalLeft={kcalLeft}
              kcalConsumed={kcalConsumed}
              dailyRate={dailyRate}
              percentsOfDailyRate={percentsOfDailyRate}
              notAllowedProductsAll={notAllowedProductsAll}
            />
          </>
        ) : (
          <>
            <div className={styles.exampleBox}>
              <DiaryAddProductForm />
              <KeyboardBackspaceIcon
                className={styles.backButton}
                onClick={handleClick}
              />
            </div>
          </>
        )}
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default DiaryPage;
