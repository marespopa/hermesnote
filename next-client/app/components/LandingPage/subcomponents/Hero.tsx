"use client";

import Image from "next/image";
import Button from "../../Button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const heroImage = "/assets/hero/niceday@2x.jpg";

  return (
    <div className="container max-w-screen-xl mx-auto">
      <section className="flex flex-wrap mt-4 sm:mt-8 md:mt-16 items-center">
        <div className="w-full md:w-1/2 prose flex flex-col justify-center">
          <h1 className="text-5xl mt-8 leading-tight">
            Write{" "}
            <span className="bg-emerald-600 text-white p-1">
              Freely, Securely, and Locally
            </span>
          </h1>
          <p className="text-xl mt-4">
            Hermes Markdown is your go-to markdown editor for creating and
            editing markdown files effortlessly.
          </p>
          <p className="text-xl mt-4">
            Enjoy powerful features like <strong>templates</strong>,{" "}
            <strong>live preview</strong>, and{" "}
            <strong>keyboard shortcuts</strong> to streamline your writing
            process.
          </p>
          <p className="text-lg mt-4">
            Prioritize your <strong>privacy</strong> with a tool that ensures
            all your content stays on your device. No data is transmitted to
            servers, giving you complete control over your work while
            maintaining top-notch security.
          </p>
          <Button
            styles="mx-auto md:ml-0 grow-0 mt-6"
            variant="primary"
            handler={() => router.push("/dashboard")}
          >
            <span className="text-2xl">
              Start <span className="text-xs align-super -mt-4">100% free</span>
            </span>
          </Button>
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
