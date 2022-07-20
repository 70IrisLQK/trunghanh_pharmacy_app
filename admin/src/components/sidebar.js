import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () =>
{
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="https://res.cloudinary.com/dukdctwfd/image/upload/v1650917448/manager_dbm0lx.png"
              style={{ height: "46" }}
              className="logo"
              alt="logo"
            />
            {userInfo.user.fullname}
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>
        <nav>
          <ul className="menu-aside">
            {userInfo.user.role_id === '94C7AFC2-1B38-4D3D-9851-3A1419016AE3' ? (<li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Tổng quan</span>
              </NavLink>
            </li>) : (<div></div>)}

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Phiếu đặt hàng</span>
              </NavLink>
            </li>

            {userInfo.user.role_id === '94C7AFC2-1B38-4D3D-9851-3A1419016AE3' ? (
              <div>
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/users"
                  >
                    <i className="icon fas fa-user"></i>
                    <span className="text">Khách hàng</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/sellers"
                  >
                    <i className="icon fas fa-store-alt"></i>
                    <span className="text">Người bán hàng</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/notes"
                  >
                    <i className="icon fas fa-sticky-note"></i>
                    <span className="text">Ghi chú</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    activeClassName="active"
                    className="menu-link"
                    to="/notetypes"
                  >
                    <i className="icon fas fa-notes-medical"></i>
                    <span className="text">Loại ghi chú</span>
                  </NavLink>
                </li>
              </div>
            ) : (
              <div></div>
            )}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
