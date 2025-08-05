import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header.jsx";
import DailyCaloriesForm from "../../components/DailyCaloriesForm/DailyCaloriesForm.jsx";
import RightSideBar from "../../components/RightSideBar/RightSideBar.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import { getUserInfo } from "../../redux/user/user_operation";
import { getUserCalories } from "../../redux/dailyCalories/dailyCalories_operation";
import { getUserId } from "../../redux/user/user_selector";
import { getKcalConsumed } from "../../redux/day/day_selector";
import { getDay } from "../../redux/day/day_operation";
import {
  getSideBarDailyCalories,
  getLoading,
  getNotAllowedProducts,
} from "../../redux/dailyCalories/dailyCalories_selector";
import { getIsAuthenticated } from "../../redux/auth/auth_selector";

import styles from "./CalculatorPage.module.css";

const CalculatorPage = () => {
  const isLoading = useSelector(getLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const kcalConsumed = useSelector(getKcalConsumed);

  const notAllowedProducts = useSelector(getNotAllowedProducts);

  const sideBarDailyCalories = useSelector(getSideBarDailyCalories);

  const userId = useSelector(getUserId);
  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Calculator | SlimMom";
    dispatch(getUserInfo());

    dispatch(getUserCalories());

    if (userId && isAuthenticated) {
      dispatch(getDay({ userId, date: today }));
    }
  }, [dispatch, userId, isAuthenticated, today]);

  const summaryKcalLeft = sideBarDailyCalories
    ? sideBarDailyCalories - kcalConsumed
    : 0;
  const summaryKcalConsumed = kcalConsumed || 0;
  const summaryDailyRate = sideBarDailyCalories || 0;
  const summaryPercents = sideBarDailyCalories
    ? Math.round((summaryKcalConsumed / summaryDailyRate) * 100)
    : 0;

  const finalKcalLeft = sideBarDailyCalories === null ? 0 : summaryKcalLeft;
  const finalKcalConsumed =
    sideBarDailyCalories === null ? 0 : summaryKcalConsumed;
  const finalDailyRate = sideBarDailyCalories === null ? 0 : summaryDailyRate;
  const finalPercentsOfDailyRate =
    sideBarDailyCalories === null ? 0 : summaryPercents;
  const finalNotAllowedProducts =
    sideBarDailyCalories === null ? [] : notAllowedProducts;

  return (
    <>
      <Header coloredBg />
      <div className={styles.flexBox}>
        <div className={styles.formContainer}>
          <DailyCaloriesForm />
        </div>

        <RightSideBar
          kcalLeft={finalKcalLeft}
          kcalConsumed={finalKcalConsumed}
          dailyRate={finalDailyRate}
          percentsOfDailyRate={finalPercentsOfDailyRate}
          notAllowedProductsAll={finalNotAllowedProducts}
        />
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default CalculatorPage;
