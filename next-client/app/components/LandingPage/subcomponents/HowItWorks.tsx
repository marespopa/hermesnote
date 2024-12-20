"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../Button";
import EditorPreviewImage from "../../../../assets/product-image.png";


export default function HowItWorks() {
  const router = useRouter();

  return (
     <section className="py-16 bg-gray-50">
     <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-12 items-center prose prose-gray">
       <Image
         src={EditorPreviewImage}
         alt="Editor Preview"
         className="rounded-sm shadow-sm w-full"
       />

       <div>
         <h3 className="text-xl font-bold mb-4">
           Write Freely, Securely, and Locally
         </h3>
         <p>
           Hermes Markdown lets you write without worrying about privacy
           breaches or losing control of your data. Perfect for
           professionals, students, and anyone who values simplicity and
           security.
         </p>
         <Button
         variant="primary"
         label="Try it out!"
         handler={() => router.push("/dashboard")}
       ></Button>
       </div>
     </div>
   </section>
  );
}
