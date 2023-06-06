import DashboardPage from "@/components/dashboard/DashboardPage";
import Layout from "@/components/layout";
import { BacklogFileDescription } from "@/types/markdown";

interface Props {
  files: BacklogFileDescription[];
}

export default function Dashboard() {
  return (
    <Layout>
      <DashboardPage />
    </Layout>
  );
}
