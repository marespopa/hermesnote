import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import AccessDenied from "@/components/access-denied";

export default function MePage() {
  const { data } = useSession();

  if (data) {
    return (
      <Layout>
        <div className="profile">
          <h2 className="profile__title">
            Hi
            <span className="profile__username">
              <img
                className="w-8 h-8 rounded-full"
                src={data?.user?.image || ""}
                alt="User Profile Pic"
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
