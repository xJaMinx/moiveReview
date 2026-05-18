import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import UserNavbar from "components/user/UserNavBar";
import "./UserMyPage.css";


const UserMyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // const loginUser = auth.currentUser;
  // useEffect(() => {
  //   if (!loginUser) {
  //     navigate("/login");
  //   }
  // }, [loginUser]);

  const getTitle = () => {
    if (location.pathname.includes("/profile/edit")) return "Profile Edit";
    if (location.pathname.includes("/profile")) return "Profile";
    if (location.pathname.includes("/films")) return "Films";
    if (location.pathname.includes("/reviews")) return "Reviews";
    if (location.pathname.includes("/watchlist")) return "WatchList";
    if (location.pathname.includes("/lists")) return "Lists";
    if (location.pathname.includes("/likes")) return "Likes";
    return "User Page";
  };

  return (
    <div className="user-page">
      <UserNavbar />

      <div className="user-page-content">
        <h2 className="user-page-title">{getTitle()}</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default UserMyPage;