import axios from "axios";
import react, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";

const PersonDetail = () => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const {id} =useParams();
    const [person, setPerson] = useState(null)

    useEffect(()=> {
        axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=ko-KR&append_to_response=movie_credits`)
             .then((response) => {
                setPerson(response.data)
             })
             .catch((error) => {
                console.error("인물 정보 불러오기 실패", error);
             })
    }, [id, API_KEY])   

    if (!person) return <div>로딩중...</div>;

    const movies =
    person.movie_credits?.cast?.length > 0
      ? person.movie_credits.cast
      : person.movie_credits?.crew || [];

    const sortedMovies = [...movies]
        .filter((movie) => movie.poster_path)
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    return(
        <div className="person-page">
            <div className=" person-inner">
                <div className="person-top">
                    <div className="person-photo">
                        <img src ={person.profile_path
                            ?`https://image.tmdb.org/t/p/w300${person.profile_path}`
                            : "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={person.name}
                        />
                    </div>

                    <div className="person-info">
                        <h1>{person.name}</h1>
                         <p>{person.known_for_department}</p>
                        <p>{person.birthday || "생일 정보 없음"}</p>
                        <p className="person-bio">
                        {person.biography || "소개 정보가 없습니다."}
                        </p>
                    </div>
                </div>

                <div className="person-movies">
                    <h2>관련 영화</h2>
                    <div className="person-movie-grid">
                        {sortedMovies.slice(0, 12).map((movie) => (
                        <Link
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                            className="person-movie-item"
                        >
                            <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            />
                            <p>{movie.title}</p>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonDetail;