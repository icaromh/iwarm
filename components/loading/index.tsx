import styles from "./loading.module.css";

type LoadingIconProps = {
  fill?: string;
};

function LoadingIcon({ fill = "#55534E" }: LoadingIconProps) {
  return (
    <svg className={styles.icon} viewBox="0 0 64 64">
      <path
        fillRule="evenodd"
        d="M55.01 13.51v31.96 0c-.01.8-.48 1.52-1.22 1.83l-10.7 4.58v0c-.77.32-1.65-.03-1.97-.79 -.09-.19-.13-.39-.13-.6V18.52v0c-.01-.81.47-1.53 1.21-1.84l10.69-4.59 0-.001c.76-.33 1.64.02 1.96.78 .07.18.12.38.12.58Zm-33.22 33.8l-10.7 4.58h-.001c-.77.32-1.65-.03-1.97-.79 -.09-.19-.13-.39-.13-.6V18.53v0c0-.81.47-1.53 1.21-1.84L20.89 12.1v0c.76-.33 1.64.02 1.96.78 .07.18.12.38.12.59v31.96 0c0 .79-.48 1.52-1.22 1.83Zm5.3-35.19l10.69 4.58v0c.73.31 1.21 1.03 1.21 1.83v31.96h0c-.01.82-.68 1.49-1.51 1.49 -.21-.01-.41-.05-.6-.13L26.18 47.26v0c-.74-.32-1.22-1.04-1.22-1.84V13.45v-.001c-.01-.83.67-1.51 1.49-1.51 .2-.01.4.04.59.12Z"
        fill={fill}
      />
    </svg>
  );
}

function LoadingTitle() {
  return <h1>Loading places...</h1>;
}

function LoadingMessage() {
  return (
    <div className={styles.wrapper}>
      <LoadingIcon />
      <LoadingTitle />
    </div>
  );
}

export default LoadingMessage;
