import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserNavBar.css";
import dbApi from "db/DB";

const UserNavbar = () => {
  const { id } = useParams();
  const loginUser = useAppStore((state) => state.currentUser);
  const targetUserId = id || loginUser?.uid;
  const loginUserInfo = useAppStore((state) => state.currentUserInfo);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
      const fetchUserInfo = async () => {
      const data = await dbApi.readUserInfo(id);
      setUserInfo(data);
      };

      if (id) fetchUserInfo();
  }, [id]);

  /*const films = useAppStore((state) => state.films).filter(
    (film) => film?.uid === loginUser?.uid
  ); */

  useEffect(() => {
      const fetchUserInfo = async () => {
        const data = await dbApi.readUserInfo(id);
        setUserInfo(data);
      };

      if (id) fetchUserInfo();
  }, [id]);

  const films = useAppStore((state) => state.films);
  const reviews = useAppStore((state) => state.userReviews);
  const watchList = useAppStore((state) => state.watchList);
  const lists = useAppStore((state) => state.lists);
  const likes = useAppStore((state) => state.likes);

  const watchCount = watchList?.watchList?.length || 0;

  // const watchCount = watchListItem?.watchList?.length || 0;

  const getFilms = useAppStore((state) => state.getFilms);
  const getUserReview = useAppStore((state) => state.getUserReview);
  const getWatchList = useAppStore((state) => state.getWatchList);
  const getUserLists = useAppStore((state) => state.getUserLists);
  const getLikes = useAppStore((state) => state.getLikes);
  const resetUserPageData = useAppStore((state) => state.resetUserPageData);

  useEffect(() => {
    if (targetUserId) {
      resetUserPageData();
      getFilms(targetUserId);
      getUserReview(targetUserId);
      getWatchList(targetUserId);
      getUserLists(targetUserId);
      getLikes(targetUserId);
    }
  }, [
    targetUserId,
    resetUserPageData,
    getFilms,
    getUserReview,
    getWatchList,
    getUserLists,
    getLikes,
  ]);

  const navItems = [
    { to: `/user/profile/${targetUserId}`, label: "PROFILE" },
    { to: `/user/films/${targetUserId}`, label: "FILMS" },
    { to: `/user/reviews/${targetUserId}`, label: "REVIEWS" },
    { to: `/user/watchlist/${targetUserId}`, label: "WATCHLIST" },
    { to: `/user/lists/${targetUserId}`, label: "LISTS" },
    { to: `/user/likes/${targetUserId}`, label: "LIKES" },
  ];

  const userInitial =
    userInfo?.name?.slice(0, 1) ||
    userInfo?.email?.slice(0, 1)?.toUpperCase() ||
    "U";

  return (
    <div className="user-navbar">
      <div className="user-navbar-hero">
        <div className="user-navbar-left">
          <div className="user-avatar">{userInitial}</div>

          <div className="user-meta">
            <h1 className="user-name">
              {userInfo?.name || "USER"}
            </h1>
            <p className="user-email">{userInfo?.email}</p>
          </div>
        </div>

        <div className="user-stats">
          <div className="user-stat-box">
            <strong>{films.length}</strong>
            <span>FILMS</span>
          </div>

          <div className="user-stat-box">
            <strong>{reviews.length}</strong>
            <span>REVIEWS</span>
          </div>

          <div className="user-stat-box">
            {/* <strong>{watchCount}</strong> */}
            <strong>{watchCount}</strong>
            <span>WATCHLIST</span>
          </div>

          <div className="user-stat-box">
            <strong>{lists.length}</strong>
            <span>LISTS</span>
          </div>

          <div className="user-stat-box">
            <strong>{likes.length}</strong>
            <span>LIKES</span>
          </div>
        </div>
      </div>

      <div className="user-nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "user-nav-link active" : "user-nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default UserNavbar;
