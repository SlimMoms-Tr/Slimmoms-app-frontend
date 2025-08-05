import { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import { getLoading } from "../../redux/auth/auth_selector";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.title = "Login | SlimMom";
  }, []);

  return (
    <>
      <Container>
        <div className={styles.loginPage}>
          <Header className={styles.loginPage__header} isHidden />
          <LoginForm className={styles.loginPage__form} />
        </div>
      </Container>

      {isLoading && <Loader />}
    </>
  );
};

export default LoginPage;
