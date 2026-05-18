import React, { useEffect } from "react";
import useAppStore from "store/useAppStore";
import { Link } from "react-router-dom";
import "./Lists.css";

const Lists = () => {
  const getAllLists = useAppStore((state) => state.getAllLists);
  const allLists = useAppStore((state) => state.allLists);

  const getListKey = (list, index) =>
    list.id || `${list.uid}-${index}-${list.title}`;

  useEffect(() => {
    getAllLists();
  }, [getAllLists]);

  return (
    <section className="lists-page">
      <div className="lists-page-inner">
        <div className="lists-page-header">
          <h2 className="lists-page-title">LISTS</h2>
        </div>

        <div className="lists-showcase-grid">
          {allLists?.map((list, index) => {
            const listKey = getListKey(list, index);
            const previewMovies = list.lists?.slice(0, 5) || [];

            return (
              <article className="lists-showcase-card" key={listKey}>
                <div className="lists-showcase-stack">
                  {previewMovies.map((movie, posterIndex) => (
                    <Link
                      to={`/movie/${movie.movieId}`}
                      key={`${movie.movieId}-${posterIndex}`}
                      className="lists-showcase-poster-link"
                      style={{ zIndex: 10 - posterIndex }}
                    >
                      {movie.poster_path ? (
                        <img
                          className="lists-showcase-poster"
                          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                          alt={movie.title || "movie poster"}
                          loading="lazy"
                        />
                      ) : (
                        <div className="lists-showcase-poster lists-showcase-poster-empty">
                          No Image
                        </div>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="lists-showcase-body">
                  <Link
                    to={`/user/profile/${list.uid}`}
                    className="lists-showcase-writer"
                  >
                    Created by {list.writer}
                  </Link>

                  <h3 className="lists-showcase-title">{list.title}</h3>

                  <div className="lists-showcase-meta">
                    <span>{list.lists?.length || 0}편 수록</span>
                    {(list.lists?.length || 0) > 5 && (
                      <span className="lists-showcase-more">
                        +{list.lists.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="lists-showcase-actions">
                  {list.id ? (
                    <Link
                      to={`/list/${list.id}`}
                      className="lists-showcase-detail-link"
                    >
                      전체보기
                    </Link>
                  ) : (
                    <span className="lists-showcase-detail-disabled">
                      상세 없음
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Lists;