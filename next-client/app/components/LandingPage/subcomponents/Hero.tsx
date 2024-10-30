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
            A free to use, online Markdown editor
          </h1>
          <p className="text-xl">
            Hermes Markdown is dedicated to enhancing your Markdown editing and
            viewing experience.
          </p>
          <p className="text-lg">
            We&apos;ve tailored our app to provide a straightforward and
            efficient process for creating, editing, and exporting your Markdown
            content.
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
