import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserReviews.css";

const UserReviews = () => {
  const { id } = useParams();
  // const loginUser = useAppStore((state) => state.currentUser);
  const getUserReview = useAppStore((state) => state.getUserReview);
  const updateReview = useAppStore((state) => state.updateReview);
  const deleteReview = useAppStore((state) => state.deleteReview);

  const loginUser = useAppStore((state) => state.currentUser);
  const userReviews = useAppStore((state) => state.userReviews);

  const films = useAppStore((state) => state.films || []);
  const likes = useAppStore((state) => state.likes || []);
  const watchList = useAppStore((state) => state.watchList || []);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    if (id) {
      getUserReview(id);
    }
  }, [id, getUserReview]);

  

  const groupedReviews = useMemo(() => {
    if (!userReviews || userReviews.length === 0) return [];

    return Object.values(
      userReviews.reduce((acc, review) => {
        const key = String(review.movieId);

        if (!acc[key]) {
          acc[key] = {
            movieId: String(review.movieId),
            poster_path: review.poster_path,
            title: review.title || "영화",
            reviews: [],
          };
        }

        acc[key].reviews.push(review);
        return acc;
      }, {})
    );
  }, [userReviews]);

  if (!userReviews || userReviews.length === 0) {
    return (
      <div className="user-reviews-empty">
        <p>아직 작성한 리뷰가 없습니다.</p>
      </div>
    );
  }

  const handleStartEdit = (review) => {
    setEditingReviewId(review.id);
    setEditContent(review.content || "");
    setEditRating(Number(review.rating) || 0);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditContent("");
    setEditRating(0);
  };

  const handleSaveEdit = async (reviewId) => {
    if (!editContent.trim()) return;

    await updateReview(reviewId, {
      content: editContent,
      rating: editRating,
    });

    handleCancelEdit();
  };

  const handleDeleteReview = async (reviewId) => {
    const ok = window.confirm("이 리뷰를 삭제할까요?");
    if (!ok) return;

    await deleteReview(reviewId);
  };

  const renderStars = (value) => {
    const safeValue = Number(value) || 0;
    return "★".repeat(safeValue) + "☆".repeat(5 - safeValue);
  };

  return (
    <section className="user-reviews-section">
      <div className="user-reviews-header">
        <span className="user-reviews-count">
          {groupedReviews.length}편의 영화
        </span>
      </div>

      <div className="user-reviews-grid">
        {groupedReviews.map((movie) => {
          const movieId = String(movie.movieId);

          const watched = films.some(
            (item) =>
              item.uid === loginUser?.uid && String(item.movieId) === movieId
          );

          const liked = likes.some(
            (item) =>
              item.uid === loginUser?.uid && String(item.movieId) === movieId
          );

          const myWatchList =
            watchList.find((item) => item.uid === loginUser?.uid)?.watchList || [];

          const watchLater = myWatchList.some(
            (item) => String(item.movieId) === movieId
          );

          const ratings = movie.reviews
            .map((review) => Number(review.rating) || 0)
            .filter((rating) => rating > 0);

          const maxRating = ratings.length > 0 ? Math.max(...ratings) : 0;
          const avgRating =
            ratings.length > 0
              ? (
                  ratings.reduce((sum, rating) => sum + rating, 0) /
                  ratings.length
                ).toFixed(1)
              : "0.0";

          return (
            <article className="user-review-group-card" key={movie.movieId}>
              <Link
                to={`/movie/${movie.movieId}`}
                className="user-review-group-poster"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>

              <div className="user-review-group-body">
                <div className="user-review-group-header">
                  <h3 className="user-review-group-title">{movie.title}</h3>
                </div>

                <div className="user-review-status-list">
                  {watched && (
                    <span className="user-review-status watched">봤음</span>
                  )}
                  {liked && (
                    <span className="user-review-status liked">좋아요</span>
                  )}
                  {watchLater && (
                    <span className="user-review-status watchlater">
                      리스트 추가
                    </span>
                  )}
                </div>

                <div className="user-review-preview-list">
                  {movie.reviews.map((review) => (
                    <div className="user-review-preview-item" key={review.id}>
                      {editingReviewId === review.id ? (
                        <div className="user-review-edit-box">
                          <textarea
                            className="user-review-edit-textarea"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                          />

                          <div className="user-review-edit-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={`user-review-edit-star-btn ${
                                  star <= editRating ? "active" : ""
                                }`}
                                onClick={() => setEditRating(star)}
                              >
                                ★
                              </button>
                            ))}
                          </div>

                          <div className="user-review-action-row">
                            <button
                              type="button"
                              className="user-review-action-btn save"
                              onClick={() => handleSaveEdit(review.id)}
                            >
                              저장
                            </button>
                            <button
                              type="button"
                              className="user-review-action-btn cancel"
                              onClick={handleCancelEdit}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="user-review-preview-text">
                            {review.content}
                          </p>
                          <span className="user-review-preview-rating">
                            {renderStars(review.rating)}
                          </span>

                          <div className="user-review-action-row">
                            <button
                              type="button"
                              className="user-review-action-btn edit"
                              onClick={() => handleStartEdit(review)}
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              className="user-review-action-btn delete"
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              삭제
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default UserReviews;