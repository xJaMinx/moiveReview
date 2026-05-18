import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserLikes.css";

const UserLikes = () => {
  const { id } = useParams();
  const likes = useAppStore((state) => state.likes); // 스토어의 likes 상태
  const getLikes = useAppStore((state) => state.getLikes); // 데이터를 가져오는 액션

  useEffect(() => {
    if (id) {
      // 페이지에 들어올 때마다 해당 유저의 좋아요 데이터를 다시 불러옴
      getLikes(id);
    }
  }, [id, getLikes]);

  // const loginUser = useAppStore((state) => state.currentUser);
  const [activeTab, setActiveTab] = useState("movies")

  const movielikes = likes.filter(
    (like) => like?.uid === id
  );

  const reviewlikes = likes.filter(
    (like) => like?.uid === id
  );

  const listlikes = likes.filter(
    (like) => like?.uid === id
  );

  const getCurrentCount = () => {
    if(activeTab === "movies") return movielikes.length;
    if(activeTab === "reviews") return reviewlikes.length;
    return listlikes.length;
  }

  return (
    <section className="user-likes-section">
      <div className="user-likes-topbar">
        <span className="user-likes-count">{getCurrentCount()}개</span>
      </div>

      <div className="user-likes-tabs">
        <button 
          className={`user-likes-tab ${activeTab === "movies" ? "active" : ""}`}
          onClick={() =>setActiveTab("movies")}
          >
            영화
        </button>

        <button 
          className={`user-likes-tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() =>setActiveTab("reviews")}
          >
            리뷰
        </button>

        <button 
          className={`user-likes-tab ${activeTab === "lists" ? "active" : ""}`}
          onClick={() =>setActiveTab("lists")}
          >
            리스트
        </button>
      </div>

      {activeTab === "movies" && (
        <>
        {movielikes.length === 0? (
          <div className="user-likes-empty">
            <p>아직 좋아요한 영화가 없습니다</p>
          </div>
        ) : (
          <div className="user-likes-grid">
            {movielikes.map((like) =>(
              <article className="user-likes-card" key={like.movieId}>
                <Link
                  to={`/movie/${like.movieId}`}
                  className="user-like-poster-link"
                  >
                    <img
                      className="user-like-poster"
                      src={`https://image.tmdb.org/t/p/w200${like.poster_path}`}
                      alt={like.title}
                    />
                  </Link>

                  <div className="user-like-meta">
                    <p className="user-like-title">{like.title}</p>
                    {like.release_date && (
                      <span className="user-like-year">
                        {like.release_date.slice(0,4)}
                      </span>
                    )}
                  </div>
                </article>
            ))}
          </div>
        )}
        </>
      )}

      {activeTab === "reviews" && (
        <>
        {reviewlikes.length === 0? (
          <div className="user-likes-empty">
            <p>아직 좋아요한 리뷰가 없습니다</p>
          </div>
        ) : (
          <div className="user-likes-grid">
            {reviewlikes.map((review) =>(
              <article className="user-likes-card" key={review.Id}>
                 <p className="user-review-like-movie">{review.movieTitle}</p>
                 <p className="user-review-like-content">{review.content}</p>
                </article>
            ))}
          </div>
        )}
        </>
      )}

      {activeTab === "lists" && (
        <>
        {listlikes.length === 0? (
          <div className="user-likes-empty">
            <p>아직 좋아요한 리스트가 없습니다</p>
          </div>
        ) : (
          <div className="user-likes-grid">
            {listlikes.map((list) =>(
             <article className="user-likes-card" key={list.Id}>
                 <p className="user-review-like-movie">{list.Title}</p>
                 <p className="user-review-like-desc">{list.description}</p>
             </article>
            ))}
          </div>
        )}
        </>
      )}

      
               
    </section>
  );
};

export default UserLikes;