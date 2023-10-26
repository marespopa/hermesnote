"use client";

import Image from "next/image";
import Button from "../../Button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="container max-w-screen-xl mx-auto">
      <section className="flex flex-wrap mt-4 sm:mt-8 md:mt-16 items-center">
        <div className="w-full sm:w-1/2 prose dark:prose-invert">
          <h1 className="text-5xl mt-8 leading-tight">
            Effortlessly Create, Edit, and Export Markdown Files
          </h1>
          <p className="text-xl">
            Hermes Notes understands the importance of effortless file
            management in your Markdown editing process.
          </p>
          <p className="text-lg">
            That&apos;s why we&apos;ve designed our app to provide a seamless
            experience when it comes to opening, saving, and exporting your
            Markdown files.
          </p>
          <Button
            variant="primary-large"
            label="Try for free"
            handler={() => router.push("/dashboard")}
          ></Button>
        </div>
        <div className="w-full sm:w-1/2">
          <Image
            className="ml-auto"
            src="/assets/hero/niceday@2x.jpg"
            alt="Markdown for a nice day"
            height={400}
            priority={true}
            width={600}
          />
        </div>
      </section>
    </div>
  );
}
