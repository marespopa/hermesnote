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
const mainFont = Montserrat({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

const MainPage = ({ children }: Props) => {
  return (
    <html lang="en">
      <Seo />
      <body className={mainFont.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <CustomProviders>
          <div className="min-h-screen flex flex-col bg-emerald-50 dark:bg-slate-800">
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
};

export default MainPage;
