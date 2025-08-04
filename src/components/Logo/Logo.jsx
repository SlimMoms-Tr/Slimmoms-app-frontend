import styles from "./Logo.module.css";
import logo from "../../images/logo/logo.svg";
import { Link } from "react-router-dom";
import routes from "../../routes";

const Logo = ({ isLogged }) => {
  const hidden = isLogged ? null : styles.isHidden;
  return (
    <Link to={routes.diary} className={styles.link}>
      <img src={logo} alt="SlimMom Logo" className={styles.logo} />
      <p className={`${styles.logoTitle} ${hidden}`}>
        Slim<span className={styles.activeColorLogo}>Mom</span>
      </p>
    </Link>
  );
};

export default Logo;
