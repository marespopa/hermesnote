import { NavLink } from "react-router-dom";
import { borderColor } from "../../common/styles";

const GlobalSidebar = () => {
  const baseDataTestId = "GlobalSidebar";
  const navigationLinks = [
    {
      title: "Home",
      location: "/",
    },
    {
      title: "Dashboard",
      location: "/dashboard",
    },
  ];

  return (
    <div className={componentStyle} data-testid={baseDataTestId}>
      <label htmlFor="global-sidebar" className="drawer-overlay"></label>
      <ul className={navStyle}>
        {navigationLinks.map((link, index) => (
          <li>
            <NavLink
              data-testid={`${baseDataTestId}-NavigationLink-${index}`}
              to={link.location}
              className={({ isActive }) => navLinkStyle(isActive)}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const componentStyle = `drawer-side bg-base-200 border-r ${borderColor}`;
const navStyle = `menu p-4 w-80 text-base-content`;
const navLinkStyle = (isActive: boolean) => {
  return isActive ? "active" : "";
};

export default GlobalSidebar;
