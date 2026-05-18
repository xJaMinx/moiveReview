import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MovieGenre = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&with_genres=${id}&page=1`
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("장르 영화 불러오기 실패", error);
      });
  }, [id, API_KEY]);

  return (
    <div className="genre-page">
      <div className="genre-inner">
        <h1 className="genre-page-title">장르 영화</h1>

        <div className="genre-movie-grid">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="genre-movie-item"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieGenre;