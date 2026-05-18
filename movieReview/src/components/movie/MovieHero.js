import { Link } from "react-router-dom";
import ReviewSection from "components/movie/ReviewSection";
import TmdbReviewSection from "components/movie/TmdbReviewSection";
import CollectionSection from "components/movie/CollectionSection";
import React from "react";

const MovieHero = ({
  movie,
  trailer,
  providers,
  providerLink,
  certification,
  releaseDate,
  movieReviews,
  reviewContent,
  onChangeContent,
  onAddReview,
  tmdbReviews,
  collection,
  collectionMovies,
  onCheckLiked,
  liked,
  watched,
  onToggleWatched,
  watchLater,
  onToggleWatchLater,
  rating,
  onChangeRating,
}) => {

  const directors =
    movie.credits?.crew?.filter((person) => person.job === "Director") || [];

  return (
    <div className="hero">
      {/* 배경 레이어 */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>

      <div className="hero-vignette"></div>

      <div className="hero-content">
        {/* hero-main이 Sticky의 부모 범위가 됩니다 */}
        <div className="hero-main">
          
          {/* 왼쪽 컬럼: 스크롤을 따라 움직이는 영역 */}
          <div className="hero-left-column">
            <div className="poster-box">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className="hero-side-card">
              <h3 className="hero-side-title">영화 정보</h3>
              <p className="hero-side-rating">
                평점 {movie.vote_average?.toFixed(1)}
              </p>
              <p className="hero-side-votes">투표수 {movie.vote_count}</p>
              <p className="hero-side-runtime">러닝타임 {movie.runtime}분</p>

              {movie.belongs_to_collection && (
                <p className="hero-side-collection">
                  컬렉션 {movie.belongs_to_collection.name}
                </p>
              )}
            </div>

            <CollectionSection
              collection={collection}
              collectionMovies={collectionMovies}
              currentMovieId={movie.id}
            />
          </div>

          {/* 중앙/오른쪽 정보 영역: 내용이 길어지는 부분 */}
          <div className="info-box">
            <h1>{movie.title}</h1>

            {movie.original_title && movie.original_title !== movie.title && (
              <p className="movie-original-title">{movie.original_title}</p>
            )}

            <p className="movie-year">{movie.release_date?.slice(0, 4)}</p>

            {movie.tagline && (
              <p className="movie-tagline">{movie.tagline}</p>
            )}

            <div className="movie-meta-row">
              <span className="meta-chip">{certification}</span>
              <span className="meta-chip">개봉일 {releaseDate}</span>
            </div>

            <p className="movie-overview">{movie.overview}</p>

            {trailer && (
              <div className="video-section">
                <h3 className="video-title">예고편</h3>
                <div className="video-player">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${movie.title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {providers.length > 0 && (
              <div className="provider-section">
                <h3 className="provider-title">시청 가능 서비스</h3>
                <div className="provider-list">
                  {providers.map((provider) => {
                    const content = (
                      <>
                        {provider.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                            alt={provider.provider_name}
                          />
                        )}
                        <span>{provider.provider_name}</span>
                      </>
                    );

                  return providerLink ? (
                    <a
                      key={provider.provider_id}
                      href={providerLink}
                      target="_blank"
                      rel="noreferrer"
                      className="provider-chip provider-card"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      className="provider-chip provider-card"
                      key={provider.provider_id}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

            <div className="genre-section">
              <h3 className="genre-title">장르</h3>
              <div className="genre-list">
                {movie.genres.map((genre) => (
                  <Link
                    to={`/movie/genre/${genre.id}`}
                    className="genre-chip"
                    key={genre.id}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="director-section">
              <h3 className="director-title">감독</h3>
              <div className="director-list">
                {directors.length > 0 ? (
                  directors.map((director) => (
                    <Link
                      to={`/person/${director.id}`}
                      className="director-chip"
                      key={director.id}
                    >
                      {director.name}
                    </Link>
                  ))
                ) : (
                  <span className="director-chip">정보없음</span>
                )}
              </div>
            </div>

            <div className="cast-section">
              <h3 className="cast-title">출연진</h3>
              <div className="cast-list">
                {(movie.credits?.cast || []).slice(0, 10).map((actor) => (
                  <Link
                    to={`/person/${actor.id}`}
                    className="cast-chip"
                    key={actor.id}
                  >
                    <span className="cast-name">{actor.name}</span>
                    {actor.character && (
                      <span className="cast-character">{actor.character}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-review-panel">
            <ReviewSection
              movieReviews={movieReviews}
              reviewContent={reviewContent}
              onChangeContent={onChangeContent}
              onAddReview={onAddReview}
              liked={liked}
              onCheckLiked={onCheckLiked}
              watched={watched}
              onToggleWatched={onToggleWatched}
              watchLater={watchLater}
              onToggleWatchLater={onToggleWatchLater}
              rating={rating}
              onChangeRating={onChangeRating}
            />

            <TmdbReviewSection tmdbReviews={tmdbReviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;