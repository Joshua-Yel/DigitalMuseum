import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function Gallery() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || "painting");
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageData = {
    painting: [
      {
        src: "/painting/Barefoot%20gentleman,%202007.jpg",
        title: "Barefoot gentleman, 2007",
      },
      {
        src: "/painting/Blue Kerchief, 2011.jpg",
        title: "Blue Kerchief, 2011",
      },
      {
        src: "/painting/Brown Women (Macau Series), 2006.jpg",
        title: "Brown Women (Macau Series), 2006",
      },
      {
        src: "/painting/Contemplation, 1985.jpg",
        title: "Contemplation, 1985",
      },
      {
        src: "/painting/DANCE IMPROVISATION VI, 2000.jpg",
        title: "DANCE IMPROVISATION VI, 2000",
      },
      {
        src: "/painting/Dirt in the eye, 1989.jpg",
        title: "Dirt in the eye, 1989",
      },
      { src: "/painting/Edo gesture, 1981.jpg", title: "Edo gesture, 1981" },
      { src: "/painting/Espeleta, 1967.jpg", title: "Espeleta, 1967" },
      {
        src: "/painting/Fishing Village in Batang Island, 1963.jpg",
        title: "Fishing Village in Batang Island, 1963",
      },
      {
        src: "/painting/Gaze II (Lararawan Series I), 1972.jpg",
        title: "Gaze II (Larawaran Series I), 1972",
      },
      { src: "/painting/Girl Sitting, 1994.jpg", title: "Girl Sitting, 1994" },
      {
        src: "/painting/Isadora in Motion, 1998.jpg",
        title: "Isadora in Motion, 1998",
      },
      {
        src: "/painting/Mother and Child, 1996.jpg",
        title: "Mother and Child, 1996",
      },
      {
        src: "/painting/Mysterious woman, 2005.jpg",
        title: "Mysterious woman, 2005",
      },
      {
        src: "/painting/Sabel in blue, 2006.jpg",
        title: "Sabel in blue, 2006",
      },
      {
        src: "/painting/Studies of Colombian Indian II, 1977.jpg",
        title: "Studies of Colombian Indian II, 1977",
      },
      { src: "/painting/The friar, 1973.jpg", title: "The friar, 1973" },
      {
        src: "/painting/Woman with a Basket, 1998.jpg",
        title: "Woman with a Basket, 1998",
      },
      {
        src: "/painting/Woman with basket, 2005.jpg",
        title: "Woman with basket, 2005",
      },
      {
        src: "/painting/Woman with Winnowing Basket, 2002.jpg",
        title: "Woman with Winnowing Basket, 2002",
      },
    ],
    sculpture: [
      { src: "/Sculpture/Gesture 1.jpg", title: "Gesture 1" },
      { src: "/Sculpture/Gesture.jpg", title: "Gesture" },
      { src: "/Sculpture/Heads.jpg", title: "Heads" },
      { src: "/Sculpture/Headss.jpg", title: "Headss" },
      { src: "/Sculpture/Holy Family, 2005.jpg", title: "Holy Family, 2005" },
      { src: "/Sculpture/Mother and Child.jpg", title: "Mother and Child" },
      { src: "/Sculpture/Nude, 2012.jpg", title: "Nude, 2012" },
      { src: "/Sculpture/Sabel.jpg", title: "Sabel" },
      { src: "/Sculpture/Torso 2.jpg", title: "Torso #2" },
      { src: "/Sculpture/Torso, 2013.jpg", title: "Torso, 2013" },
    ],
    sketches: [
      { src: "/Sketches/British Punk, 1987.jpg", title: "British Punk, 1987" },
      {
        src: "/Sketches/Edmund Fortuno, 1995.jpg",
        title: "Edmund Fortuno, 1995",
      },
      { src: "/Sketches/Female Nude, 2008.jpg", title: "Female Nude, 2008" },
      { src: "/Sketches/Male Study, 2001.jpg", title: "Male Study, 2001" },
      { src: "/Sketches/Man Resting, 2002.jpg", title: "Man Resting, 2002" },
      { src: "/Sketches/Nude I, 1996.jpg", title: "Nude I, 1996" },
      { src: "/Sketches/Nude Series, 2004.jpg", title: "Nude Series, 2004" },
      { src: "/Sketches/Nude, 1998.jpg", title: "Nude, 1998" },
      { src: "/Sketches/Nude, 2002.jpg", title: "Nude, 2002" },
      { src: "/Sketches/Nude, 2007.jpg", title: "Nude, 2007" },
    ],
  };

  const images = imageData[activeCategory.toLowerCase()] || [];

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === "right") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">
        {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}{" "}
        Gallery
      </h1>

      <div
        className="carousel-container"
        {...swipeHandlers}
      >
        {images.length > 1 && (
          <img
            src={images[(currentIndex - 1 + images.length) % images.length].src}
            alt="Previous"
            className="side-image left"
            draggable="false"
          />
        )}
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].title}
          className="main-image"
          draggable="false"
        />
        {images.length > 1 && (
          <img
            src={images[(currentIndex + 1) % images.length].src}
            alt="Next"
            className="side-image right"
            draggable="false"
          />
        )}
      </div>

      <div className="category-container">
        {Object.keys(imageData).map((cat) => (
          <div
            key={cat}
            className={`category-item ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => {
              setActiveCategory(cat);
              navigate(`/gallery/${cat}`);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
