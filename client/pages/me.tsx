import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import AccessDenied from "@/components/access-denied";
import Image from "next/image";

export default function MePage() {
  const { data } = useSession();

  if (data) {
    return (
      <Layout>
        <div className="profile">
          <h2 className="profile__title">
            Hi
            <span className="profile__username">
              <Image
                src={data?.user?.image || ""}
                alt={data?.user?.name || "User"}
                width={8}
                height={8}
                className="rounded-full"
              />
              {data?.user?.name}!
            </span>
          </h2>
          <p className="profile__email">Your email is {data?.user?.email}</p>
        </div>
      </Layout>
    );
  }

  return <AccessDenied />;
}
