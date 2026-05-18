import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserWatchList.css";

const UserWatchList = () => {
  const { id } = useParams();
  // const loginUser = useAppStore((state) => state.currentUser);

  const watchListItem = useAppStore((state) => state.watchList).find(
    (watch) => watch?.uid === id
  );

  const watchItems = watchListItem?.watchList || [];
  const [sortType, setSortType] = useState("title-asc");

  const sortedWatchItems = useMemo(() => {
    const copied = [...watchItems];

    switch (sortType) {
      case "title-desc":
        return copied.sort((a, b) =>
          (b.title || "").localeCompare(a.title || "", "ko")
        );

      case "release-desc":
        return copied.sort(
          (a, b) =>
            new Date(b.release_date || "1900-01-01") -
            new Date(a.release_date || "1900-01-01")
        );

      case "release-asc":
        return copied.sort(
          (a, b) =>
            new Date(a.release_date || "1900-01-01") -
            new Date(b.release_date || "1900-01-01")
        );

      case "title-asc":
      default:
        return copied.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "", "ko")
        );
    }
  }, [watchItems, sortType]);

  if (watchItems.length === 0) {
    return (
      <div className="user-watchlist-empty">
        <p>아직 워치리스트에 담은 영화가 없습니다.</p>
      </div>
    );
  }

  return (
    <section className="user-watchlist-section">
      <div className="user-watchlist-topbar">
        <span className="user-watchlist-count">
          {watchItems.length}개 저장됨
        </span>

        <div className="user-watchlist-sort">
          <label htmlFor="watchlist-sort" className="user-watchlist-sort-label">
            정렬
          </label>
          <select
            id="watchlist-sort"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="user-watchlist-sort-select"
          >
            <option value="title-asc">제목 가나다순</option>
            <option value="title-desc">제목 역순</option>
            <option value="release-desc">최신 개봉순</option>
            <option value="release-asc">오래된 개봉순</option>
          </select>
        </div>
      </div>

      <div className="user-watchlist-grid">
        {sortedWatchItems.map((watch) => (
          <Link
            to={`/movie/${watch.movieId}`}
            key={watch.movieId}
            className="user-watchlist-card"
          >
            <div className="user-watchlist-poster">
              <img
                src={`https://image.tmdb.org/t/p/w300${watch.poster_path}`}
                alt={watch.title}
              />
            </div>

            <div className="user-watchlist-meta">
              <p className="user-watchlist-title">{watch.title}</p>
              {watch.release_date && (
                <span className="user-watchlist-year">
                  {watch.release_date.slice(0, 4)}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default UserWatchList;