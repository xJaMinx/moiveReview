import React from "react";
import { Link } from "react-router-dom";

const RecommendationSection = ({
  recommendations,
  recommendIndex,
  visibleCount,
  maxIndex,
  onPrev,
  onNext,
}) => {
  return (
    <div className="recommend-section">
      <div className="recommend-header">
        <h3>추천 영화</h3>

        <div className="recommend-buttons">
          <button
            type="button"
            className="recommend-nav-button"
            onClick={onPrev}
            disabled={recommendIndex === 0}
          >
            이전
          </button>

          <button
            type="button"
            className="recommend-nav-button"
            onClick={onNext}
            disabled={recommendIndex >= maxIndex}
          >
            다음
          </button>
        </div>
      </div>

      <div className="recommend-list">
        {recommendations
          .slice(recommendIndex, recommendIndex + visibleCount)
          .map((item) => (
            <Link
              to={`/movie/${item.id}`}
              key={item.id}
              className="recommend-item"
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={item.title}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RecommendationSection;