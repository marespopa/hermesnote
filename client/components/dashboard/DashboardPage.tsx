import { useSession, signIn, signOut } from "next-auth/react";
import DashboardContainer from "./DashboardContainer";
import AccessDenied from "../access-denied";
export default function DashboardPage() {
  const { data: session } = useSession();
  if (session) {
    return <DashboardContainer />;
  }
  return <AccessDenied />;
}
