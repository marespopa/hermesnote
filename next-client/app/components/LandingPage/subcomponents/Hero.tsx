"use client";

import Image from "next/image";
import Button from "../../Button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Hero() {
  const router = useRouter();
  const heroImage = "/assets/hero/niceday@2x.jpg";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <div className="container max-w-screen-xl mx-auto">
      <section className="flex flex-wrap mt-4 sm:mt-8 md:mt-16 items-center">
        <div className="w-full md:w-1/2 prose dark:prose-invert flex flex-col justify-center">
          <h1 className="text-5xl mt-8 leading-tight">
            Write, Edit, and Export Markdown.{" "}
            <span className="text-emerald-500"> Your Way.</span>
          </h1>
          <p className="text-xl">
            Create and edit .md files with ease using templates, live preview,
            and keyboard shortcuts for a seamless writing experience.
          </p>
          <p className="text-lg">
            Your privacy matters. All your data remains secure on your device.
            No data is transmitted to servers, ensuring your privacy and
            security.
          </p>
          <Button
            styles="mx-auto md:ml-0 grow-0"
            variant="primary-large"
            label="Try Hermes Markdown"
            handler={() => router.push("/dashboard")}
          ></Button>
        </div>
        <div className="hidden md:flex w-full sm:w-1/2">
          <Image
            className="ml-auto"
            src={heroImage}
            alt="Markdown for a nice day"
            height={266}
            priority={true}
            width={400}
          />
        </div>
      </section>
    </div>
  );
}
