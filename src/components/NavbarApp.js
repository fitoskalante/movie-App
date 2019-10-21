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
  const pageNumber = 1;

  const handleSubmit = e => {
    e.preventDefault();
    props.getMovieByName(movieName, pageNumber);
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

        <Nav
          className="mr-auto ml-5"
          onSelect={eventKey => props.getData(`${eventKey}`, pageNumber)}
        >
          <Nav.Link href="#home" eventKey="top_rated">
            Top Rated
          </Nav.Link>
          <Nav.Link href="#link" eventKey="popular">
            Popular
          </Nav.Link>
          <Nav.Link href="#link" eventKey="upcoming">
            Upcoming
          </Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand href="#home">
        <strong>[ 35mm ]</strong>
      </Navbar.Brand>
    </Navbar>
  );
}
