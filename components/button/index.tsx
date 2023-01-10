import styles from "./button.module.css";

function getClasses(square: boolean) {
  if (square) {
    return styles.primaryButton + " " + styles.square;
  }

  return styles.primaryButton;
}

function Button({
  type = "button",
  children,
  square,
  onClick,
  disabled = false,
}: any) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={getClasses(square)}
    >
      {children}
    </button>
  );
}

export function LinkButton({ children, href, target = "", square }: any) {
  return (
    <a
      target={target}
      href={href}
      rel="noopener noreferrer"
      className={getClasses(square)}
    >
      {children}
    </a>
  );
}

export default Button;
