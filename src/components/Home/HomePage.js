import React, { useState } from "react";
import "./Home.css";
function HomePage(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/imgs/i1.jpg",
    "/imgs/i2.jpg",
    "/imgs/i3.jpg",
    "/imgs/i4.jpg",
  ];

  const showSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };
  return (
    <div id="homePage" className="row">
      <div style={{ textAlign: "center" }} className="row">
        <h1>Trang chủ</h1>
      </div>

      <div className="row">
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide}>
            ❮
          </button>
          <div className="image-list">
            {images.map((image, index) => (
              <img
                key={index}
                className={`image ${index === currentIndex ? "active" : ""}`}
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => showSlide(index)}
              />
            ))}
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
