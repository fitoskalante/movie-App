import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  return (
    <div className="sidebar container-fluid d-none d-md-flex flex-column col-lg-2 bg-warning text-left sticky-top">
      <div className="container mt-4"></div>
      <ButtonGroup className="mt-5" vertical>
        <Button variant="dark">Top Rated</Button>
        <Button variant="dark">Kids</Button>
        <Button variant="dark">Action</Button>
        <Button variant="dark">Adventure</Button>
        <Button variant="dark">Comedy</Button>
        <Button variant="dark">Drama</Button>
        <Button variant="dark">Family</Button>
        <Button variant="dark">Horror</Button>
      </ButtonGroup>
    </div>
  );
}
