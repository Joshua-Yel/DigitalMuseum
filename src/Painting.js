import React, { useState, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import "./Painting.css";

const Painting = () => {
  const paintings = [
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const getAdjacentPaintings = () => {
    const prevIndex = (currentIndex - 1 + paintings.length) % paintings.length;
    const nextIndex = (currentIndex + 1) % paintings.length;
    return [
      paintings[prevIndex],
      paintings[currentIndex],
      paintings[nextIndex],
    ];
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
            ? (prev - 1 + paintings.length) % paintings.length
            : (prev + 1) % paintings.length
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
      className="painting-container"
      ref={containerRef}
    >
      <h1 className="gallery-title">Paintings Gallery</h1>

      <div
        className="carousel-track"
        {...swipeHandlers}
      >
        {getAdjacentPaintings().map((painting, index) => (
          <div
            key={`${painting.src}-${index}`}
            className={`painting-card ${index === 1 ? "main" : "side"}`}
            style={getCardStyle(index, offset)}
          >
            <img
              src={painting.src}
              alt={painting.title}
              draggable="false"
            />
            {index === 1 && (
              <div className="painting-info">
                <h3>{painting.title}</h3>
              </div>
            )}
          </div>
        ))}
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
};

export default Painting;
