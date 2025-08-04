import { toast } from "react-toastify";

import { team } from "../../utils/team.js";

import styles from "./UserAvatar.module.css";
import "react-toastify/dist/ReactToastify.css";

const UserAvatar = ({ name, size }) => {
  const avatarClick = () => {
    name &&
      toast.success(
        <a
          href="https://github.com/SlimMoms-Tr/Slimmoms-app-frontend"
          target="_blank"
          rel="noreferrer"
          title="Project developers..."
          alt="Project developers"
          className={styles.avatar__link}
        >{`${team[Math.floor(Math.random() * team.length)]}`}</a>
      );
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#1976d2",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: `${parseInt(size) * 0.4}px`,
        fontWeight: "bold",
        cursor: "pointer",
      }}
      onClick={avatarClick}
      title="Click to see developers"
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
