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
import { getUserCalories } from "../../redux/dailyCalories/dailyCalories_operation";
import { getUserId } from "../../redux/user/user_selector";
import {
  getKcalLeft,
  getKcalConsumed,
  date,
  getLoading,
} from "../../redux/day/day_selector";
import { getDay } from "../../redux/day/day_operation";
import { getNotAllowedProducts } from "../../redux/dailyCalories/dailyCalories_selector";
import { getSideBarDailyCalories } from "../../redux/dailyCalories/dailyCalories_selector";

import { motivation } from "../../utils/motivation";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const dispatch = useDispatch();

  const kcalLeft = useSelector(getKcalLeft);
  const kcalConsumed = useSelector(getKcalConsumed);
  const notAllowedProducts = useSelector(getNotAllowedProducts);
  const userId = useSelector(getUserId);

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

    dispatch(getUserCalories());

    if ((userId || localStorage.getItem("accessToken")) && currentDate) {
      dispatch(getDay({ userId, date: currentDate }));
    }
  }, [dispatch, userId, currentDate]);

  useEffect(() => {
    if (kcalLeft < 0 && currentDate === today) {
      toast.warn(
        `🐷 ${motivation[Math.floor(Math.random() * motivation.length)]}`
      );
    }
  }, [kcalLeft, today, currentDate]);

  const sideBarDailyCalories = useSelector(getSideBarDailyCalories);

  // Eğer kullanıcının hesaplama geçmişi yoksa boş değerler göster
  const finalKcalLeft =
    sideBarDailyCalories === null ? 0 : sideBarDailyCalories - kcalConsumed;
  const finalKcalConsumed = sideBarDailyCalories === null ? 0 : kcalConsumed;
  const finalDailyRate =
    sideBarDailyCalories === null ? 0 : sideBarDailyCalories;
  const finalPercentsOfDailyRate =
    sideBarDailyCalories === null
      ? 0
      : sideBarDailyCalories
      ? Math.round((kcalConsumed / sideBarDailyCalories) * 100)
      : 0;
  const finalNotAllowedProducts =
    sideBarDailyCalories === null ? [] : notAllowedProducts;

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
            </div>
            <RightSideBar
              kcalLeft={finalKcalLeft}
              kcalConsumed={finalKcalConsumed}
              dailyRate={finalDailyRate}
              percentsOfDailyRate={finalPercentsOfDailyRate}
              notAllowedProductsAll={finalNotAllowedProducts}
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
