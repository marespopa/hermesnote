import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <ul className={styles.items}>
          <li className={styles.item}>
            <a href="https://github.com/smoothwizz/hermesnote">GitHub</a>
          </li>
          <li className={styles.item}>
            <Link href="/policy">Policy</Link>
          </li>
          <li className={styles.item}>{`©${currentYear} Mares Popa`}</li>
        </ul>
      </div>
    </footer>
  );
}
