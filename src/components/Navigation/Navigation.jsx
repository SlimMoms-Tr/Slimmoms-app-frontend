import styles from "./Navigation.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../../redux/auth/auth_selector";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const Navigation = ({ isHidden = false }) => {
  const hidden = isHidden ? styles.isHidden : null;
  const isLogged = useSelector(getIsAuthenticated);

  const [visibleMenu, setVisibleMenu] = useState(false);

  const handleMenuBtnClick = () => {
    setVisibleMenu((prev) => !prev);
  };

  return (
    <nav className={`${styles.navigation} ${hidden}`}>
      {!isLogged && (
        <>
          <NavLink
            to={routes.login}
            className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
            aria-label="Login"
          >
            Login
          </NavLink>
          <NavLink
            to={routes.registration}
            className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
            aria-label="Register"
          >
            Register
          </NavLink>
        </>
      )}
      {isLogged && (
        <div className={styles.isHidden}>
          {visibleMenu ? (
            <>
              <CloseIcon onClick={handleMenuBtnClick} aria-label="Close menu" />
              <ul className={styles.mobileNavigation} role="navigation" aria-label="Mobile navigation">
                <li className={styles.mobileNavigationItem}>
                  <NavLink
                    to={routes.diary}
                    className={({ isActive }) => (isActive ? `${styles.mobileNavigationLink} ${styles.mobileNavigationLinkActive}` : styles.mobileNavigationLink)}
                    aria-label="Diary"
                  >
                    Diary
                  </NavLink>
                </li>
                <li className={styles.mobileNavigationItem}>
                  <NavLink
                    to={routes.calculator}
                    className={({ isActive }) => (isActive ? `${styles.mobileNavigationLink} ${styles.mobileNavigationLinkActive}` : styles.mobileNavigationLink)}
                    aria-label="Calculator"
                  >
                    Calculator
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <MenuIcon onClick={handleMenuBtnClick} aria-label="Open menu" />
          )}
        </div>
      )}
      {isLogged && (
        <div className={styles.toggleHidden}>
          <NavLink
            to={routes.diary}
            className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
            aria-label="Diary"
          >
            Diary
          </NavLink>
          <NavLink
            to={routes.calculator}
            className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}
            aria-label="Calculator"
          >
            Calculator
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
