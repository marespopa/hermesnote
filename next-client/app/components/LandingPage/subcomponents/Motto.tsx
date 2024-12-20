"use client";

import { containerStyle } from "@/app/constants/styles";
import Button from "../../Button";
import { useRouter } from "next/navigation";

export default function Motto() {
  const router = useRouter();

  return (
    <div className={`${containerStyle} bg-gray-100 rounded-sm shadow-sm`}>
      <section className="text-center w-1/2 mx-auto mb-4 py-8">
        <h3 className="text-2xl">
        Edit Markdown files effortlessly while keeping your data secure.
        </h3>
        <div className="mt-8">
          <Button
            variant="primary"
            label="Get Started!"
            handler={() => router.push("/dashboard")}
          ></Button>
        </div>
      </section>
    </div>
  );
}
