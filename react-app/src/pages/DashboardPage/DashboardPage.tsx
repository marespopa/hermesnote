import Dashboard from "../../components/Dashboard/Dashboard.component";
import MainLayout from "../../components/MainLayout/MainLayout.component";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
};

export default DashboardPage;
