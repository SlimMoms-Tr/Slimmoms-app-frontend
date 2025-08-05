import { toast } from "react-toastify";

import { team } from "../../utils/team.js";

import styles from "./UserAvatar.module.css";
import "react-toastify/dist/ReactToastify.css";

const UserAvatar = ({ name, size }) => {
  const avatarClick = () => {
    const allDevelopers = team.join("\n");
    
    toast.success(
      `Developed by:\n${allDevelopers}\n\n👆 Click to visit GitHub`,
      {
        onClick: () => {
          window.open(
            "https://github.com/SlimMoms-Tr/Slimmoms-app-frontend",
            "_blank"
          );
        },
        style: {
          cursor: "pointer",
          minWidth: "350px",
          maxWidth: "450px",
          whiteSpace: "pre-line",
          fontSize: "14px",
          lineHeight: "1.5",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
        autoClose: 6000, 
        position: "top-center",
      }
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
      title="👥 Click to see development team"
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
