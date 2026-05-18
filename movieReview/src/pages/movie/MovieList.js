import axios from "axios";
import Search from "components/common/Search";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SKELETON_COUNT = 12;
const LOAD_MORE_DELAY_MS = 450;

const MovieList = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const [movieList, setMovieList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get("category") || "popular";

  // 추가: 현재 페이지 상태 (기본값 1)
  const [page, setPage] = useState(1);
  // 추가: 전체 페이지 수 저장
  const [totalPages, setTotalPages] = useState(1);



  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const loadMoreRef = useRef(null);
  const loadMoreTimeoutRef = useRef(null);
  const skeletonItems = Array.from({ length: SKELETON_COUNT }, (_, index) => index);

  const GENRES = [
    { id: 28, name: "액션" },
    { id: 35, name: "코미디" },
    { id: 27, name: "호러" },
    { id: 10749, name: "로맨스" },
    { id: 878, name: "SF" },
    { id: 18, name: "드라마" },
    { id: 16, name: "애니메이션" },
  ];

  const sortMovies = (movies, option) => {
    return [...movies].sort((a, b) => {
      if (option === "release_date") return new Date(b.release_date) - new Date(a.release_date);
      if (option === "vote_average") return b.vote_average - a.vote_average;
      return b.popularity - a.popularity;
    });
  };

  const sortedMovieList = useMemo(
    () => sortMovies(movieList, sortOption),
    [movieList, sortOption]
  );

  useEffect(() => {
    let url = "";

    if (query && query.trim() !== "") {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}`;
    } else if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${selectedGenre}&page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
    }

    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    axios.get(url)
      .then((response) => {
        if (page === 1) {
          setMovieList(response.data.results);
        } else {
          setMovieList((prev) => [...prev, ...response.data.results]);
        }
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.error("데이터 로드 실패:", error))
      .finally(() => {
        setIsLoading(false);
        setIsFetchingMore(false);
      });

    // 의존성 배열에 page를 넣어야 페이지 클릭 시 API가 다시 호출됩니다.
  }, [query, category, selectedGenre, API_KEY, page]);

  // 검색어나 장르가 바뀌면 페이지를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [query, category, selectedGenre]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query, category, selectedGenre]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || isLoading || isFetchingMore || page >= totalPages || page >= 500) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadMoreTimeoutRef.current) {
          loadMoreTimeoutRef.current = window.setTimeout(() => {
            setPage((prev) => prev + 1);
            loadMoreTimeoutRef.current = null;
          }, LOAD_MORE_DELAY_MS);
        }

        if (!entry.isIntersecting && loadMoreTimeoutRef.current) {
          window.clearTimeout(loadMoreTimeoutRef.current);
          loadMoreTimeoutRef.current = null;
        }
      },
      { rootMargin: "250px 0px" }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (loadMoreTimeoutRef.current) {
        window.clearTimeout(loadMoreTimeoutRef.current);
        loadMoreTimeoutRef.current = null;
      }
    };
  }, [isLoading, isFetchingMore, page, totalPages]);

  const handleGenreSelect = (genreId) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("query");
    setSearchParams(nextParams);
    setSelectedGenre(genreId);
  };

  const handleSearchChange = (value) => {
    if (value.trim()) {
      setSelectedGenre(null);
    }
  };

  const Sort = (e) => {
    const sel = e.target.value;
    setSortOption(sel);
  };

  const getGenreColor = (genreId) => {
    switch (genreId) {
      case 28: return "genre-action";
      case 35: return "genre-comedy";
      case 27: return "genre-horror";
      case 10749: return "genre-romance";
      case 878: return "genre-sf";
      case 18: return "genre-drama";
      case 16: return "genre-animation";
      default: return "genre-default";
    }
  };

  return (
    <div id="outer">
      <div id="movie-list-container">
        <div id="movie-header">
          {/* <h1 id='list-title'>영화 목록</h1> */}
          <div id="movie-toolbar">
            <div id="genre-text-links">
              <span onClick={() => handleGenreSelect(null)} className={!selectedGenre ? "active" : ""}>전체</span>
              {GENRES.map((g) => (
                <span key={g.id} onClick={() => handleGenreSelect(g.id)} className={selectedGenre === g.id ? "active" : ""}>
                  {g.name}
                </span>
              ))}
            </div>

            <div id="movie-toolbar-left">
              <select id="selectbox" value={sortOption} onChange={Sort}>
                <option value='popularity'>인기순</option>
                <option value='release_date'>최신순</option>
                <option value='vote_average'>평점순</option>
              </select>
              <Search query={query || ""} onSearchChange={handleSearchChange} />
            </div>
          </div>
        </div>

        <hr id="genre-divider" />

        {isLoading ? (
          <div id="movie-grid" className="movie-grid-skeleton" aria-hidden="true">
            {skeletonItems.map((item) => (
              <div className="movie-card movie-card-skeleton" key={item}>
                <div className="movie-skeleton-poster movie-skeleton-shimmer" />
                <div className="movie-skeleton-info">
                  <div className="movie-skeleton-line movie-skeleton-title movie-skeleton-shimmer" />
                  <div className="movie-skeleton-line movie-skeleton-meta movie-skeleton-shimmer" />
                  <div className="movie-skeleton-line movie-skeleton-meta short movie-skeleton-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedMovieList.length > 0 ? (
          <>
            <div id="movie-grid">
            {sortedMovieList.map((movie) => (
              <div className={`movie-card ${getGenreColor(movie?.genre_ids?.[0])}`} key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </Link>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-details">
                    <span>⭐ {movie.vote_average}</span>
                    <span>{movie.release_date}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>

            {/*
            <div id="pagination">
              <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>이전</button>
              <span>{page} / {totalPages > 500 ? 500 : totalPages}</span>
              <button disabled={page >= totalPages || page >= 500} onClick={() => setPage(prev => prev + 1)}>다음</button>
            </div>
            */}

            <div ref={loadMoreRef} id="movie-load-more-trigger" />
            {isFetchingMore && (
              <div id="movie-load-more-skeleton" aria-hidden="true">
                {[0, 1, 2, 3].map((item) => (
                  <div className="movie-card movie-card-skeleton movie-card-skeleton-more" key={item}>
                    <div className="movie-skeleton-poster movie-skeleton-shimmer" />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div id="movie-empty">영화가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default MovieList;
