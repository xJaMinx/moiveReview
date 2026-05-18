import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserNewList.css";
import dbApi from "db/DB";

const UserNewList = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const navigate = useNavigate();

  const loginUser = useAppStore((state) => state.currentUser);
  const [userInfo, setUserInfo] = useState(null);
  const addList = useAppStore((state) => state.addList);

  const [searchTitle, setSearchTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchAreaRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      if (loginUser?.uid) {
        const data = await dbApi.readUserInfo(loginUser.uid);
        setUserInfo(data);
      }
    };
    getUserData();
  }, [loginUser?.uid, dbApi.readUserInfo]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      setIsSearchOpen(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`
      );
      setMovies(response.data.results || []);
      setIsSearchOpen(true);
    } catch (error) {
      console.error("영화 검색 실패", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
    searchMovies(value);
  };

  const handleResultClick = (movie) => {
    const foundResult = userLists.find((m) => m.movieId === movie.id);
    if (foundResult) return;

    setUserLists([
      ...userLists,
      {
        movieId: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
      },
    ]);

    setSearchTitle("");
    setMovies([]);
    setIsSearchOpen(false);
  };

  const handleRemoveMovie = (movieId) => {
    setUserLists(userLists.filter((movie) => movie.movieId !== movieId));
  };

  const handleAddList =  async (e) => {
    e.preventDefault();

    if (!loginUser) return;
    if (!title.trim() || !desc.trim()) return;

    const newList = {
      id: Date.now().toString(),
      uid: loginUser.uid,
      writer: userInfo.name,
      title: title,
      desc: desc,
      lists: userLists,
    };

    await addList(newList);
    navigate("/user/lists/" + loginUser.uid);
  };

  return (
    <form className="user-new-list-section" onSubmit={handleAddList}>
      <div className="user-new-list-header">
        <h2 className="user-new-list-title">New List</h2>
      </div>

      <div className="user-new-list-form-area">
        <div className="user-new-list-top">
          <div className="user-new-list-left">
            <div className="user-new-list-field">
              <label className="user-new-list-label">제목</label>
              <input
                className="user-new-list-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="리스트 제목 입력"
              />
            </div>

            <div className="user-new-list-field">
              <label className="user-new-list-label">설명</label>
              <textarea
                className="user-new-list-textarea"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="리스트 설명 입력"
              />
            </div>
          </div>

          <div className="user-new-list-right">
            <div className="user-new-list-field" ref={searchAreaRef}>
              <label className="user-new-list-label">영화 검색</label>
              <input
                className="user-new-list-search-input"
                value={searchTitle}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (movies.length > 0) setIsSearchOpen(true);
                }}
                placeholder="영화 제목 검색"
              />

              {isSearchOpen && movies.length > 0 && (
                <div className="user-new-list-search-results-wrap">
                  <ul className="user-new-list-search-results">
                    {movies.map(
                      (movie) =>
                        movie.poster_path && (
                          <li
                            key={movie.id}
                            className="user-new-list-search-item"
                            onClick={() => handleResultClick(movie)}
                          >
                            <img
                              className="user-new-list-search-poster"
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt={movie.title}
                            />
                            <div className="user-new-list-search-info">
                              <div className="user-new-list-search-title">
                                {movie.title}
                              </div>
                              <div>{movie.release_date}</div>
                            </div>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="user-new-list-field">
              <label className="user-new-list-label">추가한 영화</label>

              {userLists.length === 0 ? (
                <div className="user-new-list-added-empty">
                  아직 추가한 영화가 없습니다.
                </div>
              ) : (
                <div className="user-new-list-added-list">
                  {userLists.map((movie) => (
                    <div className="user-new-list-added-item" key={movie.movieId}>
                      <img
                        className="user-new-list-added-poster"
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title || "movie poster"}
                      />

                      <div className="user-new-list-added-info">
                        <div className="user-new-list-added-title">
                          {movie.title}
                        </div>
                        <div className="user-new-list-added-date">
                          {movie.release_date || "개봉일 없음"}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="user-new-list-remove-btn"
                        onClick={() => handleRemoveMovie(movie.movieId)}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="user-new-list-bottom">
          <div className="user-new-list-preview-box">
            {userLists.length === 0 ? (
              <div className="user-new-list-empty">
                <p>아직 추가한 영화가 없습니다.</p>
              </div>
            ) : (
              <div className="user-new-list-grid">
                {userLists.map((movie) => (
                  <div className="user-new-list-card" key={movie.movieId}>
                    <img
                      className="user-new-list-poster"
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title || "movie poster"}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="user-new-list-actions">
            <button
              type="button"
              className="user-new-list-cancel-btn"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
            <button type="submit" className="user-new-list-save-btn">
              저장
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserNewList;