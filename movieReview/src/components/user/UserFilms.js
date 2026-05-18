import React from "react";
import { Link } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserFilms.css";

const UserFilms = () => {
  const films = useAppStore((state) => state.films);
  
  if (films.length === 0) {
    return (
      <div className="user-films-empty">
        <p>아직 등록된 영화가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="user-films-section">
      <div className="user-films-grid">
        {films.map((film) => (
          <Link
            to={`/movie/${film.movieId}`}
            key={film.movieId}
            className="user-film-card"
          >
            <div className="user-film-poster">
              <img
                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                alt={film.title}
              />
            </div>

            <div className="user-film-meta">
              <p className="user-film-title">{film.title}</p>
              {film.release_date && (
                <span className="user-film-year">
                  {film.release_date.slice(0, 4)}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserFilms;
