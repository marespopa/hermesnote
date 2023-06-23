import Link from "next/link";
import styles from "./Header.module.scss";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  return (
    <header className="global-header">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <ThemeSwitch />
    </header>
  );
}
