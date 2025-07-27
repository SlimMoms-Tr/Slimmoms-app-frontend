import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import styles from "./UserInfo.module.css";

export default function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) return null;

  return (
    <div className={styles.userInfo}>
      <span className={styles.username}>{user?.name || "Nic"}</span>
      <div className={styles.separator}></div>
      <button
        className={styles.logoutBtn}
        onClick={() => dispatch(logout())}
      >
        Exit
      </button>
    </div>
  );
}
