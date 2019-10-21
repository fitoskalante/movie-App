import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavDropdown,
  FormControl,
  Button,
  Form,
  Nav
} from "react-bootstrap";

export default function NavbarApp(props) {
  const [movieName, setMovieName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.getMovieByName(movieName);
  };
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Find a Movie"
            className="mr-sm-2"
            value={movieName}
            onChange={e => setMovieName(e.target.value)}
          />
          <Button variant="outline-warning" type="submit" value="searchMovie">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
      <Navbar.Brand href="#home">[ 35mm ]</Navbar.Brand>
    </Navbar>
  );
}
