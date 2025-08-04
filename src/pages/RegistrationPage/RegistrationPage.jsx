import { useEffect } from "react";
import { useSelector } from "react-redux";

import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import { getLoading } from "../../redux/auth/auth_selector";

import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    document.title = "Registration | SlimMom";
  }, []);

  return (
    <>
      <Container>
        <div className={styles.registrationPage}>
          <Header className={styles.registrationPage__header} isHidden />
          <RegistrationForm className={styles.registrationPage__form} />
        </div>
      </Container>

      {isLoading && <Loader />}
    </>
  );
};

export default RegistrationPage;
