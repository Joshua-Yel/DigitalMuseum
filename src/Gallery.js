import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Gallery() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(category || "painting");

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
      { src: "/sculpture/Gesture 1.jpg", title: "Gesture 1" },
      { src: "/sculpture/Gesture.jpg", title: "Gesture" },
      { src: "/sculpture/Heads.jpg", title: "Heads" },
      { src: "/sculpture/Headss.jpg", title: "Headss" },
      { src: "/sculpture/Holy Family, 2005.jpg", title: "Holy Family, 2005" },
      { src: "/sculpture/Mother and Child.jpg", title: "Mother and Child" },
      { src: "/sculpture/Nude, 2012.jpg", title: "Nude, 2012" },
      { src: "/sculpture/Sabel.jpg", title: "Sabel" },
      { src: "/sculpture/Torso 2.jpg", title: "Torso #2" },
      { src: "/sculpture/Torso, 2013.jpg", title: "Torso, 2013" },
    ],
    sketches: [
      { src: "/sketches/British Punk, 1987.jpg", title: "British Punk, 1987" },
      {
        src: "/sketches/Edmund Fortuno, 1995.jpg",
        title: "Edmund Fortuno, 1995",
      },
      { src: "/sketches/Female Nude, 2008.jpg", title: "Female Nude, 2008" },
      { src: "/sketches/Male Study, 2001.jpg", title: "Male Study, 2001" },
      { src: "/sketches/Man Resting, 2002.jpg", title: "Man Resting, 2002" },
      { src: "/sketches/Nude I, 1996.jpg", title: "Nude I, 1996" },
      { src: "/sketches/Nude Series, 2004.jpg", title: "Nude Series, 2004" },
      { src: "/sketches/Nude, 1998.jpg", title: "Nude, 1998" },
      { src: "/sketches/Nude, 2002.jpg", title: "Nude, 2002" },
      { src: "/sketches/Nude, 2007.jpg", title: "Nude, 2007" },
    ],
  };

  const images = imageData[activeCategory.toLowerCase()] || [];

  return (
    <div className="gallery-container">
      <div className="gallery-overlay"></div>

      {/* Category Filter Buttons */}
      <div className="gallery-filters">
        {["Painting", "Sculpture", "Sketches"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat.toLowerCase());
              navigate(`/gallery/${cat.toLowerCase()}`);
            }}
            className={`gallery-filter-btn ${
              activeCategory === cat.toLowerCase() ? "active" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h1 className="gallery-title">
        {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}{" "}
        Gallery
      </h1>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => setSelectedImage(image.src)}
          >
            <img
              src={image.src}
              alt={image.title}
              className="gallery-image"
              loading="lazy"
            />
            <div className="gallery-hover-overlay">
              <p className="gallery-text">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox for Enlarged View */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged artwork"
            className="lightbox-image"
          />
        </div>
      )}
    </div>
  );
}
export default Gallery;
