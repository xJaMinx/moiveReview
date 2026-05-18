import React, { useEffect, useState } from "react";
import axios from "axios";
import useAppStore from "store/useAppStore";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import "../../Home.css";

// Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const [movies, setMovies] = useState([]); // 자체 movies 상태 추가
    const loginUserInfo = useAppStore((state) => state.currentUserInfo);

    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);

    useEffect(() => {
        const fetchAllMovies = async () => {
           try {
            
            const [popRes, topRes, nowRes] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`),
                axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`),
                axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`)
            ]);

        
            setPopular(popRes.data.results);
            setTopRated(topRes.data.results);
            setNowPlaying(nowRes.data.results);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };

    fetchAllMovies();
}, [API_KEY]);


    if (popular.length === 0) {
    return <div id="outer" style={{color:'white', padding:'100px', textAlign:'center'}}>로딩중...</div>;
}

    const bannerMovies = popular.slice(0, 5);

    return (
        <div id='outer'>
            {/*<div id='login-box'>
                {loginUserInfo ? (<div>{loginUserInfo.name}님 환영합니다</div>)
                    : (<div>로그인해주세요</div>

                    )}
            </div>*/}

            <div id='main-banner-huge'>
                <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect={'fade'}
                    autoplay={{ delay: 6000 }} // 좀 더 천천히 넘어가게
                    loop={true}
                    className="hugeSwiper"
                >
                    {bannerMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div
                                className="huge-slide"
                                onClick={() => window.location.href = `/movie/${movie.id}`}

                                style={{
                                    cursor: 'pointer',
                                    // 배경 어둡고 웅장하게
                                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 50%), 
                                          linear-gradient(to top, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 40%),
                                          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`


                                }}

                            >
                                <div className="huge-info">
                                    <span className="trending-tag">인기 급상승</span>
                                    <h1>{movie.title}</h1>
                                    <p>{movie.overview}</p>
                                    <div className="huge-buttons">

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="content-section">
                <div className="movie-row">
                    <h2>최신 개봉작</h2>
                    <div className="movie-list-wrapper">
                        <Swiper
        // Swiper 설정값
        slidesPerView={5.5}       // 한 화면에 5.5개 노출 (옆에 더 있음을 암시)
        spaceBetween={15}         // 카드 사이 간격 (px)
        slidesPerGroup={2}        // 한 번 넘길 때 이동할 개수
        grabCursor={true}         // 마우스 커서를 손바닥 모양으로
        className="row-swiper"
    >
        {nowPlaying.map((movie) => (
            <SwiperSlide key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
                <div className="sub-movie-card">
                    <img 
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                        alt={movie.title} 
                    />
                    <div className="card-overlay">
                        <p className="card-title">{movie.title}</p>
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
                    </div>
                </div>

                <div className="movie-row">
                    <h2>평점 높은 명작</h2>
                    <div className="movie-list-wrapper">
                        <Swiper
        slidesPerView={5.5}
        spaceBetween={15}
        className="row-swiper"
    >
        {topRated.map((movie) => (
            <SwiperSlide key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
                <div className="sub-movie-card">
                    <img 
                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                        alt={movie.title} 
                    />
                    <div className="card-overlay">
                        <p className="card-title">{movie.title}</p>
                        <span className="card-rate">⭐ {movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
                    </div>
                </div>
            </div>{/*content-section*/}
        </div>


    )
}

export default Home;