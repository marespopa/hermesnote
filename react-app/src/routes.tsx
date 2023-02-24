import DashboardPage from "./pages/DashboardPage";
import RootPage from "./pages/RootPage";

const routes = [
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
];

export default routes;
