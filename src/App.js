import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarApp from "./components/NavbarApp";
import CardMovie from "./components/CardMovie";
import Sidebar from "./components/Sidebar";
import Paginations from "./components/Paginations";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [paginationTarget, setPaginationTarget] = useState("");
  const [movieName, setMovieName] = useState("");
  const [mainFilter, setMainFilter] = useState("top_rated");

  const getData = async (mainFilter, pageNumber) => {
    const API_KEY = "d34264194788a6c91b6a55fe90f61988";
    const url = `https://api.themoviedb.org/3/movie/${mainFilter}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
    let response = await fetch(url);
    let data = await response.json();
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setPageNumber(pageNumber);
    setPaginationTarget("getData");
    setMainFilter(mainFilter);
  };

  const getGenreList = async () => {
    const API_KEY = "d34264194788a6c91b6a55fe90f61988";
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    let response = await fetch(url);
    let genreList = await response.json();
    setGenreList(genreList.genres);
  };

  const getMovieByName = async (movieName, pageNumber) => {
    const API_KEY = "d34264194788a6c91b6a55fe90f61988";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}&page=${pageNumber}`;
    let response = await fetch(url);
    let data = await response.json();
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setPageNumber(pageNumber);
    setPaginationTarget("getMovieByName");
    setMovieName(movieName);
  };

  const handlePaginationTarget = pageNumber => {
    if (paginationTarget === "getData") {
      return getData(mainFilter, pageNumber);
    } else if (paginationTarget === "getMovieByName") {
      return getMovieByName(movieName, pageNumber);
    }
  };

  useEffect(() => {
    getData(mainFilter, 1);
    getGenreList();
  }, []);

  // if (!movies) {
  //   return (
  //     <div className="big-container loader-container d-flex flex-column justify-content-center align-items-center">
  //       <Loader type="TailSpin" color="#000000" height={400} width={400} />
  //     </div>
  //   );
  // }
  return (
    <div className="App container-fluid p-0">
      <NavbarApp
        getMovieByName={getMovieByName}
        pageNumber={pageNumber}
        getData={getData}
      />
      <div className="sidebar-and-main-container container-fluid d-flex flex-row p-0">
        <div className="main-content container-fluid d-flex flex-column  p-3">
          {totalPages && (
            <Paginations
              totalPages={totalPages}
              pageNumber={pageNumber}
              handlePaginationTarget={handlePaginationTarget}
            />
          )}
          <CardMovie
            movies={movies}
            genreList={genreList}
            getData={getData}
            getMovieByName={getMovieByName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
