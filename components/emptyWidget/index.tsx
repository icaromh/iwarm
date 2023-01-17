import styles from "./emptyWidget.module.css";

type EmptyIconProps = {
  fill?: string;
};

function EmptyIcon({ fill = "#55534E" }: EmptyIconProps) {
  return (
    <svg className={styles.icon} viewBox="0 0 64 64">
      <path
        fillRule="evenodd"
        d="M24 10v4 0c0 1.1-.9 2-2 2 -1.11 0-2-.9-2-2v-4 0c0-1.11.89-2 2-2 1.1 0 2 .89 2 2Zm30 6v34 0c0 2.2-1.8 4-4 4H14v0c-2.21 0-4-1.8-4-4V16v0c0-2.21 1.79-4 4-4h3v0c.55 0 1 .44 1 1v.82 0c-.04 2.1 1.52 3.89 3.6 4.15v0c2.19.21 4.15-1.4 4.37-3.59 .01-.14.01-.27.01-.4v-1 0c0-.56.44-1 1-1h10v0c.55 0 1 .44 1 1v.82 0c-.04 2.1 1.52 3.89 3.6 4.15v0c2.19.21 4.15-1.4 4.37-3.59 .01-.14.01-.27.01-.4v-1 0c0-.56.44-1 1-1h3v0c2.2 0 4 1.79 4 4Zm-5 12H15v0c-.56 0-1 .44-1 1v20 0c0 .55.44 1 1 1h34v0c.55 0 1-.45 1-1V29v0c0-.56-.45-1-1-1ZM42 8v0c1.1 0 2 .89 2 2v4 0c0 1.1-.9 2-2 2 -1.11 0-2-.9-2-2v-4 0c0-1.11.89-2 2-2Z"
        fill={fill}
      />
    </svg>
  );
}

function Title({ message }: any) {
  return <h1>{message}</h1>;
}

function EmptyWidget() {
  return (
    <div className={styles.wrapper}>
      <EmptyIcon />
      <Title message={"No places found"} />
    </div>
  );
}

export default EmptyWidget;
