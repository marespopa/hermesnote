"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Button from "../Button";

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DAYS = 365;

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const handleAccept = () => {
    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DAYS,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <section className="fixed bottom-0 right-4 w-full md:w-2/3 py-2 md:py-4">
      <div className="flex gap-2 px-5 py-3 space-y-2 bg-slate-200 dark:bg-slate-700 md:flex-row md:space-y-0 md:items-stretch md:space-x-2">
        <div className="flex items-center flex-1 text-gray-900 dark:text-gray-200">
          <p className="text-sm font-medium">
            This site uses services that uses cookies to deliver better
            experience and analyze traffic. You can learn more about the
            services by reading our{" "}
            <Link
              href="/privacy-policy"
              className="text-sm underline hover:text-lightAccent"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Button
            variant="secondary"
            handler={() => handleAccept()}
            label="Accept All"
          />
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;
