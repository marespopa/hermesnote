"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductHuntBadge from "./components/ProductHuntBadge";
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  if (pathname.includes("editor")) {
    return <></>;
  }

  return (
    <footer
      data-testid="GlobalFooter"
      className="py-2 md:py-4 bg-gray-900 text-gray-300 text-xs"
    >
      <div className="container max-w-screen-xl mx-auto px-4 md:px-2">
        <div className="flex flex-col md:flex-row justify-between w-full items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xl text-gray-200">Markdown with ease</span>
            <span>
              Made with <span style={{ color: "#e25555" }}>&#9829;</span> by{" "}
              <a
                className="underline"
                href="https://www.marespopa.com/"
                target="_blank"
              >
                Mares Popa
              </a>
              .
            </span>
          </div>
          <nav className="mx-auto max-w-screen-md py-4">
            <ul className="flex flex-col items-center divide-y text-center text-sm text-gray-600 sm:flex-row sm:space-x-4 sm:divide-y-0 sm:divide-x">
              <li className="py-2 sm:py-0">
                <Link className={linkStyle} href={"/terms"}>
                  Terms of Service
                </Link>
              </li>
              <li className="py-2 sm:py-0 sm:pl-4">
                <Link className={linkStyle} href={"/privacy-policy"}>
                  Privacy Policy
                </Link>
              </li>
              <li className="py-2 sm:py-0 sm:pl-4">
                <Link
                  className={linkStyle}
                  target="_top"
                  href="mailto:office@marespopa.com"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </nav>
          <ProductHuntBadge />
        </div>
      </div>
    </footer>
  );
}

const linkStyle = `text-gray-300 hover:text-white focus:text-white md:focus:underline md:hover:underline`;
