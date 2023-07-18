import "./globals.css";
import { Montserrat } from "next/font/google";
import CustomProviders from "@/app/components/CustomProviders";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer.component";
import CookieConsent from "./components/CookieConsent";

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

            <div className="flex-1 px-4">{children}</div>

            <Footer />
          </div>
        </CustomProviders>
        <CookieConsent />
      </body>
    </html>
  );
}
