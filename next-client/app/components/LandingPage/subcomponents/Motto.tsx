import { containerStyle } from "@/app/constants/styles";
import Image from "next/image";
import Link from "next/link";

export default function Motto() {
  return (
    <div className={containerStyle}>
      <section className="text-center w-1/2 mx-auto">
        <h3 className="text-2xl">
          Whether you&apos;re a writer, blogger, developer, or business
          professional, <strong>Hermes Notes</strong> is here to simplify your
          Markdown editing and PDF exporting needs.
        </h3>
        <Link href={"/app"}>
          <Image
            className="mx-auto my-8"
            src={"/assets/icons/markdown-icon.png"}
            height={100}
            width={100}
            alt="MD"
          />
        </Link>
      </section>
    </div>
  );
}
