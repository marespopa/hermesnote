"use client";

import { containerStyle } from "@/app/constants/styles";
import Link from "next/link";
import Button from "../../Button";
import { useRouter } from "next/navigation";

export default function Motto() {
  const router = useRouter();

  return (
    <div className={containerStyle}>
      <section className="text-center w-1/2 mx-auto mb-4">
        <h3 className="text-2xl">
          Start using Hermes Notes today for effortless Markdown editing and PDF
          exporting.
        </h3>
        <div className="mt-8 mb-16">
          <Button
            variant="primary-large"
            label="Get Started!"
            handler={() => router.push("/dashboard")}
          ></Button>
        </div>
      </section>
    </div>
  );
}
