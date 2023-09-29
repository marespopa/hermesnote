import "./globals.css";
import { Montserrat } from "next/font/google";
import CustomProviders from "@/app/components/CustomProviders";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer.component";
import CookieConsent from "./components/CookieConsent";
import Script from "next/script";

const mainFont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Hermes Notes",
  description: "Effortlessly Create, Edit, and Export Markdown Files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <CustomProviders>
          <div className="min-h-screen flex flex-col bg-sky-50 dark:bg-slate-800">
            <Header />

            <div className="flex-1 sm:px-4 md:px-0">{children}</div>

            <Footer />
          </div>
        </CustomProviders>
        <CookieConsent />
        <Script
          defer
          async
          data-host="hermesmd.netlify.app"
          src="https://liteanalytics.com/lite.js"
        ></Script>
      </body>
    </html>
  );
}
