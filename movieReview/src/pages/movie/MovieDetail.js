import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import MovieHero from "components/movie/MovieHero";
import RecommendationSection from "components/movie/RecommendationSection";
import GallerySection from "components/movie/GallerySection";

import useAppStore from "store/useAppStore";

const MovieDetail = () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = useAppStore((state) => state.currentUser);
  const loginUserInfo = useAppStore((state) => state.currentUserInfo);
  const addReview = useAppStore((state) => state.addReview);
  const getMovieReview = useAppStore((state) => state.getMovieReview);
  const addReviewLiked = useAppStore((state) => state.addReviewLike);
  const toggleWatchLater = useAppStore((state) => state.toggleWatchLater);

  const likes = useAppStore((state) => state.likes || []);
  const watchList = useAppStore((state) => state.watchList || []);
  const movieReviews = useAppStore((state) => state.movieReviews || []);

  const [movie, setMovie] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  // const [reviewLiked, setReviewLiked] = useState(false);

  const reviewLiked = useAppStore((state) => state.reviewLiked);
  const setReviewLiked = useAppStore((state) => state.setReviewLiked);

  const checkDBReviewLike = useAppStore((state) => state.checkReviewLike);

  const toggleWatch = useAppStore((state) => state.toggleWatch);
  const toggleWatchBoolen = useAppStore((state) => state.toggleWatchBoolen);
  const checkToggleWatch = useAppStore((state) => state.checkToggleWatch);

  const watchLater = useAppStore((state) => state.toggleWatchLaterBoolean);
  const checkToggleWatchLater = useAppStore((state) => state.checkToggleWatchLater);
  const setToggleWatchLaterBoolean = useAppStore((state) => state.setToggleWatchLaterBoolean);
  
  // const [reviews, setReviews] = useState([]);
  // const [reviewTitle, setReviewTitle] = useState("");
  // const [reviewText, setReviewText] = useState("");

  const [recommendIndex, setRecommendIndex] = useState(0);
  const [providers, setProviders] = useState([]);
  const [releaseInfo, setReleaseInfo] = useState([]);
  const [collection, setCollection] = useState(null);
  const [providerLink, setProviderLink] = useState("");

  const [rating, setRating] = useState(1);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setMovie(null);
    setProviders([]);
    setReleaseInfo([]);
    setCollection(null);
    setRecommendIndex(0);
    setReviewContent("");
    setRating(1);
    setWatched(false);
    setToggleWatchLaterBoolean(false);
    setProviderLink("");

    window.scrollTo(0, 0);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR&include_image_language=ko-KR,null&append_to_response=credits,recommendations,videos,images,reviews`
      )
      .then((response) => {
        if (isMounted) {
          setMovie(response.data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("영화 상세 불러오기 실패", error);
        }
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
      )
      .then((response) => {
        if (isMounted) {
          const kr = response.data.results?.KR;
          setProviders(kr?.flatrate || []);
          setProviderLink(kr?.link || "");
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("OTT 정보 불러오기 실패", error);
        }
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
      )
      .then((response) => {
        if (isMounted) {
          setReleaseInfo(response.data.results || []);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("개봉정보 불러오기 실패", error);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, API_KEY]);

  

  useEffect(() => {
    setRecommendIndex(0);
    // checkDBReviewLike(loginUser?.uid, id);
    getMovieReview(id);
    checkDBReviewLike(loginUser?.uid, id);
    checkToggleWatch(loginUser?.uid, id);
    checkToggleWatchLater(loginUser?.uid, id);
  }, [id, getMovieReview, checkDBReviewLike, checkToggleWatchLater]);
    
    // getDBReview(id); //리뷰 불러오기
    // setReviewTitle("");
    // setReviewText("");
    // setReviews([]);

  const trailer = movie?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  const collectionId = movie?.belongs_to_collection?.id;

  useEffect(() => {
    if (!collectionId) {
      setCollection(null);
      return;
    }

    axios
      .get(
        `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${API_KEY}&language=ko-KR`
      )
      .then((response) => {
        setCollection(response.data);
      })
      .catch((error) => {
        console.error("컬렉션 정보 불러오기 실패", error);
      });
  }, [collectionId, API_KEY]);

  const recommendations = movie?.recommendations?.results || [];
  const collectionMovies = collection?.parts || [];

  const visibleCount = 8;
  const maxIndex = Math.max(0, recommendations.length - visibleCount);

  const galleryImages =
    movie?.images?.backdrops?.length > 0
      ? movie.images.backdrops.slice(0, 6)
      : movie?.images?.posters?.slice(0, 6) || [];

  useMemo(() => {
    if (!loginUser?.uid) return false;

    return likes.some(
      (item) =>
        item.uid === loginUser.uid && String(item.movieId) === String(id)
    );
  }, [likes, loginUser?.uid, id]);

  // const watchLater = useMemo(() => {
  //   if (!loginUser?.uid) return false;

  //   const myWatchList =
  //     watchList.find((item) => item.uid === loginUser.uid)?.watchList || [];

  //   return myWatchList.some(
  //     (item) => String(item.movieId) === String(id)
  //   );
  // }, [watchList, loginUser?.uid, id]);

  const handleToggleWatched = () => {

    const newFilm = {
      uid: loginUser?.uid,
      movieId: id,
      poster_path: movie.poster_path
    }

    toggleWatch(toggleWatchBoolen, newFilm);

  };

  const handleToggleWatchLater = async() => {
    if (!loginUser) {
      alert("로그인 후에 작성해주세요.");
      navigate("/login", { state: { from: location } });
      return;
    }

    await toggleWatchLater(loginUser?.uid, movie);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!loginUser) {
      alert("로그인 후에 작성해주세요.");
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!reviewContent.trim()) return;
    if (rating < 1) {
      alert("별점은 최소 1점 이상 선택해주세요.");
      return;
    }

    const alreadyReviewed = movieReviews.find(
      (review) => review.uid === loginUser.uid
    );

    if (alreadyReviewed) {
      alert("이미 이 영화에 리뷰를 작성했습니다.");
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      uid: loginUser.uid,
      movieId: id,
      poster_path: movie.poster_path,
      title: movie.title,
      writer:
        loginUserInfo?.name ||
        loginUser?.displayName ||
        loginUser?.email ||
        "사용자",
      content: reviewContent,
      rating,
      watched,
      liked: reviewLiked,
      watchLater,
    };

    await addReview(newReview);
    setReviewContent("");
    setRating(1);
    setWatched(false);
  };

  const handlePrevRecommend = () => {
    setRecommendIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextRecommend = () => {
    setRecommendIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const krRelease = releaseInfo.find((item) => item.iso_3166_1 === "KR");
  const krReleaseDates = krRelease?.release_dates || [];

  const certificationItem = krReleaseDates.find(
    (item) => item.certification && item.certification.trim() !== ""
  );

  const certification = certificationItem?.certification || "정보 없음";

  let certificationLabel = "정보 없음";

  if (certification === "All") {
    certificationLabel = "전체관람가";
  } else if (certification === "12") {
    certificationLabel = "12세 이상 관람가";
  } else if (certification === "15") {
    certificationLabel = "15세 이상 관람가";
  } else if (certification === "18" || certification === "19") {
    certificationLabel = "청소년 관람불가";
  } else if (certification && certification !== "정보 없음") {
    certificationLabel = certification;
  }

  const releaseDateItem = krReleaseDates.find((item) => item.release_date);

  const releaseDate =
    releaseDateItem?.release_date?.slice(0, 10).replaceAll("-", ".") ||
    "정보 없음";

  const tmdbReviews = movie?.reviews?.results || [];

  const reviewLikedCheck = async () => {
    if (!loginUser) {
      alert("로그인 후에 작성해주세요.");
      navigate("/login", { state: { from: location } });
      return;
    }

    const likedPayload = {
      uid: loginUser.uid,
      movieId: id,
      poster_path: movie.poster_path,
      title: movie.title,
      release_date: movie.release_date,
    };

    try {
      await addReviewLiked(reviewLiked, likedPayload, loginUser.uid, id);
    } catch (error) {
      console.error("좋아요 처리 실패", error);
      addReviewLiked(reviewLiked, likedPayload, loginUser.uid, id);
    }
  };

  if (!movie) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <MovieHero
        movie={movie}
        trailer={trailer}
        providers={providers}
        certification={certificationLabel}
        releaseDate={releaseDate}
        movieReviews={movieReviews}
        reviewContent={reviewContent}
        onChangeContent={(e) => setReviewContent(e.target.value)}
        onAddReview={handleAddReview}
        tmdbReviews={tmdbReviews}
        collection={collection}
        collectionMovies={collectionMovies}
        liked={reviewLiked}
        onCheckLiked={reviewLikedCheck}
        watched={toggleWatchBoolen}
        onToggleWatched={handleToggleWatched}
        watchLater={watchLater}
        onToggleWatchLater={handleToggleWatchLater}
        rating={rating}
        onChangeRating={setRating}
        providerLink={providerLink}
      />

      <div className="detail-bottom">
        <div className="detail-bottom-inner">
          <GallerySection
            galleryImages={galleryImages}
            movieTitle={movie.title}
          />

          <RecommendationSection
            recommendations={recommendations}
            recommendIndex={recommendIndex}
            visibleCount={visibleCount}
            maxIndex={maxIndex}
            onPrev={handlePrevRecommend}
            onNext={handleNextRecommend}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
