import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DetailSearch from "./DetailSearch";

const SEARCH_DEBOUNCE_MS = 400;

const Search = ({ query, onSearchChange }) => {
    const [title, setTitle] = useState(query);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setTitle(query);
    }, [query]);

    // const setSearchResults = useAppStore((state) => state.setSearchResults);


    const handleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        onSearchChange?.(value);
    };

    useEffect(() => {
        const nextParams = new URLSearchParams(searchParams);
        if (title.trim()) {
            nextParams.set("query", title);
        } else {
            nextParams.delete("query");
        }

        const timeoutId = window.setTimeout(() => {
            setSearchParams(nextParams);
        }, SEARCH_DEBOUNCE_MS);

        return () => window.clearTimeout(timeoutId);
    }, [title, searchParams, setSearchParams]);
    
    return (

        <div id="searchbox">
            <label htmlFor="movie-search-input" className="sr-only">영화 검색</label>
            <div className="search-shell">
                <div id="search-input-group">
                    <input
                        id="movie-search-input"
                        className="search-input"
                        type="text"
                        placeholder="영화 제목 검색"
                        value={title}
                        onChange={handleChange} />
                </div>
            </div>

            {/*} <span 
                    id="detail-search" 
                    onClick={() => setIsFilterOpen(true)}
                    style={{ cursor: 'pointer' }}
                >
                    상세검색🔍
                </span>*/}

            <button onClick={SearchDetail} id = "detailbtn" >
                상세검색🔍
            </button>

            {isFilterOpen && (
                <DetailSearch onClose={() => setIsFilterOpen(false)} />
            )}
        </div>

    )


}

export default Search;
