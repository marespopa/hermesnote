import React from "react";
import GlobalHeader from "../GlobalHeader";
import GlobalSidebar from "../GlobalSidebar";

type Props = {
  children: React.ReactElement;
};

const MainLayout = ({ children }: Props) => {
  const baseDataTestId = "MainLayout";

  return (
    <main>
      <div className={pageStyle}>
        <GlobalHeader />
        <div className="drawer drawer-mobile" data-testid={baseDataTestId}>
          <input
            id="global-sidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className={contentWrapperStyle}>
            <label
              htmlFor="global-sidebar"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
            {children}
          </div>
          <GlobalSidebar />
        </div>
      </div>
    </main>
  );
};

const pageStyle = `bg-base-100 text-base-content min-h-screen flex flex-col h-screen`;
const contentWrapperStyle = `drawer-content flex flex-col overflow-y-auto p-4 md:px-8 xl:px-16`;

export default MainLayout;
