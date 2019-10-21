import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function CarouselTop() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };
  
    return (
      <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="img-responsive w-100 "
            src="https://megabrainsinfotech.com/img/carousel/slide2.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img-responsive w-100"
            src="https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014711_960_720.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="img-responsive w-100"
            src="https://livingnomads.com/wp-content/uploads/2016/02/ham-ninh-village-beaches-traveled-to-phu-quoc-in-vietnam-phu-quoc-tourist-attractions-7.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
