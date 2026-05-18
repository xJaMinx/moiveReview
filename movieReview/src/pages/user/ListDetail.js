import React from "react";
import { Link, useParams } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./ListDetail.css";

const ListDetail = () => {
  const { id } = useParams();
  const lists = useAppStore((state) => state.lists || []);

  const getListId = (list, index) =>
    list.id || `${list.uid}-${index}-${list.title}`;

  const list = lists.find((item, index) => {
    return String(getListId(item, index)) === String(id);
  });

  if (!list) {
    return (
      <div className="list-detail-empty">
        <p>리스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const movies = Array.isArray(list.lists) ? list.lists : [];

  return (
    <section className="list-detail-page">
      <div className="list-detail-inner">
        <div className="list-detail-header">
          <h1 className="list-detail-title">{list.title}</h1>
          <p className="list-detail-desc">{list.desc}</p>
          <span className="list-detail-count">총 {movies.length}편</span>
        </div>

        <div className="list-detail-grid">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.movieId}`}
              key={movie.movieId}
              className="list-detail-card"
            >
              <div className="list-detail-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title || "movie poster"}
                />
              </div>

              {movie.title && (
                <p className="list-detail-movie-title">{movie.title}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListDetail;