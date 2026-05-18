import React from "react";
import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAppStore from "store/useAppStore";

const Navbar = () => {
  const location = useLocation();
  const loginUser = useAppStore((state) => state.currentUser);
  const loginUserInfo = useAppStore((state) => state.currentUserInfo);
  const logout = useAppStore((state) => state.logout);

  return (
    <header className="navbar-wrap">
      <div className="navbar-inner">
        <div className="navbar-left">

          <nav className="navbar-menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              홈
            </NavLink>

            <NavLink
              to="/movie"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              영화
            </NavLink>

            <NavLink
              to="/lists"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              리스트
            </NavLink>
          </nav>
        </div>

        <div className="navbar-right">
          {loginUserInfo && (
            <Link to={`/user/profile/${loginUser.uid}`} className="navbar-user">
              {loginUserInfo?.name}
            </Link>
          )}

          {loginUserInfo ? (
            <button type="button" className="navbar-logout" onClick={logout}>
              로그아웃
            </button>
          ) : (
            <NavLink
              to="/login"
              state={{ from: location }}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              로그인
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;