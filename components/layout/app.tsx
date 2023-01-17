import Link from "next/link";
import Metadata from "../Metadata";

import styles from "./app.module.css";

export function AppLayoutHeader({ children, title, RightActionComp }: any) {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div></div>
        <h1 className={styles.headerTitle}>{title}</h1>
        <div>{RightActionComp && <RightActionComp />}</div>
      </div>
      {children}
    </header>
  );
}

export function AppLayoutContent({ children }: any) {
  return <main className={styles.appContent}>{children}</main>;
}

function AppLayout({ children }: any) {
  return (
    <div className={styles.app}>
      <Metadata />
      {children}
      <nav className={styles.navigation}>
        <Link href="/">Home</Link>
        <Link href="/search" className={styles.mainbutton}>
          <svg height={35} width={35} viewBox="0 0 64 64">
            <path
              fillRule="evenodd"
              d="M33.6 55.206h0c-.64.87-1.86 1.07-2.74.44 -.18-.13-.33-.28-.45-.45C27.634 51.306 16 34.38 16 24l0 0c0-8.84 7.16-16 16-16 8.83 0 16 7.16 16 16 -.001 10.37-11.64 27.29-14.41 31.18Zm-1.59-41.19v0c-5.53 0-10 4.47-10 10 0 5.52 4.47 10 10 10 5.52 0 10-4.48 10-10v0c0-5.53-4.48-10-10-10Z"
              fill="#fff"
            />
          </svg>
        </Link>
        <Link href="/" aria-disabled={true}>
          Lists
        </Link>
      </nav>
    </div>
  );
}

export default AppLayout;
