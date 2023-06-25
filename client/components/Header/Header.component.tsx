import Link from "next/link";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Image from "next/image";
import logoLight from "/assets/logo-l.svg";
import logoDark from "/assets/logo-d.svg";
import { useTheme } from "next-themes";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const logo = resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <header className="header">
      <div className="container container--from-header">
        <Link className="logo" href={"/"}>
          <Image src={logo} alt="Hermes Notes" width={164} />
        </Link>

        <nav className="header__nav">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/documentation">Docs</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <ThemeSwitch />
      </div>
    </header>
  );
}
