import styles from "./Button.module.css";

const Button = ({
  text,
  customType = 'primary',
  type = 'button',
  children,
  className = '',
  onClick,
  disabled = false,
}) => {
  const buttonType = customType === 'primary' ? styles.primary : styles.secondary;
  const additionalClass = className ? styles[className] : '';
  return (
    <button
      type={type}
      className={`${styles.button} ${buttonType} ${additionalClass}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
