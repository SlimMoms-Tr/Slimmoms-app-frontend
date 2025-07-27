import { useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClickOutside}>
      <div className={styles.content}>
        {children}
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
    </div>
  );
}
