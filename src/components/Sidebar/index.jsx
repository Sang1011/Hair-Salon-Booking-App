import { NavLink } from "react-router-dom";
import "./style.scss";
function Sidebar() {
  const navLinkActive = (e) => {
    return e.isActive ? "sidebar__menu__li__link sidebar__menu__li__link--active" : "sidebar__menu__li__link";
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__nameBrand">
          <span>Hair Harmony</span>
        </div>
        <hr />
        <div className="sidebar__menu">
          <ul>
            <li>
              <NavLink
                to="/" className={navLinkActive}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkActive}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/salary" className={navLinkActive}>
                Salary
              </NavLink>
            </li>
          </ul>
          <div className="sidebar__menu--logout">
          <NavLink to="/logout" className={navLinkActive}>
                Logout
              </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
