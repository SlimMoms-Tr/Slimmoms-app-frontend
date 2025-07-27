import styles from "./Header.module.css";
import Logo from "../Logo/Logo.jsx";
import Navigation from "../Navigation/Navigation";
import UserInfo from "../UserInfo/UserInfo.jsx";
import { useSelector } from "react-redux";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.right}>
        <Navigation />
        {isAuthenticated && <UserInfo />}
      </div>
    </header>
  );
}
