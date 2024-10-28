import Link from "next/link";

export default function Footer() {
  return (
    <footer
      data-testid="GlobalFooter"
      className="py-4 md:py-8 bg-gray-900  text-gray-300"
    >
      <div className="container max-w-screen-xl mx-auto px-4 md:px-2">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex flex-col gap-4">
            <span className="text-xl text-gray-200">Markdown with ease</span>
            <span>
              Made with <span style={{color: '#e25555'}}>&#9829;</span> by{" "}
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
          <nav>
            <ul className="flex flex-col divide-y mt-2 sm:mt-0 sm:divide-y-0 sm:flex-row sm:space-x-4 sm:divide-x">
              <li>
                <Link className={linkStyle} href={"/terms"}>
                  Terms of Service
                </Link>
              </li>
              <li className="sm:pl-2">
                <Link className={linkStyle} href={"/privacy-policy"}>
                  Privacy Policy
                </Link>
              </li>
              <li className="sm:pl-2">
                <Link className={linkStyle} href="mailto:office@marespopa.com">
                  Feedback
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

const linkStyle = `text-gray-300 hover:text-white focus:text-white md:focus:underline md:hover:underline`;
