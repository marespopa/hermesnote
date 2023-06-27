import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContainer} container`}>
        <span className="copyright">© {currentYear} Mares Popa</span>
        <ul className={styles.items}>
          <li className={styles.item}>
            <a href="https://github.com/smoothwizz/hermesnote">Github</a>
          </li>
          <li className={styles.item}>
            <Link href="/policy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
