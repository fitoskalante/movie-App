import {
  Card,
  Badge,
  CardDeck,
  Modal,
  ButtonToolbar,
  Button
} from "react-bootstrap";
import YouTube from "react-youtube";
import React, { useState, useEffect } from "react";

function RenderTrailer(props) {
  const [youtubeKey, setYoutubeKey] = useState(null);
  const getYoutubeKey = async movieId => {
    const API_KEY = "d34264194788a6c91b6a55fe90f61988";
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("sksjksjk", data);
    const youtubeKeys = data.videos.results[0] && data.videos.results[0].key;
    setYoutubeKey(youtubeKeys);
  };

  useEffect(() => {
    getYoutubeKey(props.movieId);
  }, []);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };
  if (youtubeKey) {
    return (
      <div className="container-fluid p-0">
        <YouTube videoId={youtubeKey} opts={opts} />
      </div>
    );
  } else {
    return (
      <div className="container-fluid d-flex p-0 justify-content-center text-secondary">
        <h3 className="display-3">Video not available</h3>
      </div>
    );
  }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <RenderTrailer movieId={props.movieId} />
      </Modal.Body>
    </Modal>
  );
}

export default function CardMovie(props) {
  const [modalShow, setModalShow] = useState(false);
  const [ricId, setRicId] = useState(null);

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
  const poster = "https://image.tmdb.org/t/p/original/";

  const handleModal = movieId => {
    setRicId(movieId);
    setModalShow(!modalShow);
  };

  return (
    <>
      <MyVerticallyCenteredModal
        movieId={ricId && ricId}
        show={modalShow}
        onHide={() => handleModal()}
      />
      <CardDeck className="text-dark">
        {props.movies.map(movie => {
          return (
            movie.poster_path &&
            movie.overview && (
              <Card className="card-style">
                <Card.Img
                  className="img-card"
                  variant="top"
                  src={`${poster}${movie.poster_path}`}
                  onClick={() => handleModal(movie.id)}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text className="card-text-style">
                    {movie.overview}
                  </Card.Text>
                </Card.Body>
                <span>{renderBadges(movie)}</span>

                <ButtonToolbar></ButtonToolbar>

                <Card.Footer>
                  <small className="text-muted">
                    Release {movie.release_date}
                  </small>
                </Card.Footer>
              </Card>
            )
          );
        })}
      </CardDeck>
    </>
  );
}
