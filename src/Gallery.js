import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function Gallery() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(category || "painting");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

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

  const getAdjacentImages = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;
    return [images[prevIndex], images[currentIndex], images[nextIndex]];
  };

  const swipeHandlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      setIsDragging(true);
      setOffset(deltaX);
    },
    onSwiped: () => {
      const threshold = containerRef.current?.offsetWidth * 0.2;
      if (Math.abs(offset) > threshold) {
        setCurrentIndex((prev) =>
          offset > 0
            ? (prev - 1 + images.length) % images.length
            : (prev + 1) % images.length
        );
      }
      setIsDragging(false);
      setOffset(0);
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div
      className="gallery-container"
      ref={containerRef}
    >
      <h1 className="gallery-title">
        {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}{" "}
        Gallery
      </h1>

      <div
        className="carousel-track"
        {...swipeHandlers}
      >
        {getAdjacentImages().map(
          (image, index) =>
            image && (
              <div
                key={`${image.src}-${index}`}
                className={`gallery-card ${index === 1 ? "main" : "side"}`}
                style={getCardStyle(index, offset)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  draggable="false"
                />
                {index === 1 && (
                  <div className="image-info">
                    <h3>{image.title}</h3>
                  </div>
                )}
              </div>
            )
        )}
      </div>

      <div className="category-container">
        {Object.keys(imageData).map((cat) => {
          const icons = {
            painting: "/paintinggg.png",
            sculpture: "/sculptureee.png",
            sketches: "/sketchesss.png",
          };

          return (
            <div
              key={cat}
              className={`category-item ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
                navigate(`/gallery/${cat}`);
              }}
            >
              <img
                src={icons[cat]}
                alt={`${cat} icon`}
                className="category-icon"
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          );
        })}
      </div>
    </div>
  );

  function getCardStyle(positionIndex, dragOffset) {
    const isMain = positionIndex === 1;
    const position = positionIndex - 1; // -1: left, 0: center, 1: right

    // Base transforms without dragging
    let transform = "";
    let scale = 1;
    let zIndex = 1;
    let opacity = 0.8;

    if (isMain) {
      transform = `translateX(${dragOffset}px)`;
      scale = 1;
      zIndex = 3;
      opacity = 1;
    } else {
      const basePosition = position * 80; // 80% offset for side images
      transform = `translateX(calc(${basePosition}% + ${dragOffset * 0.5}px))`;
      scale = 0.7;
      zIndex = 1;
      opacity = 0.8 - Math.abs(dragOffset) / 1000;
    }

    return {
      transform: `${transform} scale(${scale})`,
      zIndex,
      opacity,
      transition: isDragging
        ? "none"
        : "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      filter: isMain
        ? "drop-shadow(0 8px 15px rgba(0,0,0,0.3))"
        : "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
    };
  }
}

export default Gallery;
