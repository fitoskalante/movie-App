import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarApp from "./components/NavbarApp";
import CardMovie from "./components/CardMovie";
import Sidebar from "./components/Sidebar";
import { Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberForSearch, setPageNumberForSearch] = useState(1);

  const getData = async () => {
    const API_KEY = "d34264194788a6c91b6a55fe90f61988";
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
    let response = await fetch(url);
    let data = await response.json();
    const newData = movies.concat(data.results);
    console.log("hua", data.results);
    setMovies(newData);
    setPageNumber(pageNumber + 1);
  };

  const getGenreList = async () => {
    const API_KEY = "d34264194788a6c91b6a55fe90f61988";
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    let response = await fetch(url);
    let genreList = await response.json();
    setGenreList(genreList.genres);
    console.log(genreList);
  };

  const getMovieByName = async movieName => {
    const API_KEY = "d34264194788a6c91b6a55fe90f61988";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}&page=${pageNumberForSearch}`;
    let response = await fetch(url);
    let data = await response.json();
    const searchResults = results.concat(data.results);
    setMovies(searchResults);
  };

  useEffect(() => {
    getData();
    getGenreList();
  }, []);

  if (movies === []) {
    return (
      <div className="big-container loader-container d-flex flex-column justify-content-center align-items-center">
        <Loader type="TailSpin" color="#000000" height={400} width={400} />
      </div>
    );
  }
  return (
    <div className="App container-fluid p-0">
      <NavbarApp getMovieByName={getMovieByName} />
      <div className="sidebar-and-main-container container-fluid d-flex flex-row p-0">
        <Sidebar />

        <div className="main-content container-fluid d-flex flex-column col-lg-10 p-3">
          <CardMovie
            movies={movies}
            genreList={genreList}
            getData={getData}
            getMovieByName={getMovieByName}
          />
          <Button className="btn btn-warning my-3" onClick={getData}>
            Discover More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
