import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import Container from "../Container/Container.jsx";
import Logo from "../Logo/Logo.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import { getIsAuthenticated } from "../../redux/auth/auth_selector";

const Header = ({ isHidden, coloredBg }) => {
  const isLogged = useSelector(getIsAuthenticated);
  const addBg = coloredBg ? styles.coloredBg : null;
  return (
    <header className={styles.header}>
      <Container>
        <div className={`${styles.flexContainer} ${addBg}`}>
          <Logo isLogged={isLogged} />
          <div className={styles.flexContainer2}>
            {isLogged && <UserInfo />}
            <Navigation isLogged={isLogged} isHidden={isHidden} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
