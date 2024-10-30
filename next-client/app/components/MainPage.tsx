"use client";

import Script from "next/script";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useWindowSize } from "../hooks/use-mobile";
import CookieConsent from "./CookieConsent";
import CustomProviders from "./CustomProviders";
import Footer from "./Footer/Footer.component";
import Header from "./Header";
import { Montserrat } from "next/font/google";
import Seo from "./Seo";
import { usePathname } from 'next/navigation'
import { includes } from "cypress/types/lodash";

const mainFont = Montserrat({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

const MainPage = ({ children }: Props) => {
  const pathname = usePathname()
  const showHeader = !pathname.includes('dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <Seo />
      <body>
        <CustomProviders>
          <main className={mainFont.className}>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="min-h-screen flex flex-col bg-white dark:bg-slate-800">
              {showHeader && <Header />}
              <div className="flex-1 sm:px-4 md:px-2">{children}</div>
              <Footer />
            </div>
            <CookieConsent />
            <Script
              defer
              async
              data-host="hermesmd.netlify.app"
              src="https://liteanalytics.com/lite.js"
            ></Script>
          </main>
        </CustomProviders>
      </body>
    </html>
  );
};

export default MainPage;
