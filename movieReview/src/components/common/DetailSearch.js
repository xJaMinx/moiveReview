
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";



const DetailSearch = ({ onClose }) => {

    //const [title, setTitle] = useState(query);

     const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [minimumvote, setminimumvote] = useState(0);
    const [movieYear,setmovieYear] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    
    

/*
    const Genre = [
    { id: 28, name: "액션" },
    { id: 35, name: "코미디" },
    { id: 18, name: "드라마" },
    { id: 16, name: "애니메이션" },
    { id: 10749, name: "로맨스" },
  ];

  const handleSearchChange = (value) => {
    { Genre.map( (g)=> )}
    if (!value.trim()) {
      setSelectedGenre(gc);
    }
  };


    useEffect(() => {
        let url = "";

        if (genre.value === '28') {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_genres=${selectedGenre}`;
        } else if (genre.value === '35') {
            url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
        }
        else if (genre.value === '18') {
            url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=${page}`;
        }

        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&
        language=ko-KR&sort_by=popularity.desc&
        with_genres=${selectedGenre}&
        vote_average.gte=${minimumvote}&
        primary_release_year=${selectedYear}`;
        
}
        */


 let handleGenreSelect=()=>{}



    return (
    //배경 클릭 시 닫히도록 onClose 연결
          <div className="modal-overlay" onClick={onClose}> 

             {/*e.stopPropagation()은 모달 내부 클릭 시 창이 닫히지 않게*/}
                <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
                    <h2>상세 검색</h2>
                    
                        <table className="filter-table">
                            <tbody>
                                <tr>
                                    <th>장르</th>
                                    <td>
                                        
                                        <select value = {selectedGenre} 
                                        onChange={(e) => setSelectedGenre(e.target.value)} 
                                         className="filter-select"
                                         id = 'selgenre'>
                                            <option value="">모든 장르</option>
                                            <option value="28">액션</option>
                                            <option value="35">코미디</option>
                                            <option value="18">드라마</option>
                                            <option value="16">애니메이션</option>
                                             <option value="10749">로맨스</option>                                 
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>최소 평점</th>
                                    <td>
                                        <div id='vote-average' className="vote-average">
                                            <input type="number" value={minimumvote}
                                             onChange={()=>handleGenreSelect()}/>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>개봉 연도</th>
                                    <td>
                                        <div id='movie-year' className="year-buttons"
                                         type = 'number' value = {movieYear} 
                                         onChange={setmovieYear}>
                                            <button className="year-btn active" value=''
                                            onClick={()=>setmovieYear('')}>전체</button>
                                            <button className="year-btn" value='2026' 
                                            onClick ={()=>setmovieYear(2026) }>2026</button>
                                            <button className="year-btn" value='2025' 
                                            onClick ={()=>setmovieYear(2025)}>2025</button>
                                            <button className="year-btn" value='2024' 
                                            onClick ={()=>setmovieYear(2024)}>2024</button>
                                            <button className="year-btn" value='2020' 
                                            onClick ={()=>setmovieYear(2020)}>2020s</button>
                                            <button className="year-btn" value='2010' 
                                            onClick ={()=>setmovieYear(2010)}>2010s</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

        
        <div className="modal-footer">
                            {/*  버튼 클릭 시에도 닫히도록 onClose 연결*/}
                            <button className="close-btn" onClick={onClose}>닫기</button>
                           <button className="apply-btn" >필터 적용</button>
                        </div>
               </div>
            </div>
        );
    };

    export default DetailSearch;