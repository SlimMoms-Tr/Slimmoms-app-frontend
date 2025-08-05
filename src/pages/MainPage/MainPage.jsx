import { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import DailyCaloriesForm from "../../components/DailyCaloriesForm/DailyCaloriesForm.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import { getLoading } from "../../redux/dailyCalories/dailyCalories_selector";

import styles from "./MainPage.module.css";

const MainPage = () => {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.title = "SlimMom | Lose Weight Effectively!";
  }, []);

  return (
    <>
      <div className={styles.mainPage}>
        <Container>
          <Header />
          <DailyCaloriesForm />
        </Container>
      </div>

      {isLoading && <Loader />}
    </>
  );
};

export default MainPage;
