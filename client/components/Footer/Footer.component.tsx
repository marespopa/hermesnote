import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <a href="https://github.com/smoothwizz/trackfcl">GitHub</a>
        </li>
        <li className={styles.item}>
          <Link href="/policy">Policy</Link>
        </li>
        <li className={styles.item}>
          <em>Mares Popa</em>
        </li>
      </ul>
    </footer>
  );
}
