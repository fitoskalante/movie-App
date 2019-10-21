import { Card, Badge, CardDeck } from "react-bootstrap";
import React, { useState, useEffect } from "react";

export default function CardMovie(props) {
  const renderBadges = movie => {
    return (
      <div>
        {movie.genre_ids.map(id => {
          return (
            <Badge pill variant="warning mx-2 mb-2" key={movie.genre_ids}>
              {props.genreList.map(genre => {
                if (genre.id === id) {
                  return <span key={genre.id}>{genre.name}</span>;
                }
              })}
            </Badge>
          );
        })}
      </div>
    );
  };

  function RenderTrailer(props) {
    const [youtubeKey, setYoutubeKey] = useState("");
    const getYoutubeKey = async movieId => {
      const API_KEY = "d34264194788a6c91b6a55fe90f61988";
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
      let response = await fetch(url);
      let data = await response.json();
      const youtubeKeys = data.videos.results[0].key;
      setYoutubeKey(youtubeKeys);
    };

    useEffect(() => {
      getYoutubeKey(props.movieId);
    }, []);

    return (
      <div className="mt-2 mb-3">
        <button
          className="btn btn-danger"
          href={`https://www.youtube.com/embed/${youtubeKey}`}
        >
          <a
            className="text-white"
            href={`https://www.youtube.com/embed/${youtubeKey}`}
            target="_blank"
          >
            Watch Trailer
          </a>
        </button>
      </div>
    );
  }

  const poster = "https://image.tmdb.org/t/p/original/";

  return (
    <>
      <CardDeck className="text-dark">
        {props.movies.map(movie => {
          return (
            <Card className="card-style">
              <Card.Img
                className="img-card"
                variant="top"
                src={`${poster}${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text className="card-text-style">
                  {movie.overview}
                </Card.Text>
              </Card.Body>
              <span>{renderBadges(movie)}</span>
              <RenderTrailer movieId={movie.id} />

              <Card.Footer>
                <small className="text-muted">
                  Release {movie.release_date}
                </small>
              </Card.Footer>
            </Card>
          );
        })}
      </CardDeck>
    </>
  );
}
