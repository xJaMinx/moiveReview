import React, { useRef } from "react";
import { Link } from "react-router-dom";

const CollectionSection = ({
  collection,
  collectionMovies,
  currentMovieId,
}) => {
  const listRef = useRef(null);

  if (!collection || collectionMovies.length === 0) {
    return null;
  }

  const filteredMovies = collectionMovies.filter(
    (item) => String(item.id) !== String(currentMovieId)
  );

  if (filteredMovies.length === 0) {
    return null;
  }

  const handleScrollLeft = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({
      left: -220,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    if (!listRef.current) return;
    listRef.current.scrollBy({
      left: 220,
      behavior: "smooth",
    });
  };

  return (
    <div className="collection-section">
      <div className="collection-header">
        <h3 className="collection-title">{collection.name}</h3>

        <div className="collection-buttons">
          <button
            type="button"
            className="collection-nav-button"
            onClick={handleScrollLeft}
          >
            이전
          </button>
          <button
            type="button"
            className="collection-nav-button"
            onClick={handleScrollRight}
          >
            다음
          </button>
        </div>
      </div>

      <div className="collection-list" ref={listRef}>
        {filteredMovies.map((item) => (
          <Link
            to={`/movie/${item.id}`}
            key={item.id}
            className="collection-item"
          >
            <img
              loading="lazy"
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={item.title}
            />
            <p className="collection-item-title">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionSection;