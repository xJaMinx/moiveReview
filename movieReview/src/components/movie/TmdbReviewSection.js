import React from "react";

const TmdbReviewSection = ({ tmdbReviews }) => {
  const reviews = tmdbReviews || [];

  const ratedReviews = reviews
    .filter((review) => review.author_details?.rating != null)
    .sort((a, b) => b.author_details.rating - a.author_details.rating);

  const unratedReviews = reviews.filter(
    (review) => review.author_details?.rating == null
  );

  const topReviews = [...ratedReviews, ...unratedReviews].slice(0, 3);

  if (topReviews.length === 0) {
    return null;
  }

  return (
    <div className="tmdb-review-section">
      <h3 className="tmdb-review-title">TMDB 리뷰</h3>

      <div className="tmdb-review-list">
        {topReviews.map((review) => (
          <div className="tmdb-review-card" key={review.id}>
            <div className="tmdb-review-header">
              <h4 className="tmdb-review-author">{review.author}</h4>

              {review.author_details?.rating != null && (
                <span className="tmdb-review-rating">
                  평점 {review.author_details.rating}
                </span>
              )}
            </div>

            <p className="tmdb-review-content">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TmdbReviewSection;