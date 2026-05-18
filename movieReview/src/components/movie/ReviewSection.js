import React, { useEffect, useState } from "react";

const ReviewSection = ({
  movieReviews = [],
  reviewContent,
  onChangeContent,
  onAddReview,
  onCheckLiked,
  liked,
  watched = false,
  onToggleWatched = () => {},
  watchLater = false,
  onToggleWatchLater = () => {},
  rating = 1,
  onChangeRating = () => {},
}) => {
  
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5;
  const totalPages = Math.ceil(movieReviews.length / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const visibleReviews = movieReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [movieReviews]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const renderStars = (value) => {
    const safeValue = Number(value) || 0;
    return "★".repeat(safeValue) + "☆".repeat(5 - safeValue);
  };

  return (
    <div className="review-section">
      <h3 className="review-title">리뷰</h3>

      <div className="review-status-buttons">
            <button
              type="button"
              className={`review-status-btn ${watched ? "active" : ""}`}
              onClick={onToggleWatched}
            >
              봤음
            </button>

            <button
              type="button"
              className={`review-status-btn ${liked ? "active" : ""}`}
              onClick={onCheckLiked}
            >
              좋아요
            </button>

            <button
              type="button"
              className={`review-status-btn ${watchLater ? "active" : ""}`}
              onClick={onToggleWatchLater}
            >
              리스트 추가
            </button>
          </div>
          
      <div className="review-form">
        <textarea
          placeholder="리뷰를 입력하세요"
          value={reviewContent}
          onChange={onChangeContent}
          className="review-textarea"
        />

        <div className="review-controls">
          <div className="review-rating-box">
            <span className="review-control-label">별점</span>
            <div className="review-star-picker">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`review-star-btn ${star <= rating ? "active" : ""}`}
                  onClick={() => onChangeRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          

          <button
            type="button"
            className="submit-button"
            onClick={onAddReview}
          >
            등록
          </button>
        </div>
      </div>

      <div className="review-list">
        {movieReviews.length > 0 ? (
          visibleReviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-card-top">
                <h4 className="review-card-writer">{review.writer}</h4>
                <span className="review-card-rating">
                  {renderStars(review.rating)}
                </span>
              </div>

              <p className="review-card-content">{review.content}</p>
            </div>
          ))
        ) : (
          <p className="empty-review">등록된 리뷰가 아직 없습니다.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="review-pagination">
          <button
            type="button"
            className="review-page-button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ←
          </button>

          <span className="review-page-info">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            className="review-page-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
