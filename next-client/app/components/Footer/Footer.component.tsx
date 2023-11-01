import Link from "next/link";

export default function Footer() {
  return (
    <footer
      data-testid="GlobalFooter"
      className="py-4 md:py-8 bg-gray-900  text-gray-300"
    >
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex justify-between w-full">
          <span>HermesNote. @All rights reserved.</span>
          <nav>
            <ul className="flex space-x-4 divide-x">
              <li>
                <Link className={linkStyle} href={"/terms"}>
                  Terms of Service
                </Link>
              </li>
              <li className="pl-4">
                <Link className={linkStyle} href={"/privacy-policy"}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

const linkStyle = `text-gray-300 hover:text-white focus:text-white`;
